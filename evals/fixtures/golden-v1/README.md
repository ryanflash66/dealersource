# golden-v1

Sample fixture set matching spec section 14.3, with `expected.json` describing
what a correct pipeline produces for `--run-date 2026-09-16`. The evaluator
uses a **different** set with the same shape; solutions must not hard-code
anything from here.

| Parcel | Scenario | Expected |
|---|---|---|
| PITT-0001 | Three listings from three sources, same parcel. Rent stated, zoning permitted with citation, zone X. Best on every ranking metric. | Dedupe to one site. Viable, rank 1. |
| PITT-0002 | Rent missing, zoning unknown. Landlord and planner both reply same day. | Two inquiries sent. Both gates pass from replies. Viable, rank 2. |
| PITT-0003 | Rent 1400. | Rent gate fails. No outreach. |
| BEAU-0004 | Zoning prohibited by official table. | Zoning gate fails. No outreach. |
| PITT-0005 | FEMA zone AE. | Flood gate fails. No outreach. |
| PITT-0006 | Shared lot, everything else passes. | Viable but ranked last. |
| WAYN-0007 | 78 minute drive. | Out of search area. Not scored, no outreach. |
| PITT-0008 | Zoning unknown, no reply. | Zoning inquiry sent, gate pending, not viable. |

Ranking is robust to weights: PITT-0001 beats PITT-0002 on every metric, and
the shared-lot rule pins PITT-0006 last.

Second run with the same `--out` and `--run-date` must send nothing.
