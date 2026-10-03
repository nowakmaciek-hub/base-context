import type { ShouldStopAfterTurnContext } from "@ponythewhite/base-context-agent";
import { type AssistantMessage, fauxAssistantMessage } from "@ponythewhite/base-context-ai";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PAPER_COST_GATE_DIAGNOSTIC, type PaperCostGateDecision } from "../../src/core/paper-candidates.js";
import { createHarness, type Harness } from "../suite/harness.js";

type ThresholdInternals = {
	_thresholdCompactionNeeded(context: ShouldStopAfterTurnContext): Promise<boolean>;
	_checkCompaction(
		message: AssistantMessage,
		skipAbortedCheck?: boolean,
		queueAutonomousContinuation?: boolean,
	): Promise<boolean>;
};
const harnesses: Harness[] = [];
afterEach(async () => {
	for (const harness of harnesses.splice(0)) await harness.cleanup();
});

async function thresholdHarness(enabled = true, cacheRead = 0.1): Promise<Harness> {
	const harness = await createHarness({
		models: [
			{ id: "expensive-summary", contextWindow: 128000, cost: { input: 2, output: 10, cacheRead, cacheWrite: 0 } },
		],
		settings: {
			paperCandidates: { costGatedCompaction: enabled },
			compaction: { enabled: true, targetTokens: 16000, reserveTokens: 8192, keepRecentTokens: 1024 },
		},
	});
	harnesses.push(harness);
	return harness;
}

function assistant(harness: Harness, tokens = 20000): AssistantMessage {
	const model = harness.getModel();
	const message = fauxAssistantMessage("threshold reply", { timestamp: Date.now() + 1 });
	return {
		...message,
		api: model.api,
		provider: model.provider,
		model: model.id,
		usage: { ...message.usage, input: tokens, totalTokens: tokens },
	};
}

function threshold(harness: Harness, message: AssistantMessage): Promise<boolean> {
	return (harness.session as unknown as ThresholdInternals)._thresholdCompactionNeeded({
		message,
		toolResults: [],
		newMessages: [message],
		context: { systemPrompt: harness.session.systemPrompt, messages: harness.session.messages, tools: [] },
	});
}

describe("paper cost gate at the native threshold seam", () => {
	it("defers an expensive summary above the soft target", async () => {
		const harness = await thresholdHarness();
		expect(await threshold(harness, assistant(harness))).toBe(false);
	});
	it("shares the cached decision across native and fallback seams and caps distinct deferrals", async () => {
		const harness = await thresholdHarness();
		const internals = harness.session as unknown as ThresholdInternals;
		const first = assistant(harness);
		expect(await threshold(harness, first)).toBe(false);
		expect(await internals._checkCompaction(first, false, false)).toBe(false);
		expect(await threshold(harness, first)).toBe(false);
		expect(await threshold(harness, assistant(harness))).toBe(false);
		expect(await threshold(harness, assistant(harness))).toBe(true);
		const decisions = (await harness.sessionManager.readBranch()).filter(
			(entry) => entry.type === "custom" && entry.customType === PAPER_COST_GATE_DIAGNOSTIC,
		);
		expect(decisions).toHaveLength(3);
		expect(decisions.map((entry) => (entry as { data: PaperCostGateDecision }).data.reason)).toEqual([
			"summary-cost",
			"summary-cost",
			"deferral-limit",
		]);
	});

	it("runs favorable-cost compaction at the native and fallback seams", async () => {
		const harness = await thresholdHarness(true, 100);
		const message = assistant(harness);
		expect(await threshold(harness, message)).toBe(true);
		const internals = harness.session as unknown as ThresholdInternals & {
			_runAutoCompaction(reason: string): Promise<boolean>;
		};
		const run = vi.spyOn(internals, "_runAutoCompaction").mockResolvedValue(false);
		await internals._checkCompaction(message, false, false);
		expect(run).toHaveBeenCalledWith("threshold", false, expect.anything(), false, undefined, false);
	});

	it("keeps flag-off native threshold behavior and records no candidate diagnostics", async () => {
		const harness = await thresholdHarness(false);
		const message = assistant(harness);
		expect(await threshold(harness, message)).toBe(true);
		const internals = harness.session as unknown as ThresholdInternals & {
			_runAutoCompaction(reason: string): Promise<boolean>;
		};
		const run = vi.spyOn(internals, "_runAutoCompaction").mockResolvedValue(false);
		await internals._checkCompaction(message, false, false);
		expect(run).toHaveBeenCalledWith("threshold", false, expect.anything(), false, undefined, false);
		expect(
			(await harness.sessionManager.readBranch()).filter(
				(entry) => entry.type === "custom" && entry.customType === PAPER_COST_GATE_DIAGNOSTIC,
			),
		).toHaveLength(0);
	});

	it("bypasses the gate when the reserve boundary is reached", async () => {
		const harness = await thresholdHarness();
		expect(await threshold(harness, assistant(harness, 128000 - 8192))).toBe(true);
	});

	it("falls back to normal threshold compaction for unusable prices", async () => {
		const harness = await thresholdHarness(true, Number.NaN);
		expect(await threshold(harness, assistant(harness))).toBe(true);
	});

	it("bypasses manual and requested compaction and resets after real compaction", async () => {
		const harness = await thresholdHarness();
		harness.settingsManager.applyOverrides({ compaction: { enabled: false } });
		harness.setResponses([fauxAssistantMessage("earlier reply"), fauxAssistantMessage("later reply")]);
		await harness.session.prompt("earlier request");
		await harness.session.prompt("later request");
		harness.settingsManager.applyOverrides({ compaction: { enabled: true } });
		const last = harness.session.messages
			.filter((message): message is AssistantMessage => message.role === "assistant")
			.at(-1)!;
		last.usage.input = 20000;
		last.usage.totalTokens = 20000;
		expect(await threshold(harness, last)).toBe(false);
		const second = assistant(harness);
		harness.session.agent.state.messages.push(second);
		expect(await threshold(harness, second)).toBe(false);
		harness.setResponses([
			fauxAssistantMessage("manual retained summary"),
			fauxAssistantMessage("manual turn prefix"),
		]);
		await harness.session.compact();
		expect(harness.eventsOfType("compaction_end").some((event) => event.reason === "manual" && event.result)).toBe(
			true,
		);
		const after = assistant(harness);
		after.timestamp = Date.now() + 1000;
		harness.session.agent.state.messages.push(after);
		expect(await threshold(harness, after)).toBe(false);
		harness.setResponses([
			fauxAssistantMessage("requested retained summary"),
			fauxAssistantMessage("requested turn prefix"),
		]);
		const state = harness.session.agent.state as { isStreaming: boolean };
		state.isStreaming = true;
		try {
			expect((await harness.session.handleCompactHostRequest("compact.run")).scheduled).toBe(true);
		} finally {
			state.isStreaming = false;
		}
		await (harness.session as unknown as ThresholdInternals)._checkCompaction(after, false, false);
		expect(harness.eventsOfType("compaction_end").some((event) => event.reason === "requested" && event.result)).toBe(
			true,
		);
	});

	it("bypasses provider overflow recovery without consuming a threshold deferral", async () => {
		const harness = await thresholdHarness();
		const internals = harness.session as unknown as ThresholdInternals & {
			_runAutoCompaction(reason: string): Promise<boolean>;
		};
		const run = vi.spyOn(internals, "_runAutoCompaction").mockResolvedValue(false);
		const message = assistant(harness);
		message.stopReason = "error";
		message.errorMessage = "prompt is too long";
		await internals._checkCompaction(message, false, false);
		expect(run).toHaveBeenCalledWith("overflow", true, expect.anything(), false, undefined, false);
		expect(await threshold(harness, assistant(harness))).toBe(false);
	});
});
