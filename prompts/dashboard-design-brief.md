# Dashboard design brief (for Claude Design)

Paste everything below the line into Claude Design. The export it produces
goes into `prompts/dashboard-design/` in this repo and becomes the mandatory
template every agent's dashboard must implement.

---

Design a **production operations dashboard** for "dealersource", a system
that continuously finds, verifies and ranks leaseable sites for a small
used-car dealership in Eastern North Carolina. The dashboard is read-only:
humans look at a verified shortlist and act on it. It is built by several
independent engineering teams from your one design, so the output must be a
**complete, implementable template**, not a mood board.

## Who uses it

One owner-operator and one project manager. They check it once a day on a
laptop and occasionally on a phone. They are not analysts. They need to
answer, in under a minute: *which sites are worth visiting today, what is
still unverified, and is the automation healthy?*

## Product rules the design must make visible

- A site is **viable** only when three **gates** pass with cited evidence:
  **zoning** (permitted use confirmed), **rent** (written quote within
  $600 to $1,000 per month), **flood** (not in a FEMA high-risk zone). Gate
  status is `pass`, `fail`, or `pending`. Pending is not a soft pass; it must
  look unresolved, never green.
- Viable sites are **ranked** by a weighted score. Ranking factors, in
  weight order: traffic count, visibility, drive time from home base, rent,
  competitor density. Show the breakdown, not just the number.
- **Shared-lot** sites are allowed but always rank after every standalone
  site and must carry a visible flag.
- Every fact has **evidence**: a source link, when it was fetched, when it
  expires, and the method (official layer, listing, email reply). Expired
  evidence must look stale.
- Unknown facts become **cases**: an outreach email to a landlord or a town
  planning department, with follow-ups. Cases have age, status and next
  action. "No reply" is not approval.
- The automation can **pause itself** (email bounces, quota errors). That
  state must be impossible to miss.
- Default configuration uses only **free data providers**. The config view
  shows which provider is selected per layer and whether paid providers are
  enabled.

## Data shape (design to this, exactly)

The dashboard reads one `report.json` per run:

```
report
  run_id, run_date, offline, providers { paid_enabled, geocoder, parcels, drivetime, imagery, poi, crawler, tiles }
  sites[]
    site_id, parcel_id, listing_ids[], address, in_search_area, drive_minutes, shared_lot
    gates { zoning|rent|flood: { status: pass|fail|pending, evidence_ids[] } }
    viable, score (0..1), rank (1..n among viable, else null)
    metrics { aadt, visibility (0..1), drive_minutes, rent_monthly, competitors }
    open_cases[] { case_type: rent|zoning|space, status, recipient }
  evidence[] { evidence_id, site_id, fact, value, source_url, fetched_at, expires_at, method }
  external_calls[]
messages[]  (sent this run) { site_id, case_type, to, subject, sent_at, template_id }
run  { run_id, run_date, started_at, finished_at, counts {...}, errors[] }
```

Also available per site: a small street-level photo, an aerial thumbnail,
and lat/lon for a map.

## Views (four, plus a shared shell)

1. **Shortlist** (home). Ranked viable sites. Each site card: rank, address,
   rent, drive minutes, three gate chips, score bar with the five-factor
   breakdown, shared-lot flag when relevant, thumbnail, "view evidence".
   A map alongside or above (MapLibre; design the container, markers by
   rank, selected state, and a compact popup). Below the shortlist, a quieter
   section: "Almost: one gate pending" listing sites with exactly one
   pending gate and their open case.
2. **Pipeline**. Every site by stage: discovered, resolved, enriched,
   verifying, scored, excluded. Counts per stage. A table of open cases:
   site, case type, recipient (domain only), sent, follow-ups, age, next
   action. Sortable by age.
3. **Exceptions**. Full-width banner states: sending paused (with reason and
   since-when), last run failed, provider errors. Then lists: sources that
   failed to fetch, sources excluded by terms of service (with the reason),
   evidence expiring within 7 days, sites dropped since last run.
4. **Config** (read-only). Business parameters (home base, max drive
   minutes, rent range, shared-lot policy, flood zones). Provider table: layer,
   selected provider, free or paid, enabled. A clear "paid providers: off"
   indicator. Last run summary from `run`.

Shared shell: top bar with product name, last run time and status dot, view
switcher, theme toggle. Footer with parent repo link and run id.

## Visual direction

- Calm, dense enough for a desktop table, still readable on a phone. Think
  operations console, not marketing site. No illustrations, no gradients as
  decoration, no hero sections.
- **Typography:** one UI sans for text, one mono for ids, coordinates,
  money, and timestamps. Tabular figures everywhere numbers align.
- **Color:** neutral surfaces. Semantic colors are fixed and must never be
  changed by implementers: pass (green), fail (red), pending (amber), stale
  (grey with strikethrough or hatch), paused (red banner). Exactly **one
  accent color** for interactive elements and rank markers, exposed as a
  single token `--accent` (plus derived `--accent-fg`, `--accent-soft`).
  **Each implementing team will set its own accent color**; design so that
  any reasonable hue works against the neutral surfaces and the fixed
  semantic colors. Show three variants of the Shortlist in the export to
  prove it: accent `#D97757`, `#10A37F`, `#4285F4`.
- Light and dark themes via tokens. Dark is not inverted light; check
  contrast on gate chips and the map popup in both.
- Body has an explicit background. Side gutter 16px on phones. No
  horizontal page scroll at 375px.

## Accessibility

- WCAG AA contrast for all text and for gate chips in both themes.
- Gate status never conveyed by color alone: icon plus label.
- Focus states visible. Table headers real headers. Map has a list
  equivalent (the shortlist itself).

## Deliverables (export exactly these)

```
prompts/dashboard-design/
  README.md              how to implement; token list; do/don't
  tokens.css             all CSS custom properties on :root, dark theme under
                         @media (prefers-color-scheme: dark) guarded by
                         :root:not([data-theme="light"]) and again under
                         :root[data-theme="dark"]; --accent is the ONLY token
                         implementers change
  components.html        every component in every state, static, using tokens.css
  pages/shortlist.html   static page with realistic sample data (8 sites)
  pages/pipeline.html
  pages/exceptions.html  showing the paused state
  pages/config.html
  pages/shortlist-accent-*.html   the three accent variants
  assets/                any icons as inline-able SVG
```

Static HTML and CSS only, no framework, no build step, no external scripts
except MapLibre GL from cdn.jsdelivr.net/npm/ for the map container demo.
Fonts from Google Fonts or system stack. Everything must render by opening
the file.

## Do not

- Do not invent product features beyond the four views.
- Do not add auth, settings forms, or editing. Read-only.
- Do not use color alone for status.
- Do not hard-code an accent; use the token.
