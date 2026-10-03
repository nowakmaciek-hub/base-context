import { spawn } from "node:child_process";
import type { Api, AssistantMessage, Model } from "@ponythewhite/base-context-ai";

const COMPLETION_OUTPUT_BYTES = 4096;
export const PAPER_COST_GATE_DIAGNOSTIC = "paper_cost_gate";

export async function runPaperCompletionCommand(
	command: string | undefined,
	cwd: string,
	timeoutMs: number,
): Promise<void> {
	if (!command?.trim()) throw new Error("Completion gate requires paperCandidates.completionCommand");
	if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
		throw new Error("Completion gate requires a positive paperCandidates.completionTimeoutMs");
	}
	await new Promise<void>((resolve, reject) => {
		const child = spawn(command, {
			cwd,
			shell: true,
			detached: process.platform !== "win32",
			stdio: ["ignore", "pipe", "pipe"],
		});
		let output = Buffer.alloc(0);
		const capture = (chunk: Buffer) => {
			const remaining = COMPLETION_OUTPUT_BYTES - output.length;
			if (remaining > 0) output = Buffer.concat([output, chunk.subarray(0, remaining)]);
		};
		child.stdout.on("data", capture);
		child.stderr.on("data", capture);
		const failure = (reason: string) =>
			new Error(`Completion gate ${reason}${output.length ? `: ${output.toString("utf8")}` : ""}`);
		const timer = setTimeout(() => {
			if (process.platform !== "win32" && child.pid) process.kill(-child.pid, "SIGKILL");
			else child.kill("SIGKILL");
			reject(failure(`timed out after ${timeoutMs}ms`));
		}, timeoutMs);
		child.once("error", (error) => {
			clearTimeout(timer);
			reject(failure(`could not run: ${error.message}`));
		});
		child.once("close", (code, signal) => {
			clearTimeout(timer);
			if (code === 0) resolve();
			else reject(failure(`failed (${signal ?? `exit ${code}`})`));
		});
	});
}

export interface PaperCostGateInputs {
	contextTokens: number;
	contextWindow: number;
	fixedContextTokens: number;
	reserveTokens: number;
	keepRecentTokens: number;
	mainModel: Model<Api> | undefined;
	summaryModel: Model<Api> | undefined;
}

export interface PaperCostGateDecision {
	heuristic: "two-request-cache-read";
	action: "compact" | "defer";
	reason: "reserve" | "unknown-prices" | "savings" | "deferral-limit" | "summary-cost";
	contextTokens: number;
	contextWindow: number;
	fixedContextTokens: number;
	reserveTokens: number;
	keepRecentTokens: number;
	summaryTokens: number;
	summaryInputPrice: number | null;
	summaryOutputPrice: number | null;
	cacheReadPrice: number | null;
	summaryCost: number | null;
	nextRequestSavings: number | null;
	deferrals: number;
}

function usablePrice(value: number | undefined): number | null {
	return value !== undefined && Number.isFinite(value) && value >= 0 ? value : null;
}

export class PaperCompactionCostGate {
	private deferrals = 0;
	private decisions = new WeakMap<AssistantMessage, PaperCostGateDecision>();

	reset(): void {
		this.deferrals = 0;
		this.decisions = new WeakMap();
	}

	decide(message: AssistantMessage, inputs: PaperCostGateInputs): { decision: PaperCostGateDecision; fresh: boolean } {
		const {
			contextTokens,
			contextWindow,
			fixedContextTokens,
			reserveTokens,
			keepRecentTokens,
			mainModel,
			summaryModel,
		} = inputs;
		const reservePressure = contextTokens >= contextWindow - reserveTokens;
		const cached = this.decisions.get(message);
		if (cached && (!reservePressure || cached.reason === "reserve")) return { decision: cached, fresh: false };
		const summaryTokens = Math.floor(0.8 * reserveTokens);
		const summaryInputPrice = usablePrice(summaryModel?.cost.input);
		const summaryOutputPrice = usablePrice(summaryModel?.cost.output);
		const cacheReadPrice = usablePrice(mainModel?.cost.cacheRead);
		const knownPrices = summaryInputPrice !== null && summaryOutputPrice !== null && cacheReadPrice !== null;
		const summaryCost = knownPrices
			? (contextTokens * summaryInputPrice + summaryTokens * summaryOutputPrice) / 1e6
			: null;
		const nextRequestSavings = knownPrices
			? (2 * Math.max(0, contextTokens - (fixedContextTokens + keepRecentTokens + summaryTokens)) * cacheReadPrice) /
				1e6
			: null;
		let reason: PaperCostGateDecision["reason"];
		if (reservePressure) reason = "reserve";
		else if (
			summaryCost === null ||
			nextRequestSavings === null ||
			!Number.isFinite(summaryCost) ||
			!Number.isFinite(nextRequestSavings)
		)
			reason = "unknown-prices";
		else if (nextRequestSavings >= summaryCost) reason = "savings";
		else if (this.deferrals >= 2) reason = "deferral-limit";
		else reason = "summary-cost";
		const action = reason === "summary-cost" ? "defer" : "compact";
		if (action === "defer") this.deferrals++;
		const decision: PaperCostGateDecision = {
			heuristic: "two-request-cache-read",
			action,
			reason,
			contextTokens,
			contextWindow,
			fixedContextTokens,
			reserveTokens,
			keepRecentTokens,
			summaryTokens,
			summaryInputPrice,
			summaryOutputPrice,
			cacheReadPrice,
			summaryCost: summaryCost !== null && Number.isFinite(summaryCost) ? summaryCost : null,
			nextRequestSavings:
				nextRequestSavings !== null && Number.isFinite(nextRequestSavings) ? nextRequestSavings : null,
			deferrals: this.deferrals,
		};
		this.decisions.set(message, decision);
		return { decision, fresh: true };
	}
}
