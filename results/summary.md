# Summary

**Decision (2026-09-17): `claude-solution` is the selected solution.**
Child repo: https://github.com/ryanflash66/dealersource-claude at `1d1d098`.
The experiment is closed; `gpt-solution` stays pinned as the runner-up for reference.

## Final leaderboard

Scored by `evals/run.mjs` on the private blind set `hidden-v2` (never
published), parent `4067537`.

| Agent | Child commit | Quality | Conformance | Type-check | Tests | Source lines | Deps | Eval rounds to 100% |
|---|---|---|---|---|---|---|---|---|
| claude-solution | `1d1d098` | 100% (126/126) | 100% (29/29) | clean | 82 | 7,639 | 3 + 6 dev | 1 |
| gpt-solution | `b4feb33` | 100% (126/126) | 100% (29/29) | clean | 10 files | 3,142 | 0 | 5 |

Removed during the experiment: `antigravity-solution` (could not reach
contract conformance) and `hyperagent-solution` (tree-only import of a Codex
branch, removed by PM decision). Their rows in earlier leaderboard comments on
issue #2 are historical.

## Why Claude

The automated score ended tied, so the decision rests on the dimensions the
evaluator cannot measure:

- **Spec-following without steering.** Claude met the offline contract on its
  first evaluation and held 100% on two blind sets. Codex needed the contract
  restated four times and a numbered list of eleven dashboard defects before
  reaching parity.
- **Dashboard completeness on first delivery.** Before the findings round,
  Codex's pipeline view showed zero stage counts, mislabeled an out-of-area
  site as one answer away, and its exceptions view was empty. Claude's was
  complete and correct on the same report.
- **Operational guardrails.** Manual pause switch for outreach, refusal to mail
  unverified planning addresses, evidence expiry surfaced in the UI, 22
  documented decisions in `docs/decisions.md`.

## What Codex did better

Worth borrowing, not enough to change the outcome: 40% of the code, zero
runtime dependencies, sub-second builds, a map legend and home-base marker,
merged listings linked to their sources. After the findings round its
dashboard reached functional parity.

## Caveats on fairness

- The Claude agent was launched and messaged directly by the orchestrator (also
  a Claude model) and received the offline contract the moment it was written.
  Codex received it later by relay. Part of Codex's round count is that head
  start.
- The spec, evaluator and fixtures were written by the orchestrator. Where the
  spec was ambiguous, the evaluator encodes one reading.
- Side-by-side dashboard comparisons: `results/raw/dashboard-compare.html`
  (round one) and `results/raw/dashboard-compare-round2.html` (round two),
  both git-ignored, generated from fresh clones at the pinned SHAs on the same
  report.

## Prompt / eval revisions that affected comparability

| Date | Parent commit | Change |
|---|---|---|
| 2026-09-16 | `70356e8` | Spec section 14 offline contract, JSON schemas, golden-v1 added after the Claude agent had started; broadcast to all agents |
| 2026-09-16 | `cbf43da` | Design template v2 replaced v1; all agents told to reimplement |
| 2026-09-17 | `ea63ddc` | hidden-v1 committed (public after this point) |
| 2026-09-17 | `dbb56c3` | hidden-v2 created in a git-ignored folder; used for the final leaderboard |
| 2026-09-17 | `d023524` | antigravity-solution removed |
| 2026-09-17 | `985ec60` | hyperagent-solution removed |
| 2026-09-17 | `4067537` | Final scores; decision recorded |

## Next: production path for the selected solution

1. Deploy `claude-solution` per its README deploy section: Supabase project
   with PostGIS, migrations, RLS; Vercel project for the dashboard; secrets in
   environment only.
2. First online run in dry-run mode: real discovery and enrichment, outreach
   drafted but not sent.
3. Measure real source coverage for $600 to $1,000 listings in the search
   area. This is still the largest open risk from the original brief.
4. Authorize the owner's Gmail, send to a small set of contacts, watch bounce
   and reply handling.
5. Enable the daily Claude Code routine.
| 2026-09-17 | this commit | `report.providers.crawler` enum gains `fetch` (plain HTTP crawler, zero hosting). Existing scores unaffected. |
