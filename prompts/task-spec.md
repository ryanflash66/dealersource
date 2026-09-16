# Task Spec: dealersource

> Status: **v1, approved for build.** Companion brief: the PM deck
> "Dealership Sourcing | Architecture and Free-First Plan" (2026-09-14).
> Where this file and the deck disagree, this file wins.

## 1. Goal

Build a production-grade system that continuously finds, verifies and ranks
**leaseable sites for a licensed used-car dealership in Eastern North
Carolina**, then reports a verified shortlist to a dashboard. It runs on a
schedule with no human in the loop for discovery, verification outreach, or
reporting. Humans only act on the shortlist.

"Verified" means every gating fact has a cited source, a timestamp and an
expiry stored in the database. A site with an unverified gating fact is never
shown as viable. No response is not approval.

## 2. Business parameters (all configurable, defaults below)

| Key | Default | Notes |
|---|---|---|
| `search.home_base` | `Greenville, NC 27858` | Center of the search area. Dev placeholder; the real address is set at deploy time only |
| `search.max_drive_minutes` | 60 | Isochrone from home base, not a radius |
| `rent.min_monthly` / `rent.max_monthly` | 600 / 1000 | Base rent, USD. Hard gate. Do not exceed. |
| `site.min_vehicle_display` | 2 | Cars displayable on the lot |
| `site.office_required` | true | An enclosed office is **more important than yard size** |
| `site.shared_lot` | `last_resort` | Options: `exclude`, `last_resort`, `allowed`. Shared/sublet sites rank below all standalone sites and carry a visible flag |
| `flood.high_risk_zones` | `A, AE, AH, AO, AR, A99, V, VE` | FEMA NFHL zones that fail the flood gate. Shaded X = warn only |
| `dealer.license_status` | `held` | Owner already holds an NC dealer license. Encode NC DMV established-place-of-business requirements as checks, not as a licensing workflow |

## 3. Gates and ranking

A site is **viable** only if all three gates pass with verified evidence:

1. **Zoning gate.** Used motor vehicle sales is a permitted (or verified
   conditional) use on the parcel, confirmed by the municipal/county planning
   authority in writing (email or official form response), or by an official
   published zoning layer plus use table with the exact section cited.
2. **Rent gate.** Written base rent quote within `rent.min_monthly`..`rent.max_monthly`.
3. **Flood gate.** Parcel centroid and majority of parcel area are outside
   `flood.high_risk_zones`.

Viable sites are ranked by weighted score, highest weight first:

1. Traffic count (NCDOT AADT on the fronting road)
2. Visibility (road frontage length, corner lot, signage line-of-sight from imagery)
3. Distance (drive minutes from `search.home_base`)
4. Rent (lower is better within range)
5. Competitor density (other vehicle dealers within a configurable radius; lower is better)

Weights live in config. Shared-lot sites sort after every standalone site
regardless of score.

## 4. Data layers

Each layer has a **provider interface** with at least one free adapter and
one optional paid adapter. Switching providers is a config change, never a
code change. Default is free. Paid adapters exist in code but are disabled.

| Layer | Purpose | Free default | Paid alternative (disabled) |
|---|---|---|---|
| Geocoding / address identity | Canonical address, lat/lon | US Census Geocoder; self-hosted Nominatim on NC OSM extract | Google Geocoding + Address Validation |
| Parcels | Parcel ID, owner, acreage, geometry | NC OneMap statewide parcels (ArcGIS REST); county GIS REST as fallback | Regrid |
| Zoning | Zoning district, use table | Municipal/county ArcGIS zoning layers; UDO text | none (this is always official-source) |
| Drive time | Isochrone from home base | OpenRouteService free tier or self-hosted Valhalla/OSRM on NC extract | Google Distance Matrix |
| Traffic | AADT on fronting road | NCDOT AADT ArcGIS REST | none needed |
| Flood | FEMA zone at parcel | FEMA NFHL ArcGIS REST | none needed |
| Imagery | Recent street-level and aerial views | Mapillary API; NC OneMap orthoimagery | Google Street View Static |
| Competitors / POI | Nearby vehicle dealers | Overpass API (OSM) with polite rate limits or self-hosted Overpass | Google Places |
| Map tiles (dashboard) | Basemap | Protomaps PMTiles + MapLibre GL, self-hosted | Mapbox / Google |
| Crawling | Fetch listing and broker pages | Self-hosted AnyCrawl | AnyCrawl cloud |
| Social signals | Leads and local context | Reddit official API (free tier, OAuth app) | none |
| Email | Outreach and inbound parsing | Gmail API via OAuth | none |
| LLM | Extraction, drafting, classification | Claude via the scheduled agent | Claude API |

Public OSM tile servers and public Nominatim must **not** be used for
scheduled runs. Self-host or use the Census geocoder.

## 5. Sources and the allowlist

Coverage of $600-1,000/mo commercial space is the hardest problem. Listings
come from many small sources, not one feed. Every source is a row in
`sources.yaml` with:

```yaml
- id: town-of-x-available-properties
  kind: crawl | reddit | rss | manual
  url: ...
  robots_txt: allowed | disallowed | unknown
  terms_status: allowed | prohibited | unclear
  enabled: true
  cadence: daily
```

The crawler **refuses** any source whose `terms_status` is `prohibited`, or
whose `robots_txt` is `disallowed`, regardless of `enabled`. The PM flips
`unclear` sources to `allowed` explicitly. Ship with these source classes
seeded and their status researched and recorded:

- Local commercial broker and property-management websites inside the
  search area (discover them via POI data, then crawl their listings pages)
- Municipal and county economic-development "available properties" pages
- Chamber of commerce listings
- Reddit: configurable subreddit list (Eastern NC city/county subs plus
  commercial real estate subs), searching for lease offers, closing
  businesses, and vacant lot mentions
- Free public RSS/listing feeds where terms permit
- Record LoopNet, Crexi, Craigslist, Facebook Marketplace as sources with
  their real `terms_status` so the PM can see what is excluded and why

Every stored listing keeps the raw fetched page (or API payload) as evidence,
plus the extraction the model produced from it. Duplicates across sources are
merged into one **site** record; more copies do not increase confidence.

## 6. Verification via automated outreach

Every unknown gating fact becomes a **case** with an owner and a next action.
The system sends the emails itself. This is the point of the system.

- **Sender.** Gmail API with OAuth. Config `mail.sender`: `owner` (the
  dealer's mailbox, authorized once by the owner) or `operator` (fallback
  mailbox). Reply-To goes to the same mailbox; inbound replies are polled and
  parsed into the case.
- **Recipients.** Published leasing contact on the listing for rent, space,
  office, and sublease consent. Planning/zoning department for permitted use,
  using the department's published email or official inquiry form.
- **Questions.** Templated per case type, approved text, no free-form model
  composition of new asks. The model fills slots and summarizes replies.
- **Volume.** No daily cap on **new** leads contacted. Strict rules per
  recipient: never contact the same address about the same site twice within
  `mail.followup_days` (default 5), maximum `mail.max_followups` (default 2),
  then escalate to the dashboard. Auto-pause all sending if bounce rate over
  24h exceeds `mail.bounce_pause_pct` (default 5%) or Gmail returns quota
  errors, and surface the pause on the dashboard.
- **Never.** No offers, negotiations, signatures, payments, phone calls, or
  sending to addresses not derived from the listing or an official government
  page. A human reply that asks to stop marks the contact do-not-contact.

## 7. Scheduling

- Runs as a **cloud scheduled agent** (Claude Code routine) on
  `schedule.cron` (default daily, early morning Eastern). The agent checks out
  the child repo and runs the pipeline CLI; model steps (extraction, reply
  classification, digest writing) happen inside the same run.
- Pipeline stages, each idempotent and resumable: `discover`, `resolve`
  (geocode + parcel), `enrich` (zoning layer, flood, traffic, drive time,
  imagery, competitors), `verify` (open/advance cases, send, ingest replies),
  `score`, `report`.
- A run must be safe to repeat: re-running the same day sends nothing twice.
- Alternative schedulers (`github-actions`, `pg_cron`) are config options and
  must be documented, not necessarily implemented.

## 8. Storage

Supabase Postgres with PostGIS. Core tables: `sources`, `raw_documents`,
`listings`, `sites`, `parcels`, `evidence` (fact, value, source_url,
fetched_at, expires_at, method), `cases`, `messages`, `contacts`, `scores`,
`runs`. Row Level Security on for dashboard reads. Secrets in environment
only; never in the repo.

## 9. Dashboard

Lightweight static-first site (Astro or similar) deployed on Vercel, reading
Supabase directly.

- **Shortlist**: viable sites ranked, each with gate status, score breakdown,
  evidence links, imagery, and a map (MapLibre + self-hosted tiles).
- **Pipeline**: sites by stage; unresolved cases with age and next action.
- **Exceptions**: sending paused, source failures, sources excluded by terms,
  expired evidence.
- **Config view**: current provider selection and business parameters, read-only.

## 10. Non-functional requirements

- Node.js + TypeScript for pipeline and dashboard. Single `pnpm` (or `npm`)
  command each for `test`, `pipeline`, `dashboard:dev`.
- Provider adapters share one interface per layer and are unit-tested against
  recorded fixtures. Switching a provider is one line in `providers.yaml`.
- Offline test mode: full pipeline runs on fixtures with network disabled.
- No paid provider can be called unless `providers.paid_enabled: true` **and**
  that adapter is selected. Default false. Log every paid call with cost class.
- Zero spend in the default configuration. Document exactly what would start
  costing money and where the switch is.
- Structured logs per run; a `runs` row summarizing counts and errors.

## 10a. Build with zero credentials

The agent must complete this task **without any real credentials, accounts,
or addresses**. Do not ask the operator for keys, URLs, or configuration
during the build.

- Every external dependency (Supabase, Gmail, Reddit, Vercel, every map/data
  provider) is behind an adapter with a **fixture-backed fake** used by
  default when its environment variable is unset.
- Ship `.env.example` listing every variable name with a one-line purpose.
  Real values are supplied once, at deploy time, by whoever deploys the
  chosen solution. Never per agent, never during development.
- `pnpm test` and a full `pnpm pipeline --offline` run must pass on a fresh
  clone with no network and no `.env`.
- Supabase schema is delivered as migrations plus a local Postgres/PostGIS
  option (Docker or Supabase CLI) so the database layer is also testable
  without a hosted project.
- Dashboard must render from fixture data with no Supabase connection.

Acceptance in section 13 is evaluated in exactly this state: fresh clone,
no secrets, offline.

## 11. Deliverables

1. Pipeline CLI with all six stages and provider abstraction, runnable
   offline on fixtures.
2. `providers.yaml`, `sources.yaml`, `business.yaml` with documented keys.
3. Supabase migrations and RLS policies.
4. Dashboard deployable to Vercel with one command.
5. Scheduled-agent definition and setup doc for the Claude Code routine.
6. Tests: unit (adapters, gates, scoring, dedupe), integration (pipeline on
   fixtures), and a replay test proving a repeated run sends nothing.
7. `README.md`: offline first run, then a separate **Deploy** section: which
   variables to set, how to flip a provider, how to enable a grey source,
   how to pause outreach.

## 12. Out of scope for v1

- Off-market discovery and owner lookups via tax records
- Broker or MLS integrations
- Phone, SMS, or any non-email channel
- Lease negotiation or document generation
- Shared-lot search as a primary strategy

## 13. Acceptance

- Fresh clone, documented setup, offline test suite green.
- A fixture run yields a ranked shortlist where every viable site shows three
  passed gates, each with a cited source and expiry.
- Re-running the same fixture day produces zero outbound messages.
- Switching geocoder from `census` to `nominatim` in config changes behavior
  with no code edits.
- Default config makes no call to any paid endpoint (verified by test).
