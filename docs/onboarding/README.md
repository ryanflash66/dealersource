# Agent onboarding

One file per agent under `docs/onboarding/<agent>-solution.md`. An agent is
**onboarded** when every box in its checklist is ticked and its row exists in
`agents/README.md` and `results/summary.md`.

| Agent | Onboarding doc | Status |
|---|---|---|
| Claude Code | [`claude-solution.md`](claude-solution.md) | repo live, awaiting first run |
| GPT / Codex | [`gpt-solution.md`](gpt-solution.md) | repo live, awaiting first run |
| Google Antigravity | [`antigravity-solution.md`](antigravity-solution.md) | repo live, agent running |

## Onboarding checklist (copy into each agent doc)

- [ ] Child repo exists at `github.com/ryanflash66/dealersource-<agent>` with a README naming agent + owner
- [ ] Submodule added at `agents/<agent>-solution` on branch `main`
- [ ] Agent tool installed and authenticated on the machine that will run it
- [ ] Agent launched **inside the child repo only** (never the parent root)
- [ ] Agent given `prompts/system-prompt.md` then `prompts/task-spec.md`, verbatim
- [ ] Agent-specific config file (if any) committed in the child, not the parent
- [ ] First run completed; child `main` pushed; pointer pinned in parent
- [ ] `results/<agent>-solution.md` created from `results/TEMPLATE.md`
- [ ] Row added to `agents/README.md` and `results/summary.md`

## Ground rules that apply to every agent

1. **Working directory is the child repo.** The agent must not see sibling
   solutions. Open `agents/<agent>-solution/` as the project root, not
   `dealersource/`.
2. **Prompts are read from the parent, never copied.** Paste the contents of
   the two prompt files into the agent session, or reference them by absolute
   path. Do not commit copies into the child.
3. **Same inputs, same order.** System prompt first, task spec second, no
   additional hints. If you must intervene, count and record it under
   *Human interventions* in the result file.
4. **Finish with a pin.** After the child is pushed, return to the parent root
   and commit the moved pointer (see `docs/workflow.md`).

## Template for a new agent doc

```markdown
# Onboarding: <agent>-solution

| | |
|---|---|
| Agent | <name and version> |
| Child repo | https://github.com/ryanflash66/dealersource-<agent> |
| Submodule path | `agents/<agent>-solution` |
| Owner | @ryanflash66 |
| Agent config file (lives in child) | `<file or "none">` |

## Install / auth
...

## Launch inside the child
...

## Feed the prompts
...

## Finish and pin
...

## Checklist
(copy from docs/onboarding/README.md)
```
