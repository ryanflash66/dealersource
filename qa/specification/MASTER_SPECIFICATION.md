# Dealership Sourcing and Proactive Verification System - Claude Code Build Specification v1.0

## 01. Status, purpose, and how to use this specification

**Version:** 1.0. **Prepared:** September 14, 2026. **Status:** Design only. No application, integration, mailbox connection, form submission, scheduled job, or paid subscription has been created by this work.

## Product objective
Find existing spaces that could support the user's used-car dealership, establish whether they fit the configured business criteria, proactively obtain missing material facts from the appropriate parties, and deliver an evidence-backed shortlist with a persistent verification history.

The system must do more than aggregate listings or plot parcels. It must distinguish:
1. An interesting property from an actually advertised lease opportunity.
2. An advertised opportunity from a currently confirmed offer for the exact space.
3. A broker's representation from an official use or licensing determination.
4. A screened candidate from a location authorized for the proposed operation.
5. An attractive site from a site supported by sufficiently complete, current evidence.

**Unknown must trigger an appropriate investigation, not a fabricated answer.** If the relevant party does not respond, or a formal application or inspection is required, preserve the case, escalate it, and exclude unresolved mandatory facts from the verified shortlist.

## Interpretation rules
- **Confirmed requirement:** explicitly supplied by the user and mandatory unless they change it.
- **Recommended default:** proposed by this specification, editable and subject to owner approval before live operation.
- **Documented capability:** supported by the cited official documentation, not necessarily enabled or tested in the user's account.
- **Access gap:** permission, commercial coverage, credentials, technical compatibility, or source availability remains unverified.
- **Go-live gate:** a condition that must be met and evidenced before the relevant phase may run.

The normative words MUST and MUST NOT describe implementation requirements. Recommendations are labeled explicitly. Numeric operating and quality targets below are proposed acceptance targets, not measured results or guarantees.

## Authority and non-goals
This document authorizes a specification, not execution. A future implementation requires an explicit build instruction. Live data access, paid services, account authorization, and real outbound inquiries require the approvals defined here.

The system must not negotiate leases, submit offers, sign documents, pay fees or deposits, submit formal licensing applications, make legal certifications, place phone calls in v1, or promise that a property is legally approved. It is not a substitute for the relevant authority, site inspection, or professional due diligence.

References [S01] through [S25] are collected in the final section. Public documentation checked during this planning work is evidence of product capabilities, not evidence of local inventory coverage or a tested integration.

## 02. Confirmed requirements and unresolved decisions

## Confirmed requirements
| ID | Requirement |
| --- | --- |
| R01 | Source locations for a used-car dealership. |
| R02 | Start with Eastern North Carolina; geography must remain configurable. |
| R03 | Lease an existing site. Shared properties and subleases are acceptable if the arrangement can be approved. |
| R04 | Target monthly BASE rent of $600 to $1,000. This is not an all-in occupancy budget. |
| R05 | Do not impose a user-selected minimum lot size. |
| R06 | Building needs, service bays, frontage, vehicle capacity, and other undecided business criteria remain configurable and unset until the team decides. |
| R07 | Run discovery daily, with an editable schedule. |
| R08 | Use broad authoritative and properly licensed evidence, not merely a basic scraper or parcel/GIS lookup. |
| R09 | Aim for production-grade reliability and very high accuracy, with measured evidence rather than unsupported claims. |
| R10 | Proactively seek answers about materially uncertain properties from the appropriate contact or authority. Integrate this into the routine. |
| R11 | Use email and official inquiry forms for v1 verification, with the existing Google Workspace/Gmail business inbox. |
| R12 | Use Claude. The user plans to use the $100/month Claude Max subscription. Do not assume it supplies model API credits or third-party data licenses. |
| R13 | All work in this request is specification only. Do not implement or connect services. |

## Recommended interpretation of the rent range
Use $1,000 as the initial ceiling and $600 to $1,000 as the preferred range. Do not reject a cheaper space solely for being below $600 unless the owner explicitly enables a minimum-rent rule. This is a recommendation, not a user-confirmed minimum/maximum interpretation.

## Decisions required before a live pilot
| Decision | Current state and required resolution |
| --- | --- |
| Exact search boundary | Eastern NC is a region, not an executable polygon. Owner supplies counties, a drawn boundary, or a center and distance method. Do not silently choose counties. |
| Geography interpretation | Define straight-line radius versus drive time; boundary intersection versus leased-space location; included/excluded municipalities. |
| Opportunity scope | Advertised leases only versus separate unadvertised research candidates is unanswered. Recommended initial pilot: advertised leases only. |
| Business criteria | Team decides any mandatory office, display, capacity, service/repair, signage, security, or access needs. Unset preferences must not be invented. |
| Timing | Daily time and business-hours policy need approval. America/New_York is the recommended initial timezone, not a confirmed schedule. |
| Sender | Exact Gmail account, approved send-as identity, dealership name, signature, and authorized operator are not supplied. |
| Communication policy | Approve templates, recipient classes, domain/form allowlists, volume caps, follow-up timing, and human escalation owner. |
| Output | A shared Sheet, email digest, or Claude report has not been selected. Recommend an internal tracker as the system of record, with optional exports. |
| Sources | No licensed commercial lease feed or small/shared-space coverage has been validated or purchased. |
| Execution | Select and prove a supported Claude Max workflow or explicitly authorize a separately billed model API path. |
| Infrastructure | Hosting, data residency, retention, backup targets, Google authorization requirements, and spend ceilings need owner signoff. |

Unset live-critical settings must prevent activation of the relevant job. They must not prevent offline development once the owner authorizes it.

## 03. Configurable search and operating policy

Configuration must be typed, validated, versioned, auditable, and editable without changing application code. Store an immutable snapshot on every run, inquiry decision, and assessment. Separate business criteria from jurisdiction rules, source contracts, and outbound permissions.

## Business configuration
- Geography: named search profiles, explicit boundary/center, distance method, exclusions, and responsible jurisdictions.
- Rent: currency, preferred range, hard cap, whether a lower bound is binding, and handling of ranges or negotiable prices.
- Arrangement: direct lease, shared premises, sublease; existing sites only for the initial profile.
- Physical preferences: lot area, exclusive display area, vehicle capacity, office size, restroom, service bays, repair activity, surface, drainage, fencing, lighting, access, frontage, signage, and readiness date. Each supports unset, preferred, or required with a value where applicable.
- Market preferences: travel distance, competition, exposure, and demand-context factors. These must not silently become exclusion rules.
- Opportunity scope: advertised only, unadvertised research only, or both in separate queues.

A null preference means no user filter. It does not disable applicable legal or operational safety checks. A legal rule cannot be switched off merely to increase matches; changes require reviewed jurisdiction evidence and a new rule version.

## Proposed initial policy values, not active settings
| Setting | Proposed value |
| --- | --- |
| Discovery | Daily; exact time requires selection |
| New-inquiry dispatch | Monday through Friday, 9 a.m. to 5 p.m. in the recipient's local timezone; holiday-aware |
| New inquiries | Maximum 5 property/contact inquiries per business day across email and forms combined |
| Follow-ups | Maximum 1 routine follow-up after 2 business days, then team escalation after 5 business days without a substantive answer |
| Recipient cooldown | No duplicate initial request to the same party for the same property/question group within 7 days |
| Reply reconciliation | Every 15 minutes, plus event-driven handling where enabled |
| Availability confirmation | Recheck after 3 business days or before a visit/decision if older, whichever policy requires earlier |
| Written rent confirmation | Recheck after 7 calendar days or at the stated offer expiry, whichever is earlier |
| Local authorization | Validate scope and document effective/expiry dates; recheck after changes in operator, space, layout, or use and before commitment |
| Outbound activation | Disabled until a separately recorded owner approval and phase gate |

These are conservative starting proposals. Official agency response expectations and contact-specific instructions take precedence over a generic follow-up timer. Re-reading an old page does not refresh its underlying facts.

## Configuration failure rules
Reject impossible ranges, negative prices, missing currency, ambiguous radius units, invalid timezones, inconsistent required flags, and a selected source without approved use rights. Critical configuration changes must trigger reassessment of affected candidates and cancellation or review of unsent inquiries. Already-sent communications remain in the audit history.

## 04. Source strategy, documented options, and access gaps

Source acquisition is a first-class workstream. A commercial API subscription is not automatically accurate, comprehensive, or suitable for small subleases. Source coverage must be demonstrated against the chosen pilot area and property type.

| Source family | Intended contribution | Documented position and unresolved gap |
| --- | --- | --- |
| Local commercial MLS/CIE and broker feeds | Advertised lease inventory, exact space, prices, status updates | RESO defines standards; data access is granted by the MLS/data owner under its policies. No specific Eastern NC commercial feed, eligibility, or sublease coverage is established. [S01] |
| Commercial marketplaces and broker websites | Additional advertised opportunities and original brochures | Evaluate permitted APIs, partner feeds, exports, or authorized alerts. Crexi's documented Listing API publishes listings into Crexi; it is not proof of a rental-search read API. Do not invent a LoopNet/CoStar/Crexi read connector. [S02] |
| Direct landlord/broker documentation | Current availability, quote, exact leased area, included rights, additional charges | Obtain through the approved inquiry workflow. Confirm that the respondent is authorized. A reply is evidence, not necessarily a binding offer. |
| Master lease and owner consent | Whether the proposed sublease, use, display area, and signage are allowed | Obtain relevant excerpts or documents through authorized parties. Minimize collection of unrelated financial or personal details. Public ownership alone does not establish subleasing authority. |
| Local planning/building/permit records | Zoning use, occupancy, approved layout, display/repair/sign/access permissions | Availability varies by jurisdiction. A zoning map label is only a screening signal. Issued records, conditions and competent authority confirmation are needed for site-specific determinations. [S06, S07] |
| State dealer authority | Current premises requirements, inspection process, licensing applicability | Current official resources include the NC State Highway Patrol Investigative Services Unit. No public dealer-status API has been verified. Do not rely on an old bureau contact or a prior tenant's license. [S04, S05] |
| Recent site evidence | Photos, floor plans, inspection findings, usable display/office/access areas | Date, source, exact coverage and measurement method must be retained. A physical visit may remain necessary; aerial geometry does not prove usable capacity. |
| NCDOT traffic/access information | Traffic exposure and relevant road context | Official AADT downloads are documented; the reviewed index exposed 2025 data. These are annual data, not real-time visits, driveway approval, or sales. [S08] |
| Census and market context | Population, households, income and transport context | ACS API is documented. The 2024 ACS five-year product covers 2020-2024. Preserve vintage and margins of error. Competitor or automotive transaction data requires separate verification/licensing. [S09] |
| FEMA and NC DEQ | Known flood, tank and environmental incident indicators | FEMA documents REST/WMS/WFS services; coverage and effective dates vary. NC DEQ publishes tank/facility/incident resources. Absence of a record is not proof of safety. [S10, S11] |
| Google Maps/Places and routing | Location resolution, operating-business context and travel/access context | Place information is not lease inventory. Closure does not prove vacancy. Google imposes caching, attribution and display restrictions; place IDs have a storage exception. [S12, S13] |
| NC OneMap, deeds and property aggregators | Supporting parcel/building identity and property characteristics | County data is transformed on differing dates. LightBox's public catalog documents property/assessment/sales data, not proof of available leases. Do not treat processing dates as lease confirmations. [S03, S14, S15] |

## Source qualification record
For every proposed source, record: owner, exact product and access path, approved account, geographic and property-type coverage, whether individual leased spaces are represented, original-source provenance, update mechanism, pagination/history/deletion behavior, supported fields/units, known gaps, permitted automated access, LLM-processing rights, storage/export/display/redistribution rights, retention limits, attribution, contract/expiry, quotas, and observed latency/errors.

Classify adapters as DOCUMENTED_ONLY, ACCESS_APPROVED, CONNECTIVITY_TESTED, PILOT_COVERAGE_TESTED, or LIVE_APPROVED. No source in this specification has reached the latter states through this work.

## Coverage validation
Use an owner-approved, independently assembled sample of actual advertised opportunities, including small offices with allocated display space and shared/subleased automotive sites. Compare exact-space matches and material fields. Report missing cases and syndication relationships. Measure coverage against this defined benchmark, never claim recall of all properties in Eastern NC.

If no licensed feed covers the target well, use permitted broker submissions, owner-provided documents, and authorized listing alerts as explicit inputs. Browser-assisted reading is allowed only where permitted and tested; do not bypass paywalls, authentication, access denials, or source restrictions. Never silently replace a missing feed with another provider.

## 05. Evidence model, authority, and truth standards

## Field-level observations
Store observations before computing a current assessment. Each material observation must include:
- Property ID and exact space/opportunity ID; jurisdiction and operator/use scope where relevant.
- Field name, raw value, normalized value, units/currency, and transformation method.
- Source/record URL or document/message ID, original publisher, and syndicated-source group.
- Exact excerpt or page/section reference where retention rights permit; artifact hash and allowed snapshot if available.
- Source effective date, source update date, retrieved time, respondent confirmation time, offer expiry, and validation expiry as distinct fields. Unknown dates remain null.
- Respondent identity, role, verified contact provenance and authority for this fact.
- Evidence classification: observed, advertised, calculated, claimant-confirmed, authority-confirmed, estimated, conflicting, stale, or unavailable.
- Reviewer/model version and any documented human override.

An LLM confidence score is not proof. Do not generate arbitrary numerical confidence percentages or collapse all fields into one credibility score.

## Authority is field-specific
A current authorized leasing agent can confirm asking rent and stated availability. A local planning department can explain or determine a permitted use within its authority. A dealer inspector can address state premises requirements. None automatically substitutes for the others. An informal email is not an issued permit, and an existing permit may concern a different operator, layout, space or activity.

For subleases, distinguish the legal owner, master tenant, broker, proposed subtenant, exclusive space, shared areas, display allocation, access rights and required written consent. Store unresolved legal-document interpretation as a review item, not an LLM-certified conclusion.

## Contradictions and expiry
Retain conflicting observations and mark the affected field unresolved until a documented resolution is obtained. Recency alone does not beat authority. Duplicate syndicated listings do not constitute independent corroboration. Original-source corrections or withdrawal events may immediately invalidate prior assessments.

When evidence becomes stale, its previous value remains historical but must not remain a current verified claim. Expiry is specific to the field, document and situation; a daily fetch must not manufacture a new effective date.

## Jurisdictional rules
Resolve the actual governing municipality, county, extraterritorial jurisdiction where applicable, building authority, road authority and state dealer authority. Never infer jurisdiction solely from a postal city or ZIP code.

NC G.S. 20-286(6) generally specifies a permanent enclosed salesroom of at least 96 square feet, signage, business activity and records; it expressly allows other business uses in the same building when established-salesroom requirements are met. Treat this as a statutory screening input, including applicable exceptions, not automatic approval of a shared site. [S04]

Raleigh's auto-dealer and change-of-use pages illustrate why landlord consent, site plans, permits and occupancy may matter. They are not the selected pilot geography and must not be applied statewide. [S06, S07]

## Human evidence
Team visits and professional/official reviews are valid evidence when dated, attributable and scoped. Require explicit acknowledgement for unresolved physical or legal due diligence before a visit/commitment workflow proceeds. The software may flag the next action, but cannot waive required approval.

## 06. Candidate identity, screening, and shortlist rules

## Distinct entities
A property is a parcel/building location. A space is the exact office, suite, lot portion or display allocation offered. An opportunity is a particular lease/sublease offer for that space. A business at the address is another entity. Do not collapse them into one record.

Deduplicate using source IDs, exact space descriptors, geometry, address components, landlord/broker references and documentary evidence. Business names and street addresses alone are insufficient. Ambiguous matching must enter merge review. All merges are reversible with provenance; do not lose distinct spaces or historical offers.

## Deterministic checks
Return PASS, FAIL or UNKNOWN for each required criterion, with reason codes and evidence IDs.
- Geography: use the approved geometry/method and accurate point or space location. Boundary and location-uncertainty cases require review.
- Lease type: distinguish direct lease, sublease, shared use, ground lease, purchase listing and vehicle-storage-only offer. Do not silently substitute buying or developing land.
- Base rent: use decimal currency or integer cents, not binary floating-point comparison. Monthly total is used directly; annual total is divided by 12; annual price per square foot is multiplied by the confirmed leased floor area and divided by 12; monthly price per square foot is multiplied by that area. Require the advertised billing basis and relevant area. Do not substitute full-parcel acreage or whole-building area for rented space.
- Ranges: a range entirely under the cap may pass the rent screen as an advertised range; one entirely above fails; one crossing the cap is UNKNOWN pending a space-specific quote. Negotiable or missing prices are UNKNOWN, not zero.
- Cost scope: separate base rent, common-area/NNN charges, utilities, taxes, insurance, deposits, buildout and one-time fees. Missing extra costs must remain visible even when base rent passes.
- Business preferences: evaluate only configured required fields. Unset lot-size and bay preferences do not reject candidates.
- Legal/physical requirements: evaluate with the applicable versioned jurisdiction and use rules; no statistical or LLM guess may satisfy a mandatory approval requirement.

## Two assessments, not one score
Maintain business fit and evidence completeness separately. Optional ranking weights must be transparent, versioned and owner-approved. Market data is contextual unless the user makes it a hard criterion. Population, traffic and competitor counts are proxies, not forecasts of dealership sales.

## Status and promotion
1. DISCOVERED: source lead, not yet screened.
2. SCREENED_POSSIBLE: no known fatal failure; material facts may be unknown.
3. VERIFICATION_ACTIVE: appropriate inquiries/documents/reviews are in progress.
4. CONDITIONAL_REVIEW: potentially workable but conditions or formal approvals remain outstanding.
5. QUALIFIED_FOR_TEAM_REVIEW: all currently applicable mandatory business and evidence gates pass, including confirmed availability, exact-space rent, required owner/sublease consent and any approvals required at this stage. Physical due-diligence status is displayed explicitly. This is not a lease recommendation or a software-issued legal approval.
6. SITE_AUTHORIZATION_DOCUMENTED: required official documents for the specified operator/use/space are recorded and checked for scope; not a software-issued legal approval.
7. REJECTED, WITHDRAWN, EXPIRED, or ARCHIVED: explicit reason and history retained.

Never present CONDITIONAL_REVIEW as fully verified. The default verified-shortlist query must exclude any candidate with an UNKNOWN or FAIL on a mandatory gate. All sites must show separate availability, price, landlord consent, legal-use, licensing and physical-evidence badges. A required permission that can only be obtained after an application remains conditional; do not mark it not applicable to improve the shortlist.

Formal approval and current commercial fit are independent dimensions. A site can retain historical authorization documents after its lease offer is withdrawn, or have an available offer while site approval is still pending. Expired evidence or changed facts must remove the verified badge immediately without erasing the history.

Unknown material facts create verification cases after cheap screening. Known disqualifying failures prevent unnecessary contact unless the owner explicitly authorizes an exception investigation. No reply or failure to find contrary evidence is not consent.

## 07. Recommended application architecture

## Recommended maintainable baseline
Use one repository and one application with API/UI and worker execution modes, rather than a swarm of autonomous agents. A reasonable default is TypeScript on a supported Node.js LTS release, PostgreSQL for durable state and jobs, encrypted object storage for retainable evidence, and a managed scheduler. Pin exact supported versions at implementation start. These are recommendations, not existing infrastructure.

Use a separate isolated browser worker only for approved official forms that genuinely require browser interaction. Do not add Kubernetes, a vector database, a general agent framework, or multiple queues without a demonstrated need. SQLite may be used for local fixtures, but production concurrency, backups and queue semantics must be tested against the selected durable database.

## Logical components
- Configuration and policy service: validated profiles, owner approvals, jurisdiction rules and source contracts.
- Source adapters: permitted APIs/feeds/imports and evidence-preserving document intake.
- Normalization and identity service: deterministic units, exact-space resolution and reversible deduplication.
- Evidence and assessment service: field-level observations, expiry, authority and conflicts.
- Case planner: material unknowns, appropriate contacts and minimal questions.
- Claude analyst: structured extraction, question drafting, response interpretation and narrative explanations.
- Communications dispatcher: deterministic, separately authorized Gmail/form execution; no unrestricted model-controlled sending.
- Durable worker/scheduler: job leases, retries, transactional outbox, due dates and reconciliation.
- Internal tracker: searchable map/list/detail view, evidence timeline, approval state, human takeover and operational health.
- Reporting/export: scoped summary and approved destination adapters.

## Data flow
Approved source input -> raw/linked evidence -> normalized observation -> tri-state assessment -> candidate/case -> structured question proposal -> policy checks -> authorized dispatch -> reply/document -> new observation -> reassessment -> report.

The UI and model are not systems of record. A cloud session's working directory must not be the only durable copy. Each run references database-backed configuration and checkpoints.

## Deployment and authorization
Select hosting and data residency with the owner. Service identities and environment access must be narrowly scoped. Keep development, test and production credentials/data separate. Google authorization and any mailbox watch configuration are separate from signing into Claude.

An implementation may expose authenticated operations such as running discovery, viewing candidates, taking over a case, pausing dispatch and changing configuration. Public webhook routes must be authenticated and verified; do not expose arbitrary URL fetch, SQL execution, mailbox search or send-email endpoints to the model or the internet.

A single failed source or unavailable model must not erase evidence, create fabricated zero-match results, or prevent other safely independent work from being recorded.

## 08. Claude Max, model boundaries, and execution decision

## Verified product constraints
- Claude Max and the separately billed Claude API/Console are distinct products. Max does not supply model API credits. [S18]
- Claude Code cloud routines are documented for Max and other paid plans. They run on cloud infrastructure, draw subscription usage, have run limits, and are in research preview. This is not an availability guarantee or an integration test in the user's account. [S16]
- Cowork cloud scheduled tasks can run without an online device, but local files/connectors and browser/computer interaction can still depend on the desktop app. Do not repeat older blanket assumptions about all tasks needing an awake laptop, or assume local resources are cloud-accessible. [S17]
- Claude's Google Workspace connector documents send/reply/forward approval by default. Owner-controlled automatic-action settings are described for Team/Enterprise, not established for this user's Max account. Gmail attachment content is not directly accessible through that connector, only metadata. [S19]

## Execution options and decision gate
| Mode | Intended use | Required proof and limitation |
| --- | --- | --- |
| Subscription-native Max | Preferred first capability test because it matches the user's stated plan | Prove supported routine access, selected connectors/network reach, durable state exchange, structured output handling and usage-limit recovery. Do not assume native Gmail can send unattended. |
| Max-assisted review | Safe fallback for development, shadow runs or a human-reviewed operating mode | Deterministic collection and case tracking continue; Claude work is reviewed or manually supplied. This is not fulfillment of fully unattended model analysis. |
| Separately authorized model API | Optional later deployment choice for a conventional server-side model worker | Requires explicit owner approval, credentials and independent billing. Do not silently activate it or describe it as covered by Max. |

A separately authorized Gmail API service is a proposed mail transport under the user's explicit Google authorization and application policy. It is not permission to evade a refusal or required approval from an existing Claude connector. Select a legitimate supported workflow before activation; do not switch transports during a denied action.

**MUST NOT:** extract subscription OAuth tokens, impersonate a supported client, proxy Max credentials into an unsupported application, automate approval clicks, or silently fall back to paid model calls. If a capability cannot be demonstrated through a supported path, mark the autonomous mode blocked and ask the owner to choose a supported alternative.

## Model contract
Claude may extract assertions, identify missing fields, propose concise questions, classify answers and explain tradeoffs. Require structured output with candidate/case IDs, requested field names, proposed values, cited evidence IDs/excerpts, uncertainty and required next action. Validate against a schema and the case's allowed questions.

Code owns eligibility, units, score formulas, evidence expiry, recipient selection, dispatch permission, contact caps, status transitions, spending policy and protected actions. Model text alone cannot approve a site or an outbound action.

Treat listings, web pages, PDFs and replies as untrusted evidence, never instructions. A response cannot change criteria, request unrelated mailbox contents, add recipients or authorize payments. Reject unsupported citations and invented fields. Record prompt/schema/model versions and permitted input evidence references.

On model failure or quota exhaustion, preserve state and mark analysis pending. Deterministic processing may continue. Approved static inquiry templates may be sent only when an already-authorized rule can supply all required content without model inference. Do not produce a guessed report or silently upgrade models.



## Enforced runtime privilege boundary
The production Claude analyst must not receive Gmail refresh tokens, form-session credentials, unrestricted database access, policy-edit permissions or an arbitrary send endpoint. Give it only a bounded interface to claim an analysis job, obtain minimal permitted evidence and submit schema-validated proposals. The dispatcher runs under a separate identity and independently checks current policy. Restrict analyst network/tool access accordingly; a prompt that says 'do not send' is not an authorization boundary.

Claude Code used during development is distinct from the deployed analyst role. Do not place production credentials in an unrestricted development session or assume repository write access is safe in the live analyst environment.

For v1 automatic inquiries, use approved templates populated with validated factual slots and allowed question identifiers. Claude can select or propose relevant questions, but unrestricted generated prose must not be sent automatically. New question types or free-form correspondence go to human review until incorporated into a versioned approved template. This preserves proactive handling of common unknowns without granting the model authority to invent commitments.

## 09. Domain records and component contracts

## Minimum durable records
| Record | Essential fields and constraints |
| --- | --- |
| SearchProfile | Version, geography, criteria, schedule, timezone, source set, reporting settings, owner |
| SourceRegistry | Provider/product, access state, licenses/rights, jurisdiction coverage, quotas, retention, health |
| SourceRun | Source, profile snapshot, cursor/pages, start/end, completeness, errors, counts, cost provenance |
| Property | Canonical address components, parcel/building references, geometry uncertainty, jurisdictions |
| Space | Property ID, suite/area description, exclusive/shared rights, display allocation, supporting evidence |
| Opportunity | Space ID, lease type, publisher/source IDs, offer dates, price basis, withdrawal state |
| Observation | Field-level value and provenance as defined in Section 05; immutable historical record |
| Assessment | Profile/rule versions, PASS/FAIL/UNKNOWN per criterion, reasons, evidence IDs, expiry |
| Contact | Verified business/agency role, permitted channel, original-source reference, scope, timezone, suppression state |
| VerificationCase | Opportunity, material questions, responsible authority, status, deadlines, operator, handover state |
| Inquiry | Case/contact/channel, approved question set, rendered-content hash, policy snapshot, dedup key |
| OutboxAttempt | Inquiry, attempt state, stable message identity, provider ID/receipt, uncertain-send status, timestamps |
| ReplyOrSubmissionEvidence | Message/thread IDs or form reference, sender, exact space linkage, received/submitted time, artifact policy |
| Job | Type, unique operation key, due time, lease/heartbeat, attempts, checkpoint, dead-letter state |
| AuditEvent | Actor, action, record/version, reason, correlation IDs and protected change metadata |

A property may have multiple spaces, offers, contacts and cases. One broker can represent multiple opportunities, and one conversation can answer multiple explicitly linked cases. Do not rely on a subject line alone.

## Adapter contracts
- Source adapter input: approved profile/boundary, source credentials reference, cursor and changed-since hint. Output: raw reference, normalized candidate observations, original-source identifiers, timestamps, withdrawals, pagination cursor and completeness/error signals.
- Document intake input: permitted file/message and case context. Output: safe extracted text, page references, content hash, allowed retention and untrusted assertions. Unsupported or unsafe files go to review.
- Model adapter input: task type, allowed fields/actions, evidence references and minimal relevant content. Output: schema-valid proposals with support citations, not executable arbitrary commands.
- Dispatcher input: approved inquiry/outbox ID only. It independently reloads policy, recipient, content and latest case state before sending.
- Notification input: authenticated provider event. Output: durable receipt followed by idempotent synchronization; never trust webhook text as a user instruction.
- Report input: assessment and run snapshots. Output: verifiable claims and current operational limitations, not freshly invented facts.

## Integrity requirements
Use UTC for stored instants and explicit IANA zones for business scheduling. Use decimal money and explicit units. Enforce foreign keys and uniqueness constraints for source IDs, event IDs and local operation keys. Distinguish content deletion under retention policy from factual withdrawal. Human overrides require an actor, reason and expiry and must never erase contradictory evidence.



## Case and outbox transition contract
Represent case state separately from opportunity eligibility and approval badges.

- Case states: OPEN, CONTACT_REVIEW, READY_FOR_INQUIRY, AWAITING_REPLY, PARTIAL_ANSWER, ANSWER_REVIEW, RESOLVED, ESCALATED, PAUSED_BY_HUMAN, CLOSED_NO_RESPONSE, and CANCELLED.
- OPEN moves to CONTACT_REVIEW until the material questions, appropriate contact and permitted inquiry channel are established. READY_FOR_INQUIRY requires all dispatch prerequisites except the scheduled send time.
- A confirmed send or form receipt moves the case to AWAITING_REPLY, not RESOLVED. A substantive partial response creates only the remaining questions. RESOLVED requires accepted evidence answering the case's question set; this alone does not qualify the whole property.
- Escalation, human takeover, opt-out, a disqualifying change or withdrawal cancels unsent dependent work. Reopening requires a recorded reason and a new assessment, not a timer silently restarting outreach.
- Outbox states: PENDING_POLICY, READY, CLAIMED, SENT_CONFIRMED, SEND_UNCERTAIN, FAILED_CONFIRMED, CANCELLED and SUPPRESSED. Provider-specific form outcomes include SUBMISSION_UNCERTAIN and a receipt reference.
- A failed worker lease during a possibly executed send must resolve to an uncertain side effect, not READY. Only confirmed pre-dispatch failures may retry automatically under policy. Uncertain attempts require reconciliation or an operator decision before any new attempt.
- Store allowed transitions and guards centrally and test them. Use optimistic version checks or equivalent database transactions so a stale worker cannot overwrite a human pause or newer reply.

## Restoring after state loss
Before resuming outbound work after a database restore, pause dispatch and reconcile the restored outbox against Gmail Sent and retained form receipts for the entire possible recovery gap. Preserve suppression/opt-out information through appropriately durable storage and recovery procedures. If prior contact, suppression or external-send history cannot be reconstructed confidently, keep affected cases paused. Meeting a database recovery target must not cause duplicate messages or renewed contact with someone who opted out.

## 10. Daily discovery and asynchronous verification cycle

## Daily discovery
1. Load the approved profile and permissions snapshot. Refuse activation if geography, source rights or mandatory live settings are missing.
2. Acquire a run lock and enumerate each enabled source completely within its documented limits. Persist pagination/cursors and counts; distinguish a complete scan from a capped or partial one.
3. Ingest changed offers and withdrawal signals. Preserve originals or allowed references, normalize units, resolve exact spaces and create/revise observations.
4. Reassess affected candidates and stale evidence under the current rules. Deprioritize known failures without hiding the reason.
5. Open or update cases for material unknowns on otherwise plausible candidates. Reuse existing open questions instead of contacting again each day.
6. Place eligible inquiries in the outbox, subject to independent dispatch checks and business-hour limits.
7. Refresh tracker/report outputs and record source health, coverage and outstanding work. A source failure must produce an incomplete-run warning, not zero matches.

## Between discovery runs
Process relevant replies and authorized form responses, reconcile Gmail state, handle due follow-ups, recalculate assessments, expire stale evidence and detect human takeover. These jobs operate on persistent cases and do not hold a daily process open awaiting a response.

## No-answer handling
A verified delivery or submitted form is not a substantive answer. Auto-replies, out-of-office messages and receipt acknowledgements do not satisfy questions. An out-of-office return date may defer a follow-up; a hard bounce or wrong department triggers contact review. Silence never establishes availability, permission or acceptance.

## Configuration or fact changes
Withdrawal, opt-out, owner takeover, a new disqualifying fact, conflicting evidence, or changed search criteria must cancel or suspend pending inquiries where appropriate. Recheck state immediately before dispatch; a job created yesterday does not retain unconditional permission to send today.

## Consistency
At-least-once jobs are acceptable only with application-level deduplication and reconciliation. Do not promise exactly-once external effects. A crash after receiving an external answer must not lose it; a crash after an external send must not blindly send again.

## 11. Proactive contact selection and inquiry policy

## Who can be contacted
Use published leasing contacts that invite inquiries, verified agency inquiry channels, established business contacts, or owner-approved contacts with a legitimate basis for the specific property inquiry. Do not scrape private contact details, guess addresses, buy personal-contact lists, or run a mass unsolicited prospecting campaign.

Unadvertised candidate scope remains undecided. If later enabled, keep those leads separate and require an approved, appropriate inquiry channel before any contact. Public parcel ownership is not by itself permission for automated outreach.

## Question routing
- Leasing agent/landlord: current availability, base rent, exact rented space, included display allocation, extra charges, quoted term and owner's intended-use consent.
- Master tenant/owner representative: authority to sublease, relevant master-lease restrictions and required written owner consent.
- Planning/building authority: permitted auto-sales/display/repair activity, conditions, occupancy, change-of-use, signage and applicable site-plan approvals.
- State dealer authority: premises and licensing requirements for the proposed operator and configuration.
- User's team: missing business preferences, budget exceptions, uncertainty requiring a business decision, and formal applications or commitments.

Verify the contact's role against the original listing or official site. A forwarding request to a new recipient requires fresh recipient checks. A respondent's statement is evidence only within their authority.

## Inquiry content
Use the approved dealership identity and identify automated assistance accurately. Ask the smallest set of property-specific factual questions needed, preferably grouped into one concise inquiry. Cite the exact space/listing and distinguish requests for information from applications or offers.

Do not disclose the user's maximum budget by default. Ask for the current quote and terms instead. Do not attach unrelated business records, personal identification, financial statements or full leases containing unrelated confidential material without specific approval.

## Dispatch guards
Require: active owner authorization, approved sender/channel, legitimate verified recipient, relevant question set, plausible candidate, no suppression or human takeover, current policy, approved business hours, volume/cooldown compliance and no unresolved prior send attempt. Enforce these in code, not prompt wording.

Keep one contact-level history across email and forms. A form submission must not be followed immediately by a duplicative email because it is a different adapter. Stop routine follow-ups on a decline, opt-out, adequate answer, human reply, withdrawal or transfer to a formal process.

## Follow-up and escalation
Use the approved configurable cadence from Section 03. Detect partial answers and ask only the remaining material questions, within caps. Escalate agency requests needing plans, application fees, legal attestations, signatures, inspections, or professional judgment. Maintain an actionable exception queue rather than indefinite automated retries.

## 12. Gmail implementation and uncertainty-safe sending

## Authorization and mailbox scope
Use the selected existing Google Workspace/Gmail inbox through an explicitly authorized Google integration. Do not create a replacement inbox or obtain credentials through chat. Verify exact account and allowed send-as identity before any live send.

Prefer the narrowest adequate OAuth scopes. For the planned API path, sending and relevant message reading need separate capability analysis; gmail.send is sensitive, while gmail.readonly, gmail.compose and gmail.modify are restricted. Avoid full-mailbox deletion and settings-sharing permissions. Google verification/security-assessment requirements and internal-use exceptions depend on the deployment and must be documented, not assumed cleared. [S22, S23]

A Gmail label organizes conversations but does not restrict OAuth to that label. Limit application processing to approved inquiry threads and minimal correlation metadata. Make the broader permission boundary visible to the owner. Do not scan historical unrelated mailbox content or enable domain-wide delegation by default.

## Sending and threading
The Gmail API documents messages.send and drafts.send, with a message resource returned on success. Proper MIME headers and reply references are required. [S20, S21]

Before send: atomically create the inquiry intent and outbox row with a unique local operation key, content hash, stable RFC Message-ID and policy snapshot. Only one worker may claim it. Reload the latest case state before dispatch.

On a confirmed successful API response, store provider message/thread IDs and transition to SENT. API acceptance does not prove delivery or that the recipient read it; handle bounces and later failures separately.

**Uncertain-send rule:** if the connection fails after submission may have reached Gmail, mark SEND_UNCERTAIN. Do not automatically repeat the send. Reconcile against Sent using recorded identifiers and content/time/recipient evidence. If the outcome cannot be established, quarantine for operator review. A stable Message-ID is a correlation aid, not a provider-supported exactly-once key or a guarantee against duplicates. Apply the same rule to ambiguous draft-send outcomes.

## Reply processing
Use provider message/thread IDs plus RFC references and the inquiry/case context. Preserve exact space matching. Detect forwarded answers, new threads, auto-replies, delivery failures and partial answers. Ambiguous correlation enters review; never assign a reply merely because the street name appears.

Inspect only authorized relevant attachments, in isolation, with size/type limits, malware controls and no execution of active content. Claude's native Gmail connector exposes attachment metadata, not attachment content; do not rely on it to read a zoning PDF or lease. A permitted document-intake path must be tested separately. [S19]

## Notifications and synchronization
Recommended production path: authenticated Gmail mailbox notifications via Cloud Pub/Sub, with periodic history reconciliation. Notifications are change hints, not full message bodies. Watch renewal is required at least every seven days; Google recommends daily renewal. Delayed/dropped events are documented, so push alone is insufficient. [S24]

Persist processed history checkpoints transactionally, deduplicate event/message IDs, acknowledge only after durable receipt, and tolerate duplicate/out-of-order events. If a history cursor is no longer valid and Gmail returns 404, perform a bounded resynchronization covering the application's relevant recent threads; do not broaden into unrelated mailbox ingestion. [S25]

## Human coordination
Detect a team member's response, pause automation for that conversation, and show takeover state. Recheck before sending, but acknowledge the unavoidable race if a human replies at the same moment as an external send. Provide a visible pause control, sent-event notification and reconciliation procedure; do not claim impossible perfect ordering across Gmail and the application.

## 13. Official inquiry-form integration

Forms are an explicit supported channel, not a universal browser capability. Each form requires a source-specific adapter or reviewed manual procedure.

## Form registry
Record the official organization, verified domain and approved action endpoint, inquiry purpose, relevant jurisdiction, supported fields, privacy/terms requirements, whether login or uploads are needed, receipt behavior, expected response route and current test status. A hosting platform or third-party form domain is allowed only after verifying that the official organization actually links to it.

## Submission policy
- Submit factual inquiries only, not permit/licensing applications, offers or legal attestations.
- Use the existing business email as the contact/reply address where supported and the approved dealership identity.
- Fill only reviewed fields with necessary data. Do not infer required factual declarations.
- Capture submitted content, record IDs, time, destination and permitted confirmation evidence.
- Treat a generic page load, HTTP 200, or button click as insufficient proof of success. Require a verified receipt, reference number, clear confirmation state or otherwise reviewed evidence.
- Mark FORM_SUBMITTED_AWAITING_REPLY separately from substantive ANSWER_RECEIVED.

If submission times out after it may have succeeded, enter SUBMISSION_UNCERTAIN and reconcile instead of retrying blindly. Email/form deduplication uses the same contact/property/question ledger.

## Unsupported or blocked forms
Detect changed fields, changed destination, login, CAPTCHA, anti-automation rules, fees, signatures, mandatory legal certifications, inaccessible content and unsupported uploads. Pause and route the specific exception to the team. Do not bypass access controls or fabricate a receipt.

A page may invite a general question but not support the necessary address-specific review. Record that limitation and route to the correct official process. If no reply email is provided, retain the reference and a permitted status-check/manual follow-up task.

## Browser isolation
Use a dedicated browser context with no access to unrelated mailbox sessions or secrets. Prevent arbitrary redirects to unapproved destinations and metadata/internal-network addresses. Require explicit review of adapter changes that alter recipients or submitted data. Test against local mock forms first; live external submissions are not test fixtures.

## 14. Security, privacy, and protected actions

## Trust boundaries
Source pages, advertisements, emails, attachments, form labels and model output are untrusted data. They cannot change the owner-approved search profile, communication policy, recipient allowlist, credentials, retention rules or protected-action permissions.

Defend against prompt injection such as a listing or reply requesting mailbox exports, budget changes, additional recipients, executable scripts, confidential attachments, payments or altered approval settings. The model receives only the minimal evidence needed for a bounded task, without secrets or unrelated mail.

## Credential and application controls
- Store OAuth refresh tokens and service secrets in an approved secret store with encryption and rotation/revocation support. Never store them in prompts, reports, source snapshots, source control or logs.
- Authenticate internal users through the approved business identity provider. Define owner, reviewer and read-only roles; only the owner can activate outbound permissions or change protected limits.
- Authenticate webhooks, validate issuer/audience or equivalent provider mechanisms, reject replays as appropriate, and use constant-size bounded input processing.
- Validate URL schemes, domains, redirects and resolved destinations to prevent SSRF and credential forwarding. Do not accept arbitrary model-provided endpoints.
- Sandbox document parsing and browser execution. Disable active content and external image/tracking loads unless specifically necessary and permitted.
- Apply separate environment identities, dependency pinning, security updates, migration reviews and tested rollback procedures.

## Data use and retention
The source registry governs whether raw pages, map content, messages, documents and derived attributes may be retained, displayed, sent to a model or exported. Store source references and permitted evidence rather than an unrestricted content warehouse. Google Places content has specific restrictions; place-ID storage is an exception, not a blanket allowance for all place data. Match map display and attribution to provider terms. [S13]

Define an owner-approved retention schedule before live data use. Redact unrelated personal/financial information and avoid collecting entire confidential documents when an excerpt answers the question. Include deletion propagation to exports/backups where applicable, subject to the approved retention and recovery policy. Never claim GDPR, SOC 2, or other compliance solely because these controls exist.

## Protected actions and emergency stop
No automatic offers, negotiations, fees, signatures, formal applications, phone calls, mailbox forwarding/settings changes, or disclosure of sensitive business records. Add a global outbound kill switch and per-source/contact/case pause controls. Revoking authorization must prevent unsent jobs from dispatching and create a clear operational alert.

Audit who approved each permission and policy version. A previously authorized factual inquiry is not indefinite authority for new kinds of action.



## Model data-handling review
Before sending real business correspondence or documents to Claude, document the selected product's retention, training-use settings, processing terms and authorized recipients. Do not assume privacy promises for a native Gmail connector automatically apply to copied text, uploaded files, Claude Code sessions or a separate model API. Redact and minimize input and obtain the owner's approval for the selected processing path.

When source rights or retention expiry require deleting evidence, preserve only the audit/reference metadata that may lawfully remain. Reassess any current claim that can no longer be substantiated through permitted evidence; deletion must not leave an unjustified verified badge.

## 15. Operations, reliability, and reporting

## Job reliability
Use durable job leases, heartbeats, bounded retries, exponential backoff with jitter, provider Retry-After handling and dead-letter queues. Avoid concurrent overlapping discovery runs for the same profile/source without explicit partitioning. Checkpoints and transactional writes must survive restarts.

Distinguish read retries from side-effect retries. Reads can usually retry safely; email/form ambiguity follows Sections 12 and 13. Replaying a job or webhook must not recreate an inquiry or silently change already-published assessments.

## Source and model health
Track successful/failed runs, completeness, page/cursor counts, response schema versions, unusually large count changes, missing fields, stale updates, authentication failures and quota/rate-limit events. A provider returning zero unexpectedly may require investigation rather than immediate mass withdrawal of all previous listings.

Model rate limits or unavailable supported Max execution must yield ANALYSIS_PENDING. Do not claim a report was evaluated by Claude if it was only produced by deterministic templates. Recovery resumes from saved state.

## Recommended service targets for owner approval
- Daily discovery should complete within two hours of the configured start for the agreed pilot footprint and quotas.
- Relevant reply processing should usually complete within 30 minutes, with an explicit alert if synchronization exceeds that target.
- Any missed daily run, failed authorization, uncertain outbound side effect or broken required source should appear in the operational view and alert the designated operator.
- Proposed recovery objectives: at most one hour of recoverable state loss and restoration within four hours, subject to selected infrastructure, budget and demonstrated restore testing.

These are design targets, not achieved SLAs. Track observed percentiles, exceptions and denominators. Provider delays and formal agency response times are outside the application's control.

## Tracker and daily report
Provide a map/list view with filters and a property/space detail page showing source evidence, rents and extra costs, permission/approval badges, open questions, inquiry history, contact role, next action and expiry. Map rendering must respect the selected provider's display and retention terms.

Report separately:
- New or materially changed qualified candidates.
- Conditional candidates requiring a team decision.
- Verification activity: questions sent, substantive answers, scheduled follow-ups and escalations.
- Withdrawals, rejections and stale evidence.
- Source coverage/health, incomplete scans and pending model analysis.

Only supported claims may enter the report. If nothing qualifies, say so and explain whether that reflects complete screening, missing sources or outstanding answers. Show the run/configuration version and evidence dates. Final delivery destination remains an owner decision.

## Costs
Separate Max subscription usage, model API usage if later approved, data licenses/API requests, hosting, storage, browser execution and email infrastructure. Report measured counts/costs where available and label estimates or UNAVAILABLE explicitly. Configure ceilings and stop conditions before metered integrations go live; never treat 'do not worry about budget' as permission to buy services or enable overages.

## 16. Test plan and quality measurement

No application has been implemented or tested by this specification. The following tests and acceptance evidence are required of the future build.

## Required automated and controlled tests
| Test group | Required scenarios and assertions |
| --- | --- |
| T01 Configuration | Null preferences, invalid ranges/units/zones, ambiguous geography, unapproved outbound settings; live jobs remain disabled when required settings are missing. |
| T02 Rent normalization | Monthly/annual totals; monthly/annual price per square foot; missing or whole-building area for a sublet; ranges crossing the cap; negotiable prices; fees versus base rent; currencies and decimal boundaries. UNKNOWN must not become zero or PASS. |
| T03 Identity | Same address with different suites/display allocations; moved/renamed businesses; two brokers syndicating one offer; one broker with multiple spaces; reversible ambiguous merges and unit matching. |
| T04 Geography/jurisdiction | Boundary cases, uncertain geocodes, postal city different from governing authority, county/municipal/ETJ differences, straight-line versus drive-time rules. |
| T05 Evidence | Stale confirmations, missing effective dates, duplicated syndicated evidence, conflicting rent/status, wrong respondent authority, prior-tenant permit, expired/conditional approval, changed use/layout. |
| T06 Source intake | Pagination, caps, partial scans, 401/403/429/5xx, Retry-After, schema changes, malformed records, missing fields, withdrawals and unexpected zero-result responses. No silent provider substitution. |
| T07 Case planning | Unknown facts create minimal appropriate inquiries; known failures do not generate pointless contact; undecided business preferences route to the team; no duplicate daily questions. |
| T08 Gmail dispatch | Policy rejection, wrong sender/recipient, opt-out, contact cap, concurrency, crash before send, timeout after possible acceptance, ambiguous reconciliation, bounce and duplicate worker delivery. No blind resend. |
| T09 Gmail replies | Duplicated/out-of-order notifications, missed pushes, watch expiry, expired history cursor, revoked token, new-thread/forwarded/partial replies, auto-replies, human takeover and send/reply races. |
| T10 Forms | Successful receipt, generic 200 without confirmation, timeout after submission, changed fields/action domain, CAPTCHA/login/fee/attestation, duplicate email-plus-form inquiry and no-email receipt. |
| T11 Model/security | Invalid JSON, fabricated citations, unsupported claim promotion, prompt injection, recipient swapping, malicious attachments, SSRF, secret leakage, disallowed data export and unavailable model. |
| T12 Operations | Worker restart, overlapping runs, job replay, database migration rollback, backup restore, secret revocation, outbound kill switch, timezone/DST/holiday handling and breached spending limits. |
| T13 End-to-end | Offline discovery through answer ingestion to reassessment/report with deterministic fixtures; clean checkout/extraction rerun; live end-to-end tests only against explicitly approved accounts, sites and recipients. |

Tests must save machine-readable results and a human-readable report, not merely print success to the console. Include dependency/environment versions, fixture hashes, command used, date, failures and expected versus actual results.

## Evaluation hygiene
Separate development fixtures, calibration/validation cases and a locked acceptance set. Create the acceptance set independently of the implementer's tuning cases and include a meaningful proportion of ambiguous, shared-space, missing-data and negative examples. Mark a locked set consumed after use; do not tune on it and rebrand the same result as a fresh holdout.

Ground truth must come from original permitted records, competent authority evidence and dated manual review. If a fact cannot be adjudicated, label it unresolved and report the count rather than inventing truth or quietly dropping difficult cases.

## Metrics to report
- Per-field accuracy and missingness for rent/basis/space, availability, consent and relevant use/approval status.
- Precision of each shortlist status, with sample size, error types and 95% confidence intervals where statistically appropriate.
- Duplicate false-merge and missed-merge rates against labeled pairs.
- Defined-source benchmark coverage, not universal market recall.
- Evidence freshness and traceability rates by field/source.
- Appropriate-contact and answer-to-question matching accuracy; response rate separately, since it is not wholly under system control.
- Outbound policy violations, duplicate sends, ambiguous attempts, opt-outs honored and human-takeover conflicts.
- Run completion, source completeness, reconciliation delay, recovery results, model unavailability and measured-versus-estimated costs.

Label metric provenance: deterministic, manually adjudicated, model-graded, simulated, estimated or UNAVAILABLE. Do not report a safety-perfect model score merely because deterministic policy prevented execution; measure model bad proposals and dispatcher containment separately.

## Recommended acceptance thresholds, subject to owner approval
All deterministic mandatory tests must pass. Any unauthorized send, fabricated critical verified fact, cross-space evidence assignment or lost opt-out is release-blocking. Require complete evidence lineage for every critical claim in the audited shortlist and no critical false-verification errors in the acceptance sample. Propose at least 95% adjudicated correctness for critical extracted fields, with per-field denominators and confidence intervals reported; a small sample is not proof of a 95% population guarantee. The owner must approve sample design, size and statistical criteria before consuming the acceptance set.



## Concrete fixture expectations for implementation
The following are synthetic test specifications, not actual properties or executed tests. Assume an approved $1,000 monthly base-rent ceiling and no binding lower rent limit:

| Input fixture | Expected result |
| --- | --- |
| $9,600 annual total base rent | $800 monthly base rent; rent screen PASS |
| $12 per square foot per year for a confirmed 800-square-foot leased space | $800 monthly base rent; rent screen PASS |
| $1.25 per square foot per month for a confirmed 640-square-foot leased space | $800 monthly base rent; rent screen PASS |
| $12 per square foot per year, with only whole-building area known for an unspecified sublet | Normalized rent null; rent screen UNKNOWN; ask for exact leased area and quote |
| $900 base rent plus $175 in separately stated monthly charges | Base-rent screen PASS; known occupancy subtotal $1,075; do not label it all-in if other costs are unknown |
| Advertised range $900 to $1,100 for an unselected suite | Rent screen UNKNOWN; request the quote for the exact suite |
| $500 monthly base rent | Rent screen PASS under this proposed policy; not rejected solely for being below $600 |
| Same street address, different office/display allocations | Two spaces unless supporting evidence establishes they are the same offer |
| Broker says 'auto sales should be fine' without competent authority evidence | Land-use approval remains UNKNOWN; route an appropriate official inquiry |
| Gmail call times out after possible acceptance | SEND_UNCERTAIN; no automatic duplicate send |
| Database restored to before a known send or opt-out | Outbound paused until the recovery gap and suppressions are reconciled |
| Required approval expires after the report was generated | Current verified badge removed; historical report retained as an as-of snapshot |

Compute expected monetary values independently of the implementation under test. Save actual comparison results only after the future test runner executes them.

## 17. Phased implementation and approval gates

Each phase produces evidence and a go/no-go decision. No calendar estimate or readiness claim should be fabricated before source and account access are understood.

## Phase 0: access and policy qualification
**Deliver:** source register, pilot boundary, evidence/authority rules, exact sender, channel permissions, data/model-use rights, hosting/retention decision, selected Claude execution mode and approved cost/volume ceilings.

**Gate:** establish a viable permitted inventory path or document its failure honestly; verify shared/small-space coverage against a defined sample. Prove the supported Max integration path or obtain an explicit alternative decision. Do not proceed with an imaginary read API or assumed unattended-send permission.

## Phase 1: offline deterministic foundation
**Deliver:** typed configuration, domain schema/migrations, fixtures, normalization, identity resolution, tri-state assessments, case/outbox state machines, internal tracker and saved test reports.

**Gate:** T01-T07 and core security/operations tests pass offline. External network access and outbound actions are disabled. Fixture data is clearly labeled synthetic or licensed, never presented as discovered inventory.

## Phase 2: authorized read-only sourcing pilot
**Deliver:** approved source adapters, provenance, actual coverage analysis, legally retainable evidence, stale/withdrawal handling and source-health reporting.

**Gate:** source rights and exact geography approved; demonstrate real reads without sending inquiries or forms. Compare against independently assembled benchmarks. Keep unknowns and coverage gaps visible.

## Phase 3: shadow verification and model evaluation
**Deliver:** proposed contacts/questions, Gmail/form previews, policy decisions, simulated replies, model structured outputs and error analysis.

**Gate:** zero real external dispatch. Review genuine draft inquiries for relevance, identity, confidentiality and authority. Validate supported Claude behavior, prompt-injection containment, exact-space mapping and the locked evaluation protocol. Changing a draft is not proof that the same model would succeed unattended.

## Phase 4: capped, explicitly authorized live verification
**Deliver:** connected approved Gmail account, tested chosen official forms, real inquiry ledger, reply processing, controlled follow-ups, operator takeover and incident runbook.

**Gate:** owner approves the exact live mode, sender, recipient classes, templates, domains, caps, timing, retention and spend. Test send/read on approved test correspondents first, not arbitrary brokers. Start with an owner-approved small candidate set. Uncertain side effects and missing permissions pause the relevant channel.

## Phase 5: acceptance and limited operational release
**Deliver:** consumed locked-set report, live pilot findings, field-level metrics, failure/recovery evidence, backup restoration proof, security review, source contracts and operating handover.

**Gate:** agreed acceptance thresholds and critical failure criteria are met; unresolved gaps are explicitly accepted or block release. The owner signs off the operational scope. A successful pilot is not proof of coverage outside its geography/property type.

## Phase 6: ongoing quality control and expansion
Audit a fresh sample regularly, review drift and stale approvals, renew source rights and Gmail watches, test restoration and kill switches, and reassess permissions after changes. Expand geography or source/communication capabilities only through versioned review and a new appropriate coverage test. Repeated unanswered cases require a workflow decision, not more aggressive uncontrolled contact.

## 18. Claude Code handoff and required repository deliverables

## Future implementation handoff
Use the following as the opening brief only when the owner explicitly authorizes building:

> Build the dealership sourcing and proactive verification system specified in this document. Preserve the confirmed requirements and distinguish proposed defaults from approved policy. Begin with the access/decision register and an offline implementation plan. Do not connect accounts, make purchases, read live private mail, send messages, submit forms, create schedules, or deploy infrastructure until the relevant owner approval and phase gate are recorded. Never invent a provider endpoint or assume Max provides model API access. Use one maintainable application with deterministic rules, durable evidence and inquiry state, bounded Claude interpretation, and policy-controlled external actions. Treat every unknown, failure and unsupported capability honestly. Complete each phase's tests and saved evidence before recommending advancement.

## Implementation discipline
- Inspect the intended repository and ask if its identity is unknown. Do not overwrite or repurpose an existing project or database. Create new resources only after authorization.
- Keep the initial implementation small and direct. Add abstractions only where multiple verified adapters actually need them. No speculative agent swarm or generic platform build.
- Keep account credentials out of chat and source control. An example environment file must contain variable names and explanations, not realistic-looking secret values.
- Pin dependencies and provide reproducible setup. Mock all external side effects by default. A dry run must not accidentally send email or submit a form.
- Record actual costs and test results; do not claim execution from code inspection alone.

## Required deliverables from the future build
- README with setup, approved runtime choices, local/offline commands and current limitations.
- SPECIFICATION.md and DECISIONS.md with implemented versus deferred requirements.
- Versioned configuration schema and a non-live example profile reflecting the user's criteria.
- Database migrations, source adapters, assessment/case logic, communications policy and internal review interface.
- Source/access/retention register and permissions matrix.
- Unit, integration, security, failure-injection and end-to-end tests, plus separate acceptance fixtures under the agreed access policy.
- Saved TEST_RESULTS, SECURITY_FINDINGS, COST_LOG, RISKS and PROJECT_STATUS records.
- Runbook for missed jobs, source changes, authorization failure, Gmail history recovery, uncertain sends/forms, human takeover, backup restore and emergency pause.
- A reproducible export/archive after implementation containing code, permitted fixtures, configuration examples and saved outputs. Exclude secrets, private mailbox content and licensed data that cannot be redistributed; document retrieval prerequisites instead.

## Scope traceability
R01-R06 map to configuration, identity and screening sections and T01-T05. R07 maps to scheduling/operations and T06/T12. R08-R09 map to sources, evidence, security and the acceptance metrics. R10-R11 map to cases, contact policy, Gmail/forms and T07-T11. R12 maps to the Claude execution gate and model-failure tests. R13 governs this document and the pre-build/live approval gates.

## Status of this specification's checks
This is an author-reviewed design, not an executed implementation. Official documentation was consulted for key source and platform claims. Independent review attempts returned no usable review output, so no independent-review pass is claimed. No application test suite, OAuth flow, source connectivity, live send, form submission or deployment has been run. Any subsequent document consistency checks validate the specification artifact only.

## 19. References and source interpretation notes

Public-source findings were reviewed during planning on September 14, 2026. Recheck product documentation, statutes, local rules and contractual terms at implementation time. Product documentation establishes a documented capability, not the user's account access or an achieved service level.

- **[S01] RESO Web API:** https://www.reso.org/reso-web-api/ . Standards and MLS/data-owner access requirements; not a universal inventory feed.
- **[S02] Crexi Listing API Overview:** https://learn.crexi.com/listing-api-overview-crexi-help-center . Documented one-way publishing for qualifying partners, not proof of rental read access.
- **[S03] LightBox API catalog:** https://developer.lightboxre.com/apis/catalog . Property/address/assessment/sales products; current lease availability is not established by that catalog.
- **[S04] NC G.S. 20-286:** https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_20/GS_20-286.html . Established-salesroom definition and conditional shared-building provision; read live in the browser during planning.
- **[S05] NC State Highway Patrol Investigative Services Unit:** https://www.ncshp.gov/investigative-services-unit . Current official dealer-enforcement and service resources; no individual license or premises approval was verified.
- **[S06] Raleigh Auto Dealer permits:** https://raleighnc.gov/permits/services/auto-dealer . Local illustration only; not an Eastern NC-wide rule or selected pilot jurisdiction. A later planning fetch failed, so recheck the page before relying on its details.
- **[S07] Raleigh Change of Use:** https://raleighnc.gov/permits/services/change-use . Local illustration of the distinction between use and occupancy; recheck applicable jurisdiction-specific rules.
- **[S08] NCDOT Traffic Survey GIS Data:** https://connect.ncdot.gov/resources/State-Mapping/Pages/Traffic-Survey-GIS-Data.aspx . Official annual traffic downloads and archives; not real-time customer demand.
- **[S09] Census ACS 2024 five-year API examples:** https://api.census.gov/data/2024/acs/acs5/examples.html . Documented geography queries; preserve vintage, variable definitions and margins of error.
- **[S10] FEMA Flood Map Services:** https://hazards.fema.gov/femaportal/resources/flood_map_svc.htm . Documented flood-service interfaces and coverage context; effective and preliminary records must remain distinct.
- **[S11] NC DEQ Underground Storage Tank Databases and Reports:** https://www.deq.nc.gov/about/divisions/waste-management/underground-storage-tanks-section/underground-storage-tank-databases-and-reports . Tank/facility/incident resources, not a clean-site guarantee.
- **[S12] Google Places details:** https://developers.google.com/maps/documentation/places/web-service/place-details . Place fields and business status, not a commercial lease inventory.
- **[S13] Google Places policies:** https://developers.google.com/maps/documentation/places/web-service/policies . Storage, caching and attribution constraints, including place-ID exception.
- **[S14] NC OneMap standardized parcels:** https://www.nconemap.gov/datasets/nc-onemap-parcels-with-statewide-standardized-attributes . Supporting statewide parcel data.
- **[S15] NC parcel transformation dates:** https://services.nconemap.gov/secure/rest/services/NC1Map_Parcels_Transform_Dates/MapServer . County processing dates, not lease/availability confirmation dates.
- **[S16] Claude Code routines:** https://code.claude.com/docs/en/routines . Research-preview status, supported plans, cloud execution and subscription/run limits.
- **[S17] Cowork across web, desktop and mobile:** https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile . Cloud scheduling and remaining local-resource dependencies.
- **[S18] Claude subscription versus API billing:** https://support.claude.com/en/articles/9876003-i-have-a-paid-claude-subscription-pro-max-team-or-enterprise-plans-why-do-i-have-to-pay-separately-to-use-the-claude-api-and-console . Separate products and billing.
- **[S19] Claude Google Workspace connectors:** https://support.claude.com/en/articles/10166901-use-google-workspace-connectors . Sending approvals, plan-specific controls, and Gmail attachment-content limitation.
- **[S20] Gmail create/send guide:** https://developers.google.com/workspace/gmail/api/guides/sending . Sending and reply MIME requirements.
- **[S21] Gmail users.messages.send reference:** https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/send . Request/response and scope contract; do not infer a general exactly-once/idempotency guarantee.
- **[S22] Gmail API scopes:** https://developers.google.com/workspace/gmail/api/auth/scopes . Sensitive/restricted scopes and least-privilege guidance.
- **[S23] Google restricted-scope verification:** https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification . Verification/security assessment requirements and exceptions must be evaluated for the actual deployment.
- **[S24] Gmail push notifications:** https://developers.google.com/workspace/gmail/api/guides/push . Watch renewal, notifications and documented delivery limitations.
- **[S25] Gmail synchronization:** https://developers.google.com/workspace/gmail/api/guides/sync . History-based synchronization and recovery when history is unavailable.

No source listed here has been purchased, connected or tested against a live dealership candidate by this specification. No claim of complete Eastern NC listing coverage, confirmed rent, site approval, quantified accuracy or production readiness is made.
