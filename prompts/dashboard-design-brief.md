# Dashboard design brief (for Claude Design)

## How to run the session

Claude Design works as a conversation: a short brief stating goal, audience,
content and rough layout, then clarifying questions from Claude, then a first
version on the canvas, then refinement by chat, inline comments and direct
edits. It applies your organization's **default design system automatically**
to every project. The first attempt at this dashboard came out in the
"Lumigrid Calm Confidence" system because that is the default on this
account. If you want a look made for this product, either switch the default
before starting or say so in the first message (the brief below does).

Recommended flow, in one thread:

1. Paste **Message 1**. Answer its questions.
2. Approve one of the directions it offers.
3. Paste **Message 2** once the shortlist screen looks right.
4. Paste **Message 3** to get the review and the export.
5. Export as standalone HTML (Export menu) and put the files in
   `prompts/dashboard-design/`.

---

## Message 1

I need a design template for a read-only operations dashboard called
dealersource. Please start a new design system for it rather than using the
organization default; this product has its own audience and should have its
own look. Before you draw anything, ask me whatever you need to know, then
show me two or three layout directions for the main screen.

**Goal.** The dashboard is where two people look, once a day, at what an
automated system found: places where a small used-car dealership could lease
a lot in Eastern North Carolina. The system gathers listings, checks each
site against public records, emails landlords and town planning offices to
confirm what records can't tell it, and ranks the sites that clear every
check. Nothing is edited here. People read it and then go drive to a site.

**Audience.** The dealership owner and the person running the search. Not
analysts. Laptop most days, phone in a parking lot some days, sometimes at
night. They want three answers fast: which sites are worth visiting this
week, what is still unconfirmed and what the system is doing about it, and
whether the automation is healthy or has stopped.

**Content.** One report per day. For each site: address and parcel id, which
listings were merged into it, whether it is inside the search area and how
many minutes away, whether it is a shared lot, three gate results with links
to their evidence, whether it is viable, its score and rank, the five values
behind the score (traffic count, visibility, drive minutes, rent, competitor
count), and any open cases (type, status, who was emailed). The report also
carries the full evidence list, the emails sent that day, a run summary with
counts and errors, and the provider configuration. Each site has a
street-level photo, an aerial thumbnail, and map coordinates.

**Rules the design has to carry.**
- A site is viable only when three gates pass: zoning permits a dealer, a
  written rent quote is within budget, and the parcel is outside high-risk
  flood zones. Each gate is pass, fail, or pending. Pending means waiting on
  an answer and must never read as a soft pass.
- Viable sites are ranked by a score from five factors, in importance order:
  traffic, visibility, drive time, rent, competitors. People want to see why a
  site ranks where it does.
- Shared lots (space on someone else's business) are a last resort and always
  rank below standalone sites. That has to be obvious.
- Every fact has evidence: source, fetched date, expiry, and method (official
  record, listing, or email reply). Expired evidence should look stale.
- Unknown facts become cases: an email with automatic follow-ups. Cases have
  an age, a status, and a next action. Silence is not approval.
- The system pauses itself when emails bounce or a quota is hit. Paused must
  be impossible to miss.
- By default it runs on free data sources only. Configuration shows which
  provider is in use for each kind of data and whether any paid one is on.

**Screens.** The ranked shortlist with a map, plus the sites one pending
answer away from viable. The pipeline: where every site sits (discovered,
resolved, enriched, verifying, scored, excluded) and the open cases with
their ages. Exceptions: paused sending, failed runs, provider errors, sources
that failed or are excluded by terms of service, evidence about to expire.
Configuration, read-only: home base, maximum drive time, rent range,
shared-lot policy, flood zones, and the provider table.

**Constraints.** Light and dark modes. Must work at 375px and on a laptop.
WCAG AA, and status never conveyed by color alone. No editing controls,
forms, or login. No marketing flourishes; this is a tool people stare at
daily.

## Message 2

Good. Build out the full template from that direction: the design system
(color, type, spacing, radius, elevation, and every component in every
state, including empty, loading, error and stale), then all four screens with
realistic sample data, each in light and dark, and the shortlist at phone
width. Include the paused state on the exceptions screen and at least one
site whose evidence has expired.

## Message 3

Review your own work against the brief: missing states, inconsistent
patterns, anything where pending could be mistaken for pass, contrast
failures in either theme, and anything that breaks at 375px. Fix what you
find. Then prepare it for export as standalone HTML and CSS that opens
without a build step, with the design tokens in one stylesheet and a short
README a developer can implement from.
