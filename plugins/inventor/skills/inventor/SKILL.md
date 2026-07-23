---
name: inventor
description: Use when brainstorming or proposing new features for a codebase, grounding ideation in what's missing or failure-prone rather than wishful outcomes. Also runs an opt-in patent-diligence safeguard — prior-art search, claim charts, and legal gates — when a specific idea is worth checking before you build on it or consider filing.
---

# Inventor

Default action: **invent a new feature for this codebase.** Look at what's here, find where it's thin or breaks, and propose concrete feature ideas — each grounded in a real mechanism, not a wish. Patent diligence (prior-art search, claim charts, legal gates, disposition) is a **secondary, opt-in safeguard**, not a gate ordinary ideation has to pass through. Reach for it only when a specific candidate is worth checking before you build on it or before anyone considers filing.

## Default: Invent

1. **Quick archaeology** (`$inventor-archaeology`) — scoped to the relevant area; it doesn't need to cover the whole codebase for a fast ideation pass. Build a capability matrix of what already exists, partially exists, or is absent, mapped to mechanisms rather than feature names. This alone usually kills half of a naive idea list as "already shipped under a different name."
2. **Whitespace from failure** (`$inventor-whitespace`) — challenge the guarantees the surviving area makes with the failure lenses below, and turn what breaks into concrete candidates.
3. **Sanity-check each candidate**: it must name a technical state machine, data representation, or algorithm — not just a desirable outcome. "Use AI to," "apply policy," "generate a score," "use a blockchain," "sign a receipt," and "store evidence" name outcomes, not mechanisms; push past the phrase or drop the idea.

The deliverable for a default request is a short list — name, the mechanism, and why the codebase doesn't already cover it. No search, no claim charts, no legal gates, and no card file are required to answer "what should we build next."

## Opt-in: Diligence Safeguard

Reach for this only when a candidate is worth checking before you actually build on it or before anyone considers filing — not on every idea from the list above. It asks a different, heavier question: *is this safe, and is it worth protecting?*

1. `$inventor-card` — normalize the candidate into the full invention-card template so the diligence below has something durable to attach to.
2. `$inventor-search` — search patent and non-patent prior art in widening rings.
3. `$inventor-gate` — build patentability and FTO claim charts; run §101 eligibility, §102 novelty, §103 nonobviousness, §112 disclosure, FTO, detectability, strategic value, and license strategy.
4. `$inventor-disposition` — assign an explicit disposition (prototype-then-provisional, incubate, trade secret, defensive publication, implement without filing, or reject), run the human-inventorship safeguard, and set filing/refresh timing.

Read `.inventor.json` before starting this track: target jurisdictions, search cutoff date, ownership/employment/assignment obligations, repository and dependency licenses, disclosure history, and the goal (offensive protection, defensive leverage, fundraising, licensing, or publication) all shape the outcome. Keep three questions separate throughout:

| Question | Asks |
| --- | --- |
| Patentability | Could useful claims be obtained over all applicable prior art? |
| Validity | Would those claims likely survive later attack? |
| FTO (freedom-to-operate) | Would the planned implementation infringe an active claim in a relevant jurisdiction? |

A patent is a right to exclude, not an affirmative right to practice the invention — do not conflate "we could patent this" with "we are clear to build this."

## Failure Lenses (for step 2 of Invent)

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

## Capability Classification (for step 1 of Invent)

| State | Meaning |
| --- | --- |
| Exists | Shipped and observable in the current codebase. |
| Partially exists | A related mechanism exists but doesn't cover the candidate's full scope. |
| Absent | Nothing in the codebase does this today. |
| Publicly disclosed | Described in a commit, issue, demo, doc, or talk — counts as prior art against your own future filing. |
| Private/confidential | Exists but has never left the org — still eligible for a later filing if disclosure is controlled from here. |

## Safety Boundaries (apply once you're in the Safeguard track)

- **This is not legal advice.** Counsel makes the final patentability, validity, FTO, and inventorship determinations — the safeguard track produces the diligence record counsel reviews, not a substitute for review.
- **Only natural persons can be inventors.** AI may assist, but conception requires a specific, settled, complete operative solution, not a research goal (USPTO's 2025 AI-assisted inventorship guidance; *Thaler v. Vidal*). Never write a person's name onto an AI-drafted card. Every candidate that reaches a disposition must go through a human invention workshop before anyone is named an inventor.
- **License strategy is part of FTO, not an afterthought.** A permissive license's built-in patent grant (e.g. Apache-2.0 §3) typically licenses only claims necessarily infringed by *the contributed work itself* — it is a weaker tool for excluding others than for defense, cross-licensing, or embodiments you did not contribute upstream. Check what the repo's own license already grants away before assuming a patent will let you exclude users of your own open-source implementation.
- **Pre-filing disclosure is often irreversible.** It can destroy foreign filing rights even where a domestic grace period exists (EPC Article 54 treats anything public before filing as prior art). Prototype privately; log every disclosure in `docs/disclosures.md` the moment it happens, not after the fact.
- **A "clear" search goes stale invisibly.** Most U.S. nonprovisional applications are unpublished for about 18 months (MPEP §1120). Refresh the search on the cadence in `$inventor-disposition`, not just once.

## Output

- **Default (Invent):** a short list of feature candidates — name, mechanism, and why the codebase doesn't already cover it. No files required.
- **Opt-in (Safeguard):** one invention card per candidate pursued (`docs/cards/NNNN-slug.md`, via `node scripts/record-card.js`), a `docs/rejected-candidates.md` entry if rejected, and a capability-matrix note if archaeology surfaced self-prior-art worth remembering.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Running the full diligence safeguard on every casual feature idea | Diligence is opt-in — default to a quick, mechanism-grounded idea list; escalate to search/gates/disposition only when you intend to build seriously or file. |
| Pitching an outcome ("detect fraud better") as an invention | Push until it names a state machine, data structure, or algorithm; drop it if it can't. |
| Searching only the whole idea as one phrase | Search element pairs and synonyms too — most collisions hide at the element level, not the headline. |
| Reading only titles and abstracts | Read independent claims; that's where the actual scope lives. |
| Treating "we found no patent" as "we're clear to build" | Patentability and FTO are different questions; check both, and check non-patent art too. |
| Naming an inventor before the human workshop | Conception requires a human's specific, settled, complete solution — do the workshop first. |
| Filing before checking the repo's own license | A permissive license's patent grant can already give away what you're trying to protect. |
| Searching once and moving on | Refresh before each filing deadline, before launch, after material implementation changes, and periodically while applications are pending. |
| Skipping the rejected-candidate log | The same idea gets re-pitched in six months without it. |
