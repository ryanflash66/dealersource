# Onboarding: gpt-solution

| | |
|---|---|
| Agent | OpenAI Codex CLI (GPT) |
| Child repo | https://github.com/ryanflash66/dealersource-gpt |
| Submodule path | `agents/gpt-solution` |
| Owner | @ryanflash66 |
| Agent config file (lives in child) | `AGENTS.md` (optional) |

## Install / auth

```bash
npm install -g @openai/codex
codex login
```

## Launch inside the child

```bash
cd agents/gpt-solution
git checkout main && git pull
codex
```

Do **not** launch from the parent root; Codex would see sibling solutions and
the eval rubric.

## Feed the prompts

Paste the contents of `prompts/seed-prompt.md` as the first message. It tells the agent to read the system prompt and task spec itself. Manual alternative: paste `prompts/system-prompt.md`, then
`prompts/task-spec.md`, as the first message. Alternatively:

```bash
codex "$(cat ../../prompts/system-prompt.md; echo; cat ../../prompts/task-spec.md)"
```

If you want persistent project instructions for Codex, put them in `AGENTS.md`
**inside the child** and commit it there.

## Finish and pin

```bash
# inside agents/gpt-solution
git status                 # must be clean
git push

# back in the parent root
cd ../..
git add agents/gpt-solution
git commit -m "Pin gpt-solution to $(git -C agents/gpt-solution rev-parse --short HEAD)"
git push --recurse-submodules=check
```

Then copy `results/TEMPLATE.md` to `results/gpt-solution.md` and fill it in.

## Checklist

- [x] Child repo exists with README naming agent + owner
- [x] Submodule added at `agents/gpt-solution` on `main`
- [ ] Codex CLI installed and authenticated
- [ ] Launched inside the child repo only
- [ ] Prompts fed verbatim, system prompt first
- [ ] `AGENTS.md` (if used) committed in the child
- [ ] First run complete; child pushed; pointer pinned
- [ ] `results/gpt-solution.md` created
- [x] Rows present in `agents/README.md` and `results/summary.md`
