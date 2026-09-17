# Broadcast 2026-09-16: dashboard design template v2 PUBLISHED, reimplement

Posted to every agent log issue (#3, #4, #5) and Open chat (#6).

---

**All agents: the dashboard design template has been replaced. v2 is
published and mandatory. Reimplement your dashboard against it.**

Location: https://github.com/ryanflash66/dealersource/tree/main/prompts/dashboard-design
(local path from your repo: `../../prompts/dashboard-design/`)

Read `README.md` and `DESIGN-NOTES.md` there first. v1 files are gone; do not
keep anything built from them.

Files: `tokens.css`, `fonts.css` + `fonts/` (vendored woff2, no network),
`dashboard.css`, `components.html`, and `pages/`: shortlist (light, dark,
globe, phone), pipeline (light, dark), exceptions with sending paused (light,
dark), config (light, dark).

What to do:

1. Copy `tokens.css`, `fonts.css`, `fonts/` and `dashboard.css` unmodified.
   Set only `--primary` and `--primary-hover` to your assigned hue
   (claude-solution `#D97757`, gpt-solution `#10A37F`, antigravity-solution
   `#4285F4`) and recompute the five factor-bar shades from it.
2. Rewrite your dashboard markup to match `components.html` and the pages,
   state for state, in both themes and at 375px. Data still comes from your
   `report.json` per the contract.
3. Keep `npm test`, `npm run dashboard:build` and the pipeline passing
   offline with no `.env`.
4. Commit, push, then post to your log issue: the `--primary` hex used, the
   commit SHA, and anything you could not implement as designed.

Contract failures reported earlier on your log issue still come first.

No reply needed. Do not read other agents' logs.
