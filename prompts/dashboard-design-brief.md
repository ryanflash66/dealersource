# Dashboard design brief (for Claude Design)

Paste everything below the line into Claude Design. Whatever it produces
goes into `prompts/dashboard-design/`.

---

I need a dashboard designed. Here is what it is for, who uses it, and what it
has to show. The design decisions are yours.

## What the product is

"dealersource" is an automated system that finds places where a small
used-car dealership could lease a lot in Eastern North Carolina. Every day it
gathers listings, checks each site against public records, emails landlords
and town planning offices to confirm what it can't read from records, and
ranks the sites that clear every check. The dashboard is the only place a
human looks at the results.

## Who uses it

Two people: the dealership owner and the person managing the search. They
check it once a day, usually on a laptop, sometimes on a phone in a parking
lot. They are not analysts and they will not read documentation. They need
to answer three questions fast:

1. Which sites are worth driving to this week?
2. What is still unconfirmed, and what is the system doing about it?
3. Is the automation healthy, or has it stopped?

They never edit anything here. It is read-only.

## The domain rules the design has to make legible

- A site is only **viable** when three **gates** pass: zoning allows a car
  dealer there, a written rent quote falls within the budget, and the parcel
  is not in a high-risk flood zone. Each gate is one of **pass**, **fail**, or
  **pending**. Pending means we are still waiting for an answer. It must never
  read as a soft pass.
- Viable sites are **ranked** by a score built from five factors, in order of
  importance: road traffic, visibility from the road, drive time from home,
  rent, and how many competing dealers are nearby. Users want to see why a
  site ranks where it does, not just a number.
- Some sites are **shared lots** (space on someone else's business). They are
  acceptable as a last resort and always rank below every standalone site.
  Users must be able to tell at a glance.
- Every fact comes with **evidence**: where it came from, when it was
  fetched, when it expires, and how it was obtained (official record,
  listing, or an email reply). Expired evidence should look stale.
- When a fact is unknown the system opens a **case**: an email to a landlord
  or a planning department, with automatic follow-ups. Cases have an age, a
  status, and a next action. Silence is not approval.
- The system can **pause itself** when emails bounce or a quota is hit. When
  it is paused, nothing new gets verified. This state must be impossible to
  miss.
- By default the system runs entirely on free data sources. A configuration
  view shows which provider is in use for each kind of data and whether any
  paid provider has been switched on.

## The data it renders

Each daily run produces one report. Per site it contains: the address,
parcel id, which listings were merged into it, whether it is inside the
search area and how many minutes away it is, whether it is a shared lot, the
three gate statuses with links to their evidence, whether it is viable, its
score and rank, the five factor values (traffic count, a visibility figure,
drive minutes, monthly rent, competitor count), and any open cases (type,
status, who was contacted). The report also has the full evidence list, the
list of emails sent in the run, a run summary with counts and errors, and the
provider configuration. A small street-level photo, an aerial thumbnail, and
coordinates for a map exist for each site.

## What the dashboard needs to cover

- The ranked shortlist of viable sites, with a map, and the sites that are
  one pending answer away from viable.
- Where every site sits in the pipeline (discovered, resolved, enriched,
  verifying, scored, excluded) and the open cases with their ages.
- Exceptions: paused sending, failed runs, provider errors, sources that
  could not be fetched or are excluded by their terms of service, evidence
  about to expire.
- Configuration, read-only: the business parameters (home base, maximum
  drive time, rent range, shared-lot policy, flood zones) and the provider
  table.
- The empty and error states of each of those, and how it all reads on a
  phone.

## What I need back

A **design template** for this dashboard: a reproducible design system plus
page templates that a developer can implement exactly, without guessing.
That means the design tokens (color, type, spacing, radius, elevation), every
component in every state, and each screen laid out with realistic sample
data, including empty and error states.

- The accent color must be a single swappable variable. Show the template
  with three different accents (`#D97757`, `#10A37F`, `#4285F4`) so it is
  clear the design survives the swap. Colors that carry meaning (pass, fail,
  pending, stale, paused) must not depend on the accent.
- Light and dark modes. The owner uses the phone at night.
- Works at 375px wide and on a laptop.
- WCAG AA. Status is never conveyed by color alone.
- Export as plain HTML and CSS that opens with no build step. The map area is
  rendered by MapLibre; everything else is ordinary markup.

## What I do not want

- Any editing, forms, login, or settings controls. Read-only.
- Marketing-style pages, illustrations, or decorative flourishes. This is a
  tool people look at every day.
- Invented features beyond what is listed here.
