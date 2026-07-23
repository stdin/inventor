---
name: inventor
description: Use when inventing new features or products for a codebase — not incremental backlog items, but things that genuinely haven't existed before. Uses patent and prior-art search as a diligence input to both spark ideas and test real novelty against the wider landscape, not just this one codebase.
---

# Inventor

Default action: **invent something that hasn't existed before.** Not "what's next on the backlog" — what would be genuinely new, tested against your own codebase *and* the wider landscape of what's already been built, patented, or published elsewhere. Patent search is a core ideation input here, not a legal formality: it's where a lot of the best raw material for "nobody's done this yet" actually lives.

## Invent

1. **Archaeology** (`$inventor-archaeology`) — build a capability matrix of what this codebase already does: exists, partially exists, or is absent, mapped to mechanisms rather than feature names. This kills the "already shipped under a different name" trap before it wastes anyone's time.
2. **Whitespace from failure** (`$inventor-whitespace`) — challenge the guarantees the surviving area makes with the failure lenses below, and turn what breaks into concrete candidate mechanisms.
3. **Patent-informed novelty search** — for every promising candidate, search patents and technical literature around the underlying problem and mechanism, not just the feature name. This does two jobs:
   - **Inspiration.** Patents are full of specific, well-worked mechanisms for adjacent problems. Borrow and recombine — a technique from an unrelated domain applied here is often exactly what "hasn't existed before" looks like in practice.
   - **A real novelty test.** Search element-by-element, not the whole idea as one phrase — most matches hide in a specific mechanism (a data structure, a verification step, a retry strategy), not the headline. If nothing close turns up, that's a strong candidate. If something close exists, either push the idea further until it's a real departure, or note plainly what it resembles and build it anyway because it's good — just don't call it new.
4. **Push past incremental.** The first version of an idea is usually a small, safe tweak. Before finalizing a candidate, ask what it would look like if you combined it with another candidate, generalized it beyond the one case that inspired it, or took the mechanism to its logical extreme. An "invention" that only clears the bar of "mildly useful and nobody happened to build it" is a weak one — keep pushing until it would surprise someone who knows this space well.
5. **Sanity-check**: every finalist must name a technical state machine, data representation, or algorithm — not just a desirable outcome. "Use AI to," "apply policy," "generate a score," "use a blockchain," "sign a receipt," and "store evidence" name outcomes, not mechanisms; push past the phrase or drop the idea.

The deliverable: a short list of genuinely new feature or product ideas, each with its mechanism, why the codebase doesn't already cover it, and a one-line novelty read from step 3 (looks fresh and here's what it's adjacent to / resembles known art and here's what, so build it for the value not the novelty).

## Before You Commit

For the rare candidate that came back looking genuinely novel and worth pursuing seriously: **loop in an actual person**, and counsel if filing a patent is a real possibility. A search pass here is diligence-*flavored* — it sparks and stress-tests ideas — but it is not freedom-to-operate analysis and does not clear anything for filing. **Only a natural person can legally be listed as a patent inventor.** Nothing in this skill is legal advice, and an AI conversation should never be the entire record for something you might actually file on.

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
| Publicly disclosed | Described in a commit, issue, demo, doc, or talk. |
| Private/confidential | Exists but has never left the org. |

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Stopping at the first idea that clears "mildly useful" | Push it further — combine, generalize, or escalate until it would surprise someone who knows the space. |
| Pitching an outcome ("detect fraud better") as an invention | Push until it names a state machine, data structure, or algorithm; drop it if it can't. |
| Searching only the whole idea as one phrase | Search the underlying mechanism and its elements — most real matches hide there, not in the headline concept. |
| Treating a clean search as legal clearance | A diligence-flavored pass sparks and tests ideas; it isn't freedom-to-operate. Loop in a human before filing or making public claims. |
| Naming the AI as inventor on anything real | Only a natural person can legally be an inventor — a human has to actually own the conception. |
