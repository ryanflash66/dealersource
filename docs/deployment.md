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
| Result | 6 real listings discovered and geocoded (2100 Dickinson Ave, 1990 Allen Rd, 124 Beacon Dr, 2752 Mill St, 2470 Emerald Pl, 1717 W 5th St). None reached the gates yet because the NC OneMap parcel lookup returned nothing: the adapter queried the point layer instead of the polygon layer and read uppercase field names. Fix in progress in the child |

Conclusion so far: compliant, free, automated discovery of $600 to $1,000 lots in
this area is thin. The realistic free levers are Reddit, more local broker sites
added by hand after reading their terms, and the manual-leads file for drive-bys.

## Blocked on credentials (owner or PM supplies; never paste into chat or the repo)

| Variable | Why it is needed | How to get it |
|---|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Pipeline writes to the database | Supabase dashboard, project `dealersource`, Project Settings, API, "service_role" key |
| `DEALERSOURCE_HOME_BASE` | Set to `200 W 5th St, Greenville, NC 27858` (Greenville City Hall, a public downtown anchor; no home address used). The Census geocoder needs a street address, so the bare city/zip placeholder did not geocode | Done |
| `ANYCRAWL_URL` (optional) | Only for JavaScript-heavy sites. The default crawler is now a plain HTTP fetch that needs no hosting and covers the static town and county pages | Not required. Self-host AnyCrawl later only if measured coverage shows the good listings live on JavaScript-rendered broker sites |
| `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `REDDIT_USER_AGENT` | Reddit source | Create a "script" app at reddit.com/prefs/apps (free) |
| `ORS_API_KEY` | Drive-time isochrones (free tier) | Sign up at openrouteservice.org |
| `MAPILLARY_ACCESS_TOKEN` | Street-level imagery (free) | Mapillary developer dashboard, client token |
| `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `GMAIL_SENDER_ADDRESS` | Outreach. Not needed until the dry runs look right | Google Cloud OAuth client (desktop), then authorize the owner's mailbox once; `business.yaml mail.sender: owner` |
| `PMTILES_URL` (optional) | Basemap tiles for the dashboard map | Self-hosted Protomaps archive; without it the map shows the static marker pane |

Also required before real outreach: set `verified: true` on each jurisdiction
in `business.yaml` after re-checking its planning email `source_url`. The
mailer refuses unverified planning addresses.

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
