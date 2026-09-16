# prompts/

The single source of truth for **what every agent is asked to build**.
All agents receive the same inputs from here so their outputs are comparable.

| File | Purpose |
|---|---|
| `task-spec.md` | The product/engineering task each agent must implement. |
| `system-prompt.md` | Shared operating instructions given to every agent verbatim. |
| `seed-prompt.md` | The single message to paste into any agent to start it. Points at the two files above. |
| `dashboard-design-brief.md` | Prompt for Claude Design to produce the shared dashboard template. |
| `dashboard-design/` | **Published.** The template every agent must implement (accent per agent). |
| `broadcasts/` | Dated announcements posted to every agent log issue. |

## Rules

- Change a prompt here, then re-run every agent. Never edit a prompt inside a
  child repo; child repos read prompts, they do not own them.
- Version prompts by Git history. If a change is large enough to invalidate
  earlier results, note it in `results/summary.md`.
