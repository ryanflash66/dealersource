# Daily workflow

All commands run from the parent repo root unless stated otherwise.

## Start of day

```bash
git pull --rebase
git submodule update --init --recursive
git submodule status
```

`submodule status` prints one line per agent. A leading `+` means your local
checkout is ahead of the pinned SHA; `-` means not initialized.

## Work on one agent's solution

```bash
cd agents/claude-solution
git checkout main
git pull
# ... let the agent work, or edit, commit, push as in any normal repo ...
git push
cd ../..
```

Commits made inside `agents/<x>/` belong to the **child** repo. The parent only
notices that the pointer moved.

## Record the new snapshot in the parent

```bash
git add agents/claude-solution
git commit -m "Pin claude-solution to <short-sha>: <what changed>"
git push
```

Pin one agent per commit when practical. It keeps `results/` traceable.

## Pull the latest of every agent at once

```bash
git submodule update --remote --merge --recursive
git status              # shows which pointers moved
git add agents
git commit -m "Pin all agents to latest main"
git push
```

## Run evals

```bash


```

Write findings into `results/<agent>.md` (copy `results/TEMPLATE.md`), then
update `results/summary.md`. Commit results together with the pointer they
describe.

## Avoiding the classic submodule mistakes

- **Detached HEAD in a child.** `submodule update` checks out a SHA, not a
  branch. Run `git checkout main` inside the child before committing there.
- **Pushed parent, forgot child.** Others get a pointer to a commit that only
  exists on your machine. Guard with:
  `git push --recurse-submodules=check` (or set it permanently:
  `git config push.recurseSubmodules check`).
- **Dirty child shows as dirty parent.** `git status` in the parent flags
  `modified content` under `agents/`. Commit or stash inside the child.
