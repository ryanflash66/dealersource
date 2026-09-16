# dealersource

A **Git superproject** for running the same coding task through several AI
agents in parallel and comparing the results.

This repo is the **orchestration and comparison layer only**. It holds the
prompts, the evaluation scaffolding, the result summaries, and a pinned pointer
to each agent's solution. **No application code lives here.** Each solution is
a fully independent repository mounted as a Git submodule under `agents/`.

```
dealersource/
├── agents/                 one submodule per agent (pointers, not code)
│   ├── claude-solution/    -> github.com/ryanflash66/dealersource-claude
│   └── gpt-solution/       -> github.com/ryanflash66/dealersource-gpt
├── prompts/                task spec + shared system prompt given to every agent
├── evals/                  rubric, per-check tasks, thin run.sh driver
├── results/                per-agent result files + cross-agent summary
├── docs/                   architecture, workflow, onboarding
└── .gitmodules             submodule registry
```

> **First-time setup:** the child repos are declared here but must exist
> on GitHub before a fresh clone can fetch them. See
> [`docs/bootstrap-child-repos.md`](docs/bootstrap-child-repos.md).

## Why Git submodules

Each agent must produce a solution with **no knowledge of, and no shared state
with, the others**. Submodules give that isolation for free: every child repo
has its own history, CI, and toolchain, and the parent records only a commit
SHA per agent. A parent commit is therefore a reproducible snapshot of *which
version of each solution* was judged against *which version of the prompts and
evals*. Monorepo tooling (workspaces, Turborepo) assumes a shared build graph
and would couple the solutions; `git subtree` copies child history into the
parent and invites in-place edits. Neither fits. Full rationale:
[`docs/architecture.md`](docs/architecture.md).

## What belongs where

| Parent (`dealersource`) | Child (`dealersource-<agent>`) |
|---|---|
| `prompts/` task spec, system prompt | Application source, tests, CI |
| `evals/` rubric and check definitions | Dependency manifests and lockfiles |
| `results/` curated summaries | Agent-specific config (`CLAUDE.md`, `AGENTS.md`, ...) |
| `docs/` | A `README.md` naming the agent, owner, and how to run/test |
| `.gitmodules` + pinned SHAs | |

Rule of thumb: if a file would change when one agent changes its solution, it
belongs in that agent's repo. Details: [`docs/parent-vs-child.md`](docs/parent-vs-child.md).

## Command reference

All commands run from the parent repo root.

### Clone with submodules

```bash
git clone --recurse-submodules https://github.com/ryanflash66/dealersource.git
cd dealersource
```

### Init / update submodules (after a plain clone or a pull that moved pointers)

```bash
git submodule update --init --recursive
```

### Pull the latest of one child repo

```bash
git submodule update --remote --merge agents/claude-solution
```

Or work inside it like any normal repo:

```bash
cd agents/claude-solution && git checkout main && git pull && cd ../..
```

### Update all submodules to their latest `main`

```bash
git submodule update --remote --merge --recursive
```

### Commit updated submodule SHAs

```bash
git status                      # shows which agents/* pointers moved
git add agents/claude-solution  # or: git add agents
git commit -m "Pin claude-solution to $(git -C agents/claude-solution rev-parse --short HEAD)"
git push --recurse-submodules=check   # refuses if a child commit was never pushed
```

### Add a new agent repo later

```bash
# 1. create the child repo with a minimal README
gh repo create ryanflash66/dealersource-gemini --public --clone
cd dealersource-gemini
printf '# dealersource-gemini\n\ndealersource solution by **Gemini**. Owner: @ryanflash66.\n' > README.md
git add README.md && git commit -m "Initialize dealersource-gemini" && git push -u origin main
cd ..

# 2. wire it into the parent
cd dealersource
git submodule add -b main https://github.com/ryanflash66/dealersource-gemini.git agents/gemini-solution
git add .gitmodules agents/gemini-solution
git commit -m "Add gemini-solution submodule"
git push
```

Then add a row to `agents/README.md` and `results/summary.md`, and write
`docs/onboarding/<agent>-solution.md` from the template in [`docs/onboarding/README.md`](docs/onboarding/README.md).
Full guide: [`docs/adding-an-agent.md`](docs/adding-an-agent.md).

## Daily workflow

1. **Sync.** `git pull --rebase && git submodule update --init --recursive`
2. **Run or edit an agent.** Follow its `docs/onboarding/<agent>-solution.md`: `cd agents/<agent>-solution`, `git checkout main`,
   let the agent work, commit and push there.
3. **Pin.** Back at the root: `git add agents/<agent>-solution`, commit with a
   message saying what changed, `git push --recurse-submodules=check`.
4. **Evaluate.** `./evals/run.sh [agent]`, then fill in `results/<agent>.md`
   from `results/TEMPLATE.md` and update `results/summary.md`.
5. **Commit results with the pointer they describe** so every number in
   `results/` is traceable to exact child and parent SHAs.

Common pitfalls (detached HEAD in a child, pushing the parent before the child)
are covered in [`docs/workflow.md`](docs/workflow.md).

## Agents

| Path | Repo | Agent |
|---|---|---|
| `agents/claude-solution` | [dealersource-claude](https://github.com/ryanflash66/dealersource-claude) | Claude Code (Anthropic) |
| `agents/gpt-solution` | [dealersource-gpt](https://github.com/ryanflash66/dealersource-gpt) | GPT / Codex (OpenAI) |
