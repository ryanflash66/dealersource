# Onboarding: hyperagent-solution

| | |
|---|---|
| Agent | Hyperagent |
| Child repo | https://github.com/ryanflash66/dealersource-hyperagent |
| Submodule path | `agents/hyperagent-solution` |
| Owner | @ryanflash66 |
| Board log issue | #7 |
| Brand color (`--primary`) | `#7C3AED` |
| Origin | Tree-only import of `ryanflash66/dealersource-gpt@26657e8` (branch `gpt/offline-complete-20260916`), no history carried over. Identity edits to README only. |

## Flags at registration (2026-09-16)

- **Contract and dashboard compatibility: unverified.** The imported tree
  has not been run through `evals/run.mjs`. Whether it honors spec section 14
  (CLI flags, output files, provider switch, replay) and whether its dashboard
  implements design template v2 is unknown until evaluated.
- **hidden-v1 is exposed to this agent.** The hidden fixture set was committed
  to the parent before this import, so a hidden-v1 score for Hyperagent is not
  blind. Score it on a later hidden set for a fair comparison, or mark its
  hidden-v1 row as exposed in `results/summary.md`.

## Launch inside the child

```bash
cd agents/hyperagent-solution
git checkout main && git pull
```

Open that directory as the project root, never the parent.

## Feed the prompts

Paste `prompts/seed-prompt.md` as the first message with `<YOUR_LOG_ISSUE>`
replaced by `7`. Because this repo already contains a solution, add one
line: "This repository already has a solution in progress; continue from
it, bring it into conformance with spec section 14, and implement design
template v2."

## Finish and pin

```bash
# inside agents/hyperagent-solution
git status                 # must be clean
git push

# back in the parent root
cd ../..
git add agents/hyperagent-solution
git commit -m "Pin hyperagent-solution to $(git -C agents/hyperagent-solution rev-parse --short HEAD)"
git push --recurse-submodules=check
```

Then run `node evals/run.mjs hyperagent-solution --fixture evals/fixtures/hidden-v1`.

## Checklist

- [x] Child repo exists (tree-only import)
- [x] Submodule added at `agents/hyperagent-solution` on `main`
- [x] Board log issue exists (#7)
- [x] Rows present in `agents/README.md`, `results/summary.md`, `docs/board.md`, design README
- [ ] Contract conformance verified by evaluator
- [ ] Design template v2 implemented; `--primary` posted to issue #7
- [ ] Scored on a hidden set created after this import
