# Result: claude-solution

| | |
|---|---|
| Child repo | https://github.com/ryanflash66/dealersource-claude |
| Child commit evaluated | `e55436a` |
| Parent commit (spec + evals) | `85e9549` |
| Fixture | `./evals/fixtures/golden-v1` @ run-date 2026-09-16 |
| Evaluated at | 2026-09-25T00:47:14.998Z |
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
| ✅ | install |  added 176 packages, and audited 177 packages in 4s  23 packages are looking for funding   run `npm fund` for details  2 moderate severity vulnerabilities  To address all issues (including breaking changes), run:   npm audit fix --force  Run `npm audit` for details.  |
| ✅ | npm test passes offline, no .env | sts[22m[2m)[22m[33m 343[2mms[22m[39m  [32m✓[39m tests/unit/sources.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 114[2mms[22m[39m  [32m✓[39m tests/unit/pause.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 120[2mms[22m[39m  [32m✓[39m tests/unit/unknown-distance.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 254[2mms[22m[39m  [2m Test Files [22m [1m[32m24 passed[3 |
| ✅ | pipeline run 1 exits 0 | es_created":8,"listings_merged":2}} {"level":"info","msg":"stage start","at":"2026-09-25T00:47:24.703Z","run_id":"run_a53fed907ed549c0","stage":"enrich"} {"level":"info","msg":"stage done","at":"2026-09-25T00:47:24.716Z","run_id":"run_a53fed907ed549c0","stage":"enrich","counts":{"drivetime_fetched":8,"rent_from_listing":6,"zoning_permitted_by_table":4,"flood_fetched":7,"traffic_fetched":7,"competi |
| ✅ | report.json written |  |
| ✅ | messages.json written |  |
| ✅ | run.json written |  |
| ✅ | report.json validates |  |
| ✅ | messages.json validates |  |
| ✅ | run.json validates |  |
| ✅ | offline flag true |  |
| ✅ | external_calls empty | [] |
| ✅ | paid_enabled false by default |  |
| ✅ | pipeline run 2 exits 0 | vel":"info","msg":"stage done","at":"2026-09-25T00:47:25.433Z","run_id":"run_d01ebdcf7d78b980","stage":"verify","counts":{"groups_within_followup_window":1,"inbound_already_ingested":2}} {"level":"info","msg":"stage start","at":"2026-09-25T00:47:25.433Z","run_id":"run_d01ebdcf7d78b980","stage":"score"} {"level":"info","msg":"stage done","at":"2026-09-25T00:47:25.435Z","run_id":"run_d01ebdcf7d78b98 |
| ✅ | replay sends nothing | sent 0 |
| ✅ | provider switch geocoder: census -> nominatim via config | reported nominatim |
| ✅ | providers.yaml default geocoder is census |  |
| ✅ | dashboard:build offline | ited_by_table":1,"sites_out_of_area":1}} {"level":"info","msg":"stage start","at":"2026-09-25T00:47:27.718Z","run_id":"run_d1bcae4a9f38f26c","stage":"verify"} {"level":"info","msg":"stage done","at":"2026-09-25T00:47:27.723Z","run_id":"run_d1bcae4a9f38f26c","stage":"verify","counts":{"cases_opened":3,"messages_sent":3,"emails_sent":3,"cases_resolved_by_reply":2,"inbound_ingested":2}} {"level":"inf |

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
| Install time | 4.5 s |
| Test time | 3.5 s |
| Test summary | 24 passed |
| Pipeline time (run 1) | 0.8 s |
| Dashboard build time | 3.1 s |
| Type-check clean | yes |
| Source files / test files | 81 / 24 |
| Source lines | 12260 |
| Dependencies / dev | 6 / 10 |
| Commits | 59 |
| First to last commit | 196.69 h |

## Human-supplied (edit by hand)

| Item | Value |
|---|---|
| Human interventions | |
| Tokens / dollars | |
| Blind code-quality score (0-5) | |
| Blind README score (0-5) | |
| Notes | |
