# ANALYSIS — bcf

## Screen result (89/90 completed)

BCF-65, 2026-10-03, corrects BCF-64. The orchestrator's 47/90 stop report was wrong: the driver continued after the stop signal. This result uses **all 89 completed, eligible designed cells**, with no reconstructed cutoff. Retain **calibration overridden: quality ceiling-limited** (BCF-59). No model call, screen resume or rw6 run was made for this correction.

All **90 designed cells are represented** by **91 paid screen attempts**: 89 eligible completions and two retained failed attempts. All 72 primary cells are completed; 17 of 18 independent baseline repeats are completed. The only unavailable designed cell is `screen-T5-103-baseline-1`, terminal failed/ineligible under BCF-60. The original `screen-T6-101-M3-0` failed, but its separately recorded **paid retry has completed**, at 8/8; the older pending-retry statement is stale. Its failed attempt remains charged and its full designed-cell dollar cost remains unknown. There are no unrun primary cells and no pending paid retry in the saved results.

| Flag | Quality Δ [95% CI], 0–1 score | USD ratio [95% CI] | n pairs (quality / USD) | Verdict |
|---|---:|---:|---:|---|
| M1 | -0.001684 [-0.002525, +0.000000] | 1.037 [1.016, 1.059] | 18 / 18 | Higher USD; observed quality loss |
| M2 | +0.012821 [+0.012821, +0.012821] | 0.982 [0.948, 1.018] | 18 / 18 | Quality gain; USD inconclusive |
| M3 | -0.012626 [-0.037879, +0.000000] | 0.958 [0.921, 0.993] | 18 / 17 | Lower known USD; no quality non-loss verdict |

### Method and author criterion

Pair each flag's terminal eligible result with **baseline repeat 0 for the same task and seed**; use baseline repeat 1 only for A/A noise. Failed outcomes are not zero scores. Pilots and unpaid startup artifacts are excluded. A failed A/A repeat does not remove a valid direct treatment comparison.

Quality Δ is the mean of six within-task mean paired normalized-score differences. USD ratio is `exp(mean_task(mean_seed(log(USD_flag / USD_baseline))))`, with equal weights for all six fixed tasks; below 1 means lower cost. Price all main and summary usage with the pilot-pinned `driver.priced_cost`: `(2*input + 10*output + 0.10*cacheRead + 2.50*cacheWrite)/1,000,000`. These are historical priced usage estimates, not current price quotes or billing receipts. Costs include all paid attempts belonging to a designed cell. Unknown components and conservative token allowances are never substituted for measured dollars.

The 95% percentile CIs use **10,000 paired task/seed block resamples within each fixed task**, retaining each task's observed pair count and equal task weight; seeds 619, 620 and 621 for M1, M2 and M3. Quality uses all 18 pairs per flag. Dollar estimates use 18, 18 and 17 pairs respectively: T6/101/M3 is excluded only from dollars because its original failure has unknown spend. Resampling conditions on these six synthetic tasks and three observed seeds; it does not estimate new-task variation. M2's quality CI collapses because every observed within-task effect is constant.

Apply [AUTHOR-METHOD.md](/host/work/bc-mod-eval/iter/AUTHOR-METHOD.md): quality must not be worse (ceiling parity is acceptable), and priced USD must be lower. **No flag establishes both requirements.** A legacy “within noise” label does not establish non-loss, and equal below-ceiling scores do not establish ceiling parity. The synthetic normalized score is a proxy; it does not separately measure the author's interim accuracy, final accuracy and finished outcomes.

All flags have **18/18 direct quality pairs** across T1–T6 × seeds 101/102/103. M1 and M2 have **18/18 priced pairs**; M3 has **17/18**, missing only **T6/101** full-cost pairing. There are **17/18 A/A baseline pairs**, missing only **T5/103**. A/A-complete priced treatment blocks are M1 **17**, M2 **17**, M3 **16** (missing T5/103 for all flags, plus T6/101 for M3). The legacy analyzer's requirement for 18 complete baseline/repeat/treatment blocks still leaves its full A/A-adjusted aggregate unavailable; this does not invalidate the direct paired estimates above.

### Interpretation

M1's quality Δ is −0.1684 percentage points, with two T4 seeds at 65/66 against baseline 66/66 and no positive paired differences. Those same one-leaf drops occur in the T4 A/A repeats, so they do not identify causal harm; nevertheless they do not establish non-loss. Its USD ratio is 1.037 [1.016, 1.059], establishing higher priced cost on the completed screen.

M2 improves all three T5 seeds from 12/13 to 13/13, an overall +1.2821 percentage points, with no negative direct paired differences. The retained T5 observations show rejection of premature completion, repair and successful completion. All other task effects are zero, including below-ceiling T2 ties at 38/39. Its USD ratio 0.982 [0.948, 1.018] does not establish savings.

M3 has lower known paired USD, ratio 0.958 [0.921, 0.993], but observed quality Δ is −1.2626 percentage points, CI [−3.7879, 0]. T4/101 scored 51/66 versus baseline 66/66; its saved mechanism is inactive there because manual compaction bypasses M3. This isolated loss does not establish a timing mechanism cause, but prevents a quality non-loss conclusion. All other paired quality differences are zero. In active T6, all three seeds score 8/8, with two M3 compactions versus three baseline compactions, and observed two-turn deferral followed by automatic compaction. The two uncontaminated T6 dollar pairs (102/103) give ratio 0.788 [0.744, 0.834]. T6/101's completed retry alone costs $0.289976 versus $0.242271 baseline (1.197×), before its unknown failed-attempt spend; it must not enter a full-cost estimate. Under the pinned prices the favorable-cost branch remains unreachable, so the observed mechanism is bounded delay, not demonstrated adaptive economic selection.

### Recommendation for rw6 and interference

Recommend **M3 alone versus baseline first on rw6**, then **M1 alone** as a secondary test of structured summaries under real pivots. This is a next-experiment priority, not a screen winner: M3 has a known-cost saving signal and observed T6 automatic deferral; M1 may help retention on longer changing tasks but currently costs more and shows no quality gain. Report interim accuracy (0–5), final accuracy (0/1), finished, and priced USD separately. Preserve rw6's author tasks and compaction boundaries; manual compaction bypasses M3, so only observed automatic decisions test its mechanism. M1 also needs actual summary inference to activate.

**Do not prioritize M2 on unchanged rw6.** [rw6/README.md](/host/work/bc-mod-eval/rw6/README.md:127) states that these tasks never use `goal.complete()`. M2 is inactive by design; enabling it tests spillover, not the completion gate responsible for the synthetic T5 gain. Testing that mechanism would need a separately authorized goal-lifecycle protocol change.

For interference, prioritize **M1×M3** after their single-flag measurements: use baseline, M1, M3 and M1+M3 on identical tasks/seeds. Summary content/size and compaction timing can jointly change retention and future input cost. Estimate the interaction as `Y(M1+M3) - Y(M1) - Y(M3) + Y(baseline)` for each quality outcome, and the same contrast on log USD. **Defer M1×M2 and M2×M3 on unchanged rw6** because M2 is inactive. In a future protocol that activates M2, those pairs could expose lost completion constraints or extra repair turns crossing compaction thresholds. No joint arms were run, so interference is a hypothesis, not a measured result. No follow-up run is launched here.

### Completion and remaining limitations

The screen is effectively complete and closed under the recorded terminal-failure rule: all primary cells and all direct quality pairs are present. The sole missing completion is the terminal failed T5/103 A/A repeat; unknown T6/101/M3 original-failure cost leaves one dollar pair unavailable. These prevent a clean 90/90 or a full 18-block A/A-adjusted aggregate, not delivery of the requested paired verdicts. Record **GOAL: DONE** for delivery, with these explicit limitations. No screen resumption, replacement run or additional paid review is authorized. The saved final review assessed earlier reports; this correction was not model-reviewed.

Screen reported known usage is **7,699,021 tokens**: **7,523,640** from the 89 eligible completions plus **175,381** from the two failed attempts. Two unknown screen attempts retain 1,000,000-token allowances each, giving a **9,699,021-token screen budget charge**. Pilot known usage is **146,255**, with **673,257** charged. Aggregate known usage is **7,845,276** and conservative charge **10,372,278**, below the unchanged 25M total ceiling by **14,627,722**. Actual aggregate usage and dollar acquisition spend remain unavailable because the historical failed attempts have unknown usage. All failure charges are retained; budget envelopes are not measured costs.

## Historical analysis before the owner stop

The earlier state, stop rules and conditional synthetic factorial below are retained as historical records. BCF-65 above supersedes their screen counts, scheduling and candidate-selection status.

Current state (BCF-52–58): the harness is repaired and one T2 baseline pilot completed with 82,851 reported tokens. Conservative aggregate pilot charge is 673,257; the 18,866,073-token screen forecast fits 25M but D-08/BCF-38 calibration blocks launch because every early recall leaf was correct and all four pilot slots are used. No empirical candidate verdict exists. See [current RESULTS](RESULTS-bcf.md) and [REPORT](REPORT-bcf.md). The stopped-experiment analysis below records the earlier BCF-41/42 state; its spend and scheduling statements are historical.


Status: two paid T2 baseline pilots failed; neither is eligible. Four main receipts report 42,248 known tokens, but two cancelled websocket attempts have unknown usage. Measured pilot spend and aggregate budget charge remain unavailable. No compaction completed, no final task answer exists, and all 90 screen cells remain unrun. BCF-41/42 permanently stop further benchmark scheduling. Candidate effects and cost per quality point remain unavailable. The conditional factorial is unexecuted and unauthorized.

## 1. Actual pilot evidence and the final stop decision

M1 `structuredSummary`, M2 `completionGate`, and M3 `costGatedCompaction` are independent default-off `paperCandidates` settings. Fork delivery head is `31d173ec04774ba9cc9d2957ea244c9adb379b87` (test-only correction after implementation/build at `d452db9de73e4499d06b75239808d602b13635f0`) on `nowakmaciek-hub/base-context:exp/paper-candidates`. M8 is deferred. Passing implementation checks is not model-quality or cost evidence.

### First paid baseline: unrelated dashboard generation

The first paid pilot, T2/101/baseline repeat 0, failed after two completed scripted prompts. Both returned `ACK`; the first forced compaction and late query were never reached. Its result is ineligible, with `score: null`, zero compactions, and no measured compression. The checker's internal `scoring.score: 0.0` reflects no final task answer; it is not an eligible zero-quality measurement. This is not a dead login: two completed main calls have nonzero usage.

The earlier empty directory was archived as an unpaid startup orphan under BCF-32. The separate archived repeat-1 startup failure likewise has no RPC response, native session entries, admitted attempt, or model usage. These startup failures are not paid slots, dead logins, or eligible quality results. They are distinct from both paid directories below.

Paid repeat-0 evidence lives in `/host/work/papers-r1/bcbench-mini/runs/pilot-T2-101-baseline-0/`:

| Physical attempt | Native evidence location (zero-based JSON pointer) | Identity and outcome | Reported tokens |
|---|---|---|---:|
| `5f2be6e5-05c7-4657-ae26-ae9227e95e9e` | `native-session.json#/7/request` admission; `#/8/request/receipt` settlement | Main, HTTP, completed; actual gpt-6.1-sol / medium | 7,466 |
| `15461985-eb2a-4694-9fe7-7af33db83491` | `native-session.json#/11/request` admission; `#/13/request/receipt` settlement | Main, HTTP, completed; actual gpt-6.1-sol / medium | 13,662 |
| `f1569af3-b868-46fd-98fa-00a62b3ce9bf` | `native-session.json#/12/request` admission; `#/15/request/receipt` settlement | Native-control / daemon-status, websocket, cancelled; effort absent, response model and effective effort unavailable | Unknown |

The two main receipts establish 21,128 known tokens: 21,118 input, 10 output, and zero reported cacheRead/cacheWrite on those calls. These are known-call subtotals, not the whole run's breakdown. The daemon-status receipt has `sentAt=1791024199193`, a first event, outcome `cancelled`, `usageCompleteness: none`, and empty usage. It is an actual generation attempt, not an unpaid state query. Cancellation does not imply zero usage.

The native journal records all three admissions, but `admissions.jsonl` has only two pre-fetch reservation records for the HTTP main attempts: 157,207 and 177,391 tokens. The daemon-status websocket generation bypassed the SSE preload admission path. Its descriptor and receipt omit effort, so the required medium-thinking identity contract is also broken. A configured model-state response does not repair either failure. The driver's `peak_reservation: 177391` does not bound all paid exposure.

During execution the driver detected the side attempt as unsettled and stopped. It later settled as cancelled without usage. Physical settlement is complete while accounting is incomplete. Keep `result.json` and `accounting.json` whole-run totals and breakdowns null. Their `known_total: 21128` is not measured total usage.

### Second paid baseline: compaction itself bypassed admission

BCF-35/36 permanently charged the single historical unknown and allowed only the remaining original pilot slots after uniform dashboard-generation suppression. The resumed T2/101/baseline repeat 1 consumed the second paid slot. It again completed two `ACK` prompts, then issued the first forced `compact`. `rpc.jsonl` event 25 records `compaction_start` with `reason: manual`; event 26 is the unsuccessful compact response after a 30,000ms daemon-response timeout. No committed compaction, second compaction, or late task query exists.

Paid repeat-1 evidence lives in `/host/work/papers-r1/bcbench-mini/runs/pilot-T2-101-baseline-1/`:

| Physical attempt | Native evidence location (zero-based JSON pointer) | Identity and outcome | Reported tokens |
|---|---|---|---:|
| `2abb4cca-e553-490a-b87a-8f09391e80e5` | `native-session.json#/7/request` admission; `#/8/request/receipt` settlement | Main, HTTP, completed; actual gpt-6.1-sol / medium | 7,465 |
| `db27b382-01c7-4b5c-bf9a-c50a18e4efb4` | `native-session.json#/11/request` admission; `#/12/request/receipt` settlement | Main, HTTP, completed; actual gpt-6.1-sol / medium | 13,655 |
| `b73a4812-ea0b-4170-ae8a-61e44e50172f` | `native-session.json#/14/request` admission; `#/15/request/receipt` settlement | Summary / compaction, websocket, cancelled; actual gpt-6.1-sol / medium verified, but usage unavailable | Unknown |

The main receipts report 21,120 known tokens: 13,814 input, 10 output, 7,296 cacheRead, and zero cacheWrite. The second receipt's `inputTotal: 13650` already includes its 7,296 cache reads; adding cache reads to inputTotal would double count them. The summary receipt has provider response ID `resp_0bb6c9feac29af5a016ac0ec9bb6a087d2b1f65d73197dba63`, `sentAt=1791028379364`, `firstContentAt=1791028384939`, `outcome: cancelled`, `usageCompleteness: none`, and empty usage. It establishes real summary generation and verified response identity, not a completed or free summary.

Repeat 1 contains no native-control/daemon-status attempt. Dashboard suppression removed that caller in this observed run, but did not cover the separate compaction path. Its `admissions.jsonl` again has only the two HTTP main reservations, 157,207 and 177,391; there is no pre-fetch reservation for the websocket summary. `peak_reservation: 177391` remains a main-call observation, not a bound on summary exposure. The daemon log records shutdown during compact and subsequent `Compaction cancelled`; it does not establish a provider-side cause for the earlier timeout.

Repeat 1 has `score: null`, `compactions: 0`, `summary_compression: false`, and retention evidence `valid_object: false, mismatches: []`. With no late answer, the empty mismatch list cannot mean successful recall. Calibration is unavailable: neither ceiling performance nor forgetting was observed. Its 117.555 seconds measure a failed run, not an M1/M3 cost effect. `accounting.json` has three settled attempts, no unsettled IDs, and the new unknown-total issue. Whole-run usage and budget charge remain null.

### Spend, exposure, and authority are different quantities

| Quantity | Current evidence | Interpretation |
|---|---:|---|
| Known repeat-0 main usage | 21,128 tokens | Measured subtotal only |
| Known repeat-1 main usage | 21,120 tokens | Measured subtotal only, including cache reads |
| Known pilot usage across four main receipts | 42,248 tokens | Measured lower subtotal, not whole-pilot spend |
| Measured whole-pilot total and breakdowns | Unavailable | Both unknown attempts remain included |
| Historical repeat-0 unknown allowance | 1,000,000 tokens | BCF-34/35 bound: 872,000 context + 128,000 output |
| Historical repeat-0 budget charge | 1,021,128 tokens | Permanent old charge; not measured usage |
| New summary full-model-max exposure reference | 1,000,000 tokens | Catalogue-max bound only; not an authorized new charge |
| Combined full-max exposure reference | 2,042,248 tokens | Known 42,248 plus both 1M bounds; not measured spend |
| Aggregate pilot budget charge | Unavailable | BCF-35's exception does not cover the new unknown |
| Screen spend | 0 tokens | No screen cell ran |

The known receipts together report 34,932 input, 20 output, 7,296 cacheRead, and zero cacheWrite. Do not present those as complete pilot breakdowns. The combined full-max reference is above the 2M pilot ceiling. Actual pilot spend might be lower, but is unknown; neither ceiling compliance nor an actual overspend is established. Outstanding/upper-bound exposure, authorized budget charge, and reported consumption must not be substituted for one another.

BCF-41/42 stop all further paid benchmark scheduling. Do not retry this paid cell, expand the historical exception, add pilots, or launch the 90-cell screen. Two paid slots were consumed; two remain unrun, not newly authorized. The historical allowance does not repair repeat 0's eligibility, and the verified medium identity of repeat 1's summary does not repair its missing usage or admission coverage. Neither pilot enters a baseline/M1 effect, A/A floor, or outcome estimate. All 90 screen cells remain unrun.

| Candidate | Empirical helped/hurt/no-effect conclusion | Mechanism exposure in this experiment | Recommendation |
|---|---|---|---|
| M1 | Not estimable | No M1 treatment; baseline summary generation started but no compaction committed | No empirical recommendation |
| M2 | Not estimable | No T5 or completion attempt | No empirical recommendation |
| M3 | Not estimable | No T6 or automatic-threshold diagnostic; the attempted compaction was manual | No empirical recommendation |
| M8 | Not evaluated | Not implemented | Exclude from this follow-up |

The failures concern two distinct native caller paths and incomplete accounting, not candidate benefit or harm. Only baseline inference ran; no candidate-specific transition was observed. [DESIGN-bcf.md](DESIGN-bcf.md) and [DECISIONS-bcf.md](DECISIONS-bcf.md) govern the methods and final stop decision. Startup/bootstrap successes establish an unpaid interface result only; they did not establish admission coverage for later paid summaries.

## 2. What each intervention can and cannot establish

### M1: summary content, not a new memory system

M1 appends instructions to initial, update, and split turn-prefix native summaries. It asks for ruled-out approaches and reasons, evidence/source links, constraints/preferences, and completed versus remaining work. It does not change summary authorship, the inference model, thinking, reserve, recent-tail length, training, or an outer-loop optimizer. The same summarizer can still omit details, misassign a source, fabricate a detail, or spend more tokens on section labels than on useful facts.

The intended chain is: the enabled prompt changes a committed summary; the summary preserves an otherwise lost fact or relation; the later answer uses that retained information correctly. The opposing chain is also plausible: more requested fields enlarge summaries or displace other useful facts, which raises downstream input cost or causes different errors. More headings alone are not evidence of either chain.

T1 probes exact record values and source IDs. T2 is the strongest ruled-out-approach probe: 96 random reason/source records, 16 late probes, literal policy, and an attractive rejected plan. T3 distinguishes approved source/value links from conflicting drafts. T4 distinguishes completed work from remaining ordered full records and dependencies. Their two forced compactions expose information loss, not M3 timing. Random strings test exact retention; they are not a measure of general reasoning or the semantic value of a summary.

A lost item after the second compaction can reflect initial omission, update omission, or retrieval failure despite intact summary content. These explanations require different trace conclusions. If both arms reach the ceiling, no quality benefit is identifiable on that fixture. If both fail near the floor, compression may have exceeded the usable representation; that is not evidence that the structured request has no value elsewhere. The T2 baseline pilot must show both a retention error and actual summary compression before the screen is treated as calibrated (D-08).

AREX's 59.6→71.4 reported ACU result is not an effect size for this prompt-only intervention. The source study includes training/outer-loop changes that this fork does not implement.

### M2: terminal acceptance and repair, not calibrated confidence

M2 runs an owner-configured host command before recording goal completion. A nonzero exit, timeout, or missing command rejects completion without recording the complete transition. A successful command retains the ordinary completion transition. The intervention checks the configured condition; it does not prove that the command covers the real user's full goal. It does not repair files by itself.

T5 deliberately induces a premature attempt: update only `app.json`, then call `await goal.complete()` in a separate completion-only cell. Both files must match `migration-plan.json`. The legacy shortcut is explicitly untrusted. The intended treatment chain is command rejection while `manifest.json` is wrong, an active goal after rejection, repair in a later cell, and successful completion only after both files are correct. Extra correction requests, checker execution, and longer wall time are part of the treatment cost. The error also gives actionable missing-work feedback, so a benefit would be attributable to this gate-and-feedback workflow, not to an unseen confidence estimate.

The checker uses 12 file leaves plus one terminal-completion point. An accepted premature completion permanently disqualifies that terminal point, even if later edits fix the files. Thus complete files after a premature acceptance can score 12/13, not full marks. Updating only one file yields six correct file leaves, not a valid completion. Report file correctness and premature acceptance separately: the scalar score can hide a consequential terminal error.

All arms need the same observations immediately after each completion cell. A final `{"status":"done"}` is not evidence that the host accepted completion or that files were correct at acceptance. Rejection without later repair establishes gate activation but not a quality gain. Success on the scripted probe does not estimate the natural frequency of premature completion. LongHorizon's bundled 69.7→77.2 result cannot be transferred to this isolated host check.

### M3: bounded timing delay, not observed economic optimization

M3 acts only after the native automatic threshold says compaction is needed. Its two-request heuristic estimates:

```
summaryCost = (contextTokens * summaryInputPrice
               + floor(0.8 * reserveTokens) * summaryOutputPrice) / 1e6
savings = 2 * max(0, contextTokens
                  - (fixedContextTokens + keepRecentTokens
                     + floor(0.8 * reserveTokens))) * mainCacheReadPrice / 1e6
```

It compacts when estimated savings cover estimated summary cost, when the two distinct-turn deferrals have been used, or when the context safety boundary requires it. Manual, requested, and overflow compaction bypass this gate. Unknown prices retain ordinary threshold behavior. The estimates make no extra inference request and are not measured savings.

The saved native model prices are input $2/M, output $10/M, cacheRead $0.10/M, and cacheWrite $2.50/M. With the same pinned main/summary model, savings are at most $0.20/M times context tokens, while the input part of summary cost alone is $2/M times context tokens. The favorable-cost branch is unreachable for this pinned benchmark's ordinary positive context sizes (D-09). T6 therefore tests a bounded two-deferral schedule, not adaptive selection between economic regimes. A favorable-cost unit test does not change that empirical limitation.

Delaying can avoid a summary near task end, but it can also carry a larger context through more requests, enlarge the eventual summary input, worsen retention, or shift overflow behavior. No direction is established in advance. T6 uses eight fixed padding turns, `targetTokens=16000`, `reserveTokens=8192`, `keepRecentTokens=1024`, and eight late anchor probes. Both arms must actually compact automatically. T1–T5's forced compactions cannot support a causal M3 timing claim. Any spillover effect there needs an observed automatic-threshold event, not just a flag setting.

SoL-Pi's add-one cost changes (−30.2% on Sol and −11.7% on Opus 5) accompany different backend quality changes (−2.84 and +4.40). These are motivation for measuring a tradeoff, not predicted effects here. The two-turn cap bounds delay, not realized dollars or tokens.

### M8 and cross-study limits

M8 would change summary authorship and side-call use, unlike M1's instruction change or M3's timing change. It is unimplemented, excluded from the screen, and excluded from this factorial. CLM's reminders, edits, and rollback confounds do not isolate an agent-written-summary effect. No result from the current arms supports an M8 recommendation.

This is a six-task synthetic screen on one provider/model/thinking combination. It does not establish production benefit, independence of mechanisms, or transfer to another model, context budget, cache policy, or workload. Passing implementation tests does not fill any of those evidence gaps.

## 3. Trace evidence needed for an actual mechanism conclusion

Cite task/seed, paired run IDs, eligibility, and exact artifact locations. Use existing `result.json`, `accounting.json`, `native-session.json`, `answers.json`, and `rpc.jsonl`; T5 also uses `tool-observations.jsonl`. `admissions.jsonl` records reservations, not spend. Do not add a paid grader.

Every paid attempt needs a native descriptor and receipt verifying openai-codex / gpt-6.1-sol / medium. Missing settlement, identity, or required compaction blocks pairing. `get_state` alone is insufficient. Keep failed runs visible, quality unavailable, and unknown breakdowns null.

| Mechanism | Trace chain to inspect | What does not establish the mechanism |
|---|---|---|
| M1 | Enabled summary request; each committed summary across both compactions; preservation or loss of specific scored facts/reasons/sources; the corresponding late answer leaves in the paired baseline and M1 runs | A label count, final score alone, or an unchanged recent tail that still contains the answer |
| M2 | Completion-only cell; accepted/rejected tool result; both file snapshots at that attempt; goal state; later repair cell and accepted completion with correct files | Final files alone, a done message, or any rejection not tied to the configured checker and goal transition |
| M3 | Native `customType=paper_cost_gate` diagnostic inputs/actions; distinct defer decisions; subsequent automatic compaction entry; main/summary attempt timing and usage; anchor correctness | A lower total alone, forced compaction, or the driver's generic observed marker without checking the action sequence |

Driver markers are coarse: M1 checks four headings, M3 detects defer then compaction, and `summary_compression` compares summary output usage with pre-compaction context. Inspect actual retained content, diagnostic actions, checkpoints, and tails before attributing a mechanism.

For each scored error, distinguish first-summary omission, update loss, retrieval failure despite intact content, source swap, and constraint/state error. Cite matching successful leaves too. Report activation, quality, tokens, wall time, and the supported explanation separately; say when traces cannot distinguish causes.

Reserved evidence fields for eligible calibration/screen records (currently unavailable; these fields do not authorize another launch):

- **T2 baseline retention/compression:** name exact wrong or missing retained-fact paths, not just `score < 1`. A wrong `selected` answer alone is not a retention error. Separate the 32 reason/source leaves, five policy leaves, and two decision leaves. Confirm actual compression at committed checkpoints and inspect the recent tail. Both actual pilots lack the required checkpoints and final answer, so there are no scored retention-error paths to insert.
- **T2 M1:** compare the same leaves through both summaries and the final answer. Section headings are only an output-format proxy. Any pilot contrast is descriptive calibration, not a screen estimate or A/A floor. No M1 record exists.
- **T6 M3:** cite distinct `defer` diagnostics and the later automatic compaction; identify cap/safety versus economic activation. Report all eight anchor leaves and total side-call-inclusive tokens. The BCF-35 remaining-slot plan omitted a T6 baseline pilot; the frozen screen still requires baseline pairing for each of three seeds. Neither T6 treatment nor its screen baseline ran.
- **Screen T5:** report correct file leaves, premature accepted completion, host rejection, subsequent repair, and final goal status separately. A 12/13 score can still hide premature completion. No T5 record exists.

Actual trace conclusions and limits:

- T2/101 baseline repeat 0: two main receipts and two ACK answers are present. No forced compaction or final probe answer exists, so compression and retention calibration did not occur.
- Native-control/daemon-status in repeat 0: the admitted and cancelled-settled websocket attempt has a sent timestamp but unknown usage and missing effort. Native evidence disproves complete coverage by the pre-fetch admission and medium-identity contract. Keep it in accounting, not filtered out as unpaid.
- T2/101 baseline repeat 1: two main receipts and two ACK answers are present. Manual compaction started but its summary was cancelled after the daemon-response timeout, without a committed checkpoint or usage. Response model/effort are verified here, unlike the earlier dashboard attempt. The missing SSE reservation demonstrates a separate summary-admission failure. No final task object exists; `valid_object: false` and an empty retention mismatch list do not establish recall or forgetting.
- Both T2 pilots: no eligible score, measured compression, or baseline/M1 comparison. They are not ceiling or floor observations. M1 was not run; two failed baseline sessions do not supply the screen's same-instance A/A floor.
- T6 baseline/M3: neither cell ran. No timing, deferral, or automatic compaction effect is observed. The manual repeat-1 compaction attempt bypasses M3 and cannot substitute for T6.
- T5 and all screen A/A/treatment cells: unrun. No premature-acceptance rate, repair effect, A/A floor, or quality/cost verdict is available.

## 4. Outcome and cost-per-point method

Cost per quality point, incremental ratios, paired differences, wall-time effects, and bootstrap verdicts are unavailable. Both paid runs have null score and total. Neither the 42,248-token known subtotal, the old 1,021,128 charge, nor the 2,042,248 full-max exposure envelope is a complete measured cost/quality pair. The 27.826- and 117.555-second failures are not between-arm effects. No paid M1/M2/M3 run exists.

The frozen screen is six tasks × seeds 101, 102, 103 × baseline/M1/M2/M3, plus a separate baseline repeat in every task/seed: 72 primary cells + 18 A/A cells = 90 cells. Pilot cells do not enter outcome estimates. Pair each flag with baseline repeat 0 for the same task/seed; repeat 1 estimates independent same-instance A/A noise.

Scoring compares exact expected JSON leaves, including type. Required leaf counts are T1 48, T2 39, T3 20, T4 66, T5 13 including terminal completion, and T6 8. Extra JSON leaves do not create quality points. Each task score is normalized to [0,1]. Aggregate quality weights tasks equally, not leaves equally; T2's 32 reason/source leaves nevertheless dominate that task's own score. Report the plan-selection/policy errors separately from its recall errors. T4's list positions make ordering part of correctness.

For eligible primary runs, let `q_tsa` be normalized quality and `N_tsa` the settled total tokens. Budget/cost accounting uses each physical receipt's reported total or `inputTotal + output`, counting cache reads, summary calls, known-use failed attempts, and retries once each. Never construct a total by turning unavailable fields into zero. Report input, output, cacheRead, cacheWrite, total, wall seconds, and compaction count separately.

For a complete common set of 18 primary task/seed instances:

```
qualityPoints_a = sum(q_tsa)
tokensPerQualityPoint_a = sum(N_tsa) / qualityPoints_a
incrementalTokensPerPoint_a = sum(N_tsa - N_ts0) / sum(q_tsa - q_ts0)
```

The first ratio is tokens per accumulated normalized quality point, not tokens per percentage point of average quality and not tokens per correct raw leaf. Zero accumulated quality has no finite ratio. Compute the incremental ratio only when the summed paired quality gain is positive. A negative numerator then means token savings while gaining quality. If quality is unchanged or lower, describe the two changes separately rather than dividing by zero or presenting a misleading negative-quality ratio. Small or uncertain positive denominators make incremental ratios unstable; report the quality/cost intervals beside any point estimate, not a stand-alone efficiency ranking.

Use identical eligible coverage for arm comparisons. Descriptive partial-arm ratios from `analyze.py` are not comparable across different tasks/seeds. Its aggregate effect needs all 18 valid baseline/repeat/treatment blocks. Label partial task estimates with paired n and incomplete status.

Pilots and A/A repeats add acquisition cost, not primary-arm quality points. Report their costs separately and include them in phase spend. Unknown attempts keep measured spend unavailable. Cost uses tokens; M3 dollar prices are heuristic inputs, not cash charges.

Follow the prepared estimator: 10,000 paired seed-block bootstrap draws within each fixed task, preserving the same instance's arms and independent baseline repeat. Quality differences use the normalized score scale. Cost differences use `log(N_a/N_0)`. The A/A floor is the mean absolute repeat-minus-baseline difference, or absolute log token ratio for cost. Recompute thresholds in every draw:

```
qualityThreshold = max(A/A quality floor, 0.05)
costThreshold = max(A/A log-cost floor, log(1.10))
```

Classify better/worse only when the threshold-adjusted interval crosses the corresponding practical boundary. A contained interval supports within-noise; a wide interval is inconclusive. Three seeds per fixed task give limited uncertainty information. Bootstrap draws are not new observations or evidence of production transfer. Current eligible coverage supplies no numeric paired ratio or verdict.

The current `analyze.py` reports arm-level tokens per quality point, but not the incremental ratio above or ceiling/floor task labels. Those remain required analysis outputs after eligible common coverage exists. Its arm ratios can use different partial coverage; do not rank them without reporting coverage and using a common paired set.

## 5. Candidate recommendation for the follow-up

No flag is empirically recommended. Selection is unavailable, not a negative result against M1/M2/M3. The eligible candidate pool for a future study is M1/M2/M3 only; M8 is excluded. The two ineligible baseline pilots cannot select any member of that pool.

The design's conditional selection rule remains: retain only flags with trace-supported activation and a quality/cost outcome worth retaining in a settled, calibrated screen. If none qualify, do not run an interference experiment. A future selection statement must expose target-task benefit, spillover harm, costs, and uncertainty. Favorable tests or borrowed paper effects do not qualify a flag.

BCF-35/36 allowed only remaining-slot calibration for the original screen, not an extra experiment. BCF-41/42 now stop all further benchmark scheduling because the new unknown compaction attempt is outside the historical exception. The factorial below remains a proposed plan only; it needs usable screen evidence, candidate selection, and separate authorization. It is not a recommendation to launch now.

## 6. Exact conditional factorial plan — unexecuted and unauthorized

### Cells and execution order

Use a full `2^k` factorial for the retained flags, `1 <= k <= 3`, on the same six frozen tasks and seeds 101/102/103. Nonselected flags remain false. Keep openai-codex / gpt-6.1-sol / medium for main and summary inference, identical reserve/recent-tail settings, and the same T6 target. Use the T5 owner-configured command whenever M2 is enabled, not in other masks. Do not add M8 or silently harden tasks between comparisons.

For all three candidates, bit order is M1, M2, M3:

| Mask | Enabled flags |
|---|---|
| 000 | None (baseline) |
| 100 | M1 |
| 010 | M2 |
| 001 | M3 |
| 110 | M1 + M2 |
| 101 | M1 + M3 |
| 011 | M2 + M3 |
| 111 | M1 + M2 + M3 |

If two flags qualify, project this table onto their two bits, yielding four distinct masks. If one qualifies, use off/on only; this has no between-flag interaction to estimate. Run all `6 * 3 * 2^k` core cells as fresh sessions, not reused single-factor observations. Add one fresh independent 000 repeat in each of the 18 task/seed blocks to estimate contemporary A/A noise. This adds no treatment level. Core counts are 36, 72, or 144; total counts including these repeats are 54, 90, or 162.

Create the 18 `(task, seed)` blocks in task order T1–T6 and seed order 101,102,103. Initialize `random.Random(619)`, shuffle the block list, then for each block shuffle its complete mask list plus a distinct baseline-repeat marker with that same generator. Run the resulting cells sequentially. Every cell gets a fresh cwd, home, and session; repeat 0 and repeat 1 are different sessions. This preserves complete pairing while varying within-block arm order. Keep uniform native admission/accounting rules for every mask and side call. The current driver implements single-factor arms only; combination-setting support is a future implementation step, not work completed here.

### Contrasts, uncertainty, and interference

For each eligible task/seed block, let `Y_mask` be normalized quality. With two flags A/B, estimate:

```
I_AB = Y_AB - Y_A - Y_B + Y_0
```

With three flags, average each two-way contrast over the third flag's two levels. For example:

```
I_AB_at_C0 = Y_AB - Y_A - Y_B + Y_0
I_AB_at_C1 = Y_ABC - Y_AC - Y_BC + Y_C
I_AB = (I_AB_at_C0 + I_AB_at_C1) / 2
I_ABC = Y_ABC - Y_AB - Y_AC - Y_BC + Y_A + Y_B + Y_C - Y_0
```

Apply the same contrasts to `log(N_mask)` for cost. A positive cost interaction means more tokens than the multiplicative no-interaction comparison. For two flags, `exp(I_AB_cost) = N_AB * N_0 / (N_A * N_B)`. Report all pairwise contrasts and, for k=3, the three-way contrast. Report each task separately and the equal-task mean; do not pool raw leaves. Estimate factorial main effects by averaging each on-minus-off difference over all settings of the other retained flags, rather than reusing the earlier single-factor effect as a factorial main effect.

Bootstrap 10,000 paired seed-block resamples within each fixed task, retaining every mask and its baseline repeat in each sampled block. Use seed 619 and 95% percentile intervals. Recompute the same-instance A/A floors and thresholds within each draw. Harmful quality interference requires the upper bound of `I_quality + max(A/A floor, 0.05)` to be below zero. Cost interference requires the lower bound of `I_logCost - max(A/A log-cost floor, log(1.10))` to exceed zero. Report wider or noncrossing intervals as uncertain or compatible with additive effects, not proof of independence. Interactions are exploratory, especially after selecting flags on the screen.

A scalar interaction needs evidence that the joint arm exposed both mechanisms. M1×M3 has a direct joint opportunity in automatic T6 summaries. M2 acts in T5 after a forced compaction, while T1–T4 have no goal lifecycle and T6 has no completion gate. The scripts therefore offer limited joint timing/completion exposure. Even a precise null M2×M3 contrast on these tasks cannot establish that the mechanisms are independent during a long real goal. Do not change the workload to manufacture exposure inside this planned comparison; describe this limit explicitly.

### Token estimate and launch boundary

All empirical follow-up token estimates are unavailable. Both paid pilots are ineligible, have unknown whole-run totals, never completed compaction, and have no final quality score. Their 42,248-token known subtotal is not a representative per-cell cost. The historical 1,021,128 conservative charge and combined 2,042,248 full-max exposure envelope are not measured rates to multiply by factorial cells. Aggregate budget charge is null because the second unknown has no authorized charge. No eligible pilot/screen maximum or measured joint-arm cost exists.

| Retained flags k, conditional on future selection | Core cells | Added A/A cells | Total cells | Empirical total-token estimate |
|---:|---:|---:|---:|---|
| 1 | 36 | 18 | 54 | Unavailable |
| 2 | 72 | 18 | 90 | Unavailable |
| 3 | 144 | 18 | 162 | Unavailable |

The prior 200,000-token soft cell target remains only an unvalidated planning assumption. It is not a provider-enforced maximum, an observed average, or an empirical estimate for this follow-up. No selected k or follow-up ceiling is authorized.

After separately authorized usable calibration exists, let `U_ref` be the maximum settled total-token use among eligible pilot and screen primary/A/A cells, including every native paid side call, summary, retry, and cache read. The reference method is `6 * 3 * (2^k + 1) * U_ref`, with concurrent admission headroom reported separately. Also show per-task/arm costs. Combination costs remain unobserved until measured; this method is a reference estimate, not an upper bound or a claim of additive savings. Neither failed run can populate `U_ref` or valid admission headroom for all callers.

The native output maximum is 128k and context maximum 872k; the requested summary cap is not enforced by Codex. Outstanding reservations are not spent tokens. Unknown usage without an explicit full native-max charge blocks scheduling even after cancellation settles. BCF-35's exception covers only the original dashboard attempt, not the later summary or this factorial. BCF-41/42 stop further scheduling; do not expand that exception. Future separately authorized execution would need uniform coverage of every paid caller. The two paid traces show that suppressing dashboard generation did not cover native compaction's websocket path, and neither unknown receipt may be removed from accounting.

The existing pilot ceiling is 2M and single-factor screen ceiling is 25M. This analysis grants no follow-up budget, changes no harness, and launches nothing. A future full design must fit its separately approved budget; otherwise leave it unrun. Do not silently cut tasks, seeds, repeats, or masks and call that the same factorial.

## 7. Final analysis status and reserved result fields

Two baseline pilots are paid and ineligible. Repeat 0 has an unrelated dashboard websocket generation with unverified effort and unknown usage. Repeat 1 has a verified-medium native compaction websocket generation with unknown usage and no preload admission record. Neither completed a compaction or final task answer. The four main receipts report 42,248 known tokens; measured aggregate usage and aggregate budget charge stay null. The permanent historical charge remains 1,021,128 for repeat 0 alone. The combined catalogue-max exposure envelope is 2,042,248, above 2M; actual spend remains unknown. Budget compliance cannot be claimed.

BCF-41/42 stop all further benchmark scheduling. There are zero eligible pilots, zero completed compactions, zero screen cells, and no treatment exposure. T2 calibration is unavailable, not ceiling/floor performance or a forgetting result. Candidate recommendations, quality effects, cost-per-point estimates, A/A floors, and interactions remain unavailable.

| Result field reserved for usable evidence | Current value | Evidence needed to replace it |
|---|---|---|
| Complete reported pilot total/breakdowns | Unavailable | Usage receipts for both historical unknown attempts; late usage would not create missing answers or compactions |
| T2 retention/compression calibration | Unavailable | Eligible completed fixed script, exact recall-leaf errors, committed summaries and measured compression |
| T6 bounded-timing calibration | Unavailable | Distinct defer diagnostics followed by automatic compaction and eight scored anchor leaves |
| M1/M2/M3 paired quality/cost effects and A/A floors | Unavailable | Frozen-screen eligible baseline/repeat/treatment blocks, exact trace chains, and complete side-call-inclusive usage |
| Tokens per quality point and incremental tradeoffs | Unavailable | Comparable common eligible coverage with valid scores and complete total tokens |
| Selected factorial flags and empirical token estimate | Unavailable | Trace-supported calibrated screen outcomes and eligible `U_ref`; no follow-up launch is authorized |

These rows preserve space for evidence, not permission for new calls. If accounting evidence is later recovered, replace only the supported accounting fields and recompute totals. Do not retroactively turn the failed scripts into eligible runs. New eligible pilot/screen data would require a later explicit decision that replaces the current stop; this analysis makes no such decision.

The screen remains incomplete. This file preserves its mechanism limits, cost method, and exact unexecuted factorial; it does not supply missing empirical comparisons.

## 8. One-pass Astra final review

The single final review [astra-final/REVIEW.md](astra-final/REVIEW.md) accepts the honest stopped-experiment report with two low-severity wording corrections. F-01 marks historical ledger authorization and exposure as repeat-0-only and places the current stop first. F-02 distinguishes the initial unsettled trigger from later cancelled settlement in RESULTS. Both are FIXED in DECISIONS; measured totals, eligibility and run artifacts are unchanged. No further review or benchmark was run. Delivery completion does not mean experimental completion; no empirical candidate recommendation or budget-compliance claim is supported.
