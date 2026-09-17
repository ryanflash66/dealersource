# Result: gpt-solution

| | |
|---|---|
| Child repo | https://github.com/ryanflash66/dealersource-gpt |
| Child commit evaluated | `6aa86c7` |
| Parent commit (spec + evals) | `3a91a2f` |
| Fixture | `./evals/fixtures/hidden-v1` @ run-date 2026-09-17 |
| Evaluated at | 2026-09-17T03:01:01.160Z |
| Evaluator | `evals/run.mjs` (automated) |

## Scores

| Dimension | Score |
|---|---|
| **Contract conformance** | **78%** (18/23) |
| **Output quality vs expected** | **0%** (0/0) |
| Gate accuracy | n/a |

## Conformance (spec section 13 and 14)

| | Check | Detail |
|---|---|---|
| ✅ | fresh clone |  |
| ✅ | package.json present |  |
| ✅ | script "test" | node --experimental-strip-types --test --test-concurrency=1 test/**/*.test.ts |
| ✅ | script "pipeline" | node --experimental-strip-types src/cli.ts |
| ✅ | script "dashboard:build" | node --experimental-strip-types scripts/build-dashboard.ts |
| ✅ | script "dashboard:dev" | node --experimental-strip-types dashboard/server.ts |
| ✅ | providers.yaml present |  |
| ✅ | business.yaml present |  |
| ✅ | .env.example present |  |
| ✅ | no .env committed |  |
| ✅ | README references parent prompts by URL |  |
| ✅ | docs/decisions.md present |  |
| ✅ | install |  up to date, audited 1 package in 790ms  found 0 vulnerabilities  |
| ✅ | npm test passes offline, no .env |  > dealersource-gpt@1.0.0 test > node --experimental-strip-types --test --test-concurrency=1 test/**/*.test.ts  ✔ minimal YAML parser reads nested maps, lists, and scalars (1.4101ms) ✔ default configuration matches hard business gates (2.9709ms) ✔ source allowlist fails closed (1.1721ms) ✔ dashboard builds a credential-free static artifact (57.2308ms) ✔ all three gates require current cited eviden |
| ✅ | pipeline run 1 exits 0 | costClass":"free"}} {"timestamp":"2026-09-17T09:00:00.000Z","runId":"run-2026-09-17-001","level":"info","event":"provider.call","details":{"layer":"competitors","provider":"overpass","mode":"fixture","paid":false,"costClass":"free"}} {"timestamp":"2026-09-17T09:00:00.000Z","runId":"run-2026-09-17-001","level":"info","event":"stage.enrich","details":{"sites":4}} {"timestamp":"2026-09-17T09:00:00.00 |
| ❌ | report.json written |  |
| ❌ | messages.json written |  |
| ❌ | run.json written |  |
| ✅ | pipeline run 2 exits 0 | ges":0,"openCases":1,"bounceRate":0,"mailPaused":false}} {"timestamp":"2026-09-17T09:00:00.000Z","runId":"run-2026-09-17-002","level":"info","event":"stage.score","details":{"viable":2}} {"timestamp":"2026-09-17T09:00:00.000Z","runId":"run-2026-09-17-002","level":"info","event":"stage.report","details":{"shortlist":2,"path":"C:\\Users\\ryanf\\AppData\\Local\\Temp\\dealersource-eval\\gpt-solution\\ |
| ❌ | replay sends nothing | sent undefined |
| ❌ | provider switch geocoder: census -> nominatim via config | reported undefined |
| ✅ | providers.yaml default geocoder is census |  |
| ✅ | dashboard:build offline |  > dealersource-gpt@1.0.0 dashboard:build > node --experimental-strip-types scripts/build-dashboard.ts  Dashboard built at C:\Users\ryanf\AppData\Local\Temp\dealersource-eval\gpt-solution\6aa86c7\repo\dashboard\dist  |

## Output quality (vs `expected.json`)

| | Check | Detail |
|---|---|---|
| ❌ | not evaluated | pipeline did not produce a report |

## Engineering metrics

| Metric | Value |
|---|---|
| Package manager | npm |
| Install time | 1.0 s |
| Test time | 1.3 s |
| Test summary |  |
| Pipeline time (run 1) | 0.4 s |
| Dashboard build time | 0.4 s |
| Type-check clean | no |
| Source files / test files | 20 / 8 |
| Source lines | 2007 |
| Dependencies / dev | 0 / 0 |
| Commits | 12 |
| First to last commit | 6.63 h |

## Human-supplied (edit by hand)

| Item | Value |
|---|---|
| Human interventions | |
| Tokens / dollars | |
| Blind code-quality score (0-5) | |
| Blind README score (0-5) | |
| Notes | |
