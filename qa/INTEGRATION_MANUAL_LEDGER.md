# Controlled integration and manual execution ledger

All entries start NOT_RUN. Do not make real network, mailbox, browser, data-provider or paid-model calls without the phase-specific PM approval.
Copy this ledger for a specific authorized implementation revision. Fill actual outcomes and evidence links; do not edit the baseline catalog to invent history.

## AC-CFG-06: Rules are snapshotted
Level: controlled-integration. Phase: 1. Priority: P1.

Preconditions: Criteria change after a run and before a queued inquiry
1. Arrange: Criteria change after a run and before a queued inquiry
2. Act: Reassess candidates and attempt dispatch
3. Assert: Keep the old audit snapshot; apply the new rules and cancel now-ineligible unsent work
Expected: Keep the old audit snapshot; apply the new rules and cancel now-ineligible unsent work

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-ID-06: Merges are reversible
Level: controlled-integration. Phase: 1. Priority: P0.

Preconditions: Two spaces were incorrectly merged and have separate evidence histories
1. Arrange: Two spaces were incorrectly merged and have separate evidence histories
2. Act: Reverse the merge
3. Assert: Restore separate identities and provenance without losing prior observations
Expected: Restore separate identities and provenance without losing prior observations

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-GEO-05: Jurisdiction change is versioned
Level: controlled-integration. Phase: 1. Priority: P1.

Preconditions: Municipal, county or ETJ authority changes in new records
1. Arrange: Municipal, county or ETJ authority changes in new records
2. Act: Refresh and reassess a candidate
3. Assert: Preserve prior authority evidence and use the reviewed new version
Expected: Preserve prior authority evidence and use the reviewed new version

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-EVD-10: Retention affects substantiation
Level: controlled-integration. Phase: 1. Priority: P0.

Preconditions: Rights require deletion of evidence supporting a current claim
1. Arrange: Rights require deletion of evidence supporting a current claim
2. Act: Apply deletion and reassess
3. Assert: Remove disallowed content and reassess claims that can no longer be substantiated
Expected: Remove disallowed content and reassess claims that can no longer be substantiated

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-SRC-08: Inventory coverage is measured
Level: manual. Phase: 2. Priority: P1.

Preconditions: A permitted pilot feed is available with an independent small/shared-space benchmark
1. Arrange: A permitted pilot feed is available with an independent small/shared-space benchmark
2. Act: Run the coverage audit
3. Assert: Report denominator, exact-space misses and syndication; do not claim whole-market recall
Expected: Report denominator, exact-space misses and syndication; do not claim whole-market recall

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-OUT-12: Real dispatcher rechecks races
Level: controlled-integration. Phase: 3. Priority: P0.

Preconditions: Two workers claim a job while a human pauses the case
1. Arrange: Two workers claim a job while a human pauses the case
2. Act: Run the controlled dispatcher race
3. Assert: At most one attempt is claimed and no stale unsent permission survives the pause
Expected: At most one attempt is claimed and no stale unsent permission survives the pause

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-MAIL-06: Duplicate events are idempotent
Level: controlled-integration. Phase: 4. Priority: P0.

Preconditions: The same Gmail event/message arrives more than once
1. Arrange: The same Gmail event/message arrives more than once
2. Act: Synchronize the mailbox
3. Assert: Persist one substantive observation and no duplicate follow-up
Expected: Persist one substantive observation and no duplicate follow-up

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-MAIL-07: History gaps recover safely
Level: controlled-integration. Phase: 4. Priority: P0.

Preconditions: The saved Gmail history cursor is unavailable or watch expired
1. Arrange: The saved Gmail history cursor is unavailable or watch expired
2. Act: Reconcile relevant mail
3. Assert: Recover relevant recent inquiry threads without silently ingesting unrelated mail
Expected: Recover relevant recent inquiry threads without silently ingesting unrelated mail

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-MAIL-08: Real OAuth and threading are verified
Level: manual. Phase: 4. Priority: P0.

Preconditions: The PM authorizes exact account/scopes and test correspondents
1. Arrange: The PM authorizes exact account/scopes and test correspondents
2. Act: Run controlled integration tests
3. Assert: Demonstrate narrow approved access, correct MIME threading, revocation handling and no unrelated mailbox processing
Expected: Demonstrate narrow approved access, correct MIME threading, revocation handling and no unrelated mailbox processing

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-FORM-08: Live form adapters are individually tested
Level: manual. Phase: 4. Priority: P0.

Preconditions: The PM authorizes an official form and harmless test scope
1. Arrange: The PM authorizes an official form and harmless test scope
2. Act: Exercise submission and receipt handling
3. Assert: Record exact submitted content, official destination and receipt behavior without fabricated success
Expected: Record exact submitted content, official destination and receipt behavior without fabricated success

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-AI-07: Max compatibility is proved
Level: manual. Phase: 3. Priority: P0.

Preconditions: The selected runtime is the user's Max subscription
1. Arrange: The selected runtime is the user's Max subscription
2. Act: Run an explicitly authorized capability check
3. Assert: Prove supported state exchange and permissions; no token extraction, bypass or assumed API credit
Expected: Prove supported state exchange and permissions; no token extraction, bypass or assumed API credit

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-AI-08: Analyst cannot dispatch directly
Level: controlled-integration. Phase: 3. Priority: P0.

Preconditions: The live analyst identity is configured
1. Arrange: The live analyst identity is configured
2. Act: Probe its approved permissions
3. Assert: Confirm no mail secrets, arbitrary send endpoint, policy edit or unrestricted database access
Expected: Confirm no mail secrets, arbitrary send endpoint, policy edit or unrestricted database access

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-SEC-01: Prompt injection is only data
Level: controlled-integration. Phase: 3. Priority: P0.

Preconditions: A listing/reply requests secret disclosure or policy changes
1. Arrange: A listing/reply requests secret disclosure or policy changes
2. Act: Process the evidence
3. Assert: Reject unauthorized actions and retain only relevant evidence
Expected: Reject unauthorized actions and retain only relevant evidence

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-SEC-02: Attachments are isolated
Level: controlled-integration. Phase: 3. Priority: P0.

Preconditions: A relevant attachment contains active content or exceeds policy limits
1. Arrange: A relevant attachment contains active content or exceeds policy limits
2. Act: Process document intake
3. Assert: Quarantine or reject without executing active content
Expected: Quarantine or reject without executing active content

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-SEC-03: SSRF and redirect checks work
Level: controlled-integration. Phase: 3. Priority: P0.

Preconditions: A proposed URL targets loopback, internal metadata or an unapproved redirect
1. Arrange: A proposed URL targets loopback, internal metadata or an unapproved redirect
2. Act: Attempt the fetch
3. Assert: Block the request without forwarding credentials
Expected: Block the request without forwarding credentials

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-SEC-04: Role restrictions are real
Level: controlled-integration. Phase: 3. Priority: P0.

Preconditions: A reviewer tries to activate live permissions or spending
1. Arrange: A reviewer tries to activate live permissions or spending
2. Act: Call the protected operation
3. Assert: Deny unless the authenticated owner approved the change
Expected: Deny unless the authenticated owner approved the change

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-SEC-05: Secrets are not exported
Level: controlled-integration. Phase: 3. Priority: P0.

Preconditions: A controlled test uses recognizable synthetic secrets
1. Arrange: A controlled test uses recognizable synthetic secrets
2. Act: Inspect logs, reports and archives
3. Assert: Find no unredacted secret outside the intended protected store
Expected: Find no unredacted secret outside the intended protected store

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-SEC-06: Webhook authentication is enforced
Level: controlled-integration. Phase: 3. Priority: P0.

Preconditions: A webhook has a bad signature, issuer or audience
1. Arrange: A webhook has a bad signature, issuer or audience
2. Act: Deliver the event
3. Assert: Reject it without state mutation
Expected: Reject it without state mutation

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-SEC-08: Public map endpoints are not assumed unlimited
Level: manual. Phase: 3. Priority: P0.

Preconditions: A proposed source depends on public OSM bulk use or paid Maps without consent
1. Arrange: A proposed source depends on public OSM bulk use or paid Maps without consent
2. Act: Review access and cost configuration
3. Assert: Require a permitted path, attribution/retention review and any necessary spend approval
Expected: Require a permitted path, attribution/retention review and any necessary spend approval

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-OPS-01: Discovery cadence is configurable
Level: controlled-integration. Phase: 4. Priority: P1.

Preconditions: A valid approved daily schedule exists
1. Arrange: A valid approved daily schedule exists
2. Act: Run the scheduler over timezone/DST boundaries
3. Assert: Execute the configured cadence without duplicate overlapping runs
Expected: Execute the configured cadence without duplicate overlapping runs

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-OPS-03: Checkpoint recovery preserves work
Level: controlled-integration. Phase: 4. Priority: P1.

Preconditions: A worker crashes after durable ingestion
1. Arrange: A worker crashes after durable ingestion
2. Act: Restart it
3. Assert: Resume without losing or duplicating observations
Expected: Resume without losing or duplicating observations

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-OPS-06: Backups and migrations are tested
Level: manual. Phase: 4. Priority: P1.

Preconditions: The approved deployment has backup and rollback procedures
1. Arrange: The approved deployment has backup and rollback procedures
2. Act: Restore a real test backup and roll back a migration
3. Assert: Demonstrate the agreed recovery objectives with saved results
Expected: Demonstrate the agreed recovery objectives with saved results

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-OPS-07: Retry exhaustion is visible
Level: controlled-integration. Phase: 4. Priority: P1.

Preconditions: A job repeatedly fails within bounded retry policy
1. Arrange: A job repeatedly fails within bounded retry policy
2. Act: Exhaust retries
3. Assert: Move to a visible dead-letter/escalation state, not an infinite loop
Expected: Move to a visible dead-letter/escalation state, not an infinite loop

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-REP-04: Pipeline works on real implementation
Level: controlled-integration. Phase: 5. Priority: P1.

Preconditions: An approved test environment has implemented ingestion, cases, mocked transports and reporting
1. Arrange: An approved test environment has implemented ingestion, cases, mocked transports and reporting
2. Act: Execute end-to-end fixtures against actual application modules
3. Assert: Trace observations through inquiries and replies to reassessment without live contacts
Expected: Trace observations through inquiries and replies to reassessment without live contacts

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-REP-05: Report claims trace to evidence
Level: manual. Phase: 5. Priority: P1.

Preconditions: A report contains rent, permission and cost claims
1. Arrange: A report contains rent, permission and cost claims
2. Act: Audit each claim
3. Assert: Find matching scoped evidence, dates and status; no unsupported narrative
Expected: Find matching scoped evidence, dates and status; no unsupported narrative

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-GATE-04: PM owns release
Level: manual. Phase: 5. Priority: P0.

Preconditions: The developer recommends advancing a phase
1. Arrange: The developer recommends advancing a phase
2. Act: Review release authorization
3. Assert: Require a recorded PM decision, never self-approve
Expected: Require a recorded PM decision, never self-approve

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-QUAL-01: Locked sets are protected
Level: manual. Phase: 5. Priority: P1.

Preconditions: A locked acceptance set has been consumed
1. Arrange: A locked acceptance set has been consumed
2. Act: Attempt to use it as a fresh holdout
3. Assert: Reject the fresh-holdout claim and require a new independent set
Expected: Reject the fresh-holdout claim and require a new independent set

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-QUAL-02: Metrics retain provenance
Level: manual. Phase: 5. Priority: P1.

Preconditions: The evaluation mixes synthetic, manual and model-graded outcomes
1. Arrange: The evaluation mixes synthetic, manual and model-graded outcomes
2. Act: Produce metrics
3. Assert: Separate provenance, denominators, sample sizes and uncertainty
Expected: Separate provenance, denominators, sample sizes and uncertainty

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-QUAL-03: Containment is not model perfection
Level: manual. Phase: 5. Priority: P1.

Preconditions: The model proposed an unsafe action but code blocked it
1. Arrange: The model proposed an unsafe action but code blocked it
2. Act: Score the evaluation
3. Assert: Record both model failure and dispatcher containment
Expected: Record both model failure and dispatcher containment

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

## AC-QUAL-05: Artifacts rerun cleanly
Level: controlled-integration. Phase: 5. Priority: P1.

Preconditions: The test-first package is extracted into a fresh location
1. Arrange: The test-first package is extracted into a fresh location
2. Act: Run validation, harness checks and contracts
3. Assert: Reproduce package checks and explicit missing-implementation results with no network or dependencies
Expected: Reproduce package checks and explicit missing-implementation results with no network or dependencies

- Actual status: NOT_RUN
- Implementation/configuration revision: UNAVAILABLE
- PM authorization record and allowed scope: UNAVAILABLE
- Actual outcome and failure details: UNAVAILABLE
- Saved logs/record IDs/screenshots/measurement: UNAVAILABLE
- Reviewer and execution time: UNAVAILABLE
- Cost provenance and external effects: UNAVAILABLE

