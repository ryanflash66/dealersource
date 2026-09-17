# Dashboard design template

**Status: PUBLISHED v2, 2026-09-16.** This replaces v1 entirely. Every agent's
dashboard must implement this template. Source: the Claude Design export
"Dealersource Operations Dashboard", built on the Lumigrid "Calm Confidence"
design system, following the Shopify Live View reference.

The designer's own notes on the shell, components and rules are in
[`DESIGN-NOTES.md`](DESIGN-NOTES.md). Read them; they are part of the template.

## Files

| File | What it is |
|---|---|
| `tokens.css` | Every design token: Lumigrid palette, semantic colors, type, spacing, radius, motion, base styles, plus the dealersource status tokens (`--ok`, `--wait`, `--stale-hatch`, `--factor-*`, `--stage-*`). Light on `:root`, dark under `.dark`. |
| `fonts.css` + `fonts/` | Hanken Grotesk and IBM Plex Mono as vendored woff2. No network needed. |
| `dashboard.css` | App shell rules (`.app`, `.dark` overrides, links, body). Component styling is inline in the pages, as the design was authored. |
| `components.html` | Every component in every state: gate results, run status, banners, site cards (default, shared, pending), factor bars, evidence rows, case rows, stage strip, provider rows. |
| `pages/shortlist.html` | Shortlist, light, site drawer open on rank 1. |
| `pages/shortlist-dark.html` | Shortlist, dark. |
| `pages/shortlist-globe.html` | Map zoomed out to globe; sites cluster into one count. |
| `pages/shortlist-phone.html` | Shortlist at 375px. |
| `pages/pipeline.html`, `pages/pipeline-dark.html` | Where every site sits, and open cases. |
| `pages/exceptions.html`, `pages/exceptions-dark.html` | Sending-paused state with the exceptions lists. |
| `pages/config.html`, `pages/config-dark.html` | Read-only business parameters and provider table. |

Open any page from disk. No build step. Map tiles in the sample pages load
from Esri's public tile server; the canvas element where MapLibre draws is a
placeholder in the static pages.

## Accent colors (assigned, distinct on purpose)

In this design system the brand color is `--primary` (ranks, active nav,
selected card, factor bars). Each agent sets its own:

| Agent | `--primary` | `--primary-hover` |
|---|---|---|
| claude-solution | `#D97757` | a darker step of the same hue |
| gpt-solution | `#10A37F` | a darker step of the same hue |
| hyperagent-solution | `#7C3AED` | a darker step of the same hue |

Set them on `:root` (and `.dark` if you need a lighter step there). The five
factor-bar shades in the sample pages are the primary hue at five lightness
steps; recompute them for your hue and keep the order. Post the final hex
values and the implementing commit to your board log issue.

Never change the status colors: `--ok`, `--wait`, `--destructive`, the stale
hatch, or the paused red.

## Implementation rules

1. Ship `tokens.css`, `fonts.css`, `fonts/` and `dashboard.css` unmodified
   except the `--primary` and `--primary-hover` lines.
2. Reproduce the markup of `components.html` and the pages. The design is
   inline-styled; you may move styles into classes, but the rendered result
   must match the pages state for state in both themes.
3. Shell: 56px top bar with pill nav (Shortlist, Pipeline, Exceptions,
   Configuration), run status on the right, 40px run-health banner under it
   on Shortlist. Shortlist body is a 560px scrolling column beside a map that
   does not scroll. Phone: header stacks, map becomes a 240px band above the
   column.
4. Gate result is always glyph plus word plus color. Pending is amber, never
   green. Stale uses the hatch. Shared lots use the muted rank and the
   "Shared lot, ranks last" badge and always follow standalone sites.
5. The four views and the shell are the full scope. No editing, forms or
   login.
6. Record anything you could not implement as designed, and why, in your
   repo's `docs/decisions.md`.
