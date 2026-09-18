# Deployment state (selected solution: claude-solution)

Last updated 2026-09-17. No secrets in this file. Secrets live only in Vercel
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

## Blocked on credentials (owner or PM supplies; never paste into chat or the repo)

| Variable | Why it is needed | How to get it |
|---|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Pipeline writes to the database | Supabase dashboard, project `dealersource`, Project Settings, API, "service_role" key |
| `DEALERSOURCE_HOME_BASE` | Drive times are measured from here. Currently the dev placeholder `Greenville, NC 27858` | The address the owner would commute from every day. Not a dealership; the search is for one |
| `ANYCRAWL_URL` | Discovery of broker and town "available properties" pages. Without it 2 of the 3 crawl sources cannot run | Self-host AnyCrawl (Docker image) somewhere reachable by the scheduled agent, or use AnyCrawl cloud with `paid_enabled: true` and `ANYCRAWL_API_KEY`. Docker is installed on this machine but the daemon was not running |
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
2. Stand up AnyCrawl (or enable the paid cloud adapter) and add Reddit, ORS and
   Mapillary keys; rerun. This is the run that answers the coverage question:
   how many $600 to $1,000 listings exist in the area.
3. Review the digest and shortlist. Adjust `config/sources.yaml` (enable grey
   sources after reading their terms).
4. Gmail OAuth for the owner; first send to a handful of contacts with
   `mail.followup_days` and bounce pause in effect.
5. Create the Claude Code routine from `agents/claude-solution/agent/routine.yaml`
   with the variables above as routine secrets. Cron `30 5 * * *` America/New_York.
