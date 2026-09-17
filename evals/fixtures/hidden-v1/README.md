# hidden-v1

The evaluator's own fixture set. Same shape as `golden-v1`, different data,
created after all agents had pushed their first complete builds. This is the
set the leaderboard is scored on. Run date `2026-09-17`.

| Parcel | Scenario | Expected |
|---|---|---|
| PITT-1101 | Two listings, two address spellings, one parcel. Rent 650, permitted with citation. Best on every metric. | One site. Viable, rank 1. |
| PITT-1103 | Zoning `conditional`. Planner reply same day confirms permitted. Rent 800. | Zoning inquiry sent. Viable, rank 2. |
| LEN-1102 | Rent exactly 1000 (upper bound, inclusive). Flood zone X with 10% area flagged, still X. | Viable, rank 3. |
| PITT-1109 | Shared lot. Highest traffic, closest, cheapest. | Viable but rank 4, after every standalone site. |
| PITT-1104 | Rent 1001 (one dollar over). | Rent gate fails. No outreach. |
| CRA-1105 | Zoning prohibited by official table. | Zoning gate fails. No outreach. |
| BEAU-1106 | FEMA zone VE. | Flood gate fails. No outreach. |
| GRE-1111 | FEMA zone A, no contact email. | Flood gate fails. No outreach. |
| ONS-1107 | 61 minute drive (one over). | Out of search area. Not scored, no outreach. |
| EDG-1108 | Zoning unknown. Planner reply dated the day *after* run date. | Zoning inquiry sent, gate pending, not viable. |
| WIL-1110 | Rent missing and zoning unknown. Same-day replies: rent 1200, zoning permitted. | Two inquiries. Zoning pass, rent **fail** from the reply. Not viable. |

Ranking among standalone viable sites is robust to weights: PITT-1101 beats
PITT-1103 beats LEN-1102 on every one of the five factors. Boundary cases
test inclusive bounds (rent 1000 passes, 1001 fails; 61 minutes is out).
