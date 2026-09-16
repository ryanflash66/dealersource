# Bootstrapping the child repos (first-time setup)

The child repos were created **locally** inside `agents/` with their
intended GitHub URLs already set as `origin`. The parent `.gitmodules` points at
those URLs. Until the repos exist on GitHub and the initial commits are pushed,
a fresh clone of the parent cannot fetch the submodules.

Check the current state:

```bash
for r in claude gpt; do
  printf '%s: ' dealersource-$r
  git ls-remote https://github.com/ryanflash66/dealersource-$r.git HEAD >/dev/null 2>&1 && echo exists || echo missing
done
```

## Create and push all children (requires `gh auth login`)

Run from the parent repo root:

```bash
gh auth status || gh auth login -h github.com

for r in claude gpt; do
  gh repo create "ryanflash66/dealersource-$r" --public \
    --description "dealersource solution by $r agent" \
    --source "agents/$r-solution" --remote origin --push
done

git submodule status
```

`--source ... --push` uses the existing local repo and its `main` branch, so no
history is lost and the SHAs pinned in the parent remain valid.

If `origin` already exists in a child (it does, by default), `gh` keeps it;
`--remote origin` is a no-op in that case.

## Without `gh` (web UI)

1. Create **empty** repos (no README, no license) at
   https://github.com/new named `dealersource-claude` and `dealersource-gpt`.

2. Push each local child:

```bash
for r in claude gpt; do
  git -C "agents/$r-solution" push -u origin main
done
```

## Verify

```bash
git push --recurse-submodules=check
git submodule status
```

If both succeed, a fresh `git clone --recurse-submodules` of the parent works.
