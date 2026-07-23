---
name: inventor-whitespace
description: Use when generating candidate feature or invention ideas from a codebase's failure modes and unstated guarantees — turning "what could go wrong" into mechanism-shaped technical candidates, after product archaeology and before patent-informed novelty search.
---

# Inventor: Whitespace From Failure

Feature whitespace rarely comes from asking "what would be nice." It comes from asking what happens when a guarantee the product makes actually breaks. This is step 2 of `$inventor`, run after `$inventor-archaeology` has produced a capability matrix of the guarantees the system currently makes.

## The failure lenses

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

Walk every "exists" and "partially exists" row of the capability matrix through every lens that plausibly applies. Most rows will survive most lenses unscathed — that's expected. The candidates worth carrying forward are the ones where the answer is "the system doesn't actually handle that today, and handling it requires new state or a new algorithm."

## The bar for a real candidate

A candidate is not ready merely because it names a desirable outcome. It must specify, at least in sketch form:

- A **technical state machine** (states, transitions, triggers), or
- A **data representation** (what's stored, in what shape, with what invariants), or
- An **algorithm** (concrete steps, not "detect anomalies better").

If the best you can say is "use AI to catch this," "apply a policy," "generate a score," "use a blockchain," "sign a receipt," or "store evidence," it is not a candidate yet — those name outcomes, not mechanisms. Push further: *what* state machine, *what* data structure, *what* algorithm would actually produce that outcome? If nothing more specific emerges, drop it.

## Output

For each surviving candidate, capture in a sentence or two:

- Which guarantee it stresses and which lens broke it.
- The specific mechanism (state machine / data structure / algorithm) being proposed.
- Which capability-matrix row it extends, replaces, or newly covers.

Hand each surviving candidate to the patent-informed novelty search step of `$inventor` — that's where inspiration from adjacent problem spaces and a real novelty check happen, before anything is finalized as "invented."
