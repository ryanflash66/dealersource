# Claude Code handoff: implement against the test-first package

Read qa/specification/MASTER_SPECIFICATION.md, qa/README.md, qa/ACCEPTANCE_CRITERIA.md and qa/RELEASE_GATES.md before coding. The user is the PM. You are the developer.

The inspected repository baseline had only a README. This QA-only repository import adds a testing contract, not application behavior. Verify the current repository revision and PM-approved implementation phase before changing it. Do not overwrite existing files without a reviewed merge.

## Your first authorized implementation task

1. Inspect the repository and approved implementation phase. Do not connect services or send anything by default.
2. Run the package checks and inspect the deliberate NOT_IMPLEMENTED result from the default adapter.
3. Review the proposed operation contracts and choose thin mappings to the actual application architecture. Record mappings and any interface-only changes. Do not weaken AC meaning.
4. Implement real deterministic modules incrementally, starting with configuration, money normalization, exact-space identity and evidence gates. Replace only the corresponding missing bindings with actual imports.
5. Run contracts and report red, green and unimplemented cases separately. Save test evidence. Do not build an adapter that reads expected answers or a mock that masquerades as real application code.
6. Keep integration/manual ACs NOT_RUN until the required approved environment and evidence exist. Do not treat synthetic flags as proof of real OAuth, database, source or form behavior.
7. Stop at the phase gate for the PM's review. No automatic release or permission expansion.

## Invariants to preserve

- $600-$1,000 is the confirmed base-rent target; a binding lower limit is not confirmed. Lot-size and undecided preferences remain unset unless the PM configures them.
- Property, leased space and offer are separate identities. Shared-address records cannot be blindly merged.
- UNKNOWN mandatory facts trigger investigation and block the verified shortlist. Broker opinions do not replace official authority.
- Code owns policy and dispatch. The analyst does not receive live mail credentials or unrestricted authority.
- No arbitrary generated prose auto-sends. Use approved templates and typed factual slots.
- Uncertain sends/forms reconcile; no blind resend. Restore and suppression gaps keep outbound work paused.
- Existing Google Workspace/Gmail and official forms are the v1 channels; no phone, offers, fees, signatures or formal applications.
- No new paid subscriptions or APIs without PM approval. Max is not API credit; no subscription-token extraction or approval bypass.
- Tests run offline without live credentials. The included network guard is not a replacement for OS/container egress isolation when executing unreviewed code.
- Public fixtures are development material, not the independent locked acceptance set.

## PM progress report

State the real implementation commit, modules added, AC IDs satisfied, command outputs, failed/unimplemented cases, manual/integration evidence outstanding, security findings and costs. A passing harness is not a passing application. A passing public contract suite is not production readiness.
