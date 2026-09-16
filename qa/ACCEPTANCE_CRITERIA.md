# DealerSource acceptance criteria and test procedures

Status: test-first design. No DealerSource application exists at the pinned baseline.
Baseline commit: d88e62e2383141a07351ac69229343d39736d213
Public development catalog: 131 ACs, 142 contract cases.
Test levels: {"contract":101,"controlled-integration":19,"manual":11}.
These are not a blind/locked acceptance set. Harness checks are not application passes.
P0 is critical safety/correctness; P1 is required functional/operating behavior. All in-scope requirements still need acceptance evidence.

## Configuration

### AC-CFG-01: Unset preferences stay unset

- Requirements: R01, R02, R03, R04, R05, R06, R07
- Specification sections: 02, 03; group T01
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: An approved profile has null lot area, bays and capacity
- When: Validate and screen the profile
- Acceptance criterion: Accept the profile and apply no user filter for those preferences

1. Arrange: An approved profile has null lot area, bays and capacity
2. Act: Validate and screen the profile
3. Assert: Accept the profile and apply no user filter for those preferences

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-CFG-01-nulls

### AC-CFG-02: Explicit geography required

- Requirements: R01, R02, R03, R04, R05, R06, R07
- Specification sections: 02, 03; group T01
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The region is only named Eastern NC without a boundary
- When: Request a live discovery run
- Acceptance criterion: Block live activation with GEOGRAPHY_REQUIRED

1. Arrange: The region is only named Eastern NC without a boundary
2. Act: Request a live discovery run
3. Assert: Block live activation with GEOGRAPHY_REQUIRED

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-CFG-02-invalid

### AC-CFG-03: Budget bounds are consistent

- Requirements: R01, R02, R03, R04, R05, R06, R07
- Specification sections: 02, 03; group T01
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The preferred minimum exceeds the maximum
- When: Validate the profile
- Acceptance criterion: Reject the configuration with INVALID_BUDGET_RANGE

1. Arrange: The preferred minimum exceeds the maximum
2. Act: Validate the profile
3. Assert: Reject the configuration with INVALID_BUDGET_RANGE

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-CFG-03-invalid

### AC-CFG-04: Negative prices are invalid

- Requirements: R01, R02, R03, R04, R05, R06, R07
- Specification sections: 02, 03; group T01
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A configured rent limit is negative
- When: Validate the profile
- Acceptance criterion: Reject the configuration rather than treating it as no limit

1. Arrange: A configured rent limit is negative
2. Act: Validate the profile
3. Assert: Reject the configuration rather than treating it as no limit

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-CFG-04-invalid

### AC-CFG-05: Timezone must be valid

- Requirements: R01, R02, R03, R04, R05, R06, R07
- Specification sections: 02, 03; group T01
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The schedule contains an invalid IANA timezone
- When: Validate the profile
- Acceptance criterion: Reject the schedule with INVALID_TIMEZONE

1. Arrange: The schedule contains an invalid IANA timezone
2. Act: Validate the profile
3. Assert: Reject the schedule with INVALID_TIMEZONE

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-CFG-05-invalid

### AC-CFG-06: Rules are snapshotted

- Requirements: R01, R02, R03, R04, R05, R06, R07
- Specification sections: 02, 03; group T01
- Priority: P1; earliest phase: 1; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Criteria change after a run and before a queued inquiry
- When: Reassess candidates and attempt dispatch
- Acceptance criterion: Keep the old audit snapshot; apply the new rules and cancel now-ineligible unsent work

1. Arrange: Criteria change after a run and before a queued inquiry
2. Act: Reassess candidates and attempt dispatch
3. Assert: Keep the old audit snapshot; apply the new rules and cancel now-ineligible unsent work

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-CFG-07: Lease strategies stay in scope

- Requirements: R01, R02, R03, R04, R05, R06, R07
- Specification sections: 02, 03; group T01
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The profile is for existing direct/shared/subleased sites
- When: Validate an attempted purchase-only or ground-development profile
- Acceptance criterion: Reject the out-of-scope strategy pending an explicit scope change

1. Arrange: The profile is for existing direct/shared/subleased sites
2. Act: Validate an attempted purchase-only or ground-development profile
3. Assert: Reject the out-of-scope strategy pending an explicit scope change

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-CFG-07-invalid

### AC-CFG-08: Legal rules cannot be waived

- Requirements: R01, R02, R03, R04, R05, R06, R07
- Specification sections: 02, 03; group T01
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A user preference is unset but a mandatory legal condition applies
- When: Assess eligibility
- Acceptance criterion: Preserve the legal gate; an unset preference is not an exemption

1. Arrange: A user preference is unset but a mandatory legal condition applies
2. Act: Assess eligibility
3. Assert: Preserve the legal gate; an unset preference is not an exemption

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-CFG-08-legal

## Rent and cost normalization

### AC-RNT-01: Monthly totals normalize

- Requirements: R04
- Specification sections: 03, 06; group T02
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: USD monthly base rent is explicitly quoted
- When: Normalize rent
- Acceptance criterion: Use the exact monthly amount and compare it with the approved cap

1. Arrange: USD monthly base rent is explicitly quoted
2. Act: Normalize rent
3. Assert: Use the exact monthly amount and compare it with the approved cap

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-RNT-01-800, TC-RNT-01-cap, TC-RNT-01-over

### AC-RNT-02: Annual totals normalize

- Requirements: R04
- Specification sections: 03, 06; group T02
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: USD annual total base rent is explicitly quoted
- When: Normalize rent
- Acceptance criterion: Divide the annual total by twelve with decimal-safe calculation

1. Arrange: USD annual total base rent is explicitly quoted
2. Act: Normalize rent
3. Assert: Divide the annual total by twelve with decimal-safe calculation

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-RNT-02-annual, TC-RNT-02-annual-cap

### AC-RNT-03: Annual area rates normalize

- Requirements: R04
- Specification sections: 03, 06; group T02
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The annual rate and exact leased square feet are confirmed
- When: Normalize rent
- Acceptance criterion: Multiply rate by leased area and divide by twelve

1. Arrange: The annual rate and exact leased square feet are confirmed
2. Act: Normalize rent
3. Assert: Multiply rate by leased area and divide by twelve

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-RNT-03-annual-area

### AC-RNT-04: Monthly area rates normalize

- Requirements: R04
- Specification sections: 03, 06; group T02
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The monthly rate and exact leased square feet are confirmed
- When: Normalize rent
- Acceptance criterion: Multiply the monthly area rate by leased area

1. Arrange: The monthly rate and exact leased square feet are confirmed
2. Act: Normalize rent
3. Assert: Multiply the monthly area rate by leased area

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-RNT-04-monthly-area

### AC-RNT-05: Unknown leased area remains unknown

- Requirements: R04
- Specification sections: 03, 06; group T02
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: An area rate is given but only whole-building area is known for a sublet
- When: Normalize rent
- Acceptance criterion: Return UNKNOWN without substituting whole-building area

1. Arrange: An area rate is given but only whole-building area is known for a sublet
2. Act: Normalize rent
3. Assert: Return UNKNOWN without substituting whole-building area

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-RNT-05-wrong-area, TC-RNT-05-missing-area

### AC-RNT-06: Ranges crossing cap need a quote

- Requirements: R04
- Specification sections: 03, 06; group T02
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: An unselected-space rent range crosses the cap
- When: Screen the rent
- Acceptance criterion: Return UNKNOWN and request the quote for the exact space

1. Arrange: An unselected-space rent range crosses the cap
2. Act: Screen the rent
3. Assert: Return UNKNOWN and request the quote for the exact space

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-RNT-06-crossing

### AC-RNT-07: Negotiable and missing are not zero

- Requirements: R04
- Specification sections: 03, 06; group T02
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The rent is negotiable or absent
- When: Normalize rent
- Acceptance criterion: Return UNKNOWN with no fabricated amount

1. Arrange: The rent is negotiable or absent
2. Act: Normalize rent
3. Assert: Return UNKNOWN with no fabricated amount

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-RNT-07-missing, TC-RNT-07-negotiable

### AC-RNT-08: Fees stay separate from base rent

- Requirements: R04
- Specification sections: 03, 06; group T02
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Base rent and known additional monthly charges are supplied
- When: Screen base rent and calculate known occupancy subtotal
- Acceptance criterion: Evaluate only base rent against the base cap; mark all-in total unknown when cost information is incomplete

1. Arrange: Base rent and known additional monthly charges are supplied
2. Act: Screen base rent and calculate known occupancy subtotal
3. Assert: Evaluate only base rent against the base cap; mark all-in total unknown when cost information is incomplete

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-RNT-08-fees, TC-RNT-08-complete-cost

### AC-RNT-09: Cheaper sites are not rejected by default

- Requirements: R04
- Specification sections: 03, 06; group T02
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Rent is below the preferred range and no lower bound is binding
- When: Screen rent
- Acceptance criterion: Pass the cap check without inventing a minimum-rent rejection

1. Arrange: Rent is below the preferred range and no lower bound is binding
2. Act: Screen rent
3. Assert: Pass the cap check without inventing a minimum-rent rejection

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-RNT-09-below-preferred

### AC-RNT-10: Explicit lower bound is honored

- Requirements: R04
- Specification sections: 03, 06; group T02
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A test profile explicitly makes the lower bound mandatory
- When: Screen a quote below that bound
- Acceptance criterion: Fail the rent gate under that profile only

1. Arrange: A test profile explicitly makes the lower bound mandatory
2. Act: Screen a quote below that bound
3. Assert: Fail the rent gate under that profile only

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-RNT-10-binding-min

### AC-RNT-11: Currency mismatch is not silently converted

- Requirements: R04
- Specification sections: 03, 06; group T02
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The quote currency differs from the configured currency
- When: Normalize rent without an approved exchange-rate rule
- Acceptance criterion: Reject with UNSUPPORTED_CURRENCY

1. Arrange: The quote currency differs from the configured currency
2. Act: Normalize rent without an approved exchange-rate rule
3. Assert: Reject with UNSUPPORTED_CURRENCY

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-RNT-11-eur

### AC-RNT-12: Invalid rates and units are rejected

- Requirements: R04
- Specification sections: 03, 06; group T02
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A quote has negative, nonnumeric or unsupported-unit data
- When: Normalize rent
- Acceptance criterion: Reject malformed values or unsupported bases without coercing them to zero

1. Arrange: A quote has negative, nonnumeric or unsupported-unit data
2. Act: Normalize rent
3. Assert: Reject malformed values or unsupported bases without coercing them to zero

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-RNT-12-negative, TC-RNT-12-nonnumeric, TC-RNT-12-scientific, TC-RNT-12-unsupported

### AC-RNT-13: Rounding does not hide a cap breach

- Requirements: R04
- Specification sections: 03, 06; group T02
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: An exact normalized amount is just above the cap but rounds to the cap for display
- When: Screen rent
- Acceptance criterion: Fail using the unrounded amount while retaining a cents display value

1. Arrange: An exact normalized amount is just above the cap but rounds to the cap for display
2. Act: Screen rent
3. Assert: Fail using the unrounded amount while retaining a cents display value

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-RNT-13-rounding

### AC-RNT-14: Entire ranges classify honestly

- Requirements: R04
- Specification sections: 03, 06; group T02
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Every value in a quoted range is on the same side of the cap
- When: Screen the range
- Acceptance criterion: Pass or fail the advertised-range gate without inventing a selected-space exact price

1. Arrange: Every value in a quoted range is on the same side of the cap
2. Act: Screen the range
3. Assert: Pass or fail the advertised-range gate without inventing a selected-space exact price

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-RNT-14-range-under, TC-RNT-14-range-over

## Exact-space identity

### AC-ID-01: Different suites remain distinct

- Requirements: R03, R08
- Specification sections: 05, 06, 09; group T03
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Two offers share an address but identify different suites
- When: Resolve opportunity identity
- Acceptance criterion: Keep distinct spaces

1. Arrange: Two offers share an address but identify different suites
2. Act: Resolve opportunity identity
3. Assert: Keep distinct spaces

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-ID-01-suites

### AC-ID-02: Display allocations remain distinct

- Requirements: R03, R08
- Specification sections: 05, 06, 09; group T03
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Two shared-site offers allocate different display areas
- When: Resolve identity
- Acceptance criterion: Keep distinct spaces even when the office address is the same

1. Arrange: Two shared-site offers allocate different display areas
2. Act: Resolve identity
3. Assert: Keep distinct spaces even when the office address is the same

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-ID-02-display

### AC-ID-03: Syndication is one offer

- Requirements: R03, R08
- Specification sections: 05, 06, 09; group T03
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Two publishers reproduce the same documented source offer
- When: Resolve identity
- Acceptance criterion: Link the same opportunity and original-source group

1. Arrange: Two publishers reproduce the same documented source offer
2. Act: Resolve identity
3. Assert: Link the same opportunity and original-source group

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-ID-03-syndicated

### AC-ID-04: Renaming is not a new space

- Requirements: R03, R08
- Specification sections: 05, 06, 09; group T03
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A business name changes at an unchanged documented leased space
- When: Resolve identity
- Acceptance criterion: Do not create a new property solely from the name change

1. Arrange: A business name changes at an unchanged documented leased space
2. Act: Resolve identity
3. Assert: Do not create a new property solely from the name change

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-ID-04-rename

### AC-ID-05: Ambiguous matches are reviewed

- Requirements: R03, R08
- Specification sections: 05, 06, 09; group T03
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Address similarity exists without sufficient exact-space evidence
- When: Resolve identity
- Acceptance criterion: Return REVIEW instead of automatically merging

1. Arrange: Address similarity exists without sufficient exact-space evidence
2. Act: Resolve identity
3. Assert: Return REVIEW instead of automatically merging

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-ID-05-ambiguous

### AC-ID-06: Merges are reversible

- Requirements: R03, R08
- Specification sections: 05, 06, 09; group T03
- Priority: P0; earliest phase: 1; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Two spaces were incorrectly merged and have separate evidence histories
- When: Reverse the merge
- Acceptance criterion: Restore separate identities and provenance without losing prior observations

1. Arrange: Two spaces were incorrectly merged and have separate evidence histories
2. Act: Reverse the merge
3. Assert: Restore separate identities and provenance without losing prior observations

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

## Geography and jurisdiction

### AC-GEO-01: Postal city is not legal jurisdiction

- Requirements: R02
- Specification sections: 03, 05, 06; group T04
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Postal city and competent municipality differ
- When: Resolve the approval authority
- Acceptance criterion: Use authoritative jurisdiction evidence, not the postal label

1. Arrange: Postal city and competent municipality differ
2. Act: Resolve the approval authority
3. Assert: Use authoritative jurisdiction evidence, not the postal label

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-GEO-01-authority

### AC-GEO-02: Boundary ambiguity is visible

- Requirements: R02
- Specification sections: 03, 05, 06; group T04
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Location uncertainty overlaps the configured boundary
- When: Screen geography
- Acceptance criterion: Return UNKNOWN and request location resolution

1. Arrange: Location uncertainty overlaps the configured boundary
2. Act: Screen geography
3. Assert: Return UNKNOWN and request location resolution

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-GEO-02-boundary

### AC-GEO-03: Distance methods are not interchangeable

- Requirements: R02
- Specification sections: 03, 05, 06; group T04
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The profile requests drive time but only straight-line distance is available
- When: Screen distance
- Acceptance criterion: Return UNKNOWN rather than substituting straight-line distance

1. Arrange: The profile requests drive time but only straight-line distance is available
2. Act: Screen distance
3. Assert: Return UNKNOWN rather than substituting straight-line distance

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-GEO-03-method

### AC-GEO-04: Outside sites fail the geographic gate

- Requirements: R02
- Specification sections: 03, 05, 06; group T04
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A verified leased-space location is outside the approved boundary
- When: Screen geography
- Acceptance criterion: Fail with OUTSIDE_BOUNDARY

1. Arrange: A verified leased-space location is outside the approved boundary
2. Act: Screen geography
3. Assert: Fail with OUTSIDE_BOUNDARY

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-GEO-04-outside

### AC-GEO-05: Jurisdiction change is versioned

- Requirements: R02
- Specification sections: 03, 05, 06; group T04
- Priority: P1; earliest phase: 1; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Municipal, county or ETJ authority changes in new records
- When: Refresh and reassess a candidate
- Acceptance criterion: Preserve prior authority evidence and use the reviewed new version

1. Arrange: Municipal, county or ETJ authority changes in new records
2. Act: Refresh and reassess a candidate
3. Assert: Preserve prior authority evidence and use the reviewed new version

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

## Evidence and qualification

### AC-EVD-01: Missing mandatory facts block verification

- Requirements: R08, R09
- Specification sections: 05, 06; group T05
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A mandatory evidence field is unknown
- When: Build the verified shortlist
- Acceptance criterion: Exclude the candidate and create or retain a verification case

1. Arrange: A mandatory evidence field is unknown
2. Act: Build the verified shortlist
3. Assert: Exclude the candidate and create or retain a verification case

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-EVD-01-unknown

### AC-EVD-02: Known failures block verification

- Requirements: R08, R09
- Specification sections: 05, 06; group T05
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A mandatory criterion fails
- When: Build the verified shortlist
- Acceptance criterion: Exclude the candidate without averaging the failure into a score

1. Arrange: A mandatory criterion fails
2. Act: Build the verified shortlist
3. Assert: Exclude the candidate without averaging the failure into a score

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-EVD-02-fail

### AC-EVD-03: Fresh competent evidence can qualify

- Requirements: R08, R09
- Specification sections: 05, 06; group T05
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: All applicable mandatory criteria pass with current scoped evidence
- When: Build the verified shortlist
- Acceptance criterion: Qualify for team review without claiming software-issued legal approval

1. Arrange: All applicable mandatory criteria pass with current scoped evidence
2. Act: Build the verified shortlist
3. Assert: Qualify for team review without claiming software-issued legal approval

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-EVD-03-fresh

### AC-EVD-04: Stale evidence loses its badge

- Requirements: R08, R09
- Specification sections: 05, 06; group T05
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A material confirmation has expired
- When: Reassess the property
- Acceptance criterion: Return UNKNOWN and remove current verification while preserving history

1. Arrange: A material confirmation has expired
2. Act: Reassess the property
3. Assert: Return UNKNOWN and remove current verification while preserving history

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-EVD-04-expired, TC-EVD-04-expiry-boundary

### AC-EVD-05: Fetching is not reconfirming

- Requirements: R08, R09
- Specification sections: 05, 06; group T05
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: An old quote is retrieved again today
- When: Evaluate freshness
- Acceptance criterion: Use its original confirmation/effective date, not retrieval time

1. Arrange: An old quote is retrieved again today
2. Act: Evaluate freshness
3. Assert: Use its original confirmation/effective date, not retrieval time

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-EVD-05-refetched

### AC-EVD-06: Authority is fact-specific

- Requirements: R08, R09
- Specification sections: 05, 06; group T05
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A broker states zoning should be fine
- When: Assess the legal-use claim
- Acceptance criterion: Keep official approval UNKNOWN

1. Arrange: A broker states zoning should be fine
2. Act: Assess the legal-use claim
3. Assert: Keep official approval UNKNOWN

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-EVD-06-broker

### AC-EVD-07: Permit scope must match

- Requirements: R08, R09
- Specification sections: 05, 06; group T05
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: An approval concerns another operator, space or layout
- When: Assess the current proposal
- Acceptance criterion: Keep the approval gate UNKNOWN

1. Arrange: An approval concerns another operator, space or layout
2. Act: Assess the current proposal
3. Assert: Keep the approval gate UNKNOWN

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-EVD-07-scope

### AC-EVD-08: Conflicts remain unresolved

- Requirements: R08, R09
- Specification sections: 05, 06; group T05
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Two current relevant sources contradict on availability or price
- When: Assess the disputed field
- Acceptance criterion: Return CONFLICT and block verified promotion until resolution

1. Arrange: Two current relevant sources contradict on availability or price
2. Act: Assess the disputed field
3. Assert: Return CONFLICT and block verified promotion until resolution

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-EVD-08-conflict

### AC-EVD-09: Formal approval remains conditional

- Requirements: R08, R09
- Specification sections: 05, 06; group T05
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: An authority says an application or inspection is still required
- When: Assess status
- Acceptance criterion: Use CONDITIONAL_REVIEW, not an approved or verified badge

1. Arrange: An authority says an application or inspection is still required
2. Act: Assess status
3. Assert: Use CONDITIONAL_REVIEW, not an approved or verified badge

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-EVD-09-conditional

### AC-EVD-10: Retention affects substantiation

- Requirements: R08, R09
- Specification sections: 05, 06; group T05
- Priority: P0; earliest phase: 1; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Rights require deletion of evidence supporting a current claim
- When: Apply deletion and reassess
- Acceptance criterion: Remove disallowed content and reassess claims that can no longer be substantiated

1. Arrange: Rights require deletion of evidence supporting a current claim
2. Act: Apply deletion and reassess
3. Assert: Remove disallowed content and reassess claims that can no longer be substantiated

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

## Source intake and rights

### AC-SRC-01: Rights precede access

- Requirements: R08, R09
- Specification sections: 04, 10, 15; group T06
- Priority: P0; earliest phase: 2; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: An adapter has no approved automated-use rights
- When: Plan ingestion
- Acceptance criterion: Block access; documentation is not a data license

1. Arrange: An adapter has no approved automated-use rights
2. Act: Plan ingestion
3. Assert: Block access; documentation is not a data license

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-SRC-01-rights

### AC-SRC-02: Pages and caps determine completeness

- Requirements: R08, R09
- Specification sections: 04, 10, 15; group T06
- Priority: P1; earliest phase: 2; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A source returns a continuation cursor or a capped result
- When: Assess the run
- Acceptance criterion: Mark PARTIAL rather than complete coverage

1. Arrange: A source returns a continuation cursor or a capped result
2. Act: Assess the run
3. Assert: Mark PARTIAL rather than complete coverage

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-SRC-02-cursor, TC-SRC-02-cap, TC-SRC-02-complete

### AC-SRC-03: Failures are not zero matches

- Requirements: R08, R09
- Specification sections: 04, 10, 15; group T06
- Priority: P1; earliest phase: 2; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A required source fails authentication or service access
- When: Generate a run summary
- Acceptance criterion: Mark INCOMPLETE and preserve prior evidence rather than report no available properties

1. Arrange: A required source fails authentication or service access
2. Act: Generate a run summary
3. Assert: Mark INCOMPLETE and preserve prior evidence rather than report no available properties

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-SRC-03-auth, TC-SRC-03-server

### AC-SRC-04: Rate limits are respected

- Requirements: R08, R09
- Specification sections: 04, 10, 15; group T06
- Priority: P1; earliest phase: 2; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A provider responds with a Retry-After instruction
- When: Schedule a read retry
- Acceptance criterion: Wait at least the provider interval; do not hot-loop

1. Arrange: A provider responds with a Retry-After instruction
2. Act: Schedule a read retry
3. Assert: Wait at least the provider interval; do not hot-loop

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-SRC-04-rate

### AC-SRC-05: Schema changes stop unsafe parsing

- Requirements: R08, R09
- Specification sections: 04, 10, 15; group T06
- Priority: P1; earliest phase: 2; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Required fields or units change unexpectedly
- When: Process the response
- Acceptance criterion: Quarantine affected records and flag SCHEMA_CHANGED

1. Arrange: Required fields or units change unexpectedly
2. Act: Process the response
3. Assert: Quarantine affected records and flag SCHEMA_CHANGED

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-SRC-05-schema

### AC-SRC-06: Unexpected zero is investigated

- Requirements: R08, R09
- Specification sections: 04, 10, 15; group T06
- Priority: P1; earliest phase: 2; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: An established source unexpectedly returns no records
- When: Reconcile opportunities
- Acceptance criterion: Flag review rather than mass-withdraw every prior listing

1. Arrange: An established source unexpectedly returns no records
2. Act: Reconcile opportunities
3. Assert: Flag review rather than mass-withdraw every prior listing

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-SRC-06-zero

### AC-SRC-07: Explicit withdrawals propagate

- Requirements: R08, R09
- Specification sections: 04, 10, 15; group T06
- Priority: P1; earliest phase: 2; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A source explicitly withdraws a known exact-space offer
- When: Reassess that opportunity
- Acceptance criterion: Mark WITHDRAWN and cancel dependent unsent inquiries

1. Arrange: A source explicitly withdraws a known exact-space offer
2. Act: Reassess that opportunity
3. Assert: Mark WITHDRAWN and cancel dependent unsent inquiries

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-SRC-07-withdrawn

### AC-SRC-08: Inventory coverage is measured

- Requirements: R08, R09
- Specification sections: 04, 10, 15; group T06
- Priority: P1; earliest phase: 2; test level: manual
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A permitted pilot feed is available with an independent small/shared-space benchmark
- When: Run the coverage audit
- Acceptance criterion: Report denominator, exact-space misses and syndication; do not claim whole-market recall

1. Arrange: A permitted pilot feed is available with an independent small/shared-space benchmark
2. Act: Run the coverage audit
3. Assert: Report denominator, exact-space misses and syndication; do not claim whole-market recall

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

## Proactive investigation

### AC-CAS-01: Unknown rent opens an inquiry

- Requirements: R10, R11
- Specification sections: 09, 10, 11; group T07
- Priority: P1; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: An otherwise plausible site lacks an exact rent quote
- When: Plan investigation
- Acceptance criterion: Ask the verified leasing contact about the exact space

1. Arrange: An otherwise plausible site lacks an exact rent quote
2. Act: Plan investigation
3. Assert: Ask the verified leasing contact about the exact space

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-CAS-01-rent

### AC-CAS-02: Legal questions go to authorities

- Requirements: R10, R11
- Specification sections: 09, 10, 11; group T07
- Priority: P1; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A plausible site has unresolved use approval
- When: Plan investigation
- Acceptance criterion: Route to the competent official inquiry channel

1. Arrange: A plausible site has unresolved use approval
2. Act: Plan investigation
3. Assert: Route to the competent official inquiry channel

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-CAS-02-legal

### AC-CAS-03: Undecided preferences go to the team

- Requirements: R10, R11
- Specification sections: 09, 10, 11; group T07
- Priority: P1; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The missing information is the user's own business requirement
- When: Plan investigation
- Acceptance criterion: Ask the team rather than guessing or contacting a landlord about the preference

1. Arrange: The missing information is the user's own business requirement
2. Act: Plan investigation
3. Assert: Ask the team rather than guessing or contacting a landlord about the preference

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-CAS-03-preference

### AC-CAS-04: Fatal failures avoid pointless outreach

- Requirements: R10, R11
- Specification sections: 09, 10, 11; group T07
- Priority: P1; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A candidate has a known disqualifying failure
- When: Plan investigation
- Acceptance criterion: Reject without an automatic inquiry unless an exception is explicitly authorized

1. Arrange: A candidate has a known disqualifying failure
2. Act: Plan investigation
3. Assert: Reject without an automatic inquiry unless an exception is explicitly authorized

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-CAS-04-failure

### AC-CAS-05: Open cases suppress duplicate questions

- Requirements: R10, R11
- Specification sections: 09, 10, 11; group T07
- Priority: P1; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A matching property/contact/question case is already open
- When: Run discovery again
- Acceptance criterion: Reuse the case without another initial inquiry

1. Arrange: A matching property/contact/question case is already open
2. Act: Run discovery again
3. Assert: Reuse the case without another initial inquiry

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-CAS-05-open

### AC-CAS-06: Partial answers narrow follow-up

- Requirements: R10, R11
- Specification sections: 09, 10, 11; group T07
- Priority: P1; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A response answers only some material questions
- When: Plan the next inquiry
- Acceptance criterion: Ask only the unresolved approved question identifiers

1. Arrange: A response answers only some material questions
2. Act: Plan the next inquiry
3. Assert: Ask only the unresolved approved question identifiers

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-CAS-06-partial

### AC-CAS-07: No response escalates

- Requirements: R10, R11
- Specification sections: 09, 10, 11; group T07
- Priority: P1; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Approved follow-up and escalation deadlines have elapsed
- When: Process due work
- Acceptance criterion: Escalate or close without treating silence as consent

1. Arrange: Approved follow-up and escalation deadlines have elapsed
2. Act: Process due work
3. Assert: Escalate or close without treating silence as consent

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-CAS-07-escalate

### AC-CAS-08: Inquiry resolution is not property approval

- Requirements: R10, R11
- Specification sections: 09, 10, 11; group T07
- Priority: P1; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: One case is answered while another mandatory property gate is unknown
- When: Reassess the opportunity
- Acceptance criterion: Resolve that case but keep the property outside the verified shortlist

1. Arrange: One case is answered while another mandatory property gate is unknown
2. Act: Reassess the opportunity
3. Assert: Resolve that case but keep the property outside the verified shortlist

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-CAS-08-other-gate

## Outbound permissions

### AC-OUT-01: Approval is required

- Requirements: R10, R11
- Specification sections: 08, 11, 12; group T08
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Live dispatch has not been explicitly authorized
- When: Attempt a send
- Acceptance criterion: Deny with APPROVAL_REQUIRED

1. Arrange: Live dispatch has not been explicitly authorized
2. Act: Attempt a send
3. Assert: Deny with APPROVAL_REQUIRED

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-OUT-01-approval

### AC-OUT-02: Sender is exact

- Requirements: R10, R11
- Specification sections: 08, 11, 12; group T08
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The proposed sender is not the approved existing Gmail identity
- When: Attempt a send
- Acceptance criterion: Deny with SENDER_NOT_APPROVED

1. Arrange: The proposed sender is not the approved existing Gmail identity
2. Act: Attempt a send
3. Assert: Deny with SENDER_NOT_APPROVED

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-OUT-02-sender

### AC-OUT-03: Recipient is verified

- Requirements: R10, R11
- Specification sections: 08, 11, 12; group T08
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The contact was guessed or lacks a legitimate verified inquiry channel
- When: Attempt a send
- Acceptance criterion: Deny with RECIPIENT_UNVERIFIED

1. Arrange: The contact was guessed or lacks a legitimate verified inquiry channel
2. Act: Attempt a send
3. Assert: Deny with RECIPIENT_UNVERIFIED

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-OUT-03-recipient

### AC-OUT-04: Suppression always wins

- Requirements: R10, R11
- Specification sections: 08, 11, 12; group T08
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The contact has opted out or declined
- When: Attempt initial or follow-up dispatch
- Acceptance criterion: Deny and retain suppression

1. Arrange: The contact has opted out or declined
2. Act: Attempt initial or follow-up dispatch
3. Assert: Deny and retain suppression

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-OUT-04-opt-out

### AC-OUT-05: Human takeover pauses sending

- Requirements: R10, R11
- Specification sections: 08, 11, 12; group T08
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The team has taken over or replied
- When: Attempt automated dispatch
- Acceptance criterion: Deny with HUMAN_TAKEOVER

1. Arrange: The team has taken over or replied
2. Act: Attempt automated dispatch
3. Assert: Deny with HUMAN_TAKEOVER

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-OUT-05-takeover

### AC-OUT-06: Kill switch stops unsent jobs

- Requirements: R10, R11
- Specification sections: 08, 11, 12; group T08
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The global outbound switch is paused
- When: Attempt a queued send
- Acceptance criterion: Deny even if the job was approved earlier

1. Arrange: The global outbound switch is paused
2. Act: Attempt a queued send
3. Assert: Deny even if the job was approved earlier

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-OUT-06-kill

### AC-OUT-07: Caps and business hours apply

- Requirements: R10, R11
- Specification sections: 08, 11, 12; group T08
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The contact/day cap is reached or the approved window is closed
- When: Attempt dispatch
- Acceptance criterion: Deny or defer without resetting the cap across channels

1. Arrange: The contact/day cap is reached or the approved window is closed
2. Act: Attempt dispatch
3. Assert: Deny or defer without resetting the cap across channels

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-OUT-07-cap, TC-OUT-07-hours

### AC-OUT-08: Only approved templates auto-send

- Requirements: R10, R11
- Specification sections: 08, 11, 12; group T08
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The model produces free prose or unapproved question identifiers
- When: Attempt automatic dispatch
- Acceptance criterion: Deny pending reviewed template approval

1. Arrange: The model produces free prose or unapproved question identifiers
2. Act: Attempt automatic dispatch
3. Assert: Deny pending reviewed template approval

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-OUT-08-template, TC-OUT-08-questions

### AC-OUT-09: Protected actions cannot be disguised

- Requirements: R10, R11
- Specification sections: 08, 11, 12; group T08
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: An inquiry proposes an offer, negotiation, fee, signature, application or phone call
- When: Attempt dispatch
- Acceptance criterion: Deny with PROTECTED_ACTION

1. Arrange: An inquiry proposes an offer, negotiation, fee, signature, application or phone call
2. Act: Attempt dispatch
3. Assert: Deny with PROTECTED_ACTION

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-OUT-09-offer, TC-OUT-09-negotiate, TC-OUT-09-pay_fee, TC-OUT-09-sign, TC-OUT-09-formal_application, TC-OUT-09-phone_call

### AC-OUT-10: Uncertain side effects prevent retries

- Requirements: R10, R11
- Specification sections: 08, 11, 12; group T08
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The prior send or form outcome is unresolved
- When: Claim another attempt
- Acceptance criterion: Deny pending reconciliation, not blind resend

1. Arrange: The prior send or form outcome is unresolved
2. Act: Claim another attempt
3. Assert: Deny pending reconciliation, not blind resend

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-OUT-10-uncertain

### AC-OUT-11: Eligible factual inquiry can send

- Requirements: R10, R11
- Specification sections: 08, 11, 12; group T08
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Current policy, exact sender, verified recipient and approved template all satisfy constraints
- When: Authorize the approved factual inquiry
- Acceptance criterion: Return ALLOW without changing policy or making commitments

1. Arrange: Current policy, exact sender, verified recipient and approved template all satisfy constraints
2. Act: Authorize the approved factual inquiry
3. Assert: Return ALLOW without changing policy or making commitments

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-OUT-11-allow

### AC-OUT-12: Real dispatcher rechecks races

- Requirements: R10, R11
- Specification sections: 08, 11, 12; group T08
- Priority: P0; earliest phase: 3; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Two workers claim a job while a human pauses the case
- When: Run the controlled dispatcher race
- Acceptance criterion: At most one attempt is claimed and no stale unsent permission survives the pause

1. Arrange: Two workers claim a job while a human pauses the case
2. Act: Run the controlled dispatcher race
3. Assert: At most one attempt is claimed and no stale unsent permission survives the pause

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

## Gmail and reconciliation

### AC-MAIL-01: Possible acceptance becomes uncertain

- Requirements: R10, R11
- Specification sections: 09, 12; group T09
- Priority: P0; earliest phase: 4; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Gmail may have accepted a send before a timeout
- When: Handle the send result
- Acceptance criterion: Use SEND_UNCERTAIN and prohibit automatic resend

1. Arrange: Gmail may have accepted a send before a timeout
2. Act: Handle the send result
3. Assert: Use SEND_UNCERTAIN and prohibit automatic resend

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-MAIL-01-timeout

### AC-MAIL-02: Confirmed acceptance stores identity

- Requirements: R10, R11
- Specification sections: 09, 12; group T09
- Priority: P0; earliest phase: 4; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Gmail returns a successful message and thread ID
- When: Handle success
- Acceptance criterion: Use SENT_CONFIRMED and preserve IDs; do not claim recipient delivery/read

1. Arrange: Gmail returns a successful message and thread ID
2. Act: Handle success
3. Assert: Use SENT_CONFIRMED and preserve IDs; do not claim recipient delivery/read

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-MAIL-02-accepted

### AC-MAIL-03: Pre-send failure is distinguishable

- Requirements: R10, R11
- Specification sections: 09, 12; group T09
- Priority: P0; earliest phase: 4; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: An error is confirmed before any outbound request
- When: Handle failure
- Acceptance criterion: Use FAILED_CONFIRMED with a policy-eligible retry, not a successful send

1. Arrange: An error is confirmed before any outbound request
2. Act: Handle failure
3. Assert: Use FAILED_CONFIRMED with a policy-eligible retry, not a successful send

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-MAIL-03-preflight

### AC-MAIL-04: Auto-replies do not answer questions

- Requirements: R10, R11
- Specification sections: 09, 12; group T09
- Priority: P0; earliest phase: 4; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: An acknowledgement or out-of-office response arrives
- When: Classify the reply
- Acceptance criterion: Keep substantive questions unanswered

1. Arrange: An acknowledgement or out-of-office response arrives
2. Act: Classify the reply
3. Assert: Keep substantive questions unanswered

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-MAIL-04-auto

### AC-MAIL-05: Wrong-space replies are reviewed

- Requirements: R10, R11
- Specification sections: 09, 12; group T09
- Priority: P0; earliest phase: 4; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A reply references a different suite or ambiguous offer
- When: Correlate evidence
- Acceptance criterion: Route to ANSWER_REVIEW without updating the wrong space

1. Arrange: A reply references a different suite or ambiguous offer
2. Act: Correlate evidence
3. Assert: Route to ANSWER_REVIEW without updating the wrong space

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-MAIL-05-wrong-space

### AC-MAIL-06: Duplicate events are idempotent

- Requirements: R10, R11
- Specification sections: 09, 12; group T09
- Priority: P0; earliest phase: 4; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The same Gmail event/message arrives more than once
- When: Synchronize the mailbox
- Acceptance criterion: Persist one substantive observation and no duplicate follow-up

1. Arrange: The same Gmail event/message arrives more than once
2. Act: Synchronize the mailbox
3. Assert: Persist one substantive observation and no duplicate follow-up

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-MAIL-07: History gaps recover safely

- Requirements: R10, R11
- Specification sections: 09, 12; group T09
- Priority: P0; earliest phase: 4; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The saved Gmail history cursor is unavailable or watch expired
- When: Reconcile relevant mail
- Acceptance criterion: Recover relevant recent inquiry threads without silently ingesting unrelated mail

1. Arrange: The saved Gmail history cursor is unavailable or watch expired
2. Act: Reconcile relevant mail
3. Assert: Recover relevant recent inquiry threads without silently ingesting unrelated mail

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-MAIL-08: Real OAuth and threading are verified

- Requirements: R10, R11
- Specification sections: 09, 12; group T09
- Priority: P0; earliest phase: 4; test level: manual
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The PM authorizes exact account/scopes and test correspondents
- When: Run controlled integration tests
- Acceptance criterion: Demonstrate narrow approved access, correct MIME threading, revocation handling and no unrelated mailbox processing

1. Arrange: The PM authorizes exact account/scopes and test correspondents
2. Act: Run controlled integration tests
3. Assert: Demonstrate narrow approved access, correct MIME threading, revocation handling and no unrelated mailbox processing

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

## Official inquiry forms

### AC-FORM-01: Receipt is not an answer

- Requirements: R10, R11
- Specification sections: 11, 13; group T10
- Priority: P0; earliest phase: 4; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A form returns a confirmed receipt/reference
- When: Classify submission
- Acceptance criterion: Use FORM_SUBMITTED_AWAITING_REPLY, not ANSWER_RECEIVED

1. Arrange: A form returns a confirmed receipt/reference
2. Act: Classify submission
3. Assert: Use FORM_SUBMITTED_AWAITING_REPLY, not ANSWER_RECEIVED

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-FORM-01-receipt

### AC-FORM-02: HTTP 200 is not proof

- Requirements: R10, R11
- Specification sections: 11, 13; group T10
- Priority: P0; earliest phase: 4; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A form returns HTTP 200 without a verified confirmation
- When: Classify submission
- Acceptance criterion: Use SUBMISSION_UNCERTAIN

1. Arrange: A form returns HTTP 200 without a verified confirmation
2. Act: Classify submission
3. Assert: Use SUBMISSION_UNCERTAIN

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-FORM-02-200

### AC-FORM-03: Ambiguous form submission is not retried

- Requirements: R10, R11
- Specification sections: 11, 13; group T10
- Priority: P0; earliest phase: 4; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The submission may have succeeded before timeout
- When: Handle failure
- Acceptance criterion: Pause and reconcile rather than resubmit

1. Arrange: The submission may have succeeded before timeout
2. Act: Handle failure
3. Assert: Pause and reconcile rather than resubmit

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-FORM-03-timeout

### AC-FORM-04: Changed destinations are blocked

- Requirements: R10, R11
- Specification sections: 11, 13; group T10
- Priority: P0; earliest phase: 4; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The official form action changes to an unapproved destination
- When: Prepare submission
- Acceptance criterion: Block pending destination review

1. Arrange: The official form action changes to an unapproved destination
2. Act: Prepare submission
3. Assert: Block pending destination review

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-FORM-04-domain

### AC-FORM-05: Formal actions require escalation

- Requirements: R10, R11
- Specification sections: 11, 13; group T10
- Priority: P0; earliest phase: 4; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The form demands a fee, signature or legal attestation
- When: Prepare submission
- Acceptance criterion: Escalate without accepting or submitting

1. Arrange: The form demands a fee, signature or legal attestation
2. Act: Prepare submission
3. Assert: Escalate without accepting or submitting

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-FORM-05-fee, TC-FORM-05-attest

### AC-FORM-06: Access restrictions are respected

- Requirements: R10, R11
- Specification sections: 11, 13; group T10
- Priority: P0; earliest phase: 4; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The form requires CAPTCHA/login or prohibits automation
- When: Prepare submission
- Acceptance criterion: Escalate without bypass

1. Arrange: The form requires CAPTCHA/login or prohibits automation
2. Act: Prepare submission
3. Assert: Escalate without bypass

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-FORM-06-captcha, TC-FORM-06-login

### AC-FORM-07: Email and forms share contact history

- Requirements: R10, R11
- Specification sections: 11, 13; group T10
- Priority: P0; earliest phase: 4; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A question was already submitted through another channel
- When: Plan another contact
- Acceptance criterion: Suppress a duplicate property/contact/question inquiry

1. Arrange: A question was already submitted through another channel
2. Act: Plan another contact
3. Assert: Suppress a duplicate property/contact/question inquiry

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-FORM-07-duplicate

### AC-FORM-08: Live form adapters are individually tested

- Requirements: R10, R11
- Specification sections: 11, 13; group T10
- Priority: P0; earliest phase: 4; test level: manual
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The PM authorizes an official form and harmless test scope
- When: Exercise submission and receipt handling
- Acceptance criterion: Record exact submitted content, official destination and receipt behavior without fabricated success

1. Arrange: The PM authorizes an official form and harmless test scope
2. Act: Exercise submission and receipt handling
3. Assert: Record exact submitted content, official destination and receipt behavior without fabricated success

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

## Claude and model contracts

### AC-AI-01: Output schema is enforced

- Requirements: R09, R12
- Specification sections: 08, 16; group T11
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The model returns malformed structured output
- When: Validate the proposal
- Acceptance criterion: Reject with INVALID_SCHEMA

1. Arrange: The model returns malformed structured output
2. Act: Validate the proposal
3. Assert: Reject with INVALID_SCHEMA

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-AI-01-schema, TC-AI-01-valid

### AC-AI-02: Citations must exist

- Requirements: R09, R12
- Specification sections: 08, 16; group T11
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The model cites unknown evidence IDs
- When: Validate the proposal
- Acceptance criterion: Reject with UNSUPPORTED_EVIDENCE

1. Arrange: The model cites unknown evidence IDs
2. Act: Validate the proposal
3. Assert: Reject with UNSUPPORTED_EVIDENCE

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-AI-02-citation

### AC-AI-03: Fields and actions are bounded

- Requirements: R09, R12
- Specification sections: 08, 16; group T11
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The model requests fields or actions outside its allowed task
- When: Validate the proposal
- Acceptance criterion: Reject with DISALLOWED_PROPOSAL

1. Arrange: The model requests fields or actions outside its allowed task
2. Act: Validate the proposal
3. Assert: Reject with DISALLOWED_PROPOSAL

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-AI-03-field

### AC-AI-04: Candidate scope is enforced

- Requirements: R09, R12
- Specification sections: 08, 16; group T11
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The model output refers to a different candidate or space
- When: Validate the proposal
- Acceptance criterion: Reject with WRONG_CANDIDATE

1. Arrange: The model output refers to a different candidate or space
2. Act: Validate the proposal
3. Assert: Reject with WRONG_CANDIDATE

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-AI-04-candidate

### AC-AI-05: Unsupported approval claims fail

- Requirements: R09, R12
- Specification sections: 08, 16; group T11
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The model states verified approval without supporting competent evidence
- When: Validate the claim
- Acceptance criterion: Reject the promotion, preserve the bad proposal for susceptibility measurement

1. Arrange: The model states verified approval without supporting competent evidence
2. Act: Validate the claim
3. Assert: Reject the promotion, preserve the bad proposal for susceptibility measurement

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-AI-05-approval

### AC-AI-06: Model outage is visible

- Requirements: R09, R12
- Specification sections: 08, 16; group T11
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The approved model path is unavailable or exhausted
- When: Produce workflow status
- Acceptance criterion: Use ANALYSIS_PENDING; do not invent a Claude analysis or activate paid fallback

1. Arrange: The approved model path is unavailable or exhausted
2. Act: Produce workflow status
3. Assert: Use ANALYSIS_PENDING; do not invent a Claude analysis or activate paid fallback

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-AI-06-outage, TC-AI-06-available

### AC-AI-07: Max compatibility is proved

- Requirements: R09, R12
- Specification sections: 08, 16; group T11
- Priority: P0; earliest phase: 3; test level: manual
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The selected runtime is the user's Max subscription
- When: Run an explicitly authorized capability check
- Acceptance criterion: Prove supported state exchange and permissions; no token extraction, bypass or assumed API credit

1. Arrange: The selected runtime is the user's Max subscription
2. Act: Run an explicitly authorized capability check
3. Assert: Prove supported state exchange and permissions; no token extraction, bypass or assumed API credit

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-AI-08: Analyst cannot dispatch directly

- Requirements: R09, R12
- Specification sections: 08, 16; group T11
- Priority: P0; earliest phase: 3; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The live analyst identity is configured
- When: Probe its approved permissions
- Acceptance criterion: Confirm no mail secrets, arbitrary send endpoint, policy edit or unrestricted database access

1. Arrange: The live analyst identity is configured
2. Act: Probe its approved permissions
3. Assert: Confirm no mail secrets, arbitrary send endpoint, policy edit or unrestricted database access

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

## Security and privacy

### AC-SEC-01: Prompt injection is only data

- Requirements: R09, R11, R12
- Specification sections: 08, 14; group T11
- Priority: P0; earliest phase: 3; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A listing/reply requests secret disclosure or policy changes
- When: Process the evidence
- Acceptance criterion: Reject unauthorized actions and retain only relevant evidence

1. Arrange: A listing/reply requests secret disclosure or policy changes
2. Act: Process the evidence
3. Assert: Reject unauthorized actions and retain only relevant evidence

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-SEC-02: Attachments are isolated

- Requirements: R09, R11, R12
- Specification sections: 08, 14; group T11
- Priority: P0; earliest phase: 3; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A relevant attachment contains active content or exceeds policy limits
- When: Process document intake
- Acceptance criterion: Quarantine or reject without executing active content

1. Arrange: A relevant attachment contains active content or exceeds policy limits
2. Act: Process document intake
3. Assert: Quarantine or reject without executing active content

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-SEC-03: SSRF and redirect checks work

- Requirements: R09, R11, R12
- Specification sections: 08, 14; group T11
- Priority: P0; earliest phase: 3; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A proposed URL targets loopback, internal metadata or an unapproved redirect
- When: Attempt the fetch
- Acceptance criterion: Block the request without forwarding credentials

1. Arrange: A proposed URL targets loopback, internal metadata or an unapproved redirect
2. Act: Attempt the fetch
3. Assert: Block the request without forwarding credentials

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-SEC-04: Role restrictions are real

- Requirements: R09, R11, R12
- Specification sections: 08, 14; group T11
- Priority: P0; earliest phase: 3; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A reviewer tries to activate live permissions or spending
- When: Call the protected operation
- Acceptance criterion: Deny unless the authenticated owner approved the change

1. Arrange: A reviewer tries to activate live permissions or spending
2. Act: Call the protected operation
3. Assert: Deny unless the authenticated owner approved the change

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-SEC-05: Secrets are not exported

- Requirements: R09, R11, R12
- Specification sections: 08, 14; group T11
- Priority: P0; earliest phase: 3; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A controlled test uses recognizable synthetic secrets
- When: Inspect logs, reports and archives
- Acceptance criterion: Find no unredacted secret outside the intended protected store

1. Arrange: A controlled test uses recognizable synthetic secrets
2. Act: Inspect logs, reports and archives
3. Assert: Find no unredacted secret outside the intended protected store

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-SEC-06: Webhook authentication is enforced

- Requirements: R09, R11, R12
- Specification sections: 08, 14; group T11
- Priority: P0; earliest phase: 3; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A webhook has a bad signature, issuer or audience
- When: Deliver the event
- Acceptance criterion: Reject it without state mutation

1. Arrange: A webhook has a bad signature, issuer or audience
2. Act: Deliver the event
3. Assert: Reject it without state mutation

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-SEC-07: Processing rights cover model input

- Requirements: R09, R11, R12
- Specification sections: 08, 14; group T11
- Priority: P0; earliest phase: 3; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A source or mail item lacks approved model-processing rights
- When: Prepare analyst input
- Acceptance criterion: Block transfer and request the relevant decision

1. Arrange: A source or mail item lacks approved model-processing rights
2. Act: Prepare analyst input
3. Assert: Block transfer and request the relevant decision

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-SEC-07-rights, TC-SEC-07-approved

### AC-SEC-08: Public map endpoints are not assumed unlimited

- Requirements: R09, R11, R12
- Specification sections: 08, 14; group T11
- Priority: P0; earliest phase: 3; test level: manual
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A proposed source depends on public OSM bulk use or paid Maps without consent
- When: Review access and cost configuration
- Acceptance criterion: Require a permitted path, attribution/retention review and any necessary spend approval

1. Arrange: A proposed source depends on public OSM bulk use or paid Maps without consent
2. Act: Review access and cost configuration
3. Assert: Require a permitted path, attribution/retention review and any necessary spend approval

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

## Scheduling and recovery

### AC-OPS-01: Discovery cadence is configurable

- Requirements: R07, R09
- Specification sections: 09, 10, 15; group T12
- Priority: P1; earliest phase: 4; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A valid approved daily schedule exists
- When: Run the scheduler over timezone/DST boundaries
- Acceptance criterion: Execute the configured cadence without duplicate overlapping runs

1. Arrange: A valid approved daily schedule exists
2. Act: Run the scheduler over timezone/DST boundaries
3. Assert: Execute the configured cadence without duplicate overlapping runs

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-OPS-02: Source failure degrades the run

- Requirements: R07, R09
- Specification sections: 09, 10, 15; group T12
- Priority: P1; earliest phase: 4; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A required source fails while others succeed
- When: Plan the report
- Acceptance criterion: Use INCOMPLETE rather than all-clear

1. Arrange: A required source fails while others succeed
2. Act: Plan the report
3. Assert: Use INCOMPLETE rather than all-clear

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-OPS-02-source

### AC-OPS-03: Checkpoint recovery preserves work

- Requirements: R07, R09
- Specification sections: 09, 10, 15; group T12
- Priority: P1; earliest phase: 4; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A worker crashes after durable ingestion
- When: Restart it
- Acceptance criterion: Resume without losing or duplicating observations

1. Arrange: A worker crashes after durable ingestion
2. Act: Restart it
3. Assert: Resume without losing or duplicating observations

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-OPS-04: Restoration pauses outbound work

- Requirements: R07, R09
- Specification sections: 09, 10, 15; group T12
- Priority: P1; earliest phase: 4; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A database is restored across a possible send/opt-out gap
- When: Plan recovery
- Acceptance criterion: Pause dispatch until the recovery gap and suppression state are reconciled

1. Arrange: A database is restored across a possible send/opt-out gap
2. Act: Plan recovery
3. Assert: Pause dispatch until the recovery gap and suppression state are reconciled

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-OPS-04-restore, TC-OPS-04-reconciled

### AC-OPS-05: Unresolved recovery stays paused

- Requirements: R07, R09
- Specification sections: 09, 10, 15; group T12
- Priority: P1; earliest phase: 4; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: External-send or suppression history cannot be reconstructed
- When: Plan recovery
- Acceptance criterion: Keep affected cases paused for operator review

1. Arrange: External-send or suppression history cannot be reconstructed
2. Act: Plan recovery
3. Assert: Keep affected cases paused for operator review

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-OPS-05-suppression

### AC-OPS-06: Backups and migrations are tested

- Requirements: R07, R09
- Specification sections: 09, 10, 15; group T12
- Priority: P1; earliest phase: 4; test level: manual
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The approved deployment has backup and rollback procedures
- When: Restore a real test backup and roll back a migration
- Acceptance criterion: Demonstrate the agreed recovery objectives with saved results

1. Arrange: The approved deployment has backup and rollback procedures
2. Act: Restore a real test backup and roll back a migration
3. Assert: Demonstrate the agreed recovery objectives with saved results

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-OPS-07: Retry exhaustion is visible

- Requirements: R07, R09
- Specification sections: 09, 10, 15; group T12
- Priority: P1; earliest phase: 4; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A job repeatedly fails within bounded retry policy
- When: Exhaust retries
- Acceptance criterion: Move to a visible dead-letter/escalation state, not an infinite loop

1. Arrange: A job repeatedly fails within bounded retry policy
2. Act: Exhaust retries
3. Assert: Move to a visible dead-letter/escalation state, not an infinite loop

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-OPS-08: Targets are not fabricated

- Requirements: R07, R09
- Specification sections: 09, 10, 15; group T12
- Priority: P1; earliest phase: 4; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Latency or uptime targets have not been measured
- When: Produce the operations report
- Acceptance criterion: Label them proposed or UNAVAILABLE rather than achieved SLAs

1. Arrange: Latency or uptime targets have not been measured
2. Act: Produce the operations report
3. Assert: Label them proposed or UNAVAILABLE rather than achieved SLAs

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-OPS-08-unavailable, TC-OPS-08-measured

## Reporting and end-to-end behavior

### AC-REP-01: Partial scans stay explicit

- Requirements: R09, R10
- Specification sections: 06, 10, 15; group T13
- Priority: P1; earliest phase: 5; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: One or more sources are incomplete
- When: Build the daily summary
- Acceptance criterion: Show INCOMPLETE coverage and exclude unsupported all-clear claims

1. Arrange: One or more sources are incomplete
2. Act: Build the daily summary
3. Assert: Show INCOMPLETE coverage and exclude unsupported all-clear claims

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-REP-01-partial

### AC-REP-02: Conditional cases are separated

- Requirements: R09, R10
- Specification sections: 06, 10, 15; group T13
- Priority: P1; earliest phase: 5; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Verified and conditional candidates coexist
- When: Build the shortlist
- Acceptance criterion: Keep conditional candidates in a separate queue

1. Arrange: Verified and conditional candidates coexist
2. Act: Build the shortlist
3. Assert: Keep conditional candidates in a separate queue

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-REP-02-separate

### AC-REP-03: Zero verified matches is honest

- Requirements: R09, R10
- Specification sections: 06, 10, 15; group T13
- Priority: P1; earliest phase: 5; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: All candidates are conditional or fail mandatory gates
- When: Build the report
- Acceptance criterion: Return no verified matches with reasons; do not invent recommendations

1. Arrange: All candidates are conditional or fail mandatory gates
2. Act: Build the report
3. Assert: Return no verified matches with reasons; do not invent recommendations

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-REP-03-zero

### AC-REP-04: Pipeline works on real implementation

- Requirements: R09, R10
- Specification sections: 06, 10, 15; group T13
- Priority: P1; earliest phase: 5; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: An approved test environment has implemented ingestion, cases, mocked transports and reporting
- When: Execute end-to-end fixtures against actual application modules
- Acceptance criterion: Trace observations through inquiries and replies to reassessment without live contacts

1. Arrange: An approved test environment has implemented ingestion, cases, mocked transports and reporting
2. Act: Execute end-to-end fixtures against actual application modules
3. Assert: Trace observations through inquiries and replies to reassessment without live contacts

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-REP-05: Report claims trace to evidence

- Requirements: R09, R10
- Specification sections: 06, 10, 15; group T13
- Priority: P1; earliest phase: 5; test level: manual
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A report contains rent, permission and cost claims
- When: Audit each claim
- Acceptance criterion: Find matching scoped evidence, dates and status; no unsupported narrative

1. Arrange: A report contains rent, permission and cost claims
2. Act: Audit each claim
3. Assert: Find matching scoped evidence, dates and status; no unsupported narrative

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

## Free-first cost controls

### AC-COST-01: New paid commitments need approval

- Requirements: R12
- Specification sections: 02, 08, 15; group T12
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A paid API/subscription is proposed without PM approval
- When: Authorize spend
- Acceptance criterion: Deny with PAID_APPROVAL_REQUIRED

1. Arrange: A paid API/subscription is proposed without PM approval
2. Act: Authorize spend
3. Assert: Deny with PAID_APPROVAL_REQUIRED

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-COST-01-approval, TC-COST-01-approved

### AC-COST-02: Spend caps stop work

- Requirements: R12
- Specification sections: 02, 08, 15; group T12
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Projected usage would exceed the approved ceiling
- When: Authorize another billable operation
- Acceptance criterion: Deny with BUDGET_EXCEEDED

1. Arrange: Projected usage would exceed the approved ceiling
2. Act: Authorize another billable operation
3. Assert: Deny with BUDGET_EXCEEDED

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-COST-02-cap

### AC-COST-03: Free-first does not invent zero cost

- Requirements: R12
- Specification sections: 02, 08, 15; group T12
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Existing subscriptions, hardware or operations costs are unknown
- When: Produce the cost report
- Acceptance criterion: Separate existing, incremental, estimated and UNAVAILABLE amounts

1. Arrange: Existing subscriptions, hardware or operations costs are unknown
2. Act: Produce the cost report
3. Assert: Separate existing, incremental, estimated and UNAVAILABLE amounts

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-COST-03-report

### AC-COST-04: Max is not model API credit

- Requirements: R12
- Specification sections: 02, 08, 15; group T12
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The proposed runtime tries to bill model API usage against Max
- When: Validate execution mode
- Acceptance criterion: Deny unsupported billing assumptions

1. Arrange: The proposed runtime tries to bill model API usage against Max
2. Act: Validate execution mode
3. Assert: Deny unsupported billing assumptions

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-COST-04-max-api, TC-COST-04-approved-api

### AC-COST-05: Permission revocation halts metered work

- Requirements: R12
- Specification sections: 02, 08, 15; group T12
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Previously approved paid access is revoked
- When: Attempt another metered operation
- Acceptance criterion: Deny even if the job predates revocation

1. Arrange: Previously approved paid access is revoked
2. Act: Attempt another metered operation
3. Assert: Deny even if the job predates revocation

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-COST-05-revoked

## Phase and release permissions

### AC-GATE-01: Offline means no live actions

- Requirements: R09, R13
- Specification sections: 16, 17, 18; group T13
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A Phase 1 job requests email/form/source/private-mail access
- When: Authorize the operation
- Acceptance criterion: Deny all external actions in the offline phase

1. Arrange: A Phase 1 job requests email/form/source/private-mail access
2. Act: Authorize the operation
3. Assert: Deny all external actions in the offline phase

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-GATE-01-email_send, TC-GATE-01-form_submit, TC-GATE-01-source_read, TC-GATE-01-private_mail_read

### AC-GATE-02: Read-only and shadow cannot dispatch

- Requirements: R09, R13
- Specification sections: 16, 17, 18; group T13
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A Phase 2 or 3 task requests a Gmail draft/send or live form submission
- When: Authorize the operation
- Acceptance criterion: Deny the write even if no email would immediately be delivered

1. Arrange: A Phase 2 or 3 task requests a Gmail draft/send or live form submission
2. Act: Authorize the operation
3. Assert: Deny the write even if no email would immediately be delivered

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-GATE-02-2-email_send, TC-GATE-02-2-gmail_draft, TC-GATE-02-2-form_submit, TC-GATE-02-3-email_send, TC-GATE-02-3-gmail_draft, TC-GATE-02-3-form_submit

### AC-GATE-03: Live phase still needs bounds

- Requirements: R09, R13
- Specification sections: 16, 17, 18; group T13
- Priority: P0; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Phase 4 is selected without explicit sender/contact/cost approval
- When: Authorize dispatch
- Acceptance criterion: Deny; phase naming is not permission

1. Arrange: Phase 4 is selected without explicit sender/contact/cost approval
2. Act: Authorize dispatch
3. Assert: Deny; phase naming is not permission

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-GATE-03-approval, TC-GATE-03-approved

### AC-GATE-04: PM owns release

- Requirements: R09, R13
- Specification sections: 16, 17, 18; group T13
- Priority: P0; earliest phase: 5; test level: manual
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The developer recommends advancing a phase
- When: Review release authorization
- Acceptance criterion: Require a recorded PM decision, never self-approve

1. Arrange: The developer recommends advancing a phase
2. Act: Review release authorization
3. Assert: Require a recorded PM decision, never self-approve

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-GATE-05: Incomplete tests cannot release

- Requirements: R09, R13
- Specification sections: 16, 17, 18; group T13
- Priority: P0; earliest phase: 5; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Mandatory ACs are unimplemented or not exercised
- When: Compute the release decision
- Acceptance criterion: Return BLOCKED; do not treat skips or fixture checks as application coverage

1. Arrange: Mandatory ACs are unimplemented or not exercised
2. Act: Compute the release decision
3. Assert: Return BLOCKED; do not treat skips or fixture checks as application coverage

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-GATE-05-incomplete

## Evaluation quality

### AC-QUAL-01: Locked sets are protected

- Requirements: R09
- Specification sections: 16, 17; group T13
- Priority: P1; earliest phase: 5; test level: manual
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: A locked acceptance set has been consumed
- When: Attempt to use it as a fresh holdout
- Acceptance criterion: Reject the fresh-holdout claim and require a new independent set

1. Arrange: A locked acceptance set has been consumed
2. Act: Attempt to use it as a fresh holdout
3. Assert: Reject the fresh-holdout claim and require a new independent set

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-QUAL-02: Metrics retain provenance

- Requirements: R09
- Specification sections: 16, 17; group T13
- Priority: P1; earliest phase: 5; test level: manual
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The evaluation mixes synthetic, manual and model-graded outcomes
- When: Produce metrics
- Acceptance criterion: Separate provenance, denominators, sample sizes and uncertainty

1. Arrange: The evaluation mixes synthetic, manual and model-graded outcomes
2. Act: Produce metrics
3. Assert: Separate provenance, denominators, sample sizes and uncertainty

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-QUAL-03: Containment is not model perfection

- Requirements: R09
- Specification sections: 16, 17; group T13
- Priority: P1; earliest phase: 5; test level: manual
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The model proposed an unsafe action but code blocked it
- When: Score the evaluation
- Acceptance criterion: Record both model failure and dispatcher containment

1. Arrange: The model proposed an unsafe action but code blocked it
2. Act: Score the evaluation
3. Assert: Record both model failure and dispatcher containment

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

### AC-QUAL-04: No hidden mock implementation

- Requirements: R09
- Specification sections: 16, 17; group T13
- Priority: P1; earliest phase: 1; test level: contract
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: Contract tests use an unimplemented or test-double adapter
- When: Generate results
- Acceptance criterion: State implementation kind and deny a production-readiness claim

1. Arrange: Contract tests use an unimplemented or test-double adapter
2. Act: Generate results
3. Assert: State implementation kind and deny a production-readiness claim

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: TC-QUAL-04-missing, TC-QUAL-04-double, TC-QUAL-04-application

### AC-QUAL-05: Artifacts rerun cleanly

- Requirements: R09
- Specification sections: 16, 17; group T13
- Priority: P1; earliest phase: 5; test level: controlled-integration
- Current status: NOT_RUN; application binding is missing at baseline.
- Given: The test-first package is extracted into a fresh location
- When: Run validation, harness checks and contracts
- Acceptance criterion: Reproduce package checks and explicit missing-implementation results with no network or dependencies

1. Arrange: The test-first package is extracted into a fresh location
2. Act: Run validation, harness checks and contracts
3. Assert: Reproduce package checks and explicit missing-implementation results with no network or dependencies

Evidence: Pinned implementation revision and configuration; Actual result, expected result, timestamp, and test output; Side-effect and authorization evidence when applicable.
Executable fixture IDs: None. Requires controlled integration or manual evidence; it is not silently skipped.

