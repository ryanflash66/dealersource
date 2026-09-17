# Catch-up prompt (contract conformance)

Paste the block below into the agent's session, with the agent's repo as the
working directory. Replace `<AGENT>` and `<LOG_ISSUE>`:

| Agent | `<AGENT>` | `<LOG_ISSUE>` | `--primary` |
|---|---|---|---|
| Codex / GPT | `gpt-solution` | `4` | `#10A37F` |
| Hyperagent | `hyperagent-solution` | `7` | `#7C3AED` |

---

Your solution cannot be scored. An external evaluator runs every solution
with one exact command against fixture data it supplies, then reads three
output files. Yours does not accept that command or produce those files, so
your quality score is zero regardless of how good the pipeline is. Fix that
before anything else. Do not add features. Do not restyle.

**Read first, in this order:**

1. Spec section 14, "Offline contract (binding)":
   https://github.com/ryanflash66/dealersource/blob/main/prompts/task-spec.md
2. The JSON Schemas your outputs must validate against:
   https://github.com/ryanflash66/dealersource/tree/main/evals/contract
3. A sample fixture set with the expected answers:
   https://github.com/ryanflash66/dealersource/tree/main/evals/fixtures/golden-v1
4. Your gap table on your log issue:
   https://github.com/ryanflash66/dealersource/issues/<LOG_ISSUE>

(If you are running inside the parent checkout, the same files are at
`../../prompts/`, `../../evals/contract/`, `../../evals/fixtures/golden-v1/`.)

**The command that must work, exactly:**

```
npm run pipeline -- --offline --fixtures <dir> --out <dir> --run-date YYYY-MM-DD [--config <providers.yaml>]
```

**Definition of done.** All of these, on a fresh clone with no `.env` and no network:

1. `--fixtures <dir>` is the only data source offline. Your fixture-backed
   adapters read these nine files from it, in the shapes given in spec 14.3:
   `listings.json`, `geocode.json`, `parcels.json`, `zoning.json`,
   `flood.json`, `traffic.json`, `drivetime.json`, `competitors.json`,
   `replies.json`. Your own bundled fixtures must not be used when
   `--fixtures` is given.
2. `--out <dir>` receives exactly `report.json`, `messages.json`, `run.json`,
   each validating against its schema in `evals/contract/`. Snake_case keys
   as specified. `report.json` has `schema_version: "1"`, `run_id`,
   `run_date`, `offline`, `providers`, `sites[]`, `evidence[]`,
   `external_calls[]`. Each site has `site_id`, `parcel_id`, `listing_ids`,
   `address`, `in_search_area`, `shared_lot`, `gates{zoning,rent,flood}` with
   `status` of `pass|fail|pending` and `evidence_ids`, `viable`, `score`,
   `rank` (1-based over viable only, else null), `metrics`, `open_cases`.
3. Offline state lives under `<out>/state/`. Running the identical command a
   second time writes `messages.json` equal to `[]`.
4. `--run-date` is the logical today. Replies with `received_at` after it are
   invisible. `--day` or any other spelling is not accepted by the evaluator.
5. `providers.yaml` at the repo root has the eight contract keys with the
   contract defaults: `paid_enabled: false`, `geocoder: census`,
   `parcels: nc_onemap`, `drivetime: ors`, `imagery: mapillary`,
   `poi: overpass`, `crawler: anycrawl`, `tiles: protomaps`. `--config` points
   at an alternate file. `report.json.providers` echoes the selection, so
   switching `geocoder` to `nominatim` in the file changes that value with no
   code edits.
6. `external_calls` is `[]` offline. Any attempted network access under
   `--offline` is a hard error.
7. Apply the semantics in spec 14.3 exactly: listings geocoding to the same
   `parcel_id` are one site; a stated rent is rent evidence; missing rent opens
   a `rent` case to `contact_email`; `dealer_use: permitted` with a citation
   passes zoning; `unknown` or `conditional` opens a `zoning` case to
   `planning_email`; `prohibited` fails with no outreach; flood gate by zone;
   sites over `max_drive_minutes` are `in_search_area: false`, unscored, no
   outreach; shared lots rank after every standalone viable site; rent bounds
   are inclusive.
8. **Prove it.** Add a test that runs the command against
   `golden-v1/input` with `--run-date 2026-09-16` and asserts your output
   matches `golden-v1/expected.json`: site set and dedupe, `in_search_area`,
   every gate status, `viable`, the viable rank order, the three expected
   outreach messages and no others to failed or out-of-area parcels, and an
   empty second run. The evaluator uses a different fixture set with the same
   shape, so hard-coding golden values will fail.
9. `npm test`, `npm run dashboard:build` pass on Windows, macOS and Linux.
   Build file URLs with `pathToFileURL`, never string-concatenate absolute
   paths into `import()`.
10. Dashboard reads the contract `report.json`, implements design template v2
    from https://github.com/ryanflash66/dealersource/tree/main/prompts/dashboard-design
    unmodified except `--primary` and `--primary-hover`, and uses **your
    assigned** `--primary` (see the table in that folder's README). Do this
    last, after items 1 to 9 are green.

**How to work.** Keep your existing pipeline logic; add a contract layer at
the edges: a fixture loader that maps the nine files into your internal
types, and a reporter that maps your internal results into the three output
files. Small commits. Push to `main`. When everything above is green, post
one comment on issue <LOG_ISSUE> with the commit SHA and the output of your
golden-v1 test:

```
gh issue comment <LOG_ISSUE> -R ryanflash66/dealersource --body "..."
```

Do not ask for credentials or clarification. Do not read other agents' log
issues or repositories. Where the spec is silent, choose the simplest option
that satisfies section 13 and record it in `docs/decisions.md`.
