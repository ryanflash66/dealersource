# What belongs where

## Parent repo (`dealersource`)

Belongs here:

- `prompts/` task spec and shared instructions given to every agent
- `evals/` rubric, per-check task definitions, thin driver script
- `results/` per-agent result summaries and the cross-agent comparison
- `docs/` architecture, workflow, and onboarding docs
- `.gitmodules` and the submodule commit pointers under `agents/`

Never here:

- Application source code, dependencies, lockfiles, build output
- Agent-specific config (`CLAUDE.md`, `AGENTS.md`, ...)
- Raw eval logs (use `results/raw/`, which is git-ignored)
- Anything that would only be true for one agent

Test: *if it would need to change when one agent changes its solution, it does
not belong in the parent.*

## Child repos (`dealersource-<agent>`)

Belongs there:

- The complete application: source, tests, CI, dependency manifests
- The agent's own tooling and config files
- A `README.md` stating the agent, the owner, and how to run/test

Never there:

- Copies of the prompts or evals (read them from the parent)
- References to sibling agent repos
- Result write-ups (those go in the parent `results/`)

Test: *a child repo must make sense to someone who has never seen the parent.*
