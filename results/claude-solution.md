# Result: claude-solution

| | |
|---|---|
| Child repo | https://github.com/ryanflash66/dealersource-claude |
| Child commit evaluated | `1d1d098` |
| Parent commit (spec + evals) | `f1c803e` |
| Fixture | `./evals/fixtures/hidden-v1` @ run-date 2026-09-17 |
| Evaluated at | 2026-09-17T03:44:49.371Z |
| Evaluator | `evals/run.mjs` (automated) |

## Scores

| Dimension | Score |
|---|---|
| **Contract conformance** | **100%** (29/29) |
| **Output quality vs expected** | **100%** (125/125) |
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
| ✅ | npm test passes offline, no .env | est.ts [2m([22m[2m9 tests[22m[2m)[22m[32m 248[2mms[22m[39m  [32m✓[39m tests/unit/outreach-policy.test.ts [2m([22m[2m7 tests[22m[2m)[22m[33m 514[2mms[22m[39m  [2m Test Files [22m [1m[32m11 passed[39m[22m[90m (11)[39m [2m      Tests [22m [1m[32m82 passed[39m[22m[90m (82)[39m [2m   Start at [22m 23:44:54 [2m   Duration [22m 1.69s[2m (transform 906ms, setup 3 |
| ✅ | pipeline run 1 exits 0 | ":{"sites_created":11,"listings_merged":1}} {"level":"info","msg":"stage start","at":"2026-09-17T03:44:57.560Z","run_id":"run_59abba721549cc18","stage":"enrich"} {"level":"info","msg":"stage done","at":"2026-09-17T03:44:57.571Z","run_id":"run_59abba721549cc18","stage":"enrich","counts":{"drivetime_fetched":11,"rent_from_listing":9,"zoning_permitted_by_table":6,"flood_fetched":10,"traffic_fetched": |
| ✅ | report.json written |  |
| ✅ | messages.json written |  |
| ✅ | run.json written |  |
| ✅ | report.json validates |  |
| ✅ | messages.json validates |  |
| ✅ | run.json validates |  |
| ✅ | offline flag true |  |
| ✅ | external_calls empty | [] |
| ✅ | paid_enabled false by default |  |
| ✅ | pipeline run 2 exits 0 | l":"info","msg":"stage done","at":"2026-09-17T03:44:58.363Z","run_id":"run_52a3aacba6ce53b5","stage":"verify","counts":{"groups_within_followup_window":1,"inbound_already_ingested":3}} {"level":"info","msg":"stage start","at":"2026-09-17T03:44:58.363Z","run_id":"run_52a3aacba6ce53b5","stage":"score"} {"level":"info","msg":"stage done","at":"2026-09-17T03:44:58.366Z","run_id":"run_52a3aacba6ce53b5" |
| ✅ | replay sends nothing | sent 0 |
| ✅ | provider switch geocoder: census -> nominatim via config | reported nominatim |
| ✅ | providers.yaml default geocoder is census |  |
| ✅ | dashboard:build offline | 2,"zoning_prohibited_by_table":1,"sites_out_of_area":1}} {"level":"info","msg":"stage start","at":"2026-09-17T03:45:00.853Z","run_id":"run_ffe8596487798e48","stage":"verify"} {"level":"info","msg":"stage done","at":"2026-09-17T03:45:00.859Z","run_id":"run_ffe8596487798e48","stage":"verify","counts":{"cases_opened":3,"messages_sent":3,"cases_resolved_by_reply":2,"inbound_ingested":2}} {"level":"inf |

## Output quality (vs `expected.json`)

| | Check | Detail |
|---|---|---|
| ✅ | PITT-1101 present as a site |  |
| ✅ | PITT-1101 dedupe: listings HL01,HL02 | got HL01,HL02 |
| ✅ | PITT-1101 in_search_area=true | got true |
| ✅ | PITT-1101 shared_lot=false | got false |
| ✅ | PITT-1101 viable=true | got true |
| ✅ | PITT-1101 gate zoning=pass | got pass |
| ✅ | PITT-1101 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-1101 gate rent=pass | got pass |
| ✅ | PITT-1101 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-1101 gate flood=pass | got pass |
| ✅ | PITT-1101 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | LEN-1102 present as a site |  |
| ✅ | LEN-1102 dedupe: listings HL03 | got HL03 |
| ✅ | LEN-1102 in_search_area=true | got true |
| ✅ | LEN-1102 shared_lot=false | got false |
| ✅ | LEN-1102 viable=true | got true |
| ✅ | LEN-1102 gate zoning=pass | got pass |
| ✅ | LEN-1102 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | LEN-1102 gate rent=pass | got pass |
| ✅ | LEN-1102 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | LEN-1102 gate flood=pass | got pass |
| ✅ | LEN-1102 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-1103 present as a site |  |
| ✅ | PITT-1103 dedupe: listings HL04 | got HL04 |
| ✅ | PITT-1103 in_search_area=true | got true |
| ✅ | PITT-1103 shared_lot=false | got false |
| ✅ | PITT-1103 viable=true | got true |
| ✅ | PITT-1103 gate zoning=pass | got pass |
| ✅ | PITT-1103 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-1103 gate rent=pass | got pass |
| ✅ | PITT-1103 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-1103 gate flood=pass | got pass |
| ✅ | PITT-1103 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-1104 present as a site |  |
| ✅ | PITT-1104 dedupe: listings HL05 | got HL05 |
| ✅ | PITT-1104 in_search_area=true | got true |
| ✅ | PITT-1104 shared_lot=false | got false |
| ✅ | PITT-1104 viable=false | got false |
| ✅ | PITT-1104 gate zoning=pass | got pass |
| ✅ | PITT-1104 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-1104 gate rent=fail | got fail |
| ✅ | PITT-1104 gate flood=pass | got pass |
| ✅ | PITT-1104 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | CRA-1105 present as a site |  |
| ✅ | CRA-1105 dedupe: listings HL06 | got HL06 |
| ✅ | CRA-1105 in_search_area=true | got true |
| ✅ | CRA-1105 shared_lot=false | got false |
| ✅ | CRA-1105 viable=false | got false |
| ✅ | CRA-1105 gate zoning=fail | got fail |
| ✅ | CRA-1105 gate rent=pass | got pass |
| ✅ | CRA-1105 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | CRA-1105 gate flood=pass | got pass |
| ✅ | CRA-1105 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | BEAU-1106 present as a site |  |
| ✅ | BEAU-1106 dedupe: listings HL07 | got HL07 |
| ✅ | BEAU-1106 in_search_area=true | got true |
| ✅ | BEAU-1106 shared_lot=false | got false |
| ✅ | BEAU-1106 viable=false | got false |
| ✅ | BEAU-1106 gate zoning=pass | got pass |
| ✅ | BEAU-1106 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | BEAU-1106 gate rent=pass | got pass |
| ✅ | BEAU-1106 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | BEAU-1106 gate flood=fail | got fail |
| ✅ | ONS-1107 present as a site |  |
| ✅ | ONS-1107 dedupe: listings HL08 | got HL08 |
| ✅ | ONS-1107 in_search_area=false | got false |
| ✅ | ONS-1107 shared_lot=false | got false |
| ✅ | ONS-1107 viable=false | got false |
| ✅ | EDG-1108 present as a site |  |
| ✅ | EDG-1108 dedupe: listings HL09 | got HL09 |
| ✅ | EDG-1108 in_search_area=true | got true |
| ✅ | EDG-1108 shared_lot=false | got false |
| ✅ | EDG-1108 viable=false | got false |
| ✅ | EDG-1108 gate zoning=pending | got pending |
| ✅ | EDG-1108 gate rent=pass | got pass |
| ✅ | EDG-1108 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | EDG-1108 gate flood=pass | got pass |
| ✅ | EDG-1108 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-1109 present as a site |  |
| ✅ | PITT-1109 dedupe: listings HL10 | got HL10 |
| ✅ | PITT-1109 in_search_area=true | got true |
| ✅ | PITT-1109 shared_lot=true | got true |
| ✅ | PITT-1109 viable=true | got true |
| ✅ | PITT-1109 gate zoning=pass | got pass |
| ✅ | PITT-1109 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-1109 gate rent=pass | got pass |
| ✅ | PITT-1109 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-1109 gate flood=pass | got pass |
| ✅ | PITT-1109 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | WIL-1110 present as a site |  |
| ✅ | WIL-1110 dedupe: listings HL11 | got HL11 |
| ✅ | WIL-1110 in_search_area=true | got true |
| ✅ | WIL-1110 shared_lot=false | got false |
| ✅ | WIL-1110 viable=false | got false |
| ✅ | WIL-1110 gate zoning=pass | got pass |
| ✅ | WIL-1110 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | WIL-1110 gate rent=fail | got fail |
| ✅ | WIL-1110 gate flood=pass | got pass |
| ✅ | WIL-1110 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | GRE-1111 present as a site |  |
| ✅ | GRE-1111 dedupe: listings HL12 | got HL12 |
| ✅ | GRE-1111 in_search_area=true | got true |
| ✅ | GRE-1111 shared_lot=false | got false |
| ✅ | GRE-1111 viable=false | got false |
| ✅ | GRE-1111 gate zoning=pass | got pass |
| ✅ | GRE-1111 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | GRE-1111 gate rent=pass | got pass |
| ✅ | GRE-1111 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | GRE-1111 gate flood=fail | got fail |
| ✅ | no unexpected sites |  |
| ✅ | viable rank order PITT-1101 > PITT-1103 > LEN-1102 > PITT-1109 | got PITT-1101 > PITT-1103 > LEN-1102 > PITT-1109 |
| ✅ | ranks are 1..n over viable only |  |
| ✅ | outreach PITT-1103 zoning -> planning@greenvillenc.gov |  |
| ✅ | outreach EDG-1108 zoning -> planning@tarboro-nc.gov |  |
| ✅ | outreach WIL-1110 rent -> owner@raleighrd-props.test |  |
| ✅ | outreach WIL-1110 zoning -> planning@wilsonnc.gov |  |
| ✅ | no duplicate outreach in run 1 | 0 dupes |
| ✅ | no outreach for PITT-1104 |  |
| ✅ | no outreach for CRA-1105 |  |
| ✅ | no outreach for BEAU-1106 |  |
| ✅ | no outreach for ONS-1107 |  |
| ✅ | no outreach for GRE-1111 |  |
| ✅ | no outreach for PITT-1101 |  |
| ✅ | no outreach for LEN-1102 |  |
| ✅ | every message has a template_id |  |

## Engineering metrics

| Metric | Value |
|---|---|
| Package manager | npm |
| Install time | 3.8 s |
| Test time | 3.1 s |
| Test summary | 11 passed |
| Pipeline time (run 1) | 0.8 s |
| Dashboard build time | 3.3 s |
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
