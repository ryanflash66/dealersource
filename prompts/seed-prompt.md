# Seed prompt

Paste this as the **first and only** message to any agent. Launch the agent
with the child repo (`dealersource-<agent>`) as its working directory.
Replace `<YOUR_LOG_ISSUE>` with the agent's board issue number (see
`docs/board.md`).

---

You are working in an empty Git repository that is one of several
independent solutions to the same task. Build the complete solution here.

**Read these two files first, in this order, then follow them exactly.**
Try the local path first; if it does not exist, fetch the URL.

1. System prompt
   - local: `../../prompts/system-prompt.md`
   - url: https://raw.githubusercontent.com/ryanflash66/dealersource/main/prompts/system-prompt.md
2. Task spec
   - local: `../../prompts/task-spec.md`
   - url: https://raw.githubusercontent.com/ryanflash66/dealersource/main/prompts/task-spec.md

You may also read, and copy into your own tests, the offline contract and
sample fixtures:

- `../../evals/contract/` (JSON Schemas) or
  https://github.com/ryanflash66/dealersource/tree/main/evals/contract
- `../../evals/fixtures/golden-v1/` (inputs plus `expected.json`) or
  https://github.com/ryanflash66/dealersource/tree/main/evals/fixtures/golden-v1

Your pipeline must reproduce `expected.json` from `golden-v1/input`. An
evaluator will run you on a different fixture set with the same shape.

**Progress board.** At each milestone (plan done, schema done, each pipeline
stage done, tests green, dashboard builds, pushed) post a 2-6 line update:

```
gh issue comment <YOUR_LOG_ISSUE> -R ryanflash66/dealersource --body "..."
```

Your log issue number: **<YOUR_LOG_ISSUE>** (claude-solution = 3,
gpt-solution = 4, antigravity-solution = 5). If you hit a real spec ambiguity,
also post the question and the decision you took to issue 6 (Open chat).
Do not read other agents' log issues.

**Dashboard design.** Check
https://github.com/ryanflash66/dealersource/tree/main/prompts/dashboard-design
at each milestone. When its README says published, its tokens, components
and page layouts are mandatory; rewrite your dashboard to match if needed.
Your accent color is assigned there. Set only `--accent`, then post the hex
you used and the implementing commit to your log issue.

Rules for this session:

- Work only inside this repository. Do not read, reference, or copy anything
  from sibling directories under `../` other than the files named above.
- Do not copy the prompt files into this repo. Reference them in your README
  by URL.
- Do not ask me for credentials, API keys, project URLs, or a real address.
  The spec requires the whole system to build, test, and run offline on
  fixtures. Ship `.env.example` with variable names only.
- Do not stop to ask clarifying questions. Where the spec is silent, choose
  the simplest option that satisfies the acceptance criteria in section 13,
  and record the decision in `docs/decisions.md` in this repo.
- Commit as you go in small, descriptive commits. Do not push until the end.
- Finish when: `git status` is clean, the test suite passes on a fresh clone
  with no network and no `.env`, and the README lets a stranger run the
  offline pipeline and dashboard in under five minutes.
- Your final message to me must contain only: the commands you ran to verify
  acceptance, their pass/fail results, and the list of decisions you made
  where the spec was silent.

Begin by reading the two files, then start building.
