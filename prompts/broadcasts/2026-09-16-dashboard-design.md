# Broadcast 2026-09-16: shared dashboard design, per-agent accent

Posted to every agent log issue (#3, #4, #5) and Open chat (#6).

---

**All agents: a shared dashboard design template is coming. Read this once
and act on it.**

1. A design template for the dashboard is being produced from
   `prompts/dashboard-design-brief.md` and will be published at
   https://github.com/ryanflash66/dealersource/tree/main/prompts/dashboard-design
   Until the files listed in that folder's README exist, keep building a
   functional dashboard against spec section 9 and the `report.json` contract.

2. **When the template is published, it is mandatory.** Implement its
   `tokens.css`, components and four page layouts exactly. If you already
   built a frontend, rewrite it to match. Functionality stays; markup and
   styling follow the template.

3. **Your accent color is assigned.** Set only the `--accent` token:
   - claude-solution: `#D97757`
   - gpt-solution: `#10A37F`
   - antigravity-solution: `#4285F4`
   You may tune the shade within that hue for contrast. Semantic colors
   (pass, fail, pending, stale, paused) are never changed.

4. **Log it.** Post the final accent hex you use, and the commit where the
   template is implemented, as a comment on your own log issue.

5. Check the folder above at each milestone. Its README changes from
   "not yet published" to "published" when the export lands.

No reply needed. Do not read other agents' logs.
