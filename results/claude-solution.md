# Result: claude-solution

| | |
|---|---|
| Child repo | https://github.com/ryanflash66/dealersource-claude |
| Child commit evaluated | `e1426fc` |
| Parent commit (spec + evals) | `eab44ac` |
| Fixture | `./evals/fixtures/golden-v1` @ run-date 2026-09-16 |
| Evaluated at | 2026-09-16T21:44:43.393Z |
| Evaluator | `evals/run.mjs` (automated) |

## Scores

| Dimension | Score |
|---|---|
| **Contract conformance** | **100%** (29/29) |
| **Output quality vs expected** | **100%** (90/90) |
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
| ✅ | npm test passes offline, no .env | st.ts [2m([22m[2m17 tests[22m[2m)[22m[33m 367[2mms[22m[39m  [32m✓[39m tests/unit/outreach-policy.test.ts [2m([22m[2m7 tests[22m[2m)[22m[33m 547[2mms[22m[39m  [2m Test Files [22m [1m[32m11 passed[39m[22m[90m (11)[39m [2m      Tests [22m [1m[32m82 passed[39m[22m[90m (82)[39m [2m   Start at [22m 17:44:49 [2m   Duration [22m 1.62s[2m (transform 832ms, setup 3 |
| ✅ | pipeline run 1 exits 0 | ","counts":{"sites_created":8,"listings_merged":2}} {"level":"info","msg":"stage start","at":"2026-09-16T21:44:51.832Z","run_id":"run_56b4f9a0304bda17","stage":"enrich"} {"level":"info","msg":"stage done","at":"2026-09-16T21:44:51.844Z","run_id":"run_56b4f9a0304bda17","stage":"enrich","counts":{"drivetime_fetched":8,"rent_from_listing":6,"zoning_permitted_by_table":4,"flood_fetched":7,"traffic_fet |
| ✅ | report.json written |  |
| ✅ | messages.json written |  |
| ✅ | run.json written |  |
| ✅ | report.json validates |  |
| ✅ | messages.json validates |  |
| ✅ | run.json validates |  |
| ✅ | offline flag true |  |
| ✅ | external_calls empty | [] |
| ✅ | paid_enabled false by default |  |
| ✅ | pipeline run 2 exits 0 | vel":"info","msg":"stage done","at":"2026-09-16T21:44:52.612Z","run_id":"run_4ce47ff2cb1245f5","stage":"verify","counts":{"groups_within_followup_window":1,"inbound_already_ingested":2}} {"level":"info","msg":"stage start","at":"2026-09-16T21:44:52.612Z","run_id":"run_4ce47ff2cb1245f5","stage":"score"} {"level":"info","msg":"stage done","at":"2026-09-16T21:44:52.614Z","run_id":"run_4ce47ff2cb1245f |
| ✅ | replay sends nothing | sent 0 |
| ✅ | provider switch geocoder: census -> nominatim via config | reported nominatim |
| ✅ | providers.yaml default geocoder is census |  |
| ✅ | dashboard:build offline | 2,"zoning_prohibited_by_table":1,"sites_out_of_area":1}} {"level":"info","msg":"stage start","at":"2026-09-16T21:44:55.075Z","run_id":"run_0d21bc028c37e02d","stage":"verify"} {"level":"info","msg":"stage done","at":"2026-09-16T21:44:55.080Z","run_id":"run_0d21bc028c37e02d","stage":"verify","counts":{"cases_opened":3,"messages_sent":3,"cases_resolved_by_reply":2,"inbound_ingested":2}} {"level":"inf |

## Output quality (vs `expected.json`)

| | Check | Detail |
|---|---|---|
| ✅ | PITT-0001 present as a site |  |
| ✅ | PITT-0001 dedupe: listings L01,L02,L03 | got L01,L02,L03 |
| ✅ | PITT-0001 in_search_area=true | got true |
| ✅ | PITT-0001 shared_lot=false | got false |
| ✅ | PITT-0001 viable=true | got true |
| ✅ | PITT-0001 gate zoning=pass | got pass |
| ✅ | PITT-0001 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-0001 gate rent=pass | got pass |
| ✅ | PITT-0001 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-0001 gate flood=pass | got pass |
| ✅ | PITT-0001 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-0002 present as a site |  |
| ✅ | PITT-0002 dedupe: listings L04 | got L04 |
| ✅ | PITT-0002 in_search_area=true | got true |
| ✅ | PITT-0002 shared_lot=false | got false |
| ✅ | PITT-0002 viable=true | got true |
| ✅ | PITT-0002 gate zoning=pass | got pass |
| ✅ | PITT-0002 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-0002 gate rent=pass | got pass |
| ✅ | PITT-0002 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-0002 gate flood=pass | got pass |
| ✅ | PITT-0002 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-0003 present as a site |  |
| ✅ | PITT-0003 dedupe: listings L05 | got L05 |
| ✅ | PITT-0003 in_search_area=true | got true |
| ✅ | PITT-0003 shared_lot=false | got false |
| ✅ | PITT-0003 viable=false | got false |
| ✅ | PITT-0003 gate zoning=pass | got pass |
| ✅ | PITT-0003 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-0003 gate rent=fail | got fail |
| ✅ | PITT-0003 gate flood=pass | got pass |
| ✅ | PITT-0003 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | BEAU-0004 present as a site |  |
| ✅ | BEAU-0004 dedupe: listings L06 | got L06 |
| ✅ | BEAU-0004 in_search_area=true | got true |
| ✅ | BEAU-0004 shared_lot=false | got false |
| ✅ | BEAU-0004 viable=false | got false |
| ✅ | BEAU-0004 gate zoning=fail | got fail |
| ✅ | BEAU-0004 gate rent=pass | got pass |
| ✅ | BEAU-0004 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | BEAU-0004 gate flood=pass | got pass |
| ✅ | BEAU-0004 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-0005 present as a site |  |
| ✅ | PITT-0005 dedupe: listings L07 | got L07 |
| ✅ | PITT-0005 in_search_area=true | got true |
| ✅ | PITT-0005 shared_lot=false | got false |
| ✅ | PITT-0005 viable=false | got false |
| ✅ | PITT-0005 gate zoning=pass | got pass |
| ✅ | PITT-0005 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-0005 gate rent=pass | got pass |
| ✅ | PITT-0005 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-0005 gate flood=fail | got fail |
| ✅ | PITT-0006 present as a site |  |
| ✅ | PITT-0006 dedupe: listings L08 | got L08 |
| ✅ | PITT-0006 in_search_area=true | got true |
| ✅ | PITT-0006 shared_lot=true | got true |
| ✅ | PITT-0006 viable=true | got true |
| ✅ | PITT-0006 gate zoning=pass | got pass |
| ✅ | PITT-0006 gate zoning has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-0006 gate rent=pass | got pass |
| ✅ | PITT-0006 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-0006 gate flood=pass | got pass |
| ✅ | PITT-0006 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | WAYN-0007 present as a site |  |
| ✅ | WAYN-0007 dedupe: listings L09 | got L09 |
| ✅ | WAYN-0007 in_search_area=false | got false |
| ✅ | WAYN-0007 shared_lot=false | got false |
| ✅ | WAYN-0007 viable=false | got false |
| ✅ | PITT-0008 present as a site |  |
| ✅ | PITT-0008 dedupe: listings L10 | got L10 |
| ✅ | PITT-0008 in_search_area=true | got true |
| ✅ | PITT-0008 shared_lot=false | got false |
| ✅ | PITT-0008 viable=false | got false |
| ✅ | PITT-0008 gate zoning=pending | got pending |
| ✅ | PITT-0008 gate rent=pass | got pass |
| ✅ | PITT-0008 gate rent has cited evidence with expiry | 1 evidence rows |
| ✅ | PITT-0008 gate flood=pass | got pass |
| ✅ | PITT-0008 gate flood has cited evidence with expiry | 1 evidence rows |
| ✅ | no unexpected sites |  |
| ✅ | viable rank order PITT-0001 > PITT-0002 > PITT-0006 | got PITT-0001 > PITT-0002 > PITT-0006 |
| ✅ | ranks are 1..n over viable only |  |
| ✅ | outreach PITT-0002 rent -> owner@tenth-street-props.test |  |
| ✅ | outreach PITT-0002 zoning -> planning@greenvillenc.gov |  |
| ✅ | outreach PITT-0008 zoning -> planning@aydennc.gov |  |
| ✅ | no duplicate outreach in run 1 | 0 dupes |
| ✅ | no outreach for PITT-0003 |  |
| ✅ | no outreach for BEAU-0004 |  |
| ✅ | no outreach for PITT-0005 |  |
| ✅ | no outreach for WAYN-0007 |  |
| ✅ | every message has a template_id |  |

## Engineering metrics

| Metric | Value |
|---|---|
| Package manager | npm |
| Install time | 4.0 s |
| Test time | 3.2 s |
| Test summary | 11 passed |
| Pipeline time (run 1) | 0.8 s |
| Dashboard build time | 3.3 s |
| Type-check clean | yes |
| Source files / test files | 61 / 12 |
| Source lines | 8120 |
| Dependencies / dev | 3 / 6 |
| Commits | 6 |
| First to last commit | 1.62 h |

## Human-supplied (edit by hand)

| Item | Value |
|---|---|
| Human interventions | |
| Tokens / dollars | |
| Blind code-quality score (0-5) | |
| Blind README score (0-5) | |
| Notes | |
