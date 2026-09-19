# Deployment state (selected solution: claude-solution)

Last updated 2026-09-18. No secrets in this file. Secrets live only in Vercel
project settings, the scheduled-agent environment, and a local `.env` that is
git-ignored in the child repo.

## Done

| Piece | Where | Notes |
|---|---|---|
| Supabase project | `dealersource`, ref `swpfyxcttsieexduxxrt`, us-east-1, org "ryanflash66's projects" | Free tier, $0/month at creation. API URL `https://swpfyxcttsieexduxxrt.supabase.co` |
| Schema | migrations `init`, `rls`, `harden_functions` applied | 12 tables, 2 views, PostGIS, RLS on every table. Anon can read reports, sources, sites, parcels, evidence, cases, scores, runs. Nothing on listings, raw_documents, messages, contacts (they hold emails and raw pages). Trigger functions pinned to a fixed `search_path`; PostGIS `st_estimatedextent` not callable by anon |
| Advisor status | one ERROR left: `spatial_ref_sys` has no RLS | PostGIS system table owned by Supabase; known false positive, cannot be altered from the project role |
| Vercel project | `dealersource` on team `ryanflash66s-projects` (hobby) | Linked from the child repo. Env: `SUPABASE_URL`, `SUPABASE_ANON_KEY` (production). Build: `npm run dashboard:build`, output `dashboard/public` |
| Dashboard | **https://dealersource.vercel.app** | Live. Reads Supabase directly; shows the empty state until the first pipeline run writes a report |
| First online dry run | local, `DEALERSOURCE_PAUSE_SENDING=1`, JSON state | Completed with status ok, 0 messages sent, only external host contacted: `geocoding.geo.census.gov`. Discovery found 1 listing from the 1 source it could fetch; 4 sources refused by terms as designed; 3 sources errored for missing credentials (below) |

## Coverage findings from the first online runs (2026-09-18)

Runs at child `faa0531`, sending paused, state in Supabase, cost $0. External hosts
contacted: Census geocoder, pittcountync.gov, ronharrellandassociates.com, NC OneMap.

| Source class | Result |
|---|---|
| City/county "available properties" pages | The URLs the agent guessed returned 404. The real Pitt County page (`/1172/Sites-Buildings`) is static but lists only Technology Enterprise Center office rooms; both governments hand property search to ZoomProspector, whose robots.txt disallows every crawler except Google and Bing. Refused by policy. Greenville's page is gone; source disabled |
| Aggregators | LoopNet, Crexi, Craigslist, Facebook: prohibited by terms (known). CommercialCafe and CityFeet return 403 to a non-browser agent. Rofo allows crawling and its terms are silent, but the page is JavaScript-rendered, so a plain fetch sees nothing; recorded as a candidate for a headless crawler only |
| Local broker websites | Ron Harrell & Associates (Greenville) is static HTML with about 10 listings and no prices. Added and fetched. OpenStreetMap-based broker discovery (`sources:discover`) found one candidate near home base, a residential team; OSM coverage of broker websites here is poor |
| Reddit | Blocked on the free script-app credentials (`REDDIT_*` in `.env`) |
| Result | **Full enrichment online, child `2c717b0`, 2026-09-18: exit 0, 42 evidence rows, $0.** All 5 sites inside the search area with real drive times from OpenRouteService (4 to 13 min from downtown Greenville), street imagery from Mapillary for 3 of 5, scores computed (0.31 to 0.59). Gates: flood pass on all 5; zoning pass for 2100 Dickinson Ave (CH), fail for 1717 W 5th St (MO), pending for 3 awaiting planning answers; rent pending on all 5 because no listing states a price and outreach is paused. Nothing viable yet, by design: viability needs a written rent and a zoning answer, both of which need email |

Conclusion so far: compliant, free, automated discovery of $600 to $1,000 lots in
this area is thin. The realistic free levers are Reddit, more local broker sites
added by hand after reading their terms, and the manual-leads file for drive-bys.

## Verified official GIS endpoints (2026-09-18)

The solution shipped with guessed GIS URLs that did not exist. These are the real
ones, verified by live query; the child repo is being updated to use them.

| Layer | Endpoint | Notes |
|---|---|---|
| NC parcels | `services.nconemap.gov/secure/rest/services/NC1Map_Parcels/FeatureServer/1` | Layer 1 is polygons; layer 0 is centroids. Fields are lowercase (`parno`, `ownname`, `siteadd`, `cntyname`). Envelope query with `outSR=4326` works; select by house-number match, then containment |
| Greenville zoning | `gisonline.greenvillenc.gov/arcgis/rest/services/OpenData/MapServer/21` | Field `ZONE` (CH, CG, IU, RA20, ...). Layer 20 is the ETJ boundary |
| Pitt County zoning (unincorporated) | `gis.pittcountync.gov/gis/rest/services/PittOpenData/ZoningPitt/MapServer/0` | Field `ZONE`. No features inside town limits |
| Winterville, Ayden, Washington zoning | none found | Zoning stays pending and goes to the planning email once verified |
| NCDOT traffic (AADT) | `services.arcgis.com/NuWFvHYDMVmmxMeM/arcgis/rest/services/NCDOT_AADT_Stations/FeatureServer/0` | ArcGIS Online, owner TrafficSurvey.NCDOT.GOV. Point stations, string columns `AADT_2002`..`AADT_2022`, `ROUTE`, `LOCATION`. The `gis11.services.ncdot.gov` URL the solution guessed does not exist |
| FEMA flood | `hazards.fema.gov` NFHL | Worked first time; flood fetched for all five sites |
| Pitt County parcels fallback | `gis.pittcountync.gov/gis/rest/services/PittOpenData/CadastralPitt/MapServer/0` | Fields `NCPIN`, `OwnerName`, `Municipality`, `Acres` |

Key lesson: Census geocodes land in the road right-of-way. Zoning at the geocode
for 2100 Dickinson Ave returns nothing; at the parcel centroid it returns CH,
which the Greenville use table marks permitted. All polygon lookups now run
against the parcel, not the geocode.

## Blocked on credentials (owner or PM supplies; never paste into chat or the repo)

| Variable | Why it is needed | How to get it |
|---|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Pipeline writes to the database | Supabase dashboard, project `dealersource`, Project Settings, API, "service_role" key |
| `DEALERSOURCE_HOME_BASE` | Set to `200 W 5th St, Greenville, NC 27858` (Greenville City Hall, a public downtown anchor; no home address used). The Census geocoder needs a street address, so the bare city/zip placeholder did not geocode | Done |
| `ANYCRAWL_URL` (optional) | Only for JavaScript-heavy sites. The default crawler is now a plain HTTP fetch that needs no hosting and covers the static town and county pages | Not required. Self-host AnyCrawl later only if measured coverage shows the good listings live on JavaScript-rendered broker sites |
| `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `REDDIT_USER_AGENT` | Reddit source | Create a "script" app at reddit.com/prefs/apps (free) |
| `ORS_API_KEY` | Drive time and `in_search_area` | Done |
| `MAPILLARY_ACCESS_TOKEN` | Street-level imagery | Done |
| `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `GMAIL_SENDER_ADDRESS` | Outreach. Not needed until the dry runs look right | Google Cloud OAuth client (desktop), then authorize the owner's mailbox once; `business.yaml mail.sender: owner` |
| `PMTILES_URL` (optional) | Basemap tiles for the dashboard map | Self-hosted Protomaps archive; without it the map shows the static marker pane |

Also required before real outreach: set `verified: true` on each jurisdiction
in `business.yaml` after re-checking its planning email `source_url`. The
mailer refuses unverified planning addresses.

## Scheduler (2026-09-18): Windows Task Scheduler on this PC

Task `dealersource daily`, 05:30 local every day, runs as the logged-on user
(interactive only), wakes the machine, starts when available if a run was
missed, one-hour limit. Action: `powershell -NoProfile -ExecutionPolicy Bypass
-File agents/claude-solution/scripts/run-daily.ps1`. The script pulls `main`,
runs `npm ci` only if the commit changed, loads the git-ignored `.env`, runs
`npm run pipeline -- --out out/<date> --run-date <date>`, and appends to
`out/logs/<date>.log`. Sending stays paused until `DEALERSOURCE_PAUSE_SENDING`
is removed from `.env`. Requirements: this PC on or asleep (not shut down) and
the user logged on. Move to the Claude Code cloud routine once outreach has
been watched for a few days.

## What blocks a viable site now (all human, all free)

1. `contact_email` on the `ron-harrell-commercial` source in
   `agents/claude-solution/config/sources.yaml` (published on the broker's contact page).
   Unblocks rent inquiries for 4 sites.
2. `verified: true` on Greenville and Winterville in `business.yaml` after
   re-checking their planning addresses. Unblocks zoning inquiries for 3 sites.
3. Gmail OAuth for the owner's mailbox, then remove `DEALERSOURCE_PAUSE_SENDING`.
   The first real email goes out on the next run.
4. Reddit script app credentials. Turns on the source most likely to surface
   cheap or shared lots.

## Next steps, in order

1. Supply `SUPABASE_SERVICE_ROLE_KEY` and the commute-origin `DEALERSOURCE_HOME_BASE`; rerun the
   dry run so the report lands in Supabase and the live dashboard shows it.
2. Add the free Reddit, ORS and
   Mapillary keys; rerun with the fetch crawler. This is the run that answers the coverage question:
   how many $600 to $1,000 listings exist in the area.
3. Review the digest and shortlist. Adjust `config/sources.yaml` (enable grey
   sources after reading their terms).
4. Gmail OAuth for the owner; first send to a handful of contacts with
   `mail.followup_days` and bounce pause in effect.
5. Create the Claude Code routine from `agents/claude-solution/agent/routine.yaml`
   with the variables above as routine secrets. Cron `30 5 * * *` America/New_York.
