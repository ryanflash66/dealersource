# Dealersource dashboard template

Design template for the read-only dealersource operations dashboard, built on the
Lumigrid "Calm Confidence" design system. Generated 2026-09-16 from the Claude Design
canvas (Dealersource Template.dc.html, turn 3).

## Files

- `Dealersource Dashboard Template.html`: every artboard in one self-contained file.
  Open from disk. Components sheet (3a), Shortlist light with drawer (3b), dark (3c),
  globe state (3d), phone 375px (3e), Pipeline (3f, 3g), Exceptions paused (3h, 3i),
  Configuration (3j, 3k). Map tiles and the globe outline load from the network; the
  rest is offline.
- `tokens.css`: every design token in one stylesheet. Lumigrid colors, type, spacing,
  motion and base styles, plus the dealersource status tokens (`--ok`, `--wait`,
  `--stale-hatch`, `--factor-*`, `--stage-*`). Light on `:root`, dark under `.dark`.

## Shell

- Top bar 56px: mark + "dealersource" + mono report-date pill on the left, Lumigrid pill
  nav in the centre (Shortlist, Pipeline, Exceptions, Configuration; active item gets
  `--wash-primary`, `--nav-active` text and a 2px lamp bar), run status + last run on
  the right. Exceptions carries a red count badge when anything is open.
- Run-health banner 40px under the top bar on Shortlist: status glyph + word, last run,
  counts. Green wash when running; when paused the banner turns into the paused card.
- Shortlist body: 560px column + map. Column scrolls, map does not. Map is a MapLibre GL
  container; zooming out past the region switches to globe projection with sites
  clustered into one count. Phone: header stacks, map becomes a 240px band above the
  column, nav labels shorten ("Config").

## Rules carried by the components

- Gate result = glyph + word + color, never color alone. Pass: check, `--ok`. Fail: x,
  `--destructive`. Pending: clock, `--wait` (amber; never in the green family). Stale:
  alert glyph, muted text on `--stale-hatch`.
- A site is viable only when all three gates pass. Pending cards show "No score until
  viable". One-answer-away cards state who was emailed, case age, and the next follow-up.
- Ranked sites are numbered in `--primary` mono at 24px. Five factor bars beside the
  gates, importance order left to right (traffic, visibility, drive, rent, competitors),
  colored `--factor-1..5`.
- Shared lots use a muted rank number and the badge "Shared lot, ranks last"; they
  always follow standalone sites.
- Evidence rows: fact, source, method (official record / listing / email reply), fetched
  date, expiry, and an Open link. Tag: Fresh (`--ok`), Expires in N d (`--wait`), Expired
  (muted on hatch, row text muted).
- Cases: site, type, recipient, opened date, age in mono, emails sent, next action.
  Status pills: Awaiting reply (`--wait`), Answered (`--ok`), Held, sending paused
  (`--destructive`).
- Paused: red-bordered card with a solid red pause disc, sentence-case headline with a
  period, plain-language reason and consequence, counts of held follow-ups. Also shown in
  the top bar and as the Exceptions badge.
- Configuration is read-only text. Provider table: kind, in use, fallback, cost pill
  (Free in `--ok`, Paid would be `--wait`, Off muted), status this run.

## Type

Hanken Grotesk for all UI; IBM Plex Mono for eyebrows (10.5px, 0.08em tracking,
uppercase), parcel ids, ranks, scores, counts, times and durations. Base 14px, small 12px,
labels 12.5px, card titles 600 weight. No italics, no em dashes, sentence case.

## Accessibility

All text pairings measured at or above 4.5:1 in both themes (large text 3:1). Status
always has a glyph and a word. Focus ring is `--ring`. No horizontal scroll at 375px.

## Not in this template

Map interaction (MapLibre), photo and aerial images (slots are dashed placeholders), any
editing, forms or login.
