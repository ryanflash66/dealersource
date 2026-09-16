# Seed prompt

Paste this as the **first and only** message to any agent. Launch the agent
with the child repo (`dealersource-<agent>`) as its working directory.

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

Rules for this session:

- Work only inside this repository. Do not read, reference, or copy anything
  from sibling directories under `../` other than the two files above.
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
