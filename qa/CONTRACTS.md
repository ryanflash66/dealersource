# Proposed adapter contracts

These are test-first interface proposals, not discovered application APIs. Keep the acceptance meaning; a thin adapter may map real application functions to these names and output shapes.
The default adapters/application.mjs explicitly declares missing implementation. Do not replace it with fixture-answer lookups or a fake production implementation.
All expected objects are compared exactly, including nulls, numeric types, arrays, reasons and unexpected keys. Money is integer cents; decimal quote strings are unambiguous. Display cents use half-up rounding; rent-cap comparisons use the exact unrounded amount.
Inputs are synthetic policy/evidence snapshots at the layer being tested. Flags such as approved, authority or schemaValid are NOT trusted client permissions in production. The integration/manual ACs must independently verify the real authentication, parsing, authority resolution, database and transport layers.
A contract PASS only proves the supplied binding matched these public development cases. It does not prove correctness of a database, Google permissions, real source coverage or the entire business workflow.
The application function receives only a clone of input, never fixture ID, AC ID or expected output. This separation is not a blind test or a defense against a dishonest adapter reading local fixture files. Review the binding and retain an independent locked set later.

## Adapter form

```javascript
export const implementation = { kind: 'application', revision: 'ACTUAL_IMPLEMENTATION_COMMIT' };
// Export reviewed thin bindings only. Never copy the acceptance answers.
export const operations = { /* operationName: input => realApplicationFunction(input) */ };
```

The adapter must be importable by Node 24 and produce JSON-compatible exact contract outputs. Build TypeScript first if its syntax or module imports require compilation. No package installation is required for this harness. Application dependencies, if introduced later, are separate.
Each case executes in a fresh process. State is not shared across cases; persistent workflow, concurrency, browser, database and real provider tests are deliberately recorded as integration/manual ACs.
An application binding must not print to stdout, read expected answers, or return hard-coded results keyed by fixture. Build and review the actual modules first. A declared test-double never earns application coverage. Adapter metadata is an author assertion, not automatic proof that code is real.

## assessEvidence
ACs: AC-CFG-08, AC-EVD-01, AC-EVD-02, AC-EVD-03, AC-EVD-04, AC-EVD-05, AC-EVD-06, AC-EVD-07, AC-EVD-08, AC-EVD-09. Cases: 11.

First input example:
```json
{
  "required": [
    "legalUse"
  ],
  "fields": {
    "legalUse": {
      "status": "UNKNOWN"
    }
  },
  "preferences": {
    "minimumLotSqFt": null
  }
}
```
Expected observable output:
```json
{
  "qualified": false,
  "status": "VERIFICATION_ACTIVE",
  "unresolved": [
    "legalUse"
  ]
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## assessModelAvailability
ACs: AC-AI-06. Cases: 2.

First input example:
```json
{
  "available": false,
  "paidFallbackApproved": false
}
```
Expected observable output:
```json
{
  "status": "ANALYSIS_PENDING",
  "activatePaidFallback": false
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## assessOperationsMetrics
ACs: AC-OPS-08. Cases: 2.

First input example:
```json
{
  "latencyMeasured": false,
  "uptimeMeasured": false
}
```
Expected observable output:
```json
{
  "latencyStatus": "UNAVAILABLE",
  "uptimeStatus": "UNAVAILABLE"
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## assessRecovery
ACs: AC-OPS-04, AC-OPS-05. Cases: 3.

First input example:
```json
{
  "restored": true,
  "historyReconciled": false,
  "suppressionsReconciled": false
}
```
Expected observable output:
```json
{
  "outboundPaused": true,
  "reason": "RECOVERY_RECONCILIATION_REQUIRED"
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## assessSourceRun
ACs: AC-SRC-01, AC-SRC-02, AC-SRC-03, AC-SRC-04, AC-SRC-05, AC-SRC-06, AC-SRC-07. Cases: 10.

First input example:
```json
{
  "accessApproved": false
}
```
Expected observable output:
```json
{
  "status": "BLOCKED",
  "reason": "RIGHTS_REQUIRED",
  "withdrawPrior": false
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## authorizeInquiry
ACs: AC-OUT-11, AC-OUT-01, AC-OUT-02, AC-OUT-03, AC-OUT-04, AC-OUT-05, AC-OUT-06, AC-OUT-07, AC-OUT-08, AC-OUT-10, AC-OUT-09. Cases: 18.

First input example:
```json
{
  "approved": true,
  "senderApproved": true,
  "recipientVerified": true,
  "optOut": false,
  "humanTakeover": false,
  "killSwitch": false,
  "withinBusinessHours": true,
  "usedToday": 0,
  "dailyCap": 5,
  "templateApproved": true,
  "questionsAllowed": true,
  "action": "factual_inquiry",
  "priorUncertain": false
}
```
Expected observable output:
```json
{
  "allowed": true,
  "reason": "ALLOW"
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## authorizeOperation
ACs: AC-GATE-01, AC-GATE-02, AC-GATE-03. Cases: 12.

First input example:
```json
{
  "phase": 1,
  "action": "email_send",
  "explicitApproval": true
}
```
Expected observable output:
```json
{
  "allowed": false,
  "reason": "OFFLINE_PHASE"
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## authorizeProcessing
ACs: AC-SEC-07. Cases: 2.

First input example:
```json
{
  "modelUseApproved": false,
  "content": "Synthetic test record"
}
```
Expected observable output:
```json
{
  "allowed": false,
  "reason": "MODEL_PROCESSING_RIGHTS_REQUIRED"
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## authorizeSpend
ACs: AC-COST-01, AC-COST-02, AC-COST-05. Cases: 4.

First input example:
```json
{
  "paid": true,
  "approved": false,
  "revoked": false,
  "usedCents": 0,
  "nextCostCents": 1,
  "capCents": 100
}
```
Expected observable output:
```json
{
  "allowed": false,
  "reason": "PAID_APPROVAL_REQUIRED"
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## classifyCosts
ACs: AC-COST-03. Cases: 1.

First input example:
```json
{
  "maxPlanCents": 10000,
  "workspaceCents": null,
  "hostingCents": null,
  "incrementalCents": 0
}
```
Expected observable output:
```json
{
  "existingMaxCents": 10000,
  "workspaceStatus": "UNAVAILABLE",
  "hostingStatus": "UNAVAILABLE",
  "zeroTotalCostClaim": false
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## classifyForm
ACs: AC-FORM-01, AC-FORM-02, AC-FORM-03, AC-FORM-04, AC-FORM-05, AC-FORM-06, AC-FORM-07. Cases: 9.

First input example:
```json
{
  "receiptVerified": true,
  "reference": "form-1"
}
```
Expected observable output:
```json
{
  "state": "FORM_SUBMITTED_AWAITING_REPLY",
  "answered": false,
  "retryAllowed": false
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## classifyReply
ACs: AC-MAIL-04, AC-MAIL-05. Cases: 2.

First input example:
```json
{
  "autoReply": true,
  "spaceMatches": true
}
```
Expected observable output:
```json
{
  "state": "AWAITING_REPLY",
  "substantive": false,
  "updateSpace": false
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## classifyTestEvidence
ACs: AC-QUAL-04. Cases: 3.

First input example:
```json
{
  "implementationKind": "missing",
  "fixtureChecksPassed": true
}
```
Expected observable output:
```json
{
  "applicationCoverage": "NOT_IMPLEMENTED",
  "productionReady": false
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## computeRelease
ACs: AC-GATE-05. Cases: 1.

First input example:
```json
{
  "mandatoryFailed": 0,
  "mandatoryNotImplemented": 1,
  "mandatoryNotRun": 0,
  "pmApproved": false
}
```
Expected observable output:
```json
{
  "status": "BLOCKED",
  "releaseAllowed": false
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## handleSendOutcome
ACs: AC-MAIL-01, AC-MAIL-02, AC-MAIL-03. Cases: 3.

First input example:
```json
{
  "outcome": "timeout",
  "mayHaveReachedProvider": true
}
```
Expected observable output:
```json
{
  "state": "SEND_UNCERTAIN",
  "retryAllowed": false,
  "deliveryConfirmed": false
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## normalizeRent
ACs: AC-RNT-01, AC-RNT-02, AC-RNT-03, AC-RNT-04, AC-RNT-05, AC-RNT-06, AC-RNT-07, AC-RNT-08, AC-RNT-09, AC-RNT-10, AC-RNT-11, AC-RNT-12, AC-RNT-13, AC-RNT-14. Cases: 24.

First input example:
```json
{
  "currency": "USD",
  "allowedCurrency": "USD",
  "maxCents": 100000,
  "preferredMinCents": 60000,
  "minimumIsBinding": false,
  "additionalMonthlyCents": 0,
  "allCostsKnown": false,
  "basis": "MONTH_TOTAL",
  "amount": "800.00"
}
```
Expected observable output:
```json
{
  "status": "PASS",
  "monthlyBaseCents": 80000,
  "knownOccupancySubtotalCents": 80000,
  "allInCents": null,
  "reason": null
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## planCase
ACs: AC-CAS-01, AC-CAS-02, AC-CAS-03, AC-CAS-04, AC-CAS-05, AC-CAS-06, AC-CAS-07, AC-CAS-08. Cases: 8.

First input example:
```json
{
  "plausible": true,
  "missing": [
    "rent"
  ],
  "openQuestions": []
}
```
Expected observable output:
```json
{
  "action": "INQUIRE",
  "target": "leasing_contact",
  "questions": [
    "rent"
  ]
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## resolveIdentity
ACs: AC-ID-01, AC-ID-02, AC-ID-03, AC-ID-04, AC-ID-05. Cases: 5.

First input example:
```json
{
  "a": {
    "address": "10 Test Rd",
    "suite": "A",
    "display": "north"
  },
  "b": {
    "address": "10 Test Rd",
    "suite": "B",
    "display": "north"
  }
}
```
Expected observable output:
```json
{
  "decision": "DISTINCT"
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## screenGeography
ACs: AC-GEO-01, AC-GEO-02, AC-GEO-03, AC-GEO-04. Cases: 4.

First input example:
```json
{
  "inside": true,
  "postalCity": "Postal City",
  "authoritativeJurisdiction": "Governing Town",
  "locationCertain": true,
  "requestedMethod": "polygon",
  "availableMethod": "polygon"
}
```
Expected observable output:
```json
{
  "status": "PASS",
  "jurisdiction": "Governing Town",
  "reason": null
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## summarizeRun
ACs: AC-OPS-02, AC-REP-01, AC-REP-02, AC-REP-03. Cases: 4.

First input example:
```json
{
  "sourceComplete": false,
  "verifiedIds": [],
  "conditionalIds": [
    "c1"
  ]
}
```
Expected observable output:
```json
{
  "status": "INCOMPLETE",
  "verifiedIds": [],
  "conditionalIds": [
    "c1"
  ],
  "allClear": false
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## validateModelOutput
ACs: AC-AI-01, AC-AI-02, AC-AI-03, AC-AI-04, AC-AI-05. Cases: 6.

First input example:
```json
{
  "rawOutput": "{not valid JSON",
  "allowedEvidenceIds": [
    "ev-1"
  ],
  "allowedFields": [
    "rent"
  ],
  "expectedCandidateId": "candidate-1",
  "approvalEvidence": false
}
```
Expected observable output:
```json
{
  "accepted": false,
  "reason": "INVALID_SCHEMA"
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## validateProfile
ACs: AC-CFG-01, AC-CFG-02, AC-CFG-03, AC-CFG-04, AC-CFG-05, AC-CFG-07. Cases: 6.

First input example:
```json
{
  "boundary": {
    "type": "approved-test-polygon",
    "id": "fixture-only"
  },
  "preferredMinCents": 60000,
  "maxCents": 100000,
  "minimumIsBinding": false,
  "currency": "USD",
  "timezone": "America/New_York",
  "strategies": [
    "direct_lease",
    "shared",
    "sublease"
  ],
  "minimumLotSqFt": null,
  "minimumBays": null,
  "minimumCapacity": null
}
```
Expected observable output:
```json
{
  "valid": true,
  "errors": []
}
```
See fixtures/cases.json for every positive, negative and boundary case.

## validateRuntime
ACs: AC-COST-04. Cases: 2.

First input example:
```json
{
  "mode": "model_api",
  "funding": "max_subscription"
}
```
Expected observable output:
```json
{
  "allowed": false,
  "reason": "MAX_IS_NOT_API_CREDIT"
}
```
See fixtures/cases.json for every positive, negative and boundary case.

