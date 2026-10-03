import { existsSync, readFileSync, watch, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { createHarness, type Harness } from "../suite/harness.js";

const harnesses: Harness[] = [];
afterEach(async () => {
	for (const harness of harnesses.splice(0)) await harness.cleanup();
});

async function completionHarness(enabled: boolean, command?: string, timeoutMs = 30000): Promise<Harness> {
	const harness = await createHarness({
		settings: {
			paperCandidates: { completionGate: enabled, completionCommand: command, completionTimeoutMs: timeoutMs },
		},
	});
	harnesses.push(harness);
	await harness.session.handleGoalHostRequest("goal.create", { objective: "finish the migration" });
	return harness;
}

function script(harness: Harness, source: string): string {
	const path = join(harness.tempDir, "completion.cjs");
	writeFileSync(path, source);
	return `"${process.execPath}" "${path}"`;
}

describe("paper completion gate at the native host boundary", () => {
	it("rejects a failing owner command without writing completion", async () => {
		const harness = await completionHarness(true);
		const command = script(harness, 'console.error("migration incomplete"); process.exit(9);');
		harness.settingsManager.applyOverrides({ paperCandidates: { completionGate: true, completionCommand: command } });
		const before = await harness.sessionManager.readBranch();
		await expect(harness.session.handleGoalHostRequest("goal.complete")).rejects.toThrow("migration incomplete");
		expect(harness.session.goalState.status).toBe("active");
		expect(await harness.sessionManager.readBranch()).toEqual(before);
	});
	it("completes only after a successful command in the session cwd", async () => {
		const harness = await completionHarness(true);
		const command = script(harness, 'require("node:fs").writeFileSync("checked", process.cwd());');
		harness.settingsManager.applyOverrides({ paperCandidates: { completionGate: true, completionCommand: command } });
		const result = await harness.session.handleGoalHostRequest("goal.complete");
		expect(result.goal?.status).toBe("complete");
		expect(readFileSync(join(harness.tempDir, "checked"), "utf8")).toBe(harness.tempDir);
		expect(harness.session.goalState.status).toBe("complete");
	});

	it("never executes the command with the flag off", async () => {
		const harness = await completionHarness(false);
		const command = script(harness, 'require("node:fs").writeFileSync("should-not-run", "bad"); process.exit(1);');
		harness.settingsManager.applyOverrides({
			paperCandidates: { completionGate: false, completionCommand: command },
		});
		await harness.session.handleGoalHostRequest("goal.complete");
		expect(harness.session.goalState.status).toBe("complete");
		expect(existsSync(join(harness.tempDir, "should-not-run"))).toBe(false);
	});

	it("rejects missing configuration and leaves the goal active", async () => {
		const harness = await completionHarness(true);
		const before = await harness.sessionManager.readBranch();
		await expect(harness.session.handleGoalHostRequest("goal.complete")).rejects.toThrow(
			"paperCandidates.completionCommand",
		);
		expect(harness.session.goalState.status).toBe("active");
		expect(await harness.sessionManager.readBranch()).toEqual(before);
	});

	it("bounds timeout and failure output without writing completion", async () => {
		const harness = await completionHarness(true);
		const command = script(harness, 'process.stdout.write("x".repeat(20000)); setInterval(() => {}, 1000);');
		harness.settingsManager.applyOverrides({
			paperCandidates: { completionGate: true, completionCommand: command, completionTimeoutMs: 150 },
		});
		const before = await harness.sessionManager.readBranch();
		const error = await harness.session.handleGoalHostRequest("goal.complete").catch((caught: unknown) => caught);
		expect(error).toBeInstanceOf(Error);
		expect((error as Error).message).toContain("timed out after 150ms");
		expect((error as Error).message.length).toBeLessThan(4300);
		expect(harness.session.goalState.status).toBe("active");
		expect(await harness.sessionManager.readBranch()).toEqual(before);
	});

	it("does not apply successful stale completion after the owner changes", async () => {
		const harness = await completionHarness(true);
		const command = script(
			harness,
			'require("node:fs").writeFileSync("started", "ready"); setTimeout(() => process.exit(0), 250);',
		);
		harness.settingsManager.applyOverrides({ paperCandidates: { completionGate: true, completionCommand: command } });
		let closeWatcher = () => {};
		const started = new Promise<void>((resolve) => {
			const watcher = watch(harness.tempDir, (_event, filename) => {
				if (filename === "started") {
					watcher.close();
					resolve();
				}
			});
			closeWatcher = () => watcher.close();
		});
		try {
			const pending = harness.session.handleGoalHostRequest("goal.complete");
			const rejected = expect(pending).rejects.toThrow("Goal continuation owner changed");
			await started;
			await harness.session.prompt("/goal pause");
			const before = await harness.sessionManager.readBranch();
			await rejected;
			expect(harness.session.goalState.status).toBe("paused");
			expect(await harness.sessionManager.readBranch()).toEqual(before);
		} finally {
			closeWatcher();
		}
	});
});
