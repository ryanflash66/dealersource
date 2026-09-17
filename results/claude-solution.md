# Result: claude-solution

| | |
|---|---|
| Child repo | https://github.com/ryanflash66/dealersource-claude |
| Child commit evaluated | `1d1d098` |
| Parent commit (spec + evals) | `c8fc13e` |
| Fixture | `./evals/fixtures/.private/hidden-v2` @ run-date 2026-09-18 |
| Evaluated at | 2026-09-17T19:12:49.483Z |
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
| ✅ | script "test" | vitest run |
| ✅ | script "pipeline" | tsx src/cli.ts run |
| ✅ | script "dashboard:build" | node scripts/build-dashboard.mjs |
| ✅ | script "dashboard:dev" | node scripts/build-dashboard.mjs && node scripts/serve-dashboard.mjs |
| ✅ | providers.yaml present |  |
| ✅ | business.yaml present |  |
| ✅ | .env.example present |  |
| ✅ | no .env committed |  |
| ✅ | README references parent prompts by URL |  |
| ✅ | docs/decisions.md present |  |
| ✅ | install |  added 120 packages, and audited 121 packages in 4s  19 packages are looking for funding   run `npm fund` for details  2 moderate severity vulnerabilities  To address all issues (including breaking changes), run:   npm audit fix --force  Run `npm audit` for details.  |
| ✅ | npm test passes offline, no .env | .test.ts [2m([22m[2m7 tests[22m[2m)[22m[33m 554[2mms[22m[39m  [32m✓[39m tests/integration/golden.test.ts [2m([22m[2m9 tests[22m[2m)[22m[32m 182[2mms[22m[39m  [2m Test Files [22m [1m[32m11 passed[39m[22m[90m (11)[39m [2m      Tests [22m [1m[32m82 passed[39m[22m[90m (82)[39m [2m   Start at [22m 15:12:57 [2m   Duration [22m 2.29s[2m (transform 988ms, setup 4 |
| ✅ | pipeline run 1 exits 0 | ":{"sites_created":11,"listings_merged":2}} {"level":"info","msg":"stage start","at":"2026-09-17T19:13:00.723Z","run_id":"run_b8b1911a629630a9","stage":"enrich"} {"level":"info","msg":"stage done","at":"2026-09-17T19:13:00.736Z","run_id":"run_b8b1911a629630a9","stage":"enrich","counts":{"drivetime_fetched":11,"rent_from_listing":8,"zoning_permitted_by_table":7,"flood_fetched":10,"traffic_fetched": |
| ✅ | report.json written |  |
| ✅ | messages.json written |  |
| ✅ | run.json written |  |
| ✅ | report.json validates |  |
| ✅ | messages.json validates |  |
| ✅ | run.json validates |  |
| ✅ | offline flag true |  |
| ✅ | external_calls empty | [] |
| ✅ | paid_enabled false by default |  |
| ✅ | pipeline run 2 exits 0 | l":"info","msg":"stage done","at":"2026-09-17T19:13:01.533Z","run_id":"run_679b1c43437d969f","stage":"verify","counts":{"groups_within_followup_window":2,"inbound_already_ingested":2}} {"level":"info","msg":"stage start","at":"2026-09-17T19:13:01.533Z","run_id":"run_679b1c43437d969f","stage":"score"} {"level":"info","msg":"stage done","at":"2026-09-17T19:13:01.535Z","run_id":"run_679b1c43437d969f" |
| ✅ | replay sends nothing | sent 0 |
| ✅ | provider switch geocoder: census -> nominatim via config | reported nominatim |
| ✅ | providers.yaml default geocoder is census |  |
| ✅ | dashboard:build offline | 2,"zoning_prohibited_by_table":1,"sites_out_of_area":1}} {"level":"info","msg":"stage start","at":"2026-09-17T19:13:04.084Z","run_id":"run_889c903bd3434563","stage":"verify"} {"level":"info","msg":"stage done","at":"2026-09-17T19:13:04.088Z","run_id":"run_889c903bd3434563","stage":"verify","counts":{"cases_opened":3,"messages_sent":3,"cases_resolved_by_reply":2,"inbound_ingested":2}} {"level":"inf |

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
| Install time | 4.7 s |
| Test time | 4.9 s |
| Test summary | 11 passed |
| Pipeline time (run 1) | 0.9 s |
| Dashboard build time | 3.4 s |
| Type-check clean | yes |
| Source files / test files | 61 / 12 |
| Source lines | 7639 |
| Dependencies / dev | 3 / 6 |
| Commits | 15 |
| First to last commit | 6.58 h |

## Human-supplied (edit by hand)

| Item | Value |
|---|---|
| Human interventions | |
| Tokens / dollars | |
| Blind code-quality score (0-5) | |
| Blind README score (0-5) | |
| Notes | |
