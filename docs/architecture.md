# Architecture

```
dealersource (parent, orchestration + comparison)
├── prompts/   what every agent is asked to do          (owned here)
├── evals/     how every solution is judged             (owned here)
├── results/   what we concluded                        (owned here)
├── docs/      how this all fits together               (owned here)
└── agents/    one submodule per agent                  (pointers only)
    ├── claude-solution  -> ryanflash66/dealersource-claude
    ├── gpt-solution     -> ryanflash66/dealersource-gpt
    ├── cursor-solution  -> ryanflash66/dealersource-cursor
    └── aider-solution   -> ryanflash66/dealersource-aider
```

## The experiment

Several AI coding agents are given the **same task** (`prompts/`) and each
produces a **complete, independent solution** in its own repository. The parent
repo pins one commit of each solution and holds the shared evaluation
(`evals/`) and its conclusions (`results/`).

## Why Git submodules

- **Hard isolation.** Each agent repo has its own history, CI, dependencies,
  and tooling. Nothing leaks between solutions, so comparisons are fair.
- **Pinned snapshots.** The parent records an exact commit SHA per agent. A
  given parent commit therefore describes a reproducible set of solutions and
  the exact prompts/evals used to judge them.
- **No shared build graph.** The solutions may use different languages and
  package managers. Monorepo tooling (workspaces, Turborepo) assumes a shared
  toolchain and would fight that. Submodules assume nothing.
- **Independent ownership.** An agent repo can be handed to a person, deleted,
  or re-run from scratch without touching the others or the parent history.
- **Rejected alternatives.** `git subtree` copies child history into the parent
  and makes it easy to accidentally edit solutions in place. Plain clones with
  no linkage lose the pinned-snapshot property. Monorepo tooling was excluded
  by requirement.

## Costs accepted

- Contributors must remember `--recurse-submodules` / `submodule update`.
- Updating a pointer is an explicit commit in the parent. This is a feature:
  it is the audit trail of which solution version was evaluated.
