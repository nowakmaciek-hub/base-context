# RESULTS — bcf

## Screen result (89/90 completed)

BCF-65, 2026-10-03, corrects BCF-64. The orchestrator's 47/90 stop report was wrong: the driver continued after the stop signal. This result uses **all 89 completed, eligible designed cells**, with no reconstructed cutoff. Retain **calibration overridden: quality ceiling-limited** (BCF-59). No model call, screen resume or rw6 run was made for this correction.

All **90 designed cells are represented** by **91 paid screen attempts**: 89 eligible completions and two retained failed attempts. All 72 primary cells are completed; 17 of 18 independent baseline repeats are completed. The only unavailable designed cell is `screen-T5-103-baseline-1`, terminal failed/ineligible under BCF-60. The original `screen-T6-101-M3-0` failed, but its separately recorded **paid retry has completed**, at 8/8; the older pending-retry statement is stale. Its failed attempt remains charged and its full designed-cell dollar cost remains unknown. There are no unrun primary cells and no pending paid retry in the saved results.

| Flag | Quality Δ [95% CI], 0–1 score | USD ratio [95% CI] | n pairs (quality / USD) | Verdict |
|---|---:|---:|---:|---|
| M1 | -0.001684 [-0.002525, +0.000000] | 1.037 [1.016, 1.059] | 18 / 18 | Higher USD; observed quality loss |
| M2 | +0.012821 [+0.012821, +0.012821] | 0.982 [0.948, 1.018] | 18 / 18 | Quality gain; USD inconclusive |
| M3 | -0.012626 [-0.037879, +0.000000] | 0.958 [0.921, 0.993] | 18 / 17 | Lower known USD; no quality non-loss verdict |

### Paired method and coverage

Pair each flag's terminal eligible result with **baseline repeat 0 for the same task and seed**; use baseline repeat 1 only for A/A noise. Failed outcomes are not zero scores. Pilots and unpaid startup artifacts are excluded. A failed A/A repeat does not remove a valid direct treatment comparison.

Quality Δ is the mean of six within-task mean paired normalized-score differences. USD ratio is `exp(mean_task(mean_seed(log(USD_flag / USD_baseline))))`, with equal weights for all six fixed tasks; below 1 means lower cost. Price all main and summary usage with the pilot-pinned `driver.priced_cost`: `(2*input + 10*output + 0.10*cacheRead + 2.50*cacheWrite)/1,000,000`. These are historical priced usage estimates, not current price quotes or billing receipts. Costs include all paid attempts belonging to a designed cell. Unknown components and conservative token allowances are never substituted for measured dollars.

The 95% percentile CIs use **10,000 paired task/seed block resamples within each fixed task**, retaining each task's observed pair count and equal task weight; seeds 619, 620 and 621 for M1, M2 and M3. Quality uses all 18 pairs per flag. Dollar estimates use 18, 18 and 17 pairs respectively: T6/101/M3 is excluded only from dollars because its original failure has unknown spend. Resampling conditions on these six synthetic tasks and three observed seeds; it does not estimate new-task variation. M2's quality CI collapses because every observed within-task effect is constant.

Apply [AUTHOR-METHOD.md](/host/work/bc-mod-eval/iter/AUTHOR-METHOD.md): quality must not be worse (ceiling parity is acceptable), and priced USD must be lower. **No flag establishes both requirements.** A legacy “within noise” label does not establish non-loss, and equal below-ceiling scores do not establish ceiling parity. The synthetic normalized score is a proxy; it does not separately measure the author's interim accuracy, final accuracy and finished outcomes.

All flags have **18/18 direct quality pairs** across T1–T6 × seeds 101/102/103. M1 and M2 have **18/18 priced pairs**; M3 has **17/18**, missing only **T6/101** full-cost pairing. There are **17/18 A/A baseline pairs**, missing only **T5/103**. A/A-complete priced treatment blocks are M1 **17**, M2 **17**, M3 **16** (missing T5/103 for all flags, plus T6/101 for M3). The legacy analyzer's requirement for 18 complete baseline/repeat/treatment blocks still leaves its full A/A-adjusted aggregate unavailable; this does not invalidate the direct paired estimates above.

### Exact completed-cell coverage

Entries link terminal saved results and show passed/max leaves. The paid retry replaces the original failed T6/M3 attempt for quality, never for unknown historical dollars.

| Task | Seed | Baseline 0 | Baseline 1 (A/A) | M1 | M2 | M3 |
|---|---:|---|---|---|---|---|
| T1 | 101 | [48/48](/host/work/papers-r1/bcbench-mini/runs/screen-T1-101-baseline-0/result.json) | [48/48](/host/work/papers-r1/bcbench-mini/runs/screen-T1-101-baseline-1/result.json) | [48/48](/host/work/papers-r1/bcbench-mini/runs/screen-T1-101-M1-0/result.json) | [48/48](/host/work/papers-r1/bcbench-mini/runs/screen-T1-101-M2-0/result.json) | [48/48](/host/work/papers-r1/bcbench-mini/runs/screen-T1-101-M3-0/result.json) |
| T1 | 102 | [48/48](/host/work/papers-r1/bcbench-mini/runs/screen-T1-102-baseline-0/result.json) | [48/48](/host/work/papers-r1/bcbench-mini/runs/screen-T1-102-baseline-1/result.json) | [48/48](/host/work/papers-r1/bcbench-mini/runs/screen-T1-102-M1-0/result.json) | [48/48](/host/work/papers-r1/bcbench-mini/runs/screen-T1-102-M2-0/result.json) | [48/48](/host/work/papers-r1/bcbench-mini/runs/screen-T1-102-M3-0/result.json) |
| T1 | 103 | [48/48](/host/work/papers-r1/bcbench-mini/runs/screen-T1-103-baseline-0/result.json) | [48/48](/host/work/papers-r1/bcbench-mini/runs/screen-T1-103-baseline-1/result.json) | [48/48](/host/work/papers-r1/bcbench-mini/runs/screen-T1-103-M1-0/result.json) | [48/48](/host/work/papers-r1/bcbench-mini/runs/screen-T1-103-M2-0/result.json) | [48/48](/host/work/papers-r1/bcbench-mini/runs/screen-T1-103-M3-0/result.json) |
| T2 | 101 | [38/39](/host/work/papers-r1/bcbench-mini/runs/screen-T2-101-baseline-0/result.json) | [38/39](/host/work/papers-r1/bcbench-mini/runs/screen-T2-101-baseline-1/result.json) | [38/39](/host/work/papers-r1/bcbench-mini/runs/screen-T2-101-M1-0/result.json) | [38/39](/host/work/papers-r1/bcbench-mini/runs/screen-T2-101-M2-0/result.json) | [38/39](/host/work/papers-r1/bcbench-mini/runs/screen-T2-101-M3-0/result.json) |
| T2 | 102 | [38/39](/host/work/papers-r1/bcbench-mini/runs/screen-T2-102-baseline-0/result.json) | [38/39](/host/work/papers-r1/bcbench-mini/runs/screen-T2-102-baseline-1/result.json) | [38/39](/host/work/papers-r1/bcbench-mini/runs/screen-T2-102-M1-0/result.json) | [38/39](/host/work/papers-r1/bcbench-mini/runs/screen-T2-102-M2-0/result.json) | [38/39](/host/work/papers-r1/bcbench-mini/runs/screen-T2-102-M3-0/result.json) |
| T2 | 103 | [38/39](/host/work/papers-r1/bcbench-mini/runs/screen-T2-103-baseline-0/result.json) | [38/39](/host/work/papers-r1/bcbench-mini/runs/screen-T2-103-baseline-1/result.json) | [38/39](/host/work/papers-r1/bcbench-mini/runs/screen-T2-103-M1-0/result.json) | [38/39](/host/work/papers-r1/bcbench-mini/runs/screen-T2-103-M2-0/result.json) | [38/39](/host/work/papers-r1/bcbench-mini/runs/screen-T2-103-M3-0/result.json) |
| T3 | 101 | [20/20](/host/work/papers-r1/bcbench-mini/runs/screen-T3-101-baseline-0/result.json) | [20/20](/host/work/papers-r1/bcbench-mini/runs/screen-T3-101-baseline-1/result.json) | [20/20](/host/work/papers-r1/bcbench-mini/runs/screen-T3-101-M1-0/result.json) | [20/20](/host/work/papers-r1/bcbench-mini/runs/screen-T3-101-M2-0/result.json) | [20/20](/host/work/papers-r1/bcbench-mini/runs/screen-T3-101-M3-0/result.json) |
| T3 | 102 | [20/20](/host/work/papers-r1/bcbench-mini/runs/screen-T3-102-baseline-0/result.json) | [20/20](/host/work/papers-r1/bcbench-mini/runs/screen-T3-102-baseline-1/result.json) | [20/20](/host/work/papers-r1/bcbench-mini/runs/screen-T3-102-M1-0/result.json) | [20/20](/host/work/papers-r1/bcbench-mini/runs/screen-T3-102-M2-0/result.json) | [20/20](/host/work/papers-r1/bcbench-mini/runs/screen-T3-102-M3-0/result.json) |
| T3 | 103 | [20/20](/host/work/papers-r1/bcbench-mini/runs/screen-T3-103-baseline-0/result.json) | [20/20](/host/work/papers-r1/bcbench-mini/runs/screen-T3-103-baseline-1/result.json) | [20/20](/host/work/papers-r1/bcbench-mini/runs/screen-T3-103-M1-0/result.json) | [20/20](/host/work/papers-r1/bcbench-mini/runs/screen-T3-103-M2-0/result.json) | [20/20](/host/work/papers-r1/bcbench-mini/runs/screen-T3-103-M3-0/result.json) |
| T4 | 101 | [66/66](/host/work/papers-r1/bcbench-mini/runs/screen-T4-101-baseline-0/result.json) | [65/66](/host/work/papers-r1/bcbench-mini/runs/screen-T4-101-baseline-1/result.json) | [65/66](/host/work/papers-r1/bcbench-mini/runs/screen-T4-101-M1-0/result.json) | [66/66](/host/work/papers-r1/bcbench-mini/runs/screen-T4-101-M2-0/result.json) | [51/66](/host/work/papers-r1/bcbench-mini/runs/screen-T4-101-M3-0/result.json) |
| T4 | 102 | [66/66](/host/work/papers-r1/bcbench-mini/runs/screen-T4-102-baseline-0/result.json) | [66/66](/host/work/papers-r1/bcbench-mini/runs/screen-T4-102-baseline-1/result.json) | [66/66](/host/work/papers-r1/bcbench-mini/runs/screen-T4-102-M1-0/result.json) | [66/66](/host/work/papers-r1/bcbench-mini/runs/screen-T4-102-M2-0/result.json) | [66/66](/host/work/papers-r1/bcbench-mini/runs/screen-T4-102-M3-0/result.json) |
| T4 | 103 | [66/66](/host/work/papers-r1/bcbench-mini/runs/screen-T4-103-baseline-0/result.json) | [65/66](/host/work/papers-r1/bcbench-mini/runs/screen-T4-103-baseline-1/result.json) | [65/66](/host/work/papers-r1/bcbench-mini/runs/screen-T4-103-M1-0/result.json) | [66/66](/host/work/papers-r1/bcbench-mini/runs/screen-T4-103-M2-0/result.json) | [66/66](/host/work/papers-r1/bcbench-mini/runs/screen-T4-103-M3-0/result.json) |
| T5 | 101 | [12/13](/host/work/papers-r1/bcbench-mini/runs/screen-T5-101-baseline-0/result.json) | [12/13](/host/work/papers-r1/bcbench-mini/runs/screen-T5-101-baseline-1/result.json) | [12/13](/host/work/papers-r1/bcbench-mini/runs/screen-T5-101-M1-0/result.json) | [13/13](/host/work/papers-r1/bcbench-mini/runs/screen-T5-101-M2-0/result.json) | [12/13](/host/work/papers-r1/bcbench-mini/runs/screen-T5-101-M3-0/result.json) |
| T5 | 102 | [12/13](/host/work/papers-r1/bcbench-mini/runs/screen-T5-102-baseline-0/result.json) | [12/13](/host/work/papers-r1/bcbench-mini/runs/screen-T5-102-baseline-1/result.json) | [12/13](/host/work/papers-r1/bcbench-mini/runs/screen-T5-102-M1-0/result.json) | [13/13](/host/work/papers-r1/bcbench-mini/runs/screen-T5-102-M2-0/result.json) | [12/13](/host/work/papers-r1/bcbench-mini/runs/screen-T5-102-M3-0/result.json) |
| T5 | 103 | [12/13](/host/work/papers-r1/bcbench-mini/runs/screen-T5-103-baseline-0/result.json) | [Failed / ineligible](/host/work/papers-r1/bcbench-mini/runs/screen-T5-103-baseline-1/result.json) | [12/13](/host/work/papers-r1/bcbench-mini/runs/screen-T5-103-M1-0/result.json) | [13/13](/host/work/papers-r1/bcbench-mini/runs/screen-T5-103-M2-0/result.json) | [12/13](/host/work/papers-r1/bcbench-mini/runs/screen-T5-103-M3-0/result.json) |
| T6 | 101 | [8/8](/host/work/papers-r1/bcbench-mini/runs/screen-T6-101-baseline-0/result.json) | [8/8](/host/work/papers-r1/bcbench-mini/runs/screen-T6-101-baseline-1/result.json) | [8/8](/host/work/papers-r1/bcbench-mini/runs/screen-T6-101-M1-0/result.json) | [8/8](/host/work/papers-r1/bcbench-mini/runs/screen-T6-101-M2-0/result.json) | [8/8; completed retry; USD unknown](/host/work/papers-r1/bcbench-mini/runs/screen-T6-101-M3-0-retry-1/result.json) |
| T6 | 102 | [8/8](/host/work/papers-r1/bcbench-mini/runs/screen-T6-102-baseline-0/result.json) | [8/8](/host/work/papers-r1/bcbench-mini/runs/screen-T6-102-baseline-1/result.json) | [8/8](/host/work/papers-r1/bcbench-mini/runs/screen-T6-102-M1-0/result.json) | [8/8](/host/work/papers-r1/bcbench-mini/runs/screen-T6-102-M2-0/result.json) | [8/8](/host/work/papers-r1/bcbench-mini/runs/screen-T6-102-M3-0/result.json) |
| T6 | 103 | [8/8](/host/work/papers-r1/bcbench-mini/runs/screen-T6-103-baseline-0/result.json) | [8/8](/host/work/papers-r1/bcbench-mini/runs/screen-T6-103-baseline-1/result.json) | [8/8](/host/work/papers-r1/bcbench-mini/runs/screen-T6-103-M1-0/result.json) | [8/8](/host/work/papers-r1/bcbench-mini/runs/screen-T6-103-M2-0/result.json) | [8/8](/host/work/papers-r1/bcbench-mini/runs/screen-T6-103-M3-0/result.json) |

### Task-level paired effects

| Task | Flag | Quality Δ [95% CI] | USD ratio [95% CI] | n (quality / USD) |
|---|---|---:|---:|---:|
| T1 | M1 | +0.000000 [+0.000000, +0.000000] | 1.068 [1.059, 1.078] | 3 / 3 |
| T1 | M2 | +0.000000 [+0.000000, +0.000000] | 0.984 [0.950, 1.007] | 3 / 3 |
| T1 | M3 | +0.000000 [+0.000000, +0.000000] | 1.029 [0.978, 1.059] | 3 / 3 |
| T2 | M1 | +0.000000 [+0.000000, +0.000000] | 1.100 [1.033, 1.223] | 3 / 3 |
| T2 | M2 | +0.000000 [+0.000000, +0.000000] | 1.035 [1.000, 1.089] | 3 / 3 |
| T2 | M3 | +0.000000 [+0.000000, +0.000000] | 1.021 [0.978, 1.083] | 3 / 3 |
| T3 | M1 | +0.000000 [+0.000000, +0.000000] | 1.076 [1.056, 1.100] | 3 / 3 |
| T3 | M2 | +0.000000 [+0.000000, +0.000000] | 0.994 [0.952, 1.044] | 3 / 3 |
| T3 | M3 | +0.000000 [+0.000000, +0.000000] | 1.006 [0.965, 1.048] | 3 / 3 |
| T4 | M1 | -0.010101 [-0.015152, +0.000000] | 1.062 [1.044, 1.092] | 3 / 3 |
| T4 | M2 | +0.000000 [+0.000000, +0.000000] | 1.007 [0.964, 1.052] | 3 / 3 |
| T4 | M3 | -0.075758 [-0.227273, +0.000000] | 0.976 [0.957, 1.014] | 3 / 3 |
| T5 | M1 | +0.000000 [+0.000000, +0.000000] | 0.973 [0.946, 0.989] | 3 / 3 |
| T5 | M2 | +0.076923 [+0.076923, +0.076923] | 0.888 [0.734, 1.063] | 3 / 3 |
| T5 | M3 | +0.000000 [+0.000000, +0.000000] | 0.953 [0.742, 1.116] | 3 / 3 |
| T6 | M1 | +0.000000 [+0.000000, +0.000000] | 0.951 [0.865, 1.032] | 3 / 3 |
| T6 | M2 | +0.000000 [+0.000000, +0.000000] | 0.993 [0.884, 1.101] | 3 / 3 |
| T6 | M3 | +0.000000 [+0.000000, +0.000000] | 0.788 [0.744, 0.834] | 3 / 2 |

### Eligible primary task × arm means

Baseline repeat 1 is excluded from these means. Token, wall and USD values summarize eligible terminal runs. T6/M3 includes its successful retry; these run means exclude its original failed-attempt exposure and cannot supply the unavailable full-cell USD pair.

| Task | Arm | n | Score | Input | Output | cacheRead | cacheWrite | Total tokens | Seconds | Compactions | Known USD |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| T1 | baseline | 3 | 1.000000 | 44745.0 | 2466.0 | 1962.7 | 0.0 | 49173.7 | 111.5 | 2.00 | 0.114346 |
| T1 | M1 | 3 | 1.000000 | 45780.0 | 3040.0 | 1962.7 | 0.0 | 50782.7 | 150.2 | 2.00 | 0.122156 |
| T1 | M2 | 3 | 1.000000 | 43799.0 | 2462.3 | 2944.0 | 0.0 | 49205.3 | 125.0 | 2.00 | 0.112516 |
| T1 | M3 | 3 | 1.000000 | 45898.3 | 2571.3 | 981.3 | 0.0 | 49451.0 | 112.1 | 2.00 | 0.117608 |
| T2 | baseline | 3 | 0.974359 | 60389.7 | 10640.0 | 11008.0 | 0.0 | 82037.7 | 361.8 | 2.00 | 0.228280 |
| T2 | M1 | 3 | 0.974359 | 67975.3 | 11456.0 | 4864.0 | 0.0 | 84295.3 | 409.7 | 2.00 | 0.250997 |
| T2 | M2 | 3 | 0.974359 | 64071.7 | 10720.7 | 7296.0 | 0.0 | 82088.3 | 442.6 | 2.00 | 0.236080 |
| T2 | M3 | 3 | 0.974359 | 63832.7 | 10444.3 | 7296.0 | 0.0 | 81573.0 | 414.1 | 2.00 | 0.232838 |
| T3 | baseline | 3 | 1.000000 | 44112.3 | 1717.0 | 810.7 | 0.0 | 46640.0 | 86.9 | 2.00 | 0.105476 |
| T3 | M1 | 3 | 1.000000 | 45771.0 | 2190.3 | 0.0 | 0.0 | 47961.3 | 106.8 | 2.00 | 0.113445 |
| T3 | M2 | 3 | 1.000000 | 44052.0 | 1665.0 | 810.7 | 0.0 | 46527.7 | 133.6 | 2.00 | 0.104835 |
| T3 | M3 | 3 | 1.000000 | 44196.0 | 1760.7 | 810.7 | 0.0 | 46767.3 | 93.6 | 2.00 | 0.106080 |
| T4 | baseline | 3 | 1.000000 | 44360.0 | 2480.0 | 853.3 | 0.0 | 47693.3 | 112.2 | 2.00 | 0.113605 |
| T4 | M1 | 3 | 0.989899 | 45293.3 | 2997.7 | 853.3 | 0.0 | 49144.3 | 125.9 | 2.00 | 0.120649 |
| T4 | M2 | 3 | 1.000000 | 44474.0 | 2537.7 | 853.3 | 0.0 | 47865.0 | 118.7 | 2.00 | 0.114410 |
| T4 | M3 | 3 | 0.924242 | 43394.3 | 2386.7 | 1706.7 | 0.0 | 47487.7 | 111.8 | 2.00 | 0.110826 |
| T5 | baseline | 3 | 0.923077 | 31463.3 | 605.3 | 65408.0 | 0.0 | 97476.7 | 83.5 | 1.00 | 0.075521 |
| T5 | M1 | 3 | 0.923077 | 29579.0 | 808.3 | 64640.0 | 0.0 | 95027.3 | 95.4 | 1.00 | 0.073705 |
| T5 | M2 | 3 | 1.000000 | 27410.3 | 581.7 | 68736.0 | 0.0 | 96728.0 | 73.3 | 1.00 | 0.067511 |
| T5 | M3 | 3 | 0.923077 | 29782.3 | 600.0 | 62762.7 | 0.0 | 93145.0 | 73.6 | 1.00 | 0.071841 |
| T6 | baseline | 3 | 1.000000 | 123522.7 | 1482.0 | 50560.0 | 0.0 | 175564.7 | 124.1 | 3.00 | 0.266921 |
| T6 | M1 | 3 | 1.000000 | 112289.0 | 2216.0 | 63957.3 | 0.0 | 178462.3 | 165.5 | 3.00 | 0.253134 |
| T6 | M2 | 3 | 1.000000 | 122100.7 | 1480.3 | 51925.3 | 0.0 | 175506.3 | 108.7 | 3.00 | 0.264197 |
| T6 | M3 | 3 | 1.000000 | 110822.0 | 1052.7 | 109824.0 | 0.0 | 221698.7 | 93.5 | 2.00 | 0.243153 |

### Retained failures and spend

- [screen-T5-103-baseline-1](/host/work/papers-r1/bcbench-mini/runs/screen-T5-103-baseline-1/result.json): terminal infrastructure failure; 78,609 known tokens + 1,000,000 unknown allowance = 1,078,609 charged. No eligible score or full priced cost; only T5/103 A/A coverage is missing.
- [screen-T6-101-M3-0](/host/work/papers-r1/bcbench-mini/runs/screen-T6-101-M3-0/result.json): original infrastructure failure; 96,772 known + 1,000,000 unknown = 1,096,772 charged. Its [completed paid retry](/host/work/papers-r1/bcbench-mini/runs/screen-T6-101-M3-0-retry-1/result.json) is eligible quality data, counted once, but does not recover original-failure USD.
- The historical unpaid T5/M1 startup has zero charge and is excluded. All four pilot slots stay outside screen outcome estimates.

Screen reported known usage is **7,699,021 tokens**: **7,523,640** from the 89 eligible completions plus **175,381** from the two failed attempts. Two unknown screen attempts retain 1,000,000-token allowances each, giving a **9,699,021-token screen budget charge**. Pilot known usage is **146,255**, with **673,257** charged. Aggregate known usage is **7,845,276** and conservative charge **10,372,278**, below the unchanged 25M total ceiling by **14,627,722**. Actual aggregate usage and dollar acquisition spend remain unavailable because the historical failed attempts have unknown usage. All failure charges are retained; budget envelopes are not measured costs.

### Recommendation and interference

Recommend **M3 alone versus baseline first on rw6**, then **M1 alone** as a secondary test of structured summaries under real pivots. This is a next-experiment priority, not a screen winner: M3 has a known-cost saving signal and observed T6 automatic deferral; M1 may help retention on longer changing tasks but currently costs more and shows no quality gain. Report interim accuracy (0–5), final accuracy (0/1), finished, and priced USD separately. Preserve rw6's author tasks and compaction boundaries; manual compaction bypasses M3, so only observed automatic decisions test its mechanism. M1 also needs actual summary inference to activate.

**Do not prioritize M2 on unchanged rw6.** [rw6/README.md](/host/work/bc-mod-eval/rw6/README.md:127) states that these tasks never use `goal.complete()`. M2 is inactive by design; enabling it tests spillover, not the completion gate responsible for the synthetic T5 gain. Testing that mechanism would need a separately authorized goal-lifecycle protocol change.

For interference, prioritize **M1×M3** after their single-flag measurements: use baseline, M1, M3 and M1+M3 on identical tasks/seeds. Summary content/size and compaction timing can jointly change retention and future input cost. Estimate the interaction as `Y(M1+M3) - Y(M1) - Y(M3) + Y(baseline)` for each quality outcome, and the same contrast on log USD. **Defer M1×M2 and M2×M3 on unchanged rw6** because M2 is inactive. In a future protocol that activates M2, those pairs could expose lost completion constraints or extra repair turns crossing compaction thresholds. No joint arms were run, so interference is a hypothesis, not a measured result. No follow-up run is launched here.

## Historical results and repair records through BCF-63

The following previously saved counts, paired verdicts and scheduling statements describe earlier stages; BCF-65's all-completions result above is current.

Status: incomplete; no complete-screen claim
Calibration override: BCF-59; calibration overridden: quality ceiling-limited.
Comparison criterion: quality must not be worse; parity is acceptable when both arms are at ceiling; priced cost must be lower. Cost verdicts per flag are the primary deliverable. Within-noise quality alone does not establish parity.
Pinned USD prices per million tokens from the completed pilot's native model: input $2, output $10, cacheRead $0.10, cacheWrite $2.50. Priced cost sums these components for all main and summary attempts. Total tokens remain the budget metric.
Pilot reported total: unavailable tokens. Screen reported total: unavailable tokens, including cache reads.
Known reported pilot usage: 146,255 tokens. Conservative pilot budget charge: 673257 tokens (includes unresolved attempt allowance; not measured spend).
Known reported screen usage: 951,679 tokens. Conservative screen budget charge: 2951679 tokens (includes unresolved attempt allowance; not measured spend).
Unresolved usage runs: pilot-T2-101-baseline-0, pilot-T2-101-baseline-1, pilot-T2-101-baseline-2, screen-T5-103-baseline-1, screen-T6-101-M3-0. Unknown usage remains unavailable. BCF-53/55 retain historical pilot charges; BCF-60 retains its historical screen charge. BCF-63 charges each new unknown screen attempt at the full 1,000,000 maximum, records failed/ineligible infrastructure evidence, allows one paid retry within the 25M projection, and continues scheduling. Three consecutive unknown attempts or dead login stop scheduling. Paired costs with unknown historical spend remain unavailable.
Unavailable breakdown fields are not zero. Pilot cells are excluded from outcome estimates. Baseline repeats contribute only to A/A estimates.

| Task | Arm | Eligible n | Score | Input | Output | cacheRead | cacheWrite | Total | Wall s | Compactions | Priced USD | Override |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| T1 | baseline | 0 | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | BCF-59 |
| T1 | M1 | 0 | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | BCF-59 |
| T1 | M2 | 0 | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | BCF-59 |
| T1 | M3 | 0 | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | BCF-59 |
| T2 | baseline | 1 | 0.974 | 52782.0 | 10519.0 | 18432.0 | 0.0 | 81733.0 | 360.2 | 2.0 | 0.212597 | BCF-59 |
| T2 | M1 | 1 | 0.974 | 72895.0 | 11412.0 | 0.0 | 0.0 | 84307.0 | 380.2 | 2.0 | 0.259910 | BCF-59 |
| T2 | M2 | 1 | 0.974 | 63841.0 | 10312.0 | 7296.0 | 0.0 | 81449.0 | 604.5 | 2.0 | 0.231532 | BCF-59 |
| T2 | M3 | 1 | 0.974 | 63565.0 | 10233.0 | 7296.0 | 0.0 | 81094.0 | 539.9 | 2.0 | 0.230190 | BCF-59 |
| T3 | baseline | 0 | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | BCF-59 |
| T3 | M1 | 0 | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | BCF-59 |
| T3 | M2 | 0 | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | BCF-59 |
| T3 | M3 | 0 | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | BCF-59 |
| T4 | baseline | 0 | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | BCF-59 |
| T4 | M1 | 0 | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | BCF-59 |
| T4 | M2 | 0 | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | BCF-59 |
| T4 | M3 | 0 | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | BCF-59 |
| T5 | baseline | 1 | 0.923 | 33531.0 | 589.0 | 63360.0 | 0.0 | 97480.0 | 93.5 | 1.0 | 0.079288 | BCF-59 |
| T5 | M1 | 1 | 0.923 | 32832.0 | 751.0 | 52608.0 | 0.0 | 86191.0 | 107.7 | 1.0 | 0.078435 | BCF-59 |
| T5 | M2 | 1 | 1.000 | 36222.0 | 585.0 | 60160.0 | 0.0 | 96967.0 | 81.1 | 1.0 | 0.084310 | BCF-59 |
| T5 | M3 | 1 | 0.923 | 36394.0 | 549.0 | 47488.0 | 0.0 | 84431.0 | 69.9 | 1.0 | 0.083027 | BCF-59 |
| T6 | baseline | 0 | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | BCF-59 |
| T6 | M1 | 0 | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | BCF-59 |
| T6 | M2 | 0 | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | BCF-59 |
| T6 | M3 | 0 | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | BCF-59 |

## Paired verdicts

Intervals use 10,000 paired seed-block draws within each fixed task. A/A thresholds are recomputed in each draw. Wide intervals are inconclusive, not evidence of equivalence.

| Flag | Quality difference [95% CI] | Quality | Log priced-cost ratio [95% CI] | Priced cost |
|---|---|---|---|---|
| M1 | unavailable | incomplete pairing | unavailable | incomplete pairing |
| M2 | unavailable | incomplete pairing | unavailable | incomplete pairing |
| M3 | unavailable | incomplete pairing | unavailable | incomplete pairing |

## A/A floors and task-level paired differences

A/A floors use separate sessions of the same task and seed, not variation across seeds.

| Task | Flag | Pairs | Quality difference [95% CI] | A/A quality floor | Log priced-cost ratio [95% CI] | A/A log-cost floor |
|---|---|---:|---|---:|---|---:|
| T1 | M1 | 0 | unavailable | unavailable | unavailable | unavailable |
| T2 | M1 | 1 | 0.000 [0.000, 0.000] | 0.000 | 0.201 [0.201, 0.201] | 0.021 |
| T3 | M1 | 0 | unavailable | unavailable | unavailable | unavailable |
| T4 | M1 | 0 | unavailable | unavailable | unavailable | unavailable |
| T5 | M1 | 0 | unavailable | unavailable | unavailable | unavailable |
| T6 | M1 | 0 | unavailable | unavailable | unavailable | unavailable |
| T1 | M2 | 0 | unavailable | unavailable | unavailable | unavailable |
| T2 | M2 | 1 | 0.000 [0.000, 0.000] | 0.000 | 0.085 [0.085, 0.085] | 0.021 |
| T3 | M2 | 0 | unavailable | unavailable | unavailable | unavailable |
| T4 | M2 | 0 | unavailable | unavailable | unavailable | unavailable |
| T5 | M2 | 0 | unavailable | unavailable | unavailable | unavailable |
| T6 | M2 | 0 | unavailable | unavailable | unavailable | unavailable |
| T1 | M3 | 0 | unavailable | unavailable | unavailable | unavailable |
| T2 | M3 | 1 | 0.000 [0.000, 0.000] | 0.000 | 0.080 [0.080, 0.080] | 0.021 |
| T3 | M3 | 0 | unavailable | unavailable | unavailable | unavailable |
| T4 | M3 | 0 | unavailable | unavailable | unavailable | unavailable |
| T5 | M3 | 0 | unavailable | unavailable | unavailable | unavailable |
| T6 | M3 | 0 | unavailable | unavailable | unavailable | unavailable |

## Tokens per successful quality point

- baseline: 94450.1.
- M1: 89857.1.
- M2: 90366.5.
- M3: 87236.1.

## Run evidence

| Run | Phase | Task | Seed | Arm | Repeat | Eligible | Score | Total tokens | Evidence | Override | Result label |
|---|---|---|---:|---|---:|---|---:|---:|---|---|---|
| pilot-T2-101-baseline-0 | pilot | T2 | 101 | baseline | 0 | False | unavailable | None | runs/pilot-T2-101-baseline-0/result.json | none | none |
| pilot-T2-101-baseline-1 | pilot | T2 | 101 | baseline | 1 | False | unavailable | None | runs/pilot-T2-101-baseline-1/result.json | none | none |
| pilot-T2-101-baseline-2 | pilot | T2 | 101 | baseline | 2 | False | unavailable | None | runs/pilot-T2-101-baseline-2/result.json | none | none |
| pilot-T2-101-baseline-3 | pilot | T2 | 101 | baseline | 3 | True | 0.974 | 82851 | runs/pilot-T2-101-baseline-3/result.json | none | none |
| screen-T2-103-M1-0 | screen | T2 | 103 | M1 | 0 | True | 0.974 | 84307 | runs/screen-T2-103-M1-0/result.json | BCF-59 | calibration overridden: quality ceiling-limited |
| screen-T2-103-M2-0 | screen | T2 | 103 | M2 | 0 | True | 0.974 | 81449 | runs/screen-T2-103-M2-0/result.json | BCF-59 | calibration overridden: quality ceiling-limited |
| screen-T2-103-M3-0 | screen | T2 | 103 | M3 | 0 | True | 0.974 | 81094 | runs/screen-T2-103-M3-0/result.json | BCF-59 | calibration overridden: quality ceiling-limited |
| screen-T2-103-baseline-0 | screen | T2 | 103 | baseline | 0 | True | 0.974 | 81733 | runs/screen-T2-103-baseline-0/result.json | BCF-59 | calibration overridden: quality ceiling-limited |
| screen-T2-103-baseline-1 | screen | T2 | 103 | baseline | 1 | True | 0.974 | 82646 | runs/screen-T2-103-baseline-1/result.json | BCF-59 | calibration overridden: quality ceiling-limited |
| screen-T5-103-M1-0 | screen | T5 | 103 | M1 | 0 | True | 0.923 | 86191 | runs/screen-T5-103-M1-0/result.json | BCF-59 | calibration overridden: quality ceiling-limited |
| screen-T5-103-M2-0 | screen | T5 | 103 | M2 | 0 | True | 1.000 | 96967 | runs/screen-T5-103-M2-0/result.json | BCF-59 | calibration overridden: quality ceiling-limited |
| screen-T5-103-M3-0 | screen | T5 | 103 | M3 | 0 | True | 0.923 | 84431 | runs/screen-T5-103-M3-0/result.json | BCF-59 | calibration overridden: quality ceiling-limited |
| screen-T5-103-baseline-0 | screen | T5 | 103 | baseline | 0 | True | 0.923 | 97480 | runs/screen-T5-103-baseline-0/result.json | BCF-59 | calibration overridden: quality ceiling-limited |
| screen-T5-103-baseline-1 | screen | T5 | 103 | baseline | 1 | False | unavailable | None | runs/screen-T5-103-baseline-1/result.json | BCF-59 | calibration overridden: quality ceiling-limited |
| screen-T6-101-M3-0 | screen | T6 | 101 | M3 | 0 | False | unavailable | None | runs/screen-T6-101-M3-0/result.json | BCF-59 | calibration overridden: quality ceiling-limited |

## Incomplete or ineligible runs

- pilot-T2-101-baseline-0: status=failed, 2 operations, 0 compactions; Unresolved native accounting/model evidence: unsettled attempt: f1569af3-b868-46fd-98fa-00a62b3ce9bf; unknown total: f1569af3-b868-46fd-98fa-00a62b3ce9bf; wrong or missing request identity: f1569af3-b868-46fd-98fa-00a62b3ce9bf; wrong or missing receipt request identity: f1569af3-b868-46fd-98fa-00a62b3ce9bf; Required native compactions are missing; Fixed turn script did not finish
- pilot-T2-101-baseline-1: status=failed, 2 operations, 0 compactions; Native compact refused: Timed out after 30000ms waiting for the Base Context daemon response to "compact". Socket: /tmp/bc-1000-143b3aa1/daemon.sock. Daemon log: /host/work/papers-r1/bcbench-mini/home/pilot-T2-101-baseline-1/logs/daemon.sock.c16b6904.log.; unknown total: b73a4812-ea0b-4170-ae8a-61e44e50172f; Required native compactions are missing; Fixed turn script did not finish
- pilot-T2-101-baseline-2: status=failed, 2 operations, 0 compactions; Native RPC compact id=4 refused: Timed out after 30000ms waiting for the Base Context daemon response to "compact". Socket: /tmp/bc-1000-473cba2c/daemon.sock. Daemon log: /host/work/papers-r1/bcbench-mini/home/pilot-T2-101-baseline-2/logs/daemon.sock.45f2c875.log.; unknown total: 12b82a8c-185d-4212-86f9-77a3112d86cd; Required native compactions are missing; Fixed turn script did not finish
- screen-T5-103-baseline-1: status=failed, 3 operations, 1 compactions; Refusal-only or empty agent_end; unknown total: 9820cab9-3345-4108-883e-58c7a3076145; Fixed turn script did not finish; T5 completion-only cell protocol is nonconforming or inactive; Model attempt lacks physical token reservation: main/None 9820cab9-3345-4108-883e-58c7a3076145
- screen-T6-101-M3-0: status=failed, 5 operations, 0 compactions; Unresolved native accounting/model evidence: unsettled attempt: af415b04-1e14-4ba0-8914-2486e1b9ce3b; unknown total: af415b04-1e14-4ba0-8914-2486e1b9ce3b; Fixed turn script did not finish

## Agent outcomes

Known, admitted agent outcomes remain eligible observations, including unsuccessful completion and partial scores.
- screen-T5-103-M1-0: score=0.923; T5 completion unsuccessful
- screen-T5-103-M3-0: score=0.923; T5 completion unsuccessful
- screen-T5-103-baseline-0: score=0.923; T5 completion unsuccessful
- screen-T6-101-M3-0: score=unavailable; Required native compactions are missing; T6 M3 has no native deferral followed by automatic compaction

Missing required screen cells: 79. Ineligible screen cells: 2. Paid pilot cells: 4.

M1 changes summary content. M2 gates host completion. M3 tests bounded delay under the pinned prices, not adaptive economic selection. The factorial is not run.

## Historical screen stop and repair — BCF-60

The host screen stopped at `screen-T5-103-baseline-1` after five completed/eligible T2/103 cells. All five scored 38/39. There are 84 unrun cells and one retained failed/ineligible cell; affected T5/103 comparisons are unavailable. This repair did not launch or resume the screen.

Both faults are in the external harness. The empty final assistant had `stopReason=error` with `BCBENCH unsupported nontext input type`: the admission hook rejected native encrypted reasoning replay before original fetch. Native attempt `9820cab9-3345-4108-883e-58c7a3076145` had already been admitted/marked sent before the hook, explaining unknown usage and absent physical reservation. This is a local harness error, not a provider refusal or transient. T5's earlier `goal.create()` failed with `NameError` because all skills were disabled; no goal or completion-only attempt occurred. The goal skill is now explicitly loaded for every T5 arm, and reasoning replay obtains a full-context reservation. Actual agent errors are diagnosed before advancing operation progress.

The failed cell remains failed, unscored and usage-null. BCF-60 charges 78,609 known + 1,000,000 unknown allowance = 1,078,609 once, records three completed operations, and makes this named failure terminal for scheduling. stopped-result.json retains the original stop; raw evidence is unchanged. The identical NEXT.md command skips five completed cells and this failure, then schedules 84 unrun cells. Every other failed/unknown/dead-login/reservation stop remains.

Conservative spend: pilot 673,257 + screen 1,489,838 = **2,163,095**. Known reported usage: **636,093**; actual aggregate remains unavailable. Remaining projection: **16,800,000** + **1,000,000** reservation headroom gives projected aggregate **19,963,095**, below 25M by **5,036,905**. The owner allowance does not change the ceiling.

Python/Node syntax, existing task and native journal/RPC checks, native reasoning/goal resource-loading checks, and the offline scheduler happy path plus unresolved-failure edge passed without inference. Repeated resume skips completed work and charges each recorded cell once. The fork implementation is unchanged; this harness defect requires no fork regression test or implementation commit.

Pilot evidence remains unchanged: repeats 0/1/2 failed with charges 164,418 / 254,359 / 171,629; repeat 3 completed with 82,851 reported tokens, 38/39 score, six operations and two compactions. Known pilot subtotal 146,255; unknown allowances 527,002; conservative pilot charge 673,257. Early-retention calibration still fails, and BCF-59 still overrides admission for this screen only.


## Historical startup stop — BCF-61

The host subsequently retried this unpaid startup successfully. This cell is now completed/eligible at 12/13; the following describes the retained historical repair, not its current status. BCF-62 below supersedes the general agent-outcome stop rules.

At BCF-61, `screen-T5-103-M1-0` was `retryable_startup`, with eligibility unset, no score and zero budget charge. Only `get_state` id=1 was sent; RPC is empty and no admissions file exists. The actual late-created native session contains only its header: zero requests, receipts or model attempts. `stopped-result.json` preserves the original failed classification. Its initial startup failure leaves two retries; the cell remains unrun and is excluded from failed/ineligible outcome lists and paid-cell counts.

The daemon eventually started after cleanup had returned. CLI stderr was written at 15:39:00.175 UTC, and the failed result at 15:39:54.481. Native ownership was created at 15:40:24.731 and the socket at 15:40:49.842. The daemon log then reports catalog startup timeout at 15:41:19.992 and listening at 15:41:20.239. Native startup has a 30-second deadline; the evidence establishes slow boot beyond that deadline, while historical CPU load is unknown. Socket scope includes the unique cell home and package path, so this was not an earlier cell sharing its socket. Detailed evidence is in CHANGES-pilot-fix.md.

BCF-61 allows at most two retries before any model request, retains the count across resumes and charges zero. Exhaustion leaves the cell unrun and stops scheduling. Paid-attempt rules and the BCF-60 terminal failure remain. The harness now owns the daemon startup process group, waits up to the configured 900 seconds, stops stale daemons before startup, and stops the owned daemon and removes its socket on every exit. The seven existing screen daemons/sockets were cleaned up.

The entire NEXT.md is unchanged. Plan-only admission and the offline fixture scheduler select this cell first, skip five completed cells plus the BCF-60 failure, and retain 84 remaining cells. Spend remains 2,163,095; projection remains 19,963,095 under 25M. Syntax, existing task and journal/RPC checks, native state-only startup/cleanup, scheduler continuation, delayed-start cleanup and bounded-retry checks passed without model inference. The screen was not started. The fork code is unchanged.

The requested fork push used `git -c user.name="Maciej Nowak" -c user.email="maciej.nowak@synerise.com" push origin exp/paper-candidates` and completed with `Everything up-to-date`. Fork working tree is clean; no new fork commit or AI attribution was added. The sandbox initially blocked the local tracking-ref update; the authorized push was rerun with Git metadata access and completed without that error.


## Historical third-stop repair — BCF-62

The stop at screen-T5-103-M2-0 is case (a), a harness observer defect. Its first completion-only call correctly failed M2 with `Completion gate failed (exit 1): Required migration unfinished: manifest.json`, reported as `isError=false` and `details.status="error"`. The old observer recorded null acceptance. A separate manifest repair followed, then a second completion-only call succeeded with both files correct and final goal complete. Reconstructing acceptance from retained raw fields makes M2 completed/eligible at **13/13**, **96,967 tokens**, **$0.084310**, with the completion gate observed. Raw observations are unchanged; stopped-result.json retains the original stop. No fork change or M2 rerun is needed.

The earlier completed T5/M1 and M3 cells conformed: their completion calls were separate and accepted while manifest.json was unfinished. Both remain **12/13** for premature completion: M1 **86,191 tokens / $0.078435**; M3 **84,431 / $0.083027**. Their final workspaces are correct. These single-seed observations do not establish paired T5 treatment verdicts; BCF-60's failed baseline repeat keeps T5/103 A/A comparisons unavailable.

BCF-62 makes missing/mixed completion calls, unsuccessful completion, refusal/empty/invalid answers, soft-cell exhaustion and unobserved T6 automatic compaction/deferral eligible scored data. Infrastructure failures retain stop/retry rules. See the complete [stop-condition classification](/host/work/papers-r1/bcbench-mini/CHANGES-pilot-fix.md:79). Eight cells are completed/eligible, one infrastructure failure remains quarantined, and **81 cells are unrun**. The unchanged NEXT.md command resumes at screen-T5-103-baseline-0.

Charged spend is **2,430,684** (pilot **673,257**, screen **1,757,427**); known reported subtotal **903,682**, with actual aggregate still unavailable. Remaining projection **16,200,000** plus **1,000,000** headroom gives **19,630,684**, below 25M by **5,369,316**. Plan admission and offline checks passed, including actual observer replay, absent-completion scoring, 81-cell fixture continuation, repeated resume/single charging and preservation of infrastructure stops. This repair did not start the screen or send model requests.


## Fourth stop and continuation — BCF-63

The attempt had **no provider usage receipt**, and there is no measured usage to recover. The cause was a harness lifecycle defect: `agent_end` was treated as the end of all native work while automatic compaction was starting. In [rpc.jsonl](/host/work/papers-r1/bcbench-mini/runs/screen-T6-101-M3-0/rpc.jsonl:73), line 73 is `agent_end` and line 74 is `compaction_start`. Attempt `af415b04-1e14-4ba0-8914-2486e1b9ce3b` was admitted at **16:40:34.993Z** and accepted by the gate in [admissions.jsonl](/host/work/papers-r1/bcbench-mini/runs/screen-T6-101-M3-0/admissions.jsonl:7). The driver immediately raised unsettled accounting; cleanup cancelled the in-flight summary at **16:40:35.735Z**, 742 ms after admission. The [native receipt](/host/work/papers-r1/bcbench-mini/runs/screen-T6-101-M3-0/native-session.json:2604) has `outcome="cancelled"`, `rawUsage=[]`, `usage={}`, and `usageCompleteness="none"`, with no HTTP status, provider response ID, or first/last event time. The following native entry says **Compaction cancelled**. Provider code records HTTP status immediately after fetch returns and records raw usage when a response event carries it; neither happened here. This establishes a local cancellation before any response reached the adapter, rather than a usage parsing loss. It does not establish a provider outage or zero provider spend.

The preload now makes benchmark `DaemonAgentConnection.getState()` await the existing native `waitForIdle()` using the connection's own active session identity. The existing routed/plain request timeout hook also covers `wait_for_idle`, with the unchanged command's 900-second timeout. The driver obtains that state before reducing operation receipts, so automatic compaction and native receipt writes finish before the next turn, checkpoint or cleanup. There is no fork change or daemon wire change. The original cancelled settlement remains untouched; its real usage stays null. [stopped-result.json](/host/work/papers-r1/bcbench-mini/runs/screen-T6-101-M3-0/stopped-result.json) retains the original stop.

[BCF-63](/host/ops/goals/papers-r1/DECISIONS-bcf.md:146) charges each unknown screen attempt **1,000,000** tokens, the full 872k context + 128k output maximum, and records the attempt as infrastructure failed/ineligible. It permits one fresh paid retry of the same designed cell if the projection including the failed charge fits 25M. A second failed attempt is terminal and scheduling advances to other cells. Unknown failures stop scheduling only for an excessive projection, dead login, or three consecutive unknown physical attempts. A known-usage attempt resets the streak; unpaid startup does not. The retry limit and streak survive resume using existing results/native records. Native HTTP 401/403 is a login/access stop, including when its usage is unknown. BCF-60 retains its historical terminal failure without an added retry; BCF-61 startup bounds and BCF-62 outcome scoring remain. All paid retry spend counts; paired costs with unknown historical spend remain unavailable.

The [failed result](/host/work/papers-r1/bcbench-mini/runs/screen-T6-101-M3-0/result.json:114) now charges **96,772 known + 1,000,000 unknown = 1,096,772**, once. It stays failed/ineligible, with no score and five completed fixed operations. Six main receipts are known; its summary receipt is unknown. Current state: **nine completed/eligible cells, two retained paid infrastructure failures, 79 unrun cells, and one paid retry pending**. The earlier retryable-startup artifact is unpaid historical evidence, outside paid-cell counts; there is no active unpaid startup cell.

Budget: screen known **951,679** = completed **776,298** + failed known **175,381**. Pilot known **146,255** makes known aggregate **1,097,934**; actual totals remain unavailable. Screen charge **2,951,679** + pilot charge **673,257** = **3,624,936**. Remaining estimate **80 × 200,000 = 16,000,000** includes the fresh retry; add **1,000,000** headroom for a projected aggregate **20,624,936**, below 25M by **4,375,064**. The owner's up-to-30M allowance does not raise the screen ceiling. The current unknown streak is **one**.

The entire [NEXT.md](/host/work/papers-r1/bcbench-mini/NEXT.md) is unchanged. Its command, run only with `--execute` omitted, passes admission and selects **screen-T6-101-M3-0-retry-1** first, then 79 unrun cells. The original failed directory/session is retained and its operations are never replayed. [screen-plan.json](/host/work/papers-r1/bcbench-mini/screen-plan.json) holds the current projection and pending retry; NEXT.md's older explanatory numbers are historical. No screen was started.

Offline checks passed Python/Node syntax, the existing 18 seeded task gold/empty pairs and completion edge, native journal/RPC happy path and unsettled edge, the actual stop replay, and a synthetic completed-receipt replay through the idle ordering. Fixture scheduling completed exactly 80 pending cells, then skipped every saved completion on a second resume, retained original and retry charges once, and excluded unknown historical cost from paired comparisons. The actual cell runner also passed fresh paid-retry directory creation with a known happy path and a terminal unknown retry edge. The three-unknown edge stopped before a second retry and stayed stopped on resume; excessive projection and dead login prevented the next call. A native state-only check exercised the connection's real `wait_for_idle` with empty auth, zero model attempts, no physical admissions and full daemon shutdown. The fork remains clean at its existing head. **All repair/check work made zero model calls.**
