---
name: inventor
description: Use when ideating new features for a codebase via patent-informed whitespace analysis, running a collision-diligence pass before building or filing on an idea, or orchestrating the full product-archaeology-to-disposition invention pipeline end to end.
---

# Inventor

Turn "what could we build next" into claim-shaped, diligenced invention candidates — not a list of desirable outcomes. A candidate is not ready merely because it names something users would like; it must specify a technical state machine, data representation, or algorithm.

## Read the boundary first

Before ideating, read `.inventor.json` (see `docs/cards/README.md` for the schema) for:

- **Target jurisdictions** and **search cutoff date**.
- **Owners, employment, and assignment obligations** — who actually holds the IP rights.
- **Repository and dependency licenses** — a permissive license's patent grant can neutralize the exclusivity you're trying to build (see Safety Boundaries).
- **Disclosure history** — every public disclosure, sale, demo, issue, commit, and presentation, logged in `docs/disclosures.md`.
- **The goal**: offensive protection, defensive leverage, fundraising, licensing, or publication. The goal changes which disposition is correct later.

Keep three questions separate throughout the whole pipeline:

| Question | Asks |
| --- | --- |
| Patentability | Could useful claims be obtained over all applicable prior art? |
| Validity | Would those claims likely survive later attack? |
| FTO (freedom-to-operate) | Would the planned implementation infringe an active claim in a relevant jurisdiction? |

A patent is a right to exclude, not an affirmative right to practice the invention (this is the USPTO's own framing — do not conflate "we could patent this" with "we are clear to build this").

## The Pipeline

Each stage has a dedicated skill for standalone use; run them in sequence for a full pass.

1. **Product archaeology** (`$inventor-archaeology`) — inspect source, architecture, tests, docs, releases, and roadmap. Build a capability matrix: exists / partially exists / absent / publicly disclosed / private, mapped to *mechanisms* (stored state, trust boundaries, transaction boundaries, retry behavior, enforcement points, protocols, failure states) rather than marketing names. This step exists to catch self-prior-art before it gets pitched as a future invention.
2. **Whitespace from failure** (`$inventor-whitespace`) — challenge every product guarantee with the failure lenses below and turn survivors into claim-shaped candidates.
3. **Normalize into an invention card** (`$inventor-card`) — every candidate gets the full template in `docs/cards/0000-template.md`. Cards expressible only as "use AI to," "apply policy," "generate a score," "use a blockchain," "sign a receipt," or "store evidence" are rejected on sight — those name outcomes, not mechanisms.
4. **Search in widening rings** (`$inventor-search`) — exact phrases, element synonyms, element pairs, problem/effect terms, CPC/IPC classes, assignees/inventors, citations, families, and non-patent literature.
5. **Build claim charts and run the hard gates** (`$inventor-gate`) — a patentability chart and an FTO chart, then §101/§102/§103/§112, FTO, detectability, strategic value, and license strategy.
6. **Assign a disposition** (`$inventor-disposition`) — prototype-then-provisional, incubate, trade secret, defensive publication, implement without filing, or reject — plus the human-inventorship safeguard, filing timeline, and refresh-search cadence.

## Failure Lenses (for step 2)

For each product guarantee, ask what happens under:

| Lens | Question |
| --- | --- |
| Common-mode failure | What breaks every replica/instance at once? |
| Version skew / rolling migration | What happens mid-upgrade, with old and new code live together? |
| Concurrent actors | What happens when two actors race on the same state? |
| Stale sessions or stale evidence | What happens when cached proof outlives the fact it attested to? |
| Retry after an ambiguous external effect | Did the side effect happen or not — and what does retrying do? |
| Revocation after delegation | What happens to work already delegated when the grant is revoked? |
| Second-tenant interleaving | What leaks or corrupts when two tenants' operations interleave? |
| Privacy loss during fallback | What does the degraded path expose that the happy path didn't? |
| Inability to compensate | If you can't undo the effect, what's the compensating mechanism? |
| Hidden or undeclared proof inputs | What is the system trusting that it never asked to verify? |

## Capability Classification (for step 1)

| State | Meaning |
| --- | --- |
| Exists | Shipped and observable in the current codebase. |
| Partially exists | A related mechanism exists but doesn't cover the candidate's full scope. |
| Absent | Nothing in the codebase does this today. |
| Publicly disclosed | Described in a commit, issue, demo, doc, or talk — counts as prior art against your own future filing. |
| Private/confidential | Exists but has never left the org — still eligible for a later filing if disclosure is controlled from here. |

## Safety Boundaries

- **This is not legal advice.** Counsel makes the final patentability, validity, FTO, and inventorship determinations — this skill produces the diligence record counsel reviews, not a substitute for review.
- **Only natural persons can be inventors.** AI may assist, but conception requires a specific, settled, complete operative solution, not a research goal (USPTO's 2025 AI-assisted inventorship guidance; *Thaler v. Vidal*). Never write a person's name onto an AI-drafted card. Every surviving candidate must go through a human invention workshop before anyone is named an inventor.
- **License strategy is part of FTO, not an afterthought.** A permissive license's built-in patent grant (e.g. Apache-2.0 §3) typically licenses only claims necessarily infringed by *the contributed work itself* — it is a weaker tool for excluding others than for defense, cross-licensing, or embodiments you did not contribute upstream. Check what the repo's own license already grants away before assuming a patent will let you exclude users of your own open-source implementation.
- **Pre-filing disclosure is often irreversible.** It can destroy foreign filing rights even where a domestic grace period exists (EPC Article 54 treats anything public before filing as prior art). Prototype privately; log every disclosure in `docs/disclosures.md` the moment it happens, not after the fact.
- **A "clear" search goes stale invisibly.** Most U.S. nonprovisional applications are unpublished for about 18 months (MPEP §1120). Refresh the search on the cadence in `$inventor-disposition`, not just once.

## Output

For every candidate that survives to a disposition, the durable artifacts are:

- One invention card in `docs/cards/NNNN-slug.md` (via `node scripts/record-card.js`).
- An entry in `docs/rejected-candidates.md` if it was rejected, so the concept isn't rediscovered and re-litigated later.
- A capability-matrix note in the relevant `docs/capability-matrix-template.md`-derived doc, if archaeology surfaced self-prior-art worth remembering.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Pitching an outcome ("detect fraud better") as an invention | Push until it names a state machine, data structure, or algorithm; reject it if it can't. |
| Searching only the whole idea as one phrase | Search element pairs and synonyms too — most collisions hide at the element level, not the headline. |
| Reading only titles and abstracts | Read independent claims; that's where the actual scope lives. |
| Treating "we found no patent" as "we're clear to build" | Patentability and FTO are different questions; check both, and check non-patent art too. |
| Naming an inventor before the human workshop | Conception requires a human's specific, settled, complete solution — do the workshop first. |
| Filing before checking the repo's own license | A permissive license's patent grant can already give away what you're trying to protect. |
| Searching once and moving on | Refresh before each filing deadline, before launch, after material implementation changes, and periodically while applications are pending. |
| Skipping the rejected-candidate log | The same idea gets re-pitched in six months without it. |
