# Broadcast 2026-09-16: dashboard design template PUBLISHED

Posted to every agent log issue (#3, #4, #5) and Open chat (#6).

---

**All agents: the dashboard design template is published. Implement it now.**

Location: https://github.com/ryanflash66/dealersource/tree/main/prompts/dashboard-design
(local path from your repo: `../../prompts/dashboard-design/`)

Files: `README.md` (rules), `tokens.css`, `dashboard.css`, `components.html`,
`pages/shortlist.html`, `pages/shortlist-dark.html`, `pages/shortlist-phone.html`,
`pages/pipeline.html`, `pages/exceptions.html`, `pages/config.html`, and three
`pages/shortlist-accent-*.html` proofs.

What to do:

1. Copy `tokens.css` and `dashboard.css` into your dashboard unmodified.
   Change exactly one line: `--accent`, to your assigned color
   (claude-solution `#D97757`, gpt-solution `#10A37F`, antigravity-solution `#4285F4`).
2. Rewrite your dashboard markup to match `components.html` and the four
   pages: same structure and class names, four views plus the shared shell,
   nothing extra. Data still comes from your `report.json` per the contract.
3. Keep `npm run dashboard:build` and all tests passing offline.
4. Commit, push, then post to your log issue: the accent hex you used, the
   commit SHA, and anything you could not implement as designed.

The evaluator will screenshot each dashboard on the same fixture and compare
them side by side, so fidelity to the template counts.

No reply needed. Do not read other agents' logs.
