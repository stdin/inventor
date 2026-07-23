---
name: inventor-card
description: Use when normalizing a raw feature or invention idea into a rigorous invention card with algorithm, prior art, novelty-attack, and disposition fields — and rejecting cards that are only buzzwords, before prior-art search or diligence begins.
---

# Inventor: Invention Cards

Every candidate that survives `$inventor-whitespace` gets normalized into the same template before anyone searches prior art or runs the legal gates. The template forces specificity early, which is cheaper than discovering the idea was never claim-shaped after a week of searching.

## The template

Use `docs/cards/0000-template.md` as the starting point. Create a new numbered card with:

```
node scripts/record-card.js --candidate "Short name" --problem "..." --decision incubate
```

The full field set:

- **Candidate** — short name.
- **Human contributors and claimed contribution** — leave blank until the human invention workshop (`$inventor-disposition`); never pre-fill with AI-suggested names.
- **Technical problem** — the specific failure or gap, referencing the archaeology/whitespace step that surfaced it.
- **Existing project baseline** — what the codebase does today (from the capability matrix).
- **Functionality currently absent** — the delta between baseline and candidate.
- **Persistent state / data structures** — what's stored, in what shape.
- **Exact algorithm or state transitions** — the mechanism, spelled out.
- **Failure behavior** — what happens when this mechanism itself fails.
- **Measured technical effect** — the concrete, ideally measurable improvement.
- **Alternative embodiments** — other ways to implement the same mechanism.
- **Potential independent-claim elements** — the pieces that would need to appear together in a claim.
- **Nearest patent art** / **Nearest non-patent art** — filled in by `$inventor-search`.
- **Single-reference novelty attack** / **Multi-reference obviousness attack** — filled in by `$inventor-gate`.
- **Eligibility risk** / **Enablement gaps** / **Active-claim/FTO risk** — filled in by `$inventor-gate`.
- **Design-around** — an alternative that avoids a blocking claim, if one exists.
- **Public-disclosure history** — cross-reference `docs/disclosures.md`.
- **Decision** — the disposition from `$inventor-disposition`.

## Reject on sight

A candidate that can only be expressed as one of these is not a card yet — it's an outcome wearing a costume:

- "Use AI to ___"
- "Apply policy to ___"
- "Generate a score for ___"
- "Use a blockchain to ___"
- "Sign a receipt for ___"
- "Store evidence of ___"

Send it back to `$inventor-whitespace` to find the actual state machine, data structure, or algorithm underneath the phrase — or log it directly to `docs/rejected-candidates.md` if none emerges.

## Discipline while filling the card

- Fill every field you can from what you already know before starting a search — an honest "unknown" is more useful than a guess dressed up as fact.
- Keep "Human contributors" empty until the workshop in `$inventor-disposition`. A card is a diligence artifact, not an inventorship claim.
- If a card can't state persistent state/data structures *and* an exact algorithm, it isn't ready for `$inventor-search` yet — it will waste a search cycle.

Hand the filled card to `$inventor-search` next.
