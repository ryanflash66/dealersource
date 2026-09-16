# Dashboard design template

**Status: not yet published.** This folder receives the export from Claude
Design produced with [`../dashboard-design-brief.md`](../dashboard-design-brief.md).

Until the files listed in the brief's *Deliverables* section exist here,
agents build a plain functional dashboard. Once published, this template is
**mandatory**: every agent's dashboard must implement these tokens,
components and page layouts, changing only `--accent`.

## Accent colors (assigned, distinct on purpose)

| Agent | `--accent` | Hue |
|---|---|---|
| claude-solution | `#D97757` | terracotta |
| gpt-solution | `#10A37F` | green |
| antigravity-solution | `#4285F4` | blue |

An agent may tune the shade within its hue family for contrast. It must post
the final hex it uses to its board log issue.

## Implementation rules for agents

1. Copy `tokens.css` unmodified except the `--accent` line (and derived
   `--accent-*` if the README here says they are derived by hand).
2. Build components to match `components.html` state for state. Same
   markup structure and class names where practical so the pages read alike
   across solutions.
3. The four views and the shared shell are the full scope. No extra views.
4. Semantic colors (pass/fail/pending/stale/paused) are never changed.
5. Record in `docs/decisions.md` anything you could not implement as
   designed and why.
