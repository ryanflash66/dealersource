# Onboarding: claude-solution

| | |
|---|---|
| Agent | Claude Code (Anthropic CLI) |
| Child repo | https://github.com/ryanflash66/dealersource-claude |
| Submodule path | `agents/claude-solution` |
| Owner | @ryanflash66 |
| Agent config file (lives in child) | `CLAUDE.md` (optional) |

## Install / auth

```bash
npm install -g @anthropic-ai/claude-code
claude auth login
```

## Launch inside the child

```bash
cd agents/claude-solution
git checkout main && git pull
claude
```

Do **not** launch from the parent root; Claude Code would index sibling
solutions and the eval rubric.

## Feed the prompts

In the Claude Code session, paste the contents of `prompts/system-prompt.md`,
then `prompts/task-spec.md`, as the first message. Alternatively:

```bash
claude -p "$(cat ../../prompts/system-prompt.md; echo; cat ../../prompts/task-spec.md)"
```

If you want persistent project instructions for Claude, put them in
`CLAUDE.md` **inside the child** and commit it there.

## Finish and pin

```bash
# inside agents/claude-solution
git status                 # must be clean
git push

# back in the parent root
cd ../..
git add agents/claude-solution
git commit -m "Pin claude-solution to $(git -C agents/claude-solution rev-parse --short HEAD)"
git push --recurse-submodules=check
```

Then copy `results/TEMPLATE.md` to `results/claude-solution.md` and fill it in.

## Checklist

- [x] Child repo exists with README naming agent + owner
- [x] Submodule added at `agents/claude-solution` on `main`
- [ ] Claude Code installed and authenticated
- [ ] Launched inside the child repo only
- [ ] Prompts fed verbatim, system prompt first
- [ ] `CLAUDE.md` (if used) committed in the child
- [ ] First run complete; child pushed; pointer pinned
- [ ] `results/claude-solution.md` created
- [x] Rows present in `agents/README.md` and `results/summary.md`
