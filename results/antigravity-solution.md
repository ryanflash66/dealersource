# Result: antigravity-solution

| | |
|---|---|
| Child repo | https://github.com/ryanflash66/dealersource-antigravity |
| Child commit evaluated | `aca2ccd` |
| Parent commit (spec + evals) | `4fe4273` |
| Fixture | `./evals/fixtures/hidden-v1` @ run-date 2026-09-17 |
| Evaluated at | 2026-09-17T00:22:06.545Z |
| Evaluator | `evals/run.mjs` (automated) |

## Scores

| Dimension | Score |
|---|---|
| **Contract conformance** | **62%** (8/13) |
| **Output quality vs expected** | **0%** (0/0) |
| Gate accuracy | n/a |

## Conformance (spec section 13 and 14)

| | Check | Detail |
|---|---|---|
| ✅ | fresh clone |  |
| ✅ | package.json present |  |
| ✅ | script "test" | npm test --workspaces --if-present |
| ✅ | script "pipeline" | npm run pipeline --workspace=packages/pipeline -- |
| ❌ | script "dashboard:build" | missing |
| ✅ | script "dashboard:dev" | npm run dev --workspace=apps/dashboard |
| ❌ | providers.yaml present |  |
| ❌ | business.yaml present |  |
| ✅ | .env.example present |  |
| ✅ | no .env committed |  |
| ❌ | README references parent prompts by URL |  |
| ✅ | docs/decisions.md present |  |
| ❌ | install | issing: @babel/runtime@7.29.7 from lock file npm error Missing: ts-algebra@2.0.0 from lock file npm error Missing: is-promise@1.0.1 from lock file npm error Missing: promise@1.3.0 from lock file npm error Missing: core-util-is@1.0.3 from lock file npm error Missing: isarray@0.0.1 from lock file npm error Missing: string_decoder@0.10.31 from lock file npm error Missing: @stablelib/base64@1.0.1 from |

## Output quality (vs `expected.json`)

| | Check | Detail |
|---|---|---|
| ❌ | not evaluated | pipeline did not produce a report |

## Engineering metrics

| Metric | Value |
|---|---|
| Package manager | npm |
| Install time | 10.4 s |
| Test time |  |
| Test summary |  |
| Pipeline time (run 1) |  |
| Dashboard build time |  |
| Type-check clean | n/a |
| Source files / test files |  /  |
| Source lines |  |
| Dependencies / dev |  /  |
| Commits |  |
| First to last commit |  |

## Human-supplied (edit by hand)

| Item | Value |
|---|---|
| Human interventions | |
| Tokens / dollars | |
| Blind code-quality score (0-5) | |
| Blind README score (0-5) | |
| Notes | |
