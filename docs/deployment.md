# Deployment state (selected solution: claude-solution)

Last updated 2026-09-22. No secrets in this file. Secrets live only in Vercel
project settings, the scheduled-agent environment, and a local `.env` that is
git-ignored in the child repo.

## Done

| Piece | Where | Notes |
|---|---|---|
| Supabase project | `dealersource`, ref `swpfyxcttsieexduxxrt`, us-east-1, org "ryanflash66's projects" | Free tier, $0/month at creation. API URL `https://swpfyxcttsieexduxxrt.supabase.co` |
| Schema | migrations `init`, `rls`, `harden_functions` applied | 12 tables, 2 views, PostGIS, RLS on every table. Anon can read reports, sources, sites, parcels, evidence, cases, scores, runs. Nothing on listings, raw_documents, messages, contacts (they hold emails and raw pages). Trigger functions pinned to a fixed `search_path` |
| Advisor status | clean (2026-09-22) | Only the four intended "RLS enabled, no policy" INFO notices remain. The `spatial_ref_sys` ERROR was real (anon could write to it); fixed by moving PostGIS to `extensions`, see "Supabase security advisor" below |
| Vercel project | `dealersource` on team `ryanflash66s-projects` (hobby) | Linked from the child repo. Env: `SUPABASE_URL`, `SUPABASE_ANON_KEY` (production). Build: `npm run dashboard:build`, output `dashboard/public` |
| Dashboard | **https://dealersource.vercel.app** | Live. Reads Supabase directly; shows the empty state until the first pipeline run writes a report |
| First online dry run | local, `DEALERSOURCE_PAUSE_SENDING=1`, JSON state | Completed with status ok, 0 messages sent, only external host contacted: `geocoding.geo.census.gov`. Discovery found 1 listing from the 1 source it could fetch; 4 sources refused by terms as designed; 3 sources errored for missing credentials (below) |

## Coverage findings from the first online runs (2026-09-18)

Runs at child `faa0531`, sending paused, state in Supabase, cost $0. External hosts
contacted: Census geocoder, pittcountync.gov, ronharrellandassociates.com, NC OneMap.

| Source class | Result |
|---|---|
| City/county "available properties" pages | The URLs the agent guessed returned 404. The real Pitt County page (`/1172/Sites-Buildings`) is static but lists only Technology Enterprise Center office rooms; both governments hand property search to ZoomProspector, whose robots.txt disallows every crawler except Google and Bing. Refused by policy. Greenville's page is gone; source disabled |
| Aggregators | LoopNet, Crexi, Craigslist, Facebook: prohibited by terms (known). CommercialCafe and CityFeet return 403 to a non-browser agent. Rofo allows crawling and its terms are silent; its pages are JavaScript-rendered. **2026-09-22:** now rendered by the local Playwright crawler (child `991fdc9`, `render: js`). Live run: page rendered, 0 listings. Rofo has pivoted to location-recommendation briefs; Greenville is not in its sitemap and the URL serves its generic landing page (no addresses, no prices). Its nearest NC markets (Rocky Mount, New Bern, Jacksonville) list 0 buildings. Switched off by the PM the same day (`render: js` kept) |
| Local broker websites | Ron Harrell & Associates (Greenville) is static HTML with about 10 listings and no prices. Added and fetched. OpenStreetMap-based broker discovery (`sources:discover`) found one candidate near home base, a residential team; OSM coverage of broker websites here is poor |
| Reddit | Switched off by the PM on 2026-09-22 (`enabled: false` in `config/sources.yaml`); no Reddit API app yet |
| Result | **Full enrichment online, child `2c717b0`, 2026-09-18: exit 0, 42 evidence rows, $0.** All 5 sites inside the search area with real drive times from OpenRouteService (4 to 13 min from downtown Greenville), street imagery from Mapillary for 3 of 5, scores computed (0.31 to 0.59). Gates: flood pass on all 5; zoning pass for 2100 Dickinson Ave (CH), fail for 1717 W 5th St (MO), pending for 3 awaiting planning answers; rent pending on all 5 because no listing states a price and outreach is paused. Nothing viable yet, by design: viability needs a written rent and a zoning answer, both of which need email |

Conclusion so far: compliant, free, automated discovery of $600 to $1,000 lots in
this area is thin. The realistic free levers are Reddit, more local broker sites
added by hand after reading their terms, and the manual-leads file for drive-bys.

### Two structural gaps and their unlock paths (recorded 2026-09-22; build neither now)

Positioning: dealer management systems (CDK, Reynolds, Dealertrack, Frazer,
DealerCenter) run a dealership after the lease is signed and are not
comparable. This system's category is site selection, verification and
outreach, and its free official-data gates (zoning layers, FEMA flood, NCDOT
traffic, verified planning contacts) are what CoStar, Crexi, Placer and
SiteZeus do not give a small dealer for free. The stack stays.

1. **Listing discovery is thin by structure, not by bug.** CoStar (LoopNet) and
   Crexi hold most commercial inventory and forbid crawling. Unlock **built
   2026-09-22 (child `51fa1e4`, decision 28)**: sources `loopnet-alerts` and
   `crexi-alerts` (kind `email_alert`) read saved-search alert emails from the
   owner's Gmail over IMAP and turn each listing card into a listing. Nothing
   is requested from either site; $0. Migration `source_kind_email_alert`
   applied live the same night. Read-only IMAP check against the real mailbox
   passed (0 alerts: no saved searches yet). Owner set up the saved searches
   2026-09-23. First real mail the same day: Crexi saved-search alerts come from
   `notifications@search.crexi.com`, Crexi "featured listings" mail from
   `emails@pro.crexi.com` (both kept: the featured mail carried 10 Greenville
   lease listings). Crexi links are compressed tracking tokens, now decoded
   locally (child `f54ff58`); re-parsing those two emails gave 11 listings with
   correct addresses and listing URLs. LoopNet has sent only its welcome mail so
   far (`welcome@loopnet.com`); check its first alert. First LoopNet alert
   2026-09-24 from `noreply@loopnet.com` (alert_from unchanged). It gave 0 cards:
   the card line is bar-separated ("Name | 301 S Evans St | Greenville, NC"),
   and every link is an encrypted SendGrid redirect, except the Outlook-only
   "View Listing" button (`www.loopnet.com/listing/<id>`). Fixed in child
   `e55436a`: it now parses to a clean address and listing URL, with no rent and
   no contact. Crexi's saved search reaches Raleigh, Durham, Dunn, Goldsboro and
   Morehead City, so the owner should narrow its area.
2. **Outreach is hand-rolled.** At a handful of contacts a week that is right:
   templates, follow-up windows, bounce pause, stop handling and reply parsing
   already exist. If volume ever reaches hundreds of contacts, swap the mailer
   for Mautic (self-hosted, open source) instead of extending ours.

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
| `GMAIL_SENDER_ADDRESS`, `GMAIL_APP_PASSWORD` | Outreach over Gmail SMTP + IMAP (since 2026-09-22; the OAuth variables are gone) | Owner's Google account: turn on 2-Step Verification, create an app password at myaccount.google.com/apppasswords. `business.yaml mail.sender: owner` |
| `PMTILES_URL` (optional) | Basemap tiles for the dashboard map | Self-hosted Protomaps archive; without it the map shows the static marker pane |

## Planning contacts (verified 2026-09-22)

The solution shipped with placeholder addresses (`planning@<town>`) that do
not exist. Each was replaced with the address the government itself publishes
and `verified: true` set in `business.yaml` (child `812bf88`). Checked on the
pages recorded as `source_url`:

| Jurisdiction | Recipient | Why this person |
|---|---|---|
| Greenville | Dion Hodge, Planner / Zoning Enforcement Officer | The Planning page names him for zoning certification and compliance letters |
| Winterville | Stephen Penn, Planning and Economic Development Director | The only planning address the town publishes |
| Ayden | Town Planner inbox | Shared inbox on the Planning & Zoning page |
| Washington | Jeff Huss, Zoning / Code Enforcement Officer | Development Services staff directory |
| Pitt County | Jonas Hill, Planning & Development Director | Department page offers only a web form; the directory publishes this address |

The broker source `ron-harrell-commercial` now carries the `contact_email`
published in the broker's site footer.

Pipeline change in the same commit: a planning address cached on a site is
re-synced from `business.yaml` every run (an address published by the zoning
layer still wins, so offline fixtures keep the contract's recipients), and an
open, unsent case whose contact changed is repointed rather than duplicated.
All 11 open cases now point at the verified addresses.

**Audit, 2026-09-22 (child `bc7fd56`): all six addresses pass.** Each was re-fetched
and found verbatim on the official page, or on a page linked directly from it as
the planning or zoning contact. The exact page URL and fetch date are now a comment
on each entry in `business.yaml` and on the broker entry in `config/sources.yaml`.

| Entry | Result | Where the address appears |
|---|---|---|
| Greenville | pass | Hodge's directory entry, linked from the Planning page's zoning-letter line. No departmental planning inbox exists (only business development and building permits) |
| Winterville | pass | On the planning page itself |
| Ayden | pass | On the planning page; already a departmental inbox |
| Washington | pass | On the Development Services staff directory under Planning & Zoning |
| Pitt County | pass, URL updated | The old directory URL now 302-redirects to the same department page on the same site; `source_url` updated to the final URL. The only departmental contact is a web form |
| Ron Harrell & Associates | pass | Footer of the listings page and the home page | The two placeholder
contact rows (`planning@greenvillenc.gov`, `planning@wintervillenc.com`) are
unreferenced and harmless; delete them from the `contacts` table when
convenient.

## Change of location for the existing license

The owner already holds an NC dealer license, so a new lot is a change of
location, not a new license. Signing a lease does **not** mean sales can start
there: the new lot must pass a state inspection first. Verified 2026-09-22 on
primary sources; quotes are verbatim.

Who: dealer licensing is now run by the **NC State Highway Patrol,
Investigative Services Unit, Dealer Section**, not the DMV License & Theft
Bureau. The old ncdot.gov dealer pages and LT forms return 404; current forms
are Rev. 02/26 on ncshp.gov.

| Step | Requirement | Source |
|---|---|---|
| Notify | A dealer who moves "shall immediately notify" the enforcement section of the change of location. No day count is given | 19A NCAC 03D .0217(l)(2) |
| Inspection before selling | The dealer "shall not engage in the business of buying, selling, trading or manufacturing motor vehicles until the new location has been inspected and approved by an agent of the Division" | 19A NCAC 03D .0217(l)(2) |
| Request the inspection | Through the ISU Portal: select "Other", then say you are modifying an existing dealership | ncshp.gov/investigative-services-unit |
| Form | ISU-400, "Application for New Dealer License or Changes to Existing License", Address Change box | ISU-400 (Rev. 02/26) |
| Fee | The statute says the Division "shall endorse the change of location on the license, without charge". The rule adds "additional fees, if any" | G.S. 20-290(a); .0217(l)(2) |
| Zoning proof | The salesroom must comply with local zoning, with "written proof of same provided to the Division". The checklist lists a "Zoning approval letter". For Greenville that is the $50 zoning compliance letter from the Planning Division | .0217(h); ISU-415 |
| Site first | "Site must be approved before submitting applications to the Dealer Section" | ISU-415 |

What the new lot must have, from G.S. 20-286(6) and rule .0216:

- **Office.** At least 96 sq ft of floor space in a permanent enclosed building. A tent, a temporary stand or a building on wheels does not count. The rule also requires it to be separate from any residence, with its own entrance.
- **Sign.** Block letters at least three inches tall on a contrasting background, naming the business, on or right next to the office.
- **Display area.** No minimum number of cars. On a shared lot, the dealer's vehicles must be displayed "separate and apart from vehicles of any other dealer".
- **License.** Posted at the place of business, with the current salesperson list (G.S. 20-290).
- **Hours and phone.** No posted-hours rule and no retail phone rule. The dealer must be reachable "at reasonable times".

Order of operations for the owner: signed lease, then the zoning letter, then
an ISU-400 address change and a portal inspection request. Start sales only
after the inspection approves the lot.

Sources (fetched 2026-09-22):
- G.S. 20-286: https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_20/GS_20-286.html
- G.S. 20-290: https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_20/GS_20-290.html
- 19A NCAC 03D rules: http://reports.oah.state.nc.us/ncac/title%2019a%20-%20transportation/chapter%2003%20-%20division%20of%20motor%20vehicles/subchapter%20d/subchapter%20d%20rules.pdf
- ISU-415, minimum dealer license requirements: https://ncshp.gov/sites/default/files/2026-02/ISU-415%20Minimum%20Dealer%20License%20Requirements.pdf
- ISU-400, application or changes: https://www.ncshp.gov/sites/default/files/2026-02/ISU-400%20Application%20For%20New%20Dealer%20License%20or%20Changes%20To%20Existing%20License.pdf
- ISU portal instructions: https://www.ncshp.gov/investigative-services-unit

Two places the rule and the statute disagree. The rule wants the building
"separate and apart from any ... other business", while G.S. 20-286(6) allows
sharing it with other business uses. The rule keeps records "at least four
years", while the ISU-400 form says five. When they conflict, follow the
stricter one and ask the Dealer Section at the inspection.

## Supabase security advisor (2026-09-22)

Advisor ERROR: `public.spatial_ref_sys` has RLS disabled. This is PostGIS's
coordinate-system table, and it is a real exposure: `anon` and
`authenticated` hold SELECT, INSERT, UPDATE, DELETE and TRUNCATE on it through
PostgREST. Anyone with the public anon key, which the dashboard ships, could
delete or rewrite coordinate systems and break every geometry operation. No
business data is in the table. The grants were made by `supabase_admin`, so
REVOKE from the project's `postgres` role is a no-op, and RLS cannot be enabled
on a table we don't own.

Fix: migration `20260923000000_postgis_to_extensions.sql` in the child. It
moves PostGIS into the `extensions` schema, which PostgREST does not expose,
and recomputes the only dependents (`sites.geom`, `parcels.geom`, derived by
trigger from lat/lon and stored GeoJSON). It also clears the `extension_in_public`
warning and the `st_estimatedextent` anon-execute warnings. **Status: applied
live 2026-09-22** with the PM's approval. Verified: PostGIS in `extensions`, no
`public.spatial_ref_sys`, 5/5 sites and 5/5 parcels with geometry recomputed,
both GiST indexes rebuilt, advisor shows no ERROR or WARN. The four "RLS enabled, no policy" INFO notices are
intended: `contacts`, `listings`, `messages` and `raw_documents` hold emails
and raw pages and are readable only with the service role.

## Mail transport: Gmail SMTP + IMAP (2026-09-22)

PM decision: drop the Gmail API and OAuth and use the owner's personal Gmail
over SMTP and IMAP with an app password. Volume is far under Gmail's daily
limits, and the cost is $0 with no Google Cloud project. Child `b102146`,
decision 25 in the child's `docs/decisions.md`.

| | |
|---|---|
| Send | `smtp.gmail.com:465`, implicit TLS, nodemailer |
| Replies | `imap.gmail.com:993`, implicit TLS, imapflow; reads All Mail so archived replies still count |
| Variables | `GMAIL_SENDER_ADDRESS`, `GMAIL_APP_PASSWORD`; `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN` removed |
| Unchanged | `[DS-XXXXXX]` subject routing, Reply-To = sender, bounce detection, pause switch, refusal to mail unverified planners, offline fixture mailbox |
| Safety | Preflight logs in to both servers every online run and pauses sending if either fails. The password is never logged and is scrubbed from error text |
| Eval | golden-v1 and hidden-v2 both 100% quality, 100% conformance at `b102146` |

The `.env` on this PC still has the three empty OAuth lines; they are ignored.
Add `GMAIL_APP_PASSWORD=` next to `GMAIL_SENDER_ADDRESS=`.

## Scheduler (2026-09-18): Windows Task Scheduler on this PC

Task `dealersource daily`, 05:30 local every day, runs as the logged-on user
(interactive only), wakes the machine, starts when available if a run was
missed, one-hour limit. Action: `powershell -NoProfile -ExecutionPolicy Bypass
-File agents/claude-solution/scripts/run-daily.ps1`. The script pulls `main`,
runs `npm ci` only if the commit changed, loads the git-ignored `.env`, runs
`tsx src/cli.ts run --out out/<date> --run-date <date>` (calling tsx directly, because `npm.cmd` launched from PowerShell drops every argument after `--`), and appends to
`out/logs/<date>.log`. Sending stays paused until `DEALERSOURCE_PAUSE_SENDING`
is removed from `.env`. Requirements: this PC on or asleep (not shut down) and
the user logged on. Move to the Claude Code cloud routine once outreach has
been watched for a few days.

## What blocks a viable site now (all human, all free)

1. ~~Broker `contact_email`~~ done 2026-09-22.
2. ~~Verified planning addresses~~ done 2026-09-22.
3. ~~Gmail app password, signature, unpause~~ done 2026-09-22. SMTP and IMAP logins verified;
   emails sign as Ryan Balungeli, Serenity Auto Gallery (the templates say the sender works
   with the licensed dealership). The PM lifted the pause the same evening: the next 05:30
   run sends the queued mail (7 messages on 2026-09-22: 4 to the broker, 2 to Winterville
   planning, 1 to Greenville zoning). To stop sending again, add
   `DEALERSOURCE_PAUSE_SENDING=1` to `.env` or set `mail.paused: true`.
4. Reddit: switched off by the PM on 2026-09-22. To turn it on, create a script app,
   set `REDDIT_CLIENT_ID`/`REDDIT_CLIENT_SECRET`, and set `enabled: true` on
   `reddit-eastern-nc`. It is the source most likely to surface cheap or shared lots.
5. LoopNet and Crexi saved searches (owner, about 10 minutes, free). With the Gmail
   address in `GMAIL_SENDER_ADDRESS`: create a free account on loopnet.com and on
   crexi.com, search for lease around Greenville, NC (retail, land, flex/industrial),
   cap the price near $1,000/mo, save the search and turn on daily email alerts. In
   Gmail, add a filter for `from:(loopnet.com OR crexi.com)` with "Never send it to
   Spam" (All Mail is read, Spam is not). The next 05:30 run picks the alerts up.
   After the first real alert, check `discover.alert_emails` and
   `discover.alert_cards_without_address` in `run.json`: the sender domains and link
   patterns in `config/sources.yaml` are best guesses until then. Alerts rarely name
   the broker's email, so these listings show "no leasing contact" until one is added
   as a manual lead for the same address.

## Next steps, in order

1. Supply `SUPABASE_SERVICE_ROLE_KEY` and the commute-origin `DEALERSOURCE_HOME_BASE`; rerun the
   dry run so the report lands in Supabase and the live dashboard shows it.
2. Add the free Reddit, ORS and
   Mapillary keys; rerun with the fetch crawler. This is the run that answers the coverage question:
   how many $600 to $1,000 listings exist in the area.
3. Review the digest and shortlist. Adjust `config/sources.yaml` (enable grey
   sources after reading their terms).
4. Gmail app password for the owner; first send to a handful of contacts with
   `mail.followup_days` and bounce pause in effect.
5. Create the Claude Code routine from `agents/claude-solution/agent/routine.yaml`
   with the variables above as routine secrets. Cron `30 5 * * *` America/New_York.
