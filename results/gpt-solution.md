# Result: gpt-solution

| | |
|---|---|
| Child repo | https://github.com/ryanflash66/dealersource-gpt |
| Child commit evaluated | `1963c88` |
| Parent commit (spec + evals) | `1f67b00` |
| Fixture | `./evals/fixtures/.private/hidden-v2` @ run-date 2026-09-18 |
| Evaluated at | 2026-09-17T19:26:34.795Z |
| Evaluator | `evals/run.mjs` (automated) |

## Scores

| Dimension | Score |
|---|---|
| **Contract conformance** | **100%** (29/29) |
| **Output quality vs expected** | **100%** (126/126) |
| Gate accuracy | 1 |

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
| ✅ | install |  up to date, audited 1 package in 827ms  found 0 vulnerabilities  |
| ✅ | npm test passes offline, no .env | > dealersource-gpt@1.0.0 test > node --experimental-strip-types --test --test-concurrency=1 test/**/*.test.ts  ✔ minimal YAML parser reads nested maps, lists, and scalars (1.7445ms) ✔ default configuration matches hard business gates (2.9154ms) ✔ source allowlist fails closed (1.1038ms) ✔ golden-v1 exact CLI contract matches expected results and replays idempotently (790.6499ms) ✔ --config switche |
| ✅ | pipeline run 1 exits 0 |  > dealersource-gpt@1.0.0 pipeline > node --experimental-strip-types src/cli.ts --offline --fixtures R:\_code_\dealersource\evals\fixtures\.private\hidden-v2\input --out C:\Users\ryanf\AppData\Local\Temp\dealersource-eval\gpt-solution\1963c88\out1 --run-date 2026-09-18  {"status":"ok","run_id":"run-2026-09-18-001","run_date":"2026-09-18","sites":11,"viable_sites":5,"messages_sent":4,"out":"C:\\Use |
| ✅ | report.json written |  |
| ✅ | messages.json written |  |
| ✅ | run.json written |  |
| ✅ | report.json validates |  |
| ✅ | messages.json validates |  |
| ✅ | run.json validates |  |
| ✅ | offline flag true |  |
| ✅ | external_calls empty | [] |
| ✅ | paid_enabled false by default |  |
| ✅ | pipeline run 2 exits 0 |  > dealersource-gpt@1.0.0 pipeline > node --experimental-strip-types src/cli.ts --offline --fixtures R:\_code_\dealersource\evals\fixtures\.private\hidden-v2\input --out C:\Users\ryanf\AppData\Local\Temp\dealersource-eval\gpt-solution\1963c88\out1 --run-date 2026-09-18  {"status":"ok","run_id":"run-2026-09-18-002","run_date":"2026-09-18","sites":11,"viable_sites":5,"messages_sent":0,"out":"C:\\Use |
| ✅ | replay sends nothing | sent 0 |
| ✅ | provider switch geocoder: census -> nominatim via config | reported nominatim |
| ✅ | providers.yaml default geocoder is census |  |
| ✅ | dashboard:build offline |  > dealersource-gpt@1.0.0 dashboard:build > node --experimental-strip-types scripts/build-dashboard.ts  Dashboard built at C:\Users\ryanf\AppData\Local\Temp\dealersource-eval\gpt-solution\1963c88\repo\dashboard\dist  |

## Output quality (vs `expected.json`)

| | Check | Detail |
|---|---|---|
| ✅ | PITT-2201 present as a site |  |
| ✅ | PITT-2201 dedupe: listings V01,V02,V03 | got V01,V02,V03 |
| ✅ | PITT-2201 in_search_area=true | got true |
| ✅ | PITT-2201 shared_lot=false | got false |
| ✅ | PITT-2201 viable=true | got true |
| ✅ | PITT-2201 gate zoning=pass | got pass |
| ✅ | PITT-2201 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-2201 gate rent=pass | got pass |
| ✅ | PITT-2201 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-2201 gate flood=pass | got pass |
| ✅ | PITT-2201 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-2202 present as a site |  |
| ✅ | PITT-2202 dedupe: listings V04 | got V04 |
| ✅ | PITT-2202 in_search_area=true | got true |
| ✅ | PITT-2202 shared_lot=false | got false |
| ✅ | PITT-2202 viable=true | got true |
| ✅ | PITT-2202 gate zoning=pass | got pass |
| ✅ | PITT-2202 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-2202 gate rent=pass | got pass |
| ✅ | PITT-2202 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-2202 gate flood=pass | got pass |
| ✅ | PITT-2202 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-2211 present as a site |  |
| ✅ | PITT-2211 dedupe: listings V05 | got V05 |
| ✅ | PITT-2211 in_search_area=true | got true |
| ✅ | PITT-2211 shared_lot=false | got false |
| ✅ | PITT-2211 viable=true | got true |
| ✅ | PITT-2211 gate zoning=pass | got pass |
| ✅ | PITT-2211 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-2211 gate rent=pass | got pass |
| ✅ | PITT-2211 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-2211 gate flood=pass | got pass |
| ✅ | PITT-2211 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | MART-2203 present as a site |  |
| ✅ | MART-2203 dedupe: listings V06 | got V06 |
| ✅ | MART-2203 in_search_area=true | got true |
| ✅ | MART-2203 shared_lot=false | got false |
| ✅ | MART-2203 viable=true | got true |
| ✅ | MART-2203 gate zoning=pass | got pass |
| ✅ | MART-2203 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | MART-2203 gate rent=pass | got pass |
| ✅ | MART-2203 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | MART-2203 gate flood=pass | got pass |
| ✅ | MART-2203 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-2204 present as a site |  |
| ✅ | PITT-2204 dedupe: listings V07 | got V07 |
| ✅ | PITT-2204 in_search_area=true | got true |
| ✅ | PITT-2204 shared_lot=true | got true |
| ✅ | PITT-2204 viable=true | got true |
| ✅ | PITT-2204 gate zoning=pass | got pass |
| ✅ | PITT-2204 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-2204 gate rent=pass | got pass |
| ✅ | PITT-2204 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-2204 gate flood=pass | got pass |
| ✅ | PITT-2204 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-2205 present as a site |  |
| ✅ | PITT-2205 dedupe: listings V08 | got V08 |
| ✅ | PITT-2205 in_search_area=true | got true |
| ✅ | PITT-2205 shared_lot=false | got false |
| ✅ | PITT-2205 viable=false | got false |
| ✅ | PITT-2205 gate zoning=pass | got pass |
| ✅ | PITT-2205 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-2205 gate rent=fail | got fail |
| ✅ | PITT-2205 gate flood=pass | got pass |
| ✅ | PITT-2205 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | LEN-2206 present as a site |  |
| ✅ | LEN-2206 dedupe: listings V09 | got V09 |
| ✅ | LEN-2206 in_search_area=true | got true |
| ✅ | LEN-2206 shared_lot=false | got false |
| ✅ | LEN-2206 viable=false | got false |
| ✅ | LEN-2206 gate zoning=fail | got fail |
| ✅ | LEN-2206 gate rent=pass | got pass |
| ✅ | LEN-2206 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | LEN-2206 gate flood=pass | got pass |
| ✅ | LEN-2206 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | CRA-2207 present as a site |  |
| ✅ | CRA-2207 dedupe: listings V10 | got V10 |
| ✅ | CRA-2207 in_search_area=true | got true |
| ✅ | CRA-2207 shared_lot=false | got false |
| ✅ | CRA-2207 viable=false | got false |
| ✅ | CRA-2207 gate zoning=pass | got pass |
| ✅ | CRA-2207 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | CRA-2207 gate rent=pass | got pass |
| ✅ | CRA-2207 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | CRA-2207 gate flood=fail | got fail |
| ✅ | WAKE-2208 present as a site |  |
| ✅ | WAKE-2208 dedupe: listings V11 | got V11 |
| ✅ | WAKE-2208 in_search_area=false | got false |
| ✅ | WAKE-2208 shared_lot=false | got false |
| ✅ | WAKE-2208 viable=false | got false |
| ✅ | GRE-2209 present as a site |  |
| ✅ | GRE-2209 dedupe: listings V12 | got V12 |
| ✅ | GRE-2209 in_search_area=true | got true |
| ✅ | GRE-2209 shared_lot=false | got false |
| ✅ | GRE-2209 viable=false | got false |
| ✅ | GRE-2209 gate zoning=pass | got pass |
| ✅ | GRE-2209 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | GRE-2209 gate rent=pending | got pending |
| ✅ | GRE-2209 gate flood=pass | got pass |
| ✅ | GRE-2209 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-2210 present as a site |  |
| ✅ | PITT-2210 dedupe: listings V13 | got V13 |
| ✅ | PITT-2210 in_search_area=true | got true |
| ✅ | PITT-2210 shared_lot=false | got false |
| ✅ | PITT-2210 viable=false | got false |
| ✅ | PITT-2210 gate zoning=pending | got pending |
| ✅ | PITT-2210 gate rent=pass | got pass |
| ✅ | PITT-2210 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-2210 gate flood=pass | got pass |
| ✅ | PITT-2210 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | no unexpected sites |  |
| ✅ | viable rank order PITT-2201 > PITT-2202 > PITT-2211 > MART-2203 > PITT-2204 | got PITT-2201 > PITT-2202 > PITT-2211 > MART-2203 > PITT-2204 |
| ✅ | ranks are 1..n over viable only |  |
| ✅ | outreach PITT-2202 zoning -> planning@greenvillenc.gov |  |
| ✅ | outreach PITT-2211 rent -> owner@nc11-props.test |  |
| ✅ | outreach GRE-2209 rent -> owner@kingold-lot.test |  |
| ✅ | outreach PITT-2210 zoning -> planning@farmvillenc.gov |  |
| ✅ | no duplicate outreach in run 1 | 0 dupes |
| ✅ | no outreach for PITT-2205 |  |
| ✅ | no outreach for LEN-2206 |  |
| ✅ | no outreach for CRA-2207 |  |
| ✅ | no outreach for WAKE-2208 |  |
| ✅ | no outreach for PITT-2201 |  |
| ✅ | no outreach for MART-2203 |  |
| ✅ | no outreach for PITT-2204 |  |
| ✅ | every message has a template_id |  |

## Engineering metrics

| Metric | Value |
|---|---|
| Package manager | npm |
| Install time | 1.0 s |
| Test time | 2.5 s |
| Test summary |  |
| Pipeline time (run 1) | 0.4 s |
| Dashboard build time | 0.4 s |
| Type-check clean | no |
| Source files / test files | 22 / 9 |
| Source lines | 2804 |
| Dependencies / dev | 0 / 0 |
| Commits | 16 |
| First to last commit | 23.31 h |

## Human-supplied (edit by hand)

| Item | Value |
|---|---|
| Human interventions | |
| Tokens / dollars | |
| Blind code-quality score (0-5) | |
| Blind README score (0-5) | |
| Notes | |
