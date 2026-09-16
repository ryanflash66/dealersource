# DealerSource test-first package

This is a test package, not the dealership application.

Target repository: https://github.com/ryanflash66/dealersource

Inspected baseline: d88e62e2383141a07351ac69229343d39736d213. That snapshot contains only README.md. No application code or existing tests were available. This directory is a QA-only repository import; it does not implement application features or activate live integrations.

## What is included

- 131 acceptance criteria with IDs, linked requirements, specification sections, priority, phase, preconditions, steps, expected results and evidence requirements.
- 142 public synthetic contract cases covering 101 ACs through 23 proposed operation bindings.
- 19 controlled-integration and 11 manual AC procedures, all explicitly NOT_RUN.
- A zero-dependency Node.js test harness, an intentionally missing application adapter, and saved JSON/text/TAP results.
- Full master specification revision 7, its digest, and the exact upstream README as baseline evidence.
- Traceability CSV, complete AC Markdown, integration/manual execution ledger and a Claude Code handoff.

These counts describe designed tests, not application coverage. See reports for the exact measured harness count after verification.

## Run locally

Requires Node.js 24 or newer. No npm install, credentials, model API or data subscriptions are needed.

From the repository root after adding qa/:

```sh
node qa/tools/run-all.mjs
```

Equivalent from inside qa/: `npm test`.

At this baseline the expected exit code is **2**, because all application bindings are missing. This is an intentional red test-first result, not a broken package. Do not change the adapter to return fixture answers just to make CI green.

Separate commands:

```sh
node qa/tools/validate.mjs
node --test qa/tests/harness.test.mjs
node qa/tools/run-contracts.mjs
node qa/tools/render-docs.mjs
```

The first two validate the test package and its machinery. They do not test a DealerSource implementation. The contract command writes reports after every case and returns:

- 0: every designed contract case passed against the supplied bindings; still not release authorization.
- 1: at least one contract failed.
- 2: missing or test-double bindings, or incomplete contract results.
- 3: harness, adapter-loading, schema or command error.

`--adapter PATH` selects a reviewed Node-importable binding file. `--out DIRECTORY` selects a report directory. `--help` explains the contract command. No hidden network or paid mode exists.

## Add to the repository without overwriting its README

Copy only this package's qa/ directory into the approved repository after review. The upstream README is preserved under qa/specification/UPSTREAM_README.md; this archive does not replace the repository root README. If qa/ already exists when you apply it, stop and merge explicitly rather than overwrite it.

No workflow, branch, commit, pull request, account connection or live schedule is created by this package. CI can initially run package/harness checks as a separate job; it must report the application suite's exit 2 honestly instead of presenting it as implemented coverage.

## Binding real application code

Read CONTRACTS.md. Replace adapters/application.mjs only when actual application modules exist and have been reviewed for offline safety. Declare the real implementation revision and export thin operation bindings. The function receives only input, not expected answers or case IDs. Return the specified observable shape; do not implement fixture lookup logic in the adapter.

Method names and payload shapes are proposed test-first interfaces, not claims about APIs already in the repository. Adapt naming/shape with a reviewed thin mapping; do not weaken the acceptance criterion to fit a bug.

Contracts use synthetic snapshots at a specific policy layer. A flag such as approved or authority must never be trusted as a production user's permission. The controlled integration tests must exercise real authentication, database transitions, parsing, jurisdiction resolution and transport behavior separately.

## Safety limits

Default bindings do nothing and use no credentials. Each contract runs in a fresh child process with a small environment, a hard deadline and guards on common network/subprocess APIs. This prevents accidental common calls in reviewed tests; it is **not an adversarial sandbox** and does not block every possible OS/addon/module escape. Use a network-denied test container or equivalent external isolation before running unreviewed application code. Never provide live credentials to this offline suite.

No real Gmail message, Gmail draft, official form, data-provider request, model call or paid service is part of default testing. Integration/manual procedures require the exact PM-approved environment and permissions first. Example domains and facts are synthetic.

## Evidence and limitations

The public fixtures are development tests, not a secret or locked holdout. Anyone can read expected answers; adapter metadata cannot prove the developer wired real code honestly. Review bindings and later conduct an independently assembled, PM-approved locked evaluation and controlled integration run.

The contract runner always marks production release BLOCKED. There is deliberately no 'allow release' flag. A release decision additionally requires the manual/integration evidence, statistical plan, fresh locked-set results, rights/permission checks and explicit PM decision described in RELEASE_GATES.md.

All proposed business-hour limits, contact caps, freshness windows, budget-floor semantics and quality thresholds remain subject to PM approval. They are test inputs or design proposals, not newly activated business settings.

## Files to start with

1. ACCEPTANCE_CRITERIA.md: full human-readable procedures.
2. catalog/traceability.csv: requirements-to-tests matrix.
3. CONTRACTS.md and fixtures/cases.json: executable contract inputs and exact expectations.
4. INTEGRATION_MANUAL_LEDGER.md: checks that cannot be claimed from this scaffold.
5. reports/application-contracts.json and reports/harness-summary.json: separate results.
6. CLAUDE_CODE_HANDOFF.md: implementation instructions.

Python 3 is only needed to regenerate the authored JSON catalog/fixtures from tools/build_catalog.py and tools/build_fixtures.py. It is not needed for normal test execution. Do not regenerate fixtures or edit expected answers to hide implementation failures.
