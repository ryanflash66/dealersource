# agents/

Each subdirectory is a **Git submodule** pointing at an independent GitHub repo
that holds one agent's complete solution to the dealersource task.

| Path | Repo | Agent |
|---|---|---|
| `claude-solution/` | https://github.com/ryanflash66/dealersource-claude | Claude Code (Anthropic) |
| `gpt-solution/` | https://github.com/ryanflash66/dealersource-gpt | GPT / Codex (OpenAI) |
| `antigravity-solution/` | https://github.com/ryanflash66/dealersource-antigravity | Google Antigravity |
| `hyperagent-solution/` | https://github.com/ryanflash66/dealersource-hyperagent | Hyperagent (tree-only import of dealersource-gpt@26657e8) |

Nothing in this directory is tracked by the parent repo except the submodule
pointers (a commit SHA per path) recorded in `.gitmodules` and the index.

If a directory here is empty, run `git submodule update --init --recursive`
from the repo root. See the root `README.md` for the full command reference.
