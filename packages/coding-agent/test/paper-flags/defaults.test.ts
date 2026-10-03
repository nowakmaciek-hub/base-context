import { describe, expect, it } from "vitest";
import { SettingsManager } from "../../src/core/settings-manager.js";

const disabled = {
	structuredSummary: false,
	completionGate: false,
	costGatedCompaction: false,
	completionCommand: undefined,
	completionTimeoutMs: 30000,
};

describe("paper candidate settings", () => {
	it("keeps all defaults off and explicit-false candidates disabled without adding normal settings", () => {
		const settings = SettingsManager.inMemory();
		expect(settings.getPaperCandidateSettings()).toEqual(disabled);
		expect(settings.getGlobalSettings()).not.toHaveProperty("paperCandidates");
		expect(
			SettingsManager.inMemory({
				paperCandidates: { structuredSummary: false, completionGate: false, costGatedCompaction: false },
			}).getPaperCandidateSettings(),
		).toEqual(disabled);
	});

	it.each(["structuredSummary", "completionGate", "costGatedCompaction"] as const)("enables only %s", (flag) => {
		const settings = SettingsManager.inMemory({ paperCandidates: { [flag]: true } });
		expect(settings.getPaperCandidateSettings()).toEqual({ ...disabled, [flag]: true });
	});

	it("resolves command and timeout overrides without enabling any candidate", () => {
		const settings = SettingsManager.inMemory({
			paperCandidates: { completionCommand: "npm run check", completionTimeoutMs: 1000 },
		});
		expect(settings.getPaperCandidateSettings()).toEqual({
			...disabled,
			completionCommand: "npm run check",
			completionTimeoutMs: 1000,
		});
		settings.applyOverrides({ paperCandidates: { structuredSummary: true } });
		expect(settings.getPaperCandidateSettings()).toEqual({
			...disabled,
			structuredSummary: true,
			completionCommand: "npm run check",
			completionTimeoutMs: 1000,
		});
	});
});
