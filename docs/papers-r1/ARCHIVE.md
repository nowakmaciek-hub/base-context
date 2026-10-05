# Papers round 1 — archive and restart guide

**Owner decision, 2026-10-05 (05.10): archive the base-context fork experiment. No demonstrated advantage meets the author's combined quality/cost criterion.** M1–M3 remain default-off experimental code on `exp/paper-candidates`; no upstream adoption, further screen, rw6 run or factorial is pending. Repository archival is the orchestrator's action after reviewing this file.

This file is also stored as `docs/papers-r1/ARCHIVE.md` in the fork, alongside unchanged copies of `DESIGN-bcf.md`, `RESULTS-bcf.md`, `ANALYSIS-bcf.md` and `DECISIONS-bcf.md`. Older stop/resume instructions in those reports are historical. BCF-65 supersedes BCF-64's incorrect 47-cell cutoff; the 05.10 owner decision supersedes the subsequent follow-up recommendations. `astra-final/REVIEW.md` reviewed the earlier failed-pilot report, not the eventual 89-cell analysis or rw6 results.

## What was tried

- **24 papers → 21 merged mechanism/target candidates, M1–M21.** Two independent syntheses and paper cards were reconciled in [SYNTHESIS.md](/host/work/research-2026-10-02/SYNTHESIS.md), especially §§0, 1, 3, 6. [TARGETS.md](/host/work/research-2026-10-02/TARGETS.md) maps the pinned code seams; [cards/](/host/work/research-2026-10-02/cards/) holds paper claims and verifier qualifications. These are transfer hypotheses, not reproduced paper results.
- **[BCF]: M1 summary content, M2 checked completion, M3 compaction timing** implemented as separate flags and measured separately. M8 agent-written compaction was a documented stretch item, never implemented. M4–M7 and M9–M11 stayed outside the fork experiment.
- **[MOD]: Claude Code + BCC**, an independent port/iteration stream. It tested compaction handling, recall, tool-output retention and prompt/catalog overhead on cheap synthetic tasks, harder variants, then rw6. Its versions are not the BCF flag arms; do not attribute a MOD result to M1, M2 or M3 individually.
- **[CORTEX/SBRAIN]: deterministic fixes first.** Astra's V-01…V-14 verdicts are a different numbering system from M1…M21. Eleven TAKE items landed: seven Cortex items, four SBrain items; later SBrain received Cortex's decimal-percentage fix. Cortex parts-audit V-04 and SBrain parts-audit V-12 stayed LATER; V-14 generated stemming/synthesis driver stayed SKIP.
- The synthesis's original **15M-token plan** was not the eventual BCF screen envelope: BCF had a **2M pilot allowance and 25M total ceiling**, while MOD and brain work had separate budgets. Do not add their projections and call the result measured spend.

## Results per stream

### [BCF]

The native `bcbench-mini` screen used T1–T6, seeds 101/102/103, baseline plus M1/M2/M3 alone, and an independent baseline repeat: **90 designed cells, 89 eligible completions, 91 paid screen attempts**. All 72 primary cells completed; 17/18 baseline repeats completed. Calibration was explicitly waived as **quality ceiling-limited** (BCF-59).

| Arm | Equal-task paired quality Δ, percentage points [95% CI] | Paired API-equivalent USD ratio [95% CI] | Quality / cost pairs | Reading |
| --- | ---: | ---: | ---: | --- |
| M1 | −0.1684 [−0.2525, 0] | 1.037 [1.016, 1.059] | 18 / 18 | More expensive; no quality gain |
| M2 | +1.2821 [+1.2821, +1.2821] | 0.982 [0.948, 1.018] | 18 / 18 | T5 gate helps; lower cost unestablished |
| M3 | −1.2626 [−3.7879, 0] | 0.958 [0.921, 0.993] | 18 / 17 | Known-cost saving; quality non-loss unestablished |

These CIs condition on six fixed synthetic tasks and three observed seeds. M2's interval collapses because its within-task effects are constant. M1's one-leaf losses also occur in A/A; M3's isolated T4/101 loss occurred without an active timing mechanism. Neither observation proves mechanism-caused harm, but neither establishes the required non-loss. In active T6, M3 produced two compactions versus baseline's three, with bounded deferral; the two uncontaminated cost pairs gave **0.788×**. At pinned prices its favorable-cost branch cannot win: the experiment tests a two-turn delay, not demonstrated adaptive economic selection.

T5/103 baseline repeat 1 is terminal failed. T6/101/M3 has a successful paid retry, but its original failure's dollars are unknown; that designed cell is excluded only from cost pairing. Budget charge: **9,699,021 screen + 673,257 pilots = 10,372,278 tokens**, below 25M; this includes conservative unknown allowances and is not all measured usage. See [RESULTS-bcf.md](RESULTS-bcf.md), [ANALYSIS-bcf.md](ANALYSIS-bcf.md), [DECISIONS-bcf.md](DECISIONS-bcf.md), and [REPORT-bcf.md](/host/ops/goals/papers-r1/REPORT-bcf.md); raw evidence is `/host/work/papers-r1/bcbench-mini/runs/`.

**Author-task check, rw6:** tasks **12, 17, 20, 22, 28, 29**, Sol medium, scheduling seed 101; baseline versus M3. The reported final six pairs combine `bcf2`, `bcf2-smoke` and `bcf3`: **12/12 strict and runtime-clean**, baseline **$0.898**, M3 **$0.966**, **1.075×**, M3 costlier on 5/6 tasks. This reverses the synthetic saving and supplies no adoption case. These are selected completed-cell comparison costs; retain superseded failures and reruns when accounting for the whole campaign. Do not blindly concatenate the three summaries, which contain duplicate cells and earlier failures.

Exact selected totals are **$0.898202 / $0.9656988**. Reconstruct both arms of tasks 12/28 from `bcf3`, both arms of 17/20/22 from `bcf2`, and task 29 baseline from `bcf2-smoke`, M3 from `bcf2`; all are `s101-…-attempt1`. All selected records report **no natural compaction pressure**; manual boundaries bypass M3. Thus this checks flag-enabled behavior on these author tasks, not active automatic-gate efficacy.

Evidence: `/host/work/bc-mod-eval/iter/rw6/{bcf2,bcf2-smoke,bcf3}/runs/*/result.json`, the corresponding `summary.json`, and the final [RESUME [BCF] entry](/host/ops/goals/RESUME-papers-bcc-2026-10-03.md:187). No M1 rw6 comparison or joint/interference arm was run. M2 is inactive on unchanged rw6 because those tasks never call `goal.complete()`.

### [MOD]

| Workload / candidate | Quality and cost | Interpretation / evidence |
| --- | --- | --- |
| Synthetic v2, `0b624f0` | Perfect primary-metric parity; **0.857×**, confirmation **0.849×** USD | Positive cheap screen, with only 16/32 compactions handled by MOD; `iter/v2/{m3,m4}` |
| Synthetic v2, `56f4185` | Perfect parity; **0.408× / 0.393×** USD; 24/24 MOD compactions | Large gain on noise-heavy pasted messages; 8 KiB preview hid information on harder tasks; `iter/v2/{m5,m6}` |
| Hard set, `56f4185` | Same score as baseline, **0.713×** USD | Did not generalize to hard v2; `iter/hard/i5` |
| Hard v2, medium, szymon3 | A0 **30/40 interim, 5/8 final**; `0b624f0` **32/40, 6/8**, **0.79×** USD; RC **29/40, 4/8**, **0.80×** | Quality differences within observed **±3 points per eight runs**; no robust dominance; `iter/v2h/sz-a0…a5` |
| rw6 natural, A1 `861cf86` | Both **6/6 strict, clean, finished**; A0 **$1.330790**, A1 **$1.354536**, **1.018×** | Zero compactions; parity with overhead; `iter/rw6/mod-comparison/comparison.md` |
| rw6 40k-window variant, same A1 | Both **6/6 strict, clean, finished**; A0 **$1.322378**, A1 **$1.368611**, **1.035×** | One compaction per arm, task 17 only; `iter/rw6/mod-comparison-sw/comparison.md` |

All `iter/` paths above are under `/host/work/bc-mod-eval/`. [RESUME-papers-bcc-2026-10-03.md](/host/ops/goals/RESUME-papers-bcc-2026-10-03.md) supplies the MOD chronology and snapshots; [WRAPUP](/host/ops/goals/WRAPUP-papers-bcc-2026-10-03.md) supplies the 03.10 synthesis. Earlier host/default-effort/Max results are not controlled comparisons with later medium/Team/szymon3 results. No release of these iteration candidates was established by this work; the owner controls releases. MOD's small-benchmark savings do not demonstrate dominance on the author's tasks.

### [CORTEX/SBRAIN]

- **Cortex !141 merged to dev**, reported merge `2a06fc66`, successful dev pipeline. Adopted answer-run validity, complete nullable resource accounting/economic comparison, multipart facts/source-span scoring, source-family splits, whole-set header-edit comparison, populated fictional synthesis groups, and decimal percentages. Final reported suite: **466 pass; evaluation model tokens: 0**. [REPORT-cortex.md](/host/ops/goals/papers-r1/REPORT-cortex.md), [MR !141](https://gitlab.synerise.com/maciej.nowak/cortex/-/merge_requests/141). This is tooling and a deterministic retrieval fix, not evidence that a parts-audit prompt improves answers.
- **SBrain #210 merged to main**, reported merge `195d748e`: frozen golden/corpus refs; base-relative gateway health gate; dropped-link helper/count on routine churn; heldout tooling. **266 pass**, **116,260 model tokens / 120,000 ceiling** for four fictional Codex procedure dry runs. Counts were absent before and **0/1** after. These runs do not establish deployed Claude routine obedience or answer-quality improvement. [REPORT-sbrain.md](/host/ops/goals/papers-r1/REPORT-sbrain.md), [PR #210](https://github.com/nowakmaciek-hub/SBrain/pull/210).
- **SBrain #211 merged** (owner-supplied final status): ported only decimal-percentage evidence matching. Fictional frozen-reader comparison **9/10 → 10/10**, no losses; **267 pass**; port commit `2fca4171a59bad53c7c6c56eb0c0bb6362921e9b`. Cortex answer/cost tooling had no equivalent subsystem to port into a lexical evaluator. [REPORT-sbrain-port.md](/host/ops/goals/papers-r1/REPORT-sbrain-port.md), [PR #211](https://github.com/nowakmaciek-hub/SBrain/pull/211).
- **Still missing:** SBrain's owner-authored **12 holdout questions across ≥4 unused source families**, including changed facts and absence. An empty template and overlap checks are not a heldout result. Review rationale: [astra-cs/REVIEW.md](/host/ops/goals/papers-r1/astra-cs/REVIEW.md).

## Verdict per candidate M1–M21

“Rejected” means no adoption from round 1, not a universal negative paper result. “Deferred” needs the listed new evidence or workload before reopening. Mixed rows distinguish landed prerequisites from untested interventions.

| ID | Candidate | Verdict, reason, and reopening trigger |
| --- | --- | --- |
| M1 | Structured summary content | **Rejected for adoption:** synthetic USD 1.037×, no quality gain; no rw6 M1 evidence. Reopen only with measured baseline forgetting on realistic pivots and lower full priced cost at non-worse quality. |
| M2 | Host check before accepting done | **Deferred beyond synthetic use:** T5 gain is real, cost CI crosses 1; unchanged rw6 has no goal lifecycle. Reopen on tasks with observed premature completion and an explicit owner-configured check at the actual completion boundary. |
| M3 | Cost-gated compaction timing | **Rejected for adoption:** rw6 flag-enabled comparison 1.075× at strict/clean parity, with no natural pressure; synthetic quality non-loss absent. Reopen for long automatically compacting tasks or a new pricing/backend regime with a reachable economic branch. |
| M4 | Frozen procedure/skill packages | **Deferred:** no repeated-discovery headroom or fair package construction cost measured. Trigger: repeated dependency use in journals, frozen packages selected on dev, disjoint source-family evaluation; original swap-in estimate ≈5.3M tokens. |
| M5 | Frozen Builder guidance in refine planner | **Deferred:** task-family generation and dev-selected enacted guidance not established; paper control drift is substantial. Trigger: family-labelled tasks, frozen planner guidance and explicit construction/side-call costs; original estimate ≈8.2M. |
| M6 | Action selection | **Deferred:** extra verifier/sample compute and weak zero-shot transfer; no MOD seam. Trigger: observed action-selection errors plus a bounded proposal/verifier budget charged against a matched baseline. |
| M7 | Fresh executor per phase / read-only auditor | **Deferred:** reset benefit not isolated; production task-frame writer/read-only children missing. Trigger: real phase-boundary failures and a minimal usable state-transfer/read-only seam; evaluate reset and auditor separately. |
| M8 | Agent-written compaction | **Deferred, unimplemented:** bypasses M1's summarizer; paper comparison has reminder/edit-turn/rollback confounds. Trigger: long-task summary failures against a strong native baseline, identical reminders and charged editing turns; separate content, authorship and timing. |
| M9 | Refinement governance | **Existing MOD practices retained:** typed observations, rollback history, edit budget, auto-refine off; persistence screen remains PARTIAL. **Deferred:** completion of persistence evidence and upstream requests. Trigger: a concrete persistence/reload failure or renewed upstream authorization; do not claim new round-1 efficacy. |
| M10 | Relevance-ranked memory | **Deferred:** no observed kind exceeds six entries. Trigger: real per-kind cap pressure and demonstrated useful-entry eviction. |
| M11 | Action Fusion / ObservationPack | **Deferred:** REPL already edits and runs; no redundant-turn/output-cost headroom established. Trigger: journals showing many edit→run-only turns or expensive >6 KiB observations, with a concrete reduction to test. |
| M12 | Cortex parts audit | **Adopted:** multipart facts/source-span scoring prerequisite. **Deferred:** prompt intervention V-04. Trigger: current-model incomplete answers despite reachable evidence, functioning Codex adapter, then six multipart rows plus absence/restriction/owner/stale controls under the specified call/token limit. |
| M13 | Complete-cost economic comparator | **Adopted in Cortex:** missing cost/usage stays unknown; failed or incomplete run sets cannot PASS; explicit quality and efficiency decisions. No answer-cost subsystem was added to SBrain. |
| M14 | Whole-set header-edit replay | **Adopted in Cortex:** committed parent/candidate, frozen rows and one pinned reader expose displaced hits and negative regressions. SBrain already has equivalent whole-set comparison through M17. |
| M15 | Source-family splits | **Adopted in Cortex:** siblings stay together; explicit families supported. Header-derived heldout is still only a smoke floor. Trigger for stronger evidence: independently authored questions from unused families. |
| M16 | Populate synthesis groups | **Adopted for fictional Cortex template data:** existing group machinery populated; retrieval coverage is not composed-answer accuracy. Real brain-local groups need owner data/authorization; SBrain has no corresponding group architecture to populate. |
| M17 | Fixed golden ref / same scorer | **Adopted in SBrain:** independent corpus/golden refs, HEAD evaluation default and same-reader parent/candidate comparison. Reader changes require separate old/new reader selection. |
| M18 | Blocking base-relative gateway health | **Adopted in SBrain:** pinned base checked before PR; existing debt allowed, count increases blocked. Equal-count replacement of defects remains outside this count-based check. |
| M19 | Routine dropped-link count | **Adopted in SBrain:** gateway filter reused by routine helper; counts include zero, no extra inference. Deferred deployed-routine evidence reopens when an actual Claude churn run is available. |
| M20 | Untouched source-grouped heldout | **Adopted tooling; deferred dataset/results:** family/target overlap rejection and feedback-free heldout reporting landed. Trigger: owner supplies 12 questions across ≥4 unused families; connected ancestry must be declared. |
| M21 | SBrain parts-audit port | **Deferred, unimplemented:** lexical retrieval evaluation cannot measure answer completeness. Trigger: answer-level failures, required-fact/source labels and an answer evaluation path; do not port Cortex's prompt on retrieval scores alone. |

## What the benchmarks taught us

- **Admission must cover real native calls.** Dashboard recaps are billable side inference; compaction defaulted to websocket outside the HTTP admission path. The repair suppressed recaps uniformly, forced SSE and disabled websocket. Later rw6's **24 initial BCF attempts failed** because only `summary/compaction` was allowed: mid-turn compaction also emits **`summary/compaction-turn-prefix`**. Both are now admitted. Encrypted Responses `reasoning` replay is also a valid input, not an unsupported agent answer.
- **The byte-reservation cap is a budget bound, not usage.** Admission bounds text by serialized UTF-8 bytes plus framing, capped at native **872k context**, and reserves the full **128k output**; encrypted reasoning takes the full context allowance. Codex did not serialize the requested `maxTokens`, and split summaries can be concurrent. The 200k screen cell target was soft, not a provider-enforced output or exposure cap. Reuse the fixed harness, not a hand-written byte/token conversion or a smaller assumed output cap.
- **Unknown usage is neither zero nor a measured maximum.** Preserve nulls; charge the documented conservative allowance separately; include all attempts, side calls, summaries and retries. Missing original failure cost remains missing after a successful retry. Cache-read is a subset of total input in some providers and a separate field in the normalized fork accounting: use the adapter's reducer to avoid double counting.
- **Idle can precede accounting settlement.** `agent_end` was followed by automatic `compaction_start`; collecting immediately and cleaning up cancelled a live summary. BCF-63 waits for automatic compaction/native settlement before accounting or advancing. Daemon startup-only failures need separate handling from paid attempts; owned daemon/socket cleanup avoids late startup interfering with the next cell.
- **Observe completion at the boundary.** T5 originally misread Python `details.status="error"` as acceptance because `isError` was false. Correct interpretation recovered M2's rejection→repair→acceptance without a paid rerun. A mixed cell can complete and then mutate files; the benchmark uses separate completion-only calls. Native goal completion, correct files and stopping are separate observations.
- **Ceilings hide value.** T2's usable pilot was 38/39 with no early retention error; its waiver does not make it a calibrated forgetting test. MOD v2 was perfect, and rw6 was perfect for both arms. Under the author's rule, ceiling parity is acceptable only if cost improves; perfect quality alone is not dominance.
- **Eight runs still showed ±3-point measurement noise.** Hard-v2 32 vs 30 interim and 6 vs 5 final is a screen signal, not robust superiority. Three BCF seeds condition on fixed tasks; bootstrap precision cannot create new task coverage. Report inconclusive effects explicitly.
- **Claude Code's 1M window changed exposure.** Natural rw6 had zero compactions; even the 40k variant reached only 18–39k peak context and one compaction per arm. A compaction intervention cannot win through an unexercised path. Use larger unsimplified author tasks (suggested 6, 13, 27, 30) or a declared pressure variant when that is the mechanism of interest.
- **Synthetic noise rewarded hiding meaningful input.** The 8 KiB pending-message preview greatly reduced v2 cost but lost quality on hard v2. Preserve full current requests and exact one-shot tool outputs when those are required by the task; benchmark those dependencies directly.
- **Labels and metrics can flatter a harness.** Alternative pages are not required pages; citation coverage is not fact correctness; failed empty refusals and missing comparison rows cannot count as success. Frozen labels must be independent of edited corpus refs, and families must stay on one side of development/heldout splits.
- **Use the author's actual predicates.** [AUTHOR-METHOD.md](/host/work/bc-mod-eval/iter/AUTHOR-METHOD.md) asks for interim accuracy, final accuracy and finished, then lower API-priced cost. rw6's interim probes run the final judge on stage snapshots, not dedicated author interim tests. Strict, runtime-clean and their conjunction differ. The historical 30-task reference had terminal strict **90/90 vs 87/90**, strict-and-clean **89/90 vs 64/90**, and retries **2 vs 26**; whole USD remained unknown for **16/208 attempts**. These are historical harness results, not a paper-candidate result.

Repair evidence: [CHANGES-pilot-fix.md](/host/work/papers-r1/bcbench-mini/CHANGES-pilot-fix.md), BCF-52…65 in [DECISIONS-bcf.md](DECISIONS-bcf.md), [rw6/CHANGES.md](/host/work/bc-mod-eval/rw6/CHANGES.md), and the author's [REPORT.md](/host/work/papers-r1/bcf/benchmarks/python-realworld-30/REPORT.md).

## How to evaluate the next batch of papers

1. **Start from a new explicit hypothesis and workload gap.** Read this candidate table, the relevant cards and pinned seams; check whether the mechanism already exists. Check baseline quality headroom, natural compaction/goal activation, model/effort/transport, complete cost, Python/runtime and daemon readiness before a paid comparison. A plan-only command is available; one short adapter smoke establishes connectivity, not benchmark validity.
2. **Choose the existing harness by mechanism.** `bcbench-mini` T1–T4: retention/content, T5: premature completion gate, T6: automatic timing. Use `rw6` for realistic author pivots and source judges. Tasks 12/20/22/29 are unchanged; 17 reduces archival filler, 28 reduces raw applications 1,000→160. For Claude compaction, first establish pressure on larger unsimplified author tasks; use v2h Q1–Q4 for a cheap dependency-sensitive MOD screen. Cortex/SBrain deterministic reader changes use their frozen-row parent/candidate tools; prompt changes need answer-level evaluation.
3. **Separate interventions and environments.** One candidate at a time, fresh workspaces/homes, same task data, model, effort, tool policy and account class. Keep manual versus automatic compactions distinct. Retain all paid failures in campaign cost and show any replacement-cell comparison separately. Do not execute the archived `NEXT.md` screen command: it carries BCF-59's historical ceiling waiver.
4. **Minimum sampling for a decision:** at least **three independent paired runs per task** (e.g. 101/102/103), with independent baseline repeats for observed A/A noise; a one-seed rw6 result is a screen. Confirm a positive screen on a fresh batch, and expand runs/tasks when intervals still permit meaningful harm or savings disappear. This is restart guidance, not a claim that three seeds guarantee statistical power. The observed ±3 points per eight MOD runs remains a limit; a small gain inside it needs more data.
5. **Decision rule:** interim/final/finished must dominate, or match when both are perfect; full API-equivalent USD must improve. Show strict, clean, strict-and-clean, retries, activation and unknown-cost coverage alongside it. Use equal-task matched effects; wall time and compaction count are diagnostics. No factorial is justified by round-1 results; reopen interactions only after new single-factor evidence.

**Cost planning, historical rates/measurements, not current quotes:**

| Workload | Per-run basis | Planning implication |
| --- | --- | --- |
| mini T2 baseline pilot | **82,851 tokens, ≈$0.240**, two compactions, ≈386 seconds | One task only; original screen estimate 200k tokens/cell was a soft target |
| rw6 BCF | Selected six-task arm **≈$0.90–0.97**, mean **$0.15–0.16/cell** | README's conservative Sol estimate **$0.26–0.46/cell**, **$2.15/six-task arm**; two arms ≈$4.30 before retry |
| rw6 MOD | Measured **$1.32–1.37/six-task arm**, mean **$0.22–0.23/cell** | README estimate **$0.40–0.69/cell**, **$6.48/two arms**, plus pilot ≈$0.48; up to double for one retry/cell |
| MOD v2h | Calibration ≈**$1/run** | Eight runs/arm ≈$8; validate the revised task's actual headroom and meter first |
| Brain deterministic evaluation | **0 model tokens** | New prompt screens have separate costs; Astra's Cortex V-04 proposal was 24 sessions ×30k ≈720k, ceiling 900k, never run |

Pinned BCF standard USD/M rates were input **2**, output **10**, cache-read **0.10**, cache-write **2.50**. MOD's CC 2.1.288 Sonnet meter used **2 / 10 / 0.20 / 2.50** (5-minute write), **4** (1-hour write). Reprice a new batch against its actual model/rates; subscription cash charges are a different quantity. The old 30-task Sol reference used different model/rates.

**Commands for a future separately authorized batch** (new output directories; do not run now):

```bash
# Native mini: new root, one baseline pilot plan, no historical waiver or execute.
python3 /host/work/papers-r1/bcbench-mini/driver.py pilot \
  --root /host/work/papers-r1/bcbench-mini/next-batch \
  --fork /host/work/papers-r1/bcf \
  --auth /host/work/papers-r1/bcbench-mini/home/pilot-T2-101-baseline-3/auth.json \
  --cell T2 101 baseline 0 --timeout 900

# Local BCF: Python 3.12 under /tmp may need reinstall after a restart.
cd /host/work/bc-mod-eval
UV_CACHE_DIR=/tmp/rw6-uv-cache uv python install 3.12.15 --install-dir /tmp/rw6-python --no-bin
export PRIME_CONTEXT_BENCHMARK_PYTHON=/tmp/rw6-python/cpython-3.12.15-linux-aarch64-gnu/bin/python3.12
python3 rw6/run.py bcf --tasks 12,17,20,22,28,29 --arms baseline,M3 --seed 101 \
  --fork /host/work/papers-r1/bcf \
  --auth /host/work/papers-r1/bcbench-mini/home/pilot-T2-101-baseline-3/auth.json \
  --output iter/rw6/next-bcf-s101
# Review the plan; append --execute to run. Repeat in new dirs for seeds 102/103.
python3 rw6/compare.py iter/rw6/next-bcf-s101 --output iter/rw6/next-bcf-comparison

# MOD on szymon3: prepare and record the intended A1 plugin snapshot first.
bash iter/szymon3/remote.sh pilot rw6 iter/rw6/next-mod-pilot
bash iter/szymon3/remote.sh pull rw6 iter/rw6/next-mod-pilot
bash iter/szymon3/remote.sh vanilla rw6 iter/rw6/next-mod-a0
bash iter/szymon3/remote.sh mod rw6 iter/rw6/next-mod-a1
bash iter/szymon3/remote.sh pull rw6 iter/rw6/next-mod-a0
bash iter/szymon3/remote.sh pull rw6 iter/rw6/next-mod-a1
python3 rw6/compare.py iter/rw6/next-mod-a0 iter/rw6/next-mod-a1 --output iter/rw6/next-mod-comparison
```

The MOD remote wrapper's documented default is scheduling seed 101; configure additional independent runs explicitly rather than assuming these commands provide three seeds. `RW6_SMALL_WINDOW` was a benchmark-only variant, not plugin functionality. The szymon3 judges used `RW6_JUDGE_SANDBOX=0` because Bubblewrap namespaces were unavailable; disclose that difference from the hermetic author reference. See [rw6/README.md](/host/work/bc-mod-eval/rw6/README.md) for exact setup and adapter limitations. mini's command/settings history is [DESIGN-bcf.md](DESIGN-bcf.md) and [NEXT.md](/host/work/papers-r1/bcbench-mini/NEXT.md); a new mini batch needs its own plan, not the old calibration override.

For reader-only comparisons, use Cortex `scripts/compare-retrieval.mjs` with parent/candidate outputs from the same `--server`, or SBrain `scripts/eval-retrieval.mjs --corpus-ref <candidate> --compare-ref <parent> --golden-ref <fixed-label-ref>`; keep every frozen row. Exact project invocation is in their merged evaluation docs and reports. A heldout search must use owner-authored data and must not become repair feedback.

## Reproduce: pins and evidence paths

| Component | Branch / recorded revision | Path / evidence |
| --- | --- | --- |
| Study baseline | base-context **`65a1a411a49207d54ce97515325535e3ff25e2ce`**, Cortex `a2300eb`, SBrain `bf06378`, MOD `7617fbf` | `/host/work/research-2026-10-02/{SYNTHESIS.md,TARGETS.md,cards/}` |
| BCF repository | `nowakmaciek-hub/base-context`, **`exp/paper-candidates`**, experiment head **`f4d4f0f65a04de6f63b9959634b1febac4cd02a2`** | `/host/work/papers-r1/bcf`; [fork branch](https://github.com/nowakmaciek-hub/base-context/tree/exp/paper-candidates) |
| M1 implementation | **`73d8795210277dc3ee562166a980ae7334bf81ce`** | structured initial/update/turn-prefix summaries; `paperCandidates.structuredSummary` |
| M2/M3 integration | **`d452db9de73e4499d06b75239808d602b13635f0`** | `paperCandidates.completionGate`, `paperCandidates.costGatedCompaction`; all flags default off |
| Compaction timeout correction | **`f4d4f0f65a04de6f63b9959634b1febac4cd02a2`** | no daemon wire-shape change; fork source is preserved |
| mini harness | Not a git repository; local repairs matter | `/host/work/papers-r1/bcbench-mini/{driver.py,admission.mjs,tasks.py,analyze.py,CHANGES-pilot-fix.md,NEXT.md,runs/,home/}` |
| Goal reports and reviews | BCF-65 is final screen analysis; 05.10 decision closes follow-up | `/host/ops/goals/papers-r1/{GOAL,DESIGN,DECISIONS,RESULTS,ANALYSIS,REPORT}-bcf.md`; `astra-{cs,design,final}/` |
| Author-task adapter/results | Sol `gpt-6.1-sol`, medium; MOD CC **2.1.288**, `claude-sonnet-5-5`, medium | `/host/work/bc-mod-eval/rw6/{README.md,CHANGES.md,run.py,compare.py}`; `iter/rw6/{bcf2,bcf2-smoke,bcf3,mod-comparison,mod-comparison-sw}` |
| MOD candidate snapshots | `0b624f0`, `56f4185`, RC **`861cf86`** on `iter/bcc-rc` | `/host/work/bc-mod-eval/iter/{v2,v2h,hard,rw6/sz-a1/plugin}`; RESUME/WRAPUP reports above |
| Cortex implementation | `feat/papers-r1-eval`, final reviewed head `e1ae263`; !141 → dev `2a06fc66` | `/host/work/papers-r1/cortex`; `REPORT-cortex.md`; `c086bac` and `e1ae263` are review fixes |
| SBrain implementation | `35a629b`, `069c2e0`, `e49587e`, `b25a300`; #210 → main `195d748e` | `/host/work/papers-r1/sbrain`; `REPORT-sbrain.md` |
| SBrain percentage port | `feat/sbrain-port-papers-r1`, **`2fca4171a59bad53c7c6c56eb0c0bb6362921e9b`**, #211 | `REPORT-sbrain-port.md`; port baseline **`7dc48f78bb6fcb891ac7d8c34484f503d42b6627`** |
| Historical author benchmark | SDK **`84a7e6f30625247aa153ed8fdb0d40c4981c4632`** (Sol/Astra), **`077f463424f8eb94f07dc2c6325db0feaba363cd`** (DeepSeek); judge/runner **`86429a34362e3125679812e129c9fd5d6b6001d8`** | `bcf/benchmarks/python-realworld-30/{REPORT.md,REPRODUCE.md,results/}`; mixed historical reference, not a fresh paper-candidate campaign |

The archive documentation commit comes after the pinned experiment head and changes only these five reports. The fork carries the summary and report copies; raw runs, repaired harnesses, paper cards and MOD snapshots remain at the host paths above. Preserve those directories for a future agent. No repository archive API action is part of this delivery.
