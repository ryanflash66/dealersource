# Result: hyperagent-solution

| | |
|---|---|
| Child repo | https://github.com/ryanflash66/dealersource-hyperagent |
| Child commit evaluated | `8f9b1d3` |
| Parent commit (spec + evals) | `dd17f72` |
| Fixture | `./evals/fixtures/hidden-v1` @ run-date 2026-09-17 |
| Evaluated at | 2026-09-17T03:31:57.252Z |
| Evaluator | `evals/run.mjs` (automated) |

## Scores

| Dimension | Score |
|---|---|
| **Contract conformance** | **87%** (13/15) |
| **Output quality vs expected** | **0%** (0/0) |
| Gate accuracy | n/a |

## Conformance (spec section 13 and 14)

| | Check | Detail |
|---|---|---|
| ✅ | fresh clone |  |
| ✅ | package.json present |  |
| ✅ | script "test" | node scripts/test.ts |
| ✅ | script "pipeline" | node src/cli.ts |
| ✅ | script "dashboard:build" | node scripts/build.ts |
| ✅ | script "dashboard:dev" | node scripts/dashboard.ts |
| ✅ | providers.yaml present |  |
| ✅ | business.yaml present |  |
| ✅ | .env.example present |  |
| ✅ | no .env committed |  |
| ✅ | README references parent prompts by URL |  |
| ✅ | docs/decisions.md present |  |
| ✅ | install |  up to date, audited 1 package in 748ms  found 0 vulnerabilities  |
| ❌ | npm test passes offline, no .env |  > dealersource-gpt@1.0.0 test > node scripts/test.ts  TAP version 13 node:internal/test_runner/harness:124       throw err;       ^  Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'c:'     at throwIfUnsupportedURLScheme (node:internal/mod |
| ❌ | pipeline run 1 exits 0 |  > dealersource-gpt@1.0.0 pipeline > node src/cli.ts --offline --fixtures R:\_code_\dealersource\evals\fixtures\hidden-v1\input --out C:\Users\ryanf\AppData\Local\Temp\dealersource-eval\hyperagent-solution\8f9b1d3\out1 --run-date 2026-09-17  {"error":"Unknown option --fixtures"}  |

## Output quality (vs `expected.json`)

| | Check | Detail |
|---|---|---|
| ❌ | not evaluated | pipeline did not produce a report |

## Engineering metrics

| Metric | Value |
|---|---|
| Package manager | npm |
| Install time | 0.9 s |
| Test time | 0.4 s |
| Test summary |  |
| Pipeline time (run 1) | 0.4 s |
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
