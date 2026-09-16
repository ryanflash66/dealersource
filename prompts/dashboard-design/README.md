# Dashboard design template

**Status: PUBLISHED 2026-09-16.** This template is mandatory for every
agent's dashboard. Generated from the Claude Design canvas
"dealersource dashboard" (version 1789594870-84ef), built with the Lumigrid
"Calm Confidence" design system, in response to
[`../dashboard-design-brief.md`](../dashboard-design-brief.md).

## Files

| File | What it is |
|---|---|
| `tokens.css` | Every CSS custom property, on `:root` and `.ds-root`. Light values, dark via `prefers-color-scheme` guarded by `:root:not([data-theme="light"])`, and again under `:root[data-theme="dark"]`. **The only line an implementer changes is `--accent`.** |
| `dashboard.css` | Component and layout styles: shell, top bar, site card, gate chips, score bar, evidence rows, cases table, stage strip, banners, config tables, map container, footer. Do not edit. Extend in your own stylesheet if you must. |
| `components.html` | Every component in every state, static, using the two stylesheets. Match this state for state. |
| `pages/shortlist.html` | Home view, 8 sample sites, desktop light. |
| `pages/shortlist-dark.html` | Same, forced dark (`data-theme="dark"`). |
| `pages/shortlist-phone.html` | Same content constrained to 390px. |
| `pages/pipeline.html` | Stage strip and open-cases table. |
| `pages/exceptions.html` | Paused-sending banner state plus lists. |
| `pages/config.html` | Read-only business parameters, provider table, last run. |
| `pages/shortlist-accent-*.html` | Proof the design holds under each assigned accent. |

Open any page directly from disk. No build step. Fonts load from Google
Fonts (Hanken Grotesk, IBM Plex Mono); the system stack is the fallback.

## Accent colors (assigned, distinct on purpose)

| Agent | `--accent` |
|---|---|
| claude-solution | `#D97757` |
| gpt-solution | `#10A37F` |
| antigravity-solution | `#4285F4` |

Set it once, on the root element or in your copy of `tokens.css`:

```css
:root, .ds-root { --accent: #D97757; }
```

`--accent-fg`, `--accent-soft`, `--accent-ring` and the five `--factor-*`
score shades derive from `--accent` via `color-mix()`. Do not set them by
hand. You may tune the shade within your hue for contrast; post the final hex
and the implementing commit to your board log issue.

## Implementation rules

1. Ship `tokens.css` and `dashboard.css` unmodified except the `--accent`
   line. Load them before your own styles.
2. Reproduce the markup structure and class names from `components.html`
   and the pages: `ds-root`, `topbar`, `site-card`, `chip chip-pass|fail|pending|stale`,
   `score-bar`, `evidence-row`, `cases-table`, `stage-strip`, `banner banner-paused`,
   and so on. Same class names mean the solutions read alike and the evaluator
   can compare screenshots.
3. Gate status is icon plus label plus color, never color alone. Pending is
   amber and reads as unresolved. Stale evidence uses the hatch.
4. Semantic status colors (`--pass-*`, `--fail-*`, `--pending-*`, `--stale-*`,
   `--paused-*`, `--warn-*`, `--info-*`) are fixed. Never change them.
5. The four views and the shared shell are the full scope. No extra views,
   no editing controls, no auth.
6. The map container (`.map-panel`) hosts MapLibre GL when online and shows
   the static preview markup offline. Dark mode filters the tiles as in
   `dashboard.css`.
7. Body has an explicit background. 16px side gutter on phones. No horizontal
   scroll at 375px.
8. Record anything you could not implement as designed, and why, in your
   repo's `docs/decisions.md`.

## Source

Canvas: https://claude.ai/artifact/T24UER7KcvFpYrqUBA4sDc (private to the PM).
Conversion from the canvas's artboards to these static files was mechanical:
the shared stylesheet was split into tokens and components, the fixed
artboard frame became a fluid `min-height: 100vh` root, and the accent and
theme levers became a literal `--accent` and `data-theme`.
