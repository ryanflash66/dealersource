# evals/

Everything needed to judge every solution **the same way, automatically**.

| Path | Purpose |
|---|---|
| `contract/` | JSON Schemas for the offline contract (spec section 14). What every solution must emit. |
| `fixtures/golden-v1/` | Sample fixture inputs plus `expected.json`. Agents test against this. |
| `fixtures/hidden-v1/` | First blind set. Public now, so no longer blind. |
| `fixtures/.private/` | Current blind sets (git-ignored, never committed). `hidden-v2` is the set the leaderboard uses from 2026-09-17. |
| `run.mjs` | The evaluator. Zero dependencies, Node 20+. |
| `rubric.md` | The human-scored dimensions that the evaluator cannot measure. |
| `tasks/` | Human-run checks, one file each. |

## Running

```bash
node evals/run.mjs                       # every agent under agents/
node evals/run.mjs claude-solution       # one agent
node evals/run.mjs --fixture evals/fixtures/hidden-v1 --post   # hidden set, post to leaderboard issue
node evals/run.mjs --keep                # keep the temp clone for inspection
```

For each agent the evaluator fresh-clones the pinned SHA into a temp dir,
installs, runs the tests with network blocked via proxy env, runs the
pipeline twice on the fixture (replay must send nothing), runs it once more
with `geocoder` switched to `nominatim` via `--config`, builds the dashboard,
validates outputs against `contract/`, compares to `expected.json`, and
collects engineering metrics from git and package.json.

Outputs:

- `results/<agent>.md` — full per-agent table (overwrites the automated
  sections, keeps a human-supplied block for you to fill in)
- `results/raw/<agent>.json` and `results/raw/leaderboard.md` (git-ignored)
- with `--post`: a comment on the Leaderboard issue

## What is measured

| Dimension | How |
|---|---|
| Contract conformance | ~30 pass/fail checks: layout, scripts, offline test run, CLI, schema validity, replay idempotency, provider switch, dashboard build |
| Output quality | Per-site checks against `expected.json`: dedupe, search area, gates, evidence cited, viability, rank order, outreach sent to the right recipients, no duplicates, no outreach where forbidden |
| Engineering | install/test/pipeline/build times, type-check, source and test file counts, LOC, dependency counts, commits, wall-clock span |
| Human | interventions, cost, blind code and README scores (rubric.md) |

## Fairness rules

- Agents see `golden-v1`. The leaderboard that matters runs on a hidden set
  with the same shape, created after all agents have pushed.
- Evaluate every agent at a pinned SHA recorded in the parent. Never evaluate
  a working tree.
- Do not change `contract/` mid-experiment. If you must, bump
  `schema_version` and note it in `results/summary.md`.
