# Paper candidates

Three independent settings are experimental and default off. With all absent or false, the original behavior is retained.

```json
{
  "paperCandidates": {
    "structuredSummary": false,
    "completionGate": false,
    "costGatedCompaction": false,
    "completionCommand": "python3 acceptance.py",
    "completionTimeoutMs": 30000
  }
}
```

- `structuredSummary` requests ruled-out approaches and their reasons, evidence/source links, constraints, preferences, and completed/remaining work in history and split-turn summaries. It does not change the model or summary budget.
- `completionGate` runs the owner-configured command in the session working directory before host goal completion. Missing command, nonzero exit or timeout leaves the goal active. A changed goal or session cannot receive stale completion from a command already running.
- `costGatedCompaction` can defer threshold compaction for at most two distinct assistant turns. It shares the cached decision between the native turn boundary and fallback check. It compares estimated summary cost with two requests of estimated cache-read savings. Manual, requested and overflow compactions bypass it. Unknown prices and reserve pressure preserve normal threshold compaction. A committed compaction resets the deferral count.

M3 records inputs, estimated dollar costs, action and reason in the native session journal as `paper_cost_gate` custom entries. The driver reads these entries from the same journal as request accounting; no separate diagnostic store is used.

The timing estimate is a local heuristic, not measured savings. Under the pinned `gpt-6.1-sol` rates, the favorable-cost branch cannot win, so the experiment measures bounded timing delay. M8 agent-written compaction is deferred and has no implemented flag or benchmark arm.

The isolated synthetic benchmark and its commands live in `/host/work/papers-r1/bcbench-mini/`. Design, decisions and reports live in `/host/ops/goals/papers-r1/`. The single-factor budget counts cache reads and compaction calls; the follow-up factorial is designed but not run.
