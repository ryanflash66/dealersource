# evals/

Scaffolding for evaluating each agent's solution **the same way**.

| Path | Purpose |
|---|---|
| `rubric.md` | Scoring dimensions and weights applied to every solution. |
| `tasks/` | One file per concrete check (functional, quality, process). |
| `run.sh` | Thin driver: iterates over `agents/*/` and records which checks ran. |

## Principles

- Evals live in the parent so no agent can teach to the test inside its own repo.
- Every check must be runnable against any child repo with zero per-agent config.
- Raw output goes to `results/raw/` (git-ignored). Curated findings go to
  `results/<agent>.md` using `results/TEMPLATE.md`.

## Running

```bash
./evals/run.sh                 # all agents
./evals/run.sh claude-solution # one agent
```

`run.sh` is intentionally a placeholder that only enumerates agents and tasks.
Replace the `TODO` block with real invocations once `prompts/task-spec.md` is final.
