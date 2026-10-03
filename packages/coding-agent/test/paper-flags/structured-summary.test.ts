import type { AgentMessage } from "@ponythewhite/base-context-agent";
import type { AssistantMessage, Model } from "@ponythewhite/base-context-ai";
import { describe, expect, it, vi } from "vitest";
import {
	buildSummarizationPrompt,
	type CompactionPreparation,
	compact,
	DEFAULT_COMPACTION_SETTINGS,
} from "../../src/core/compaction/compaction.js";
import { createFileOps, serializeConversation } from "../../src/core/compaction/utils.js";
import type { InferenceCoordinator } from "../../src/core/inference-coordinator.js";
import { convertToLlm } from "../../src/core/messages.js";

const ORIGINAL_INITIAL_PROMPT = `The messages above are a conversation to summarize. Create a structured context checkpoint summary that another LLM will use to continue the work.

Use this EXACT format:

## Goal
[What is the user trying to accomplish? Can be multiple items if the session covers different tasks.]

## Constraints & Preferences
- [Any constraints, preferences, or requirements mentioned by user]
- [Or "(none)" if none were mentioned]

## Progress
### Done
- [x] [Completed tasks/changes]

### In Progress
- [ ] [Current work]

### Blocked
- [Issues preventing progress, if any]

## Key Decisions
- **[Decision]**: [Brief rationale]

## Next Steps
1. [Ordered list of what should happen next]

## Critical Context
- [Any data, examples, or references needed to continue]
- [Or "(none)" if not applicable]

Keep each section concise. Preserve exact file paths, function names, and error messages.`;

const ORIGINAL_UPDATE_PROMPT = `The messages above are NEW conversation messages to incorporate into the existing summary provided in <previous-summary> tags.

Update the existing structured summary with new information. RULES:
- PRESERVE all existing information from the previous summary
- ADD new progress, decisions, and context from the new messages
- UPDATE the Progress section: move items from "In Progress" to "Done" when completed
- UPDATE "Next Steps" based on what was accomplished
- PRESERVE exact file paths, function names, and error messages
- If something is no longer relevant, you may remove it

Use this EXACT format:

## Goal
[Preserve existing goals, add new ones if the task expanded]

## Constraints & Preferences
- [Preserve existing, add new ones discovered]

## Progress
### Done
- [x] [Include previously done items AND newly completed items]

### In Progress
- [ ] [Current work - update based on progress]

### Blocked
- [Current blockers - remove if resolved]

## Key Decisions
- **[Decision]**: [Brief rationale] (preserve all previous, add new)

## Next Steps
1. [Update based on current state]

## Critical Context
- [Preserve important context, add new if needed]

Keep each section concise. Preserve exact file paths, function names, and error messages.`;

const ORIGINAL_TURN_PREFIX_PROMPT = `This is the PREFIX of a turn that was too large to keep. The SUFFIX (recent work) is retained.

Summarize the prefix to provide context for the retained suffix:

## Original Request
[What did the user ask for in this turn?]

## Early Progress
- [Key decisions and work done in the prefix]

## Context for Suffix
- [Information needed to understand the retained recent work]

Be concise. Focus on what's needed to understand the kept suffix.`;

const ORIGINAL_RUNTIME_NOTE =
	"Runtime note: this summary does not establish whether a Python kernel is live or whether its variables, imports, helpers, or jobs remain available. Preserve useful names and their last observed state, including uncertainty. Use current runtime reports before relying on them; do not infer either survival or loss from compaction.";

const customInstructions = "Keep the deadline.";
const messages: AgentMessage[] = [{ role: "user", content: "No approach was tried yet.", timestamp: 1 }];
const prefixMessages: AgentMessage[] = [{ role: "user", content: "Continue with the remaining work.", timestamp: 2 }];
const model: Model<"anthropic-messages"> = {
	id: "summary-model",
	name: "Summary Model",
	api: "anthropic-messages",
	provider: "anthropic",
	baseUrl: "https://api.anthropic.com",
	reasoning: true,
	input: ["text"],
	cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
	contextWindow: 200000,
	maxTokens: 8192,
};
const response: AssistantMessage = {
	role: "assistant",
	content: [{ type: "text", text: "Summary" }],
	api: model.api,
	provider: model.provider,
	model: model.id,
	usage: {
		input: 10,
		output: 10,
		cacheRead: 0,
		cacheWrite: 0,
		totalTokens: 20,
		cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
	},
	stopReason: "stop",
	timestamp: 3,
};

function originalPrompt(previousSummary?: string): string {
	const base = previousSummary ? ORIGINAL_UPDATE_PROMPT : ORIGINAL_INITIAL_PROMPT;
	return `${base}

<user-instructions>
The user provided these instructions for this summary. Follow them with high priority while keeping the section format above: emphasize what they ask to focus on, and preserve verbatim anything they ask to remember.
${customInstructions}
</user-instructions>

${ORIGINAL_RUNTIME_NOTE}`;
}

function originalHistoryRequest(previousSummary?: string): string {
	let prompt = `<conversation>
${serializeConversation(convertToLlm(messages))}
</conversation>

`;
	if (previousSummary)
		prompt += `<previous-summary>
${previousSummary}
</previous-summary>

`;
	return prompt + originalPrompt(previousSummary);
}

function preparation(structuredSummary?: boolean, previousSummary?: string, split = false): CompactionPreparation {
	return {
		firstKeptEntryId: "kept-entry",
		messagesToSummarize: messages,
		turnPrefixMessages: split ? prefixMessages : [],
		isSplitTurn: split,
		tokensBefore: 4000,
		previousSummary,
		fileOps: createFileOps(),
		settings: { ...DEFAULT_COMPACTION_SETTINGS, reserveTokens: 2000, structuredSummary },
	};
}

function expectStructuredSections(prompt: string): void {
	expect(prompt).toContain("## Ruled-out Approaches");
	expect(prompt).toContain("reason it was ruled out");
	expect(prompt).toContain("## Evidence & Sources");
	expect(prompt).toContain("source links or paths");
	expect(prompt).toContain("## Open Constraints & Preferences");
	expect(prompt).toContain("## Completed vs Remaining Work");
	expect(prompt).toContain("Preserve unknowns as unknowns");
	expect(prompt).toContain("Do not invent evidence or fabricate source links");
}

function textFromCall(call: Parameters<InferenceCoordinator["complete"]>): string {
	const content = call[1].messages[0].content;
	if (typeof content === "string") return content;
	const text = content.find((block) => block.type === "text");
	if (!text || text.type !== "text") throw new Error("Missing request text");
	return text.text;
}

describe.each([
	{ name: "initial", previousSummary: undefined },
	{ name: "update", previousSummary: "Previous summary" },
])("structured $name summary", ({ previousSummary }) => {
	it("appends sections only when enabled and retains the original off prompt exactly", () => {
		expect(buildSummarizationPrompt(customInstructions, previousSummary)).toBe(originalPrompt(previousSummary));
		expect(buildSummarizationPrompt(customInstructions, previousSummary, false)).toBe(
			originalPrompt(previousSummary),
		);
		const enabled = buildSummarizationPrompt(customInstructions, previousSummary, true);
		expect(enabled.startsWith(originalPrompt(previousSummary))).toBe(true);
		expectStructuredSections(enabled);
	});

	it.each([undefined, false, true])("threads flag=%s into the actual history request", async (structuredSummary) => {
		const complete = vi.fn<InferenceCoordinator["complete"]>().mockResolvedValue(response);
		const requests = { complete } as unknown as InferenceCoordinator;
		const result = await compact(
			preparation(structuredSummary, previousSummary),
			model,
			"test-key",
			undefined,
			customInstructions,
			undefined,
			"medium",
			undefined,
			requests,
		);
		expect(complete).toHaveBeenCalledTimes(1);
		const call = complete.mock.calls[0];
		const prompt = textFromCall(call);
		if (structuredSummary) expectStructuredSections(prompt);
		else expect(prompt).toBe(originalHistoryRequest(previousSummary));
		expect(call[0]).toBe(model);
		expect(call[2]).toMatchObject({ maxTokens: 1600, reasoning: "medium", apiKey: "test-key" });
		expect(call[3].purposeDetail).toBe("compaction");
		expect(result.firstKeptEntryId).toBe("kept-entry");
	});
});

describe("structured split-turn summary", () => {
	it.each([undefined, false, true])("threads flag=%s into both actual split requests", async (structuredSummary) => {
		const complete = vi.fn<InferenceCoordinator["complete"]>().mockResolvedValue(response);
		const requests = { complete } as unknown as InferenceCoordinator;
		await compact(
			preparation(structuredSummary, "Previous summary", true),
			model,
			"test-key",
			undefined,
			customInstructions,
			undefined,
			"medium",
			undefined,
			requests,
		);
		expect(complete).toHaveBeenCalledTimes(2);
		const historyCall = complete.mock.calls.find((call) => call[3].purposeDetail === "compaction");
		const prefixCall = complete.mock.calls.find((call) => call[3].purposeDetail === "compaction-turn-prefix");
		if (!historyCall || !prefixCall) throw new Error("Missing split-summary request");
		if (structuredSummary) {
			expectStructuredSections(textFromCall(prefixCall));
			expectStructuredSections(textFromCall(historyCall));
		} else {
			expect(textFromCall(historyCall)).toBe(originalHistoryRequest("Previous summary"));
			expect(textFromCall(prefixCall)).toBe(
				`<conversation>
${serializeConversation(convertToLlm(prefixMessages))}
</conversation>

${ORIGINAL_TURN_PREFIX_PROMPT}`,
			);
		}
		expect(prefixCall[0]).toBe(model);
		expect(prefixCall[2]).toMatchObject({ maxTokens: 1000, reasoning: "medium", apiKey: "test-key" });
	});
});
