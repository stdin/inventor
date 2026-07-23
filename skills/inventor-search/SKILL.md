---
name: inventor-search
description: Use when searching patent and non-patent prior art for a specific invention card in widening rings — exact phrases, element synonyms, element pairs, CPC/IPC classes, citations, patent families, and non-patent literature — across USPTO, EPO, and WIPO sources.
---

# Inventor: Widening-Ring Search

A single search for "the whole idea" almost always misses the collision that actually matters, because most prior art discloses one or two of your claim elements under completely different vocabulary. Search in widening rings instead, for every claim-shaped candidate from `$inventor-card`.

## The rings, in order

1. **Exact phrases and title-like terms** — the obvious search; run it, but don't stop here.
2. **Synonyms for each essential element** — every claim element likely has 3–5 plausible names across different filers' vocabularies.
3. **Pairs of essential elements** — search combinations of two elements rather than the whole idea; this is where most real collisions surface.
4. **The problem and the technical effect** — search what the invention solves and what it measurably achieves, not just what it's called.
5. **CPC/IPC classifications** extracted from the best references found so far — then search *those classes* directly for anything the keyword search missed.
6. **Assignees, inventors, and citations** — pull the backward and forward citations of your best references; search the same assignees and inventors for adjacent filings.
7. **Family members** — expand every promising result into its continuations, divisionals, and foreign family members; a US-only search misses collisions that only exist in an EP or WO filing.
8. **Non-patent literature** — standards documents, conference papers, product documentation, and source repositories. A lot of real prior art was never patented at all.

## What to actually read

- **Independent claims**, not titles and abstracts. The abstract sells the invention; the independent claims define its actual legal scope.
- **Legal status and prosecution history** in the official register — an abandoned or expired reference can still defeat patentability, but it can't block FTO.

## Useful official tools

- USPTO Patent Public Search
- EPO Espacenet
- WIPO PATENTSCOPE

`node scripts/record-card.js` does not automate this search — patent search requires human judgment about vocabulary, classification, and claim scope that a keyword script cannot substitute for. Use the tools above directly, then fill the card by hand.

## Recording results

For every reference found, add it to the card under **Nearest patent art** or **Nearest non-patent art**, and note:

- Which claim element(s) it discloses.
- Whether it's live, expired, or abandoned (this matters for `$inventor-gate`'s §102/§103 analysis vs. its FTO analysis — they use different reference sets).
- Its family members, if any were found.

Hand the card, with references attached, to `$inventor-gate` next.
