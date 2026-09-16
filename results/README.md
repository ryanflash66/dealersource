# results/

Curated evaluation results. **Summaries only**; no raw logs, no code.

| File | Purpose |
|---|---|
| `summary.md` | Cross-agent comparison table and conclusions. |
| `TEMPLATE.md` | Copy to `<agent>.md` (e.g. `claude-solution.md`) for each evaluated agent. |
| `raw/` | Git-ignored scratch output from `evals/run.sh`. |

Every result file must state the **child repo commit SHA** it evaluated and the
**parent repo commit SHA** whose prompts/evals were used, so any number here can
be reproduced.
