---
name: inventor-disposition
description: Use when deciding what happens next to an invention card that has been through the gates — prototype-then-file, incubate, trade secret, defensive publication, implement without filing, or reject — including the human-inventorship workshop, filing-timeline sequencing, and refresh-search reminders.
---

# Inventor: Disposition, Inventorship, and Filing Timing

This is the last stage of the pipeline. Every card that reaches here gets one explicit disposition, and every disposition other than "reject" carries filing-timeline and refresh-search obligations that don't end when this skill finishes running.

## The disposition buckets

Every candidate ends in exactly one of:

| Disposition | When |
| --- | --- |
| Prototype, then provisional | Passed the gates; goal justifies filing; team can build an enabling prototype soon. |
| Incubate pending experimental evidence | Promising but the measured technical effect isn't proven yet — don't file on a hypothesis. |
| Trade secret | Passed patentability/novelty concerns but detectability is weak, or secrecy serves the stated goal better than exclusivity. |
| Defensive publication | Worth keeping out of competitors' hands but not worth the cost of prosecution — publish to create prior art against others. |
| Implement without filing | Real and useful, but strategic value doesn't clear filing/prosecution cost, or it fails a gate that isn't fixable by a design-around. |
| Reject | Failed a gate with no viable design-around, or turned out to be existing art / self-prior-art from `$inventor-archaeology`. |

**Log every rejected candidate** in `docs/rejected-candidates.md` — name, the technical problem it addressed, and why it was rejected. This is the single highest-leverage line item in the whole pipeline: without it, the same crowded concept gets re-pitched from scratch in six months.

Run `node scripts/record-card.js --candidate "..." --decision <bucket>` to stamp the final disposition on the card, and append to the rejected log by hand for anything rejected.

## The human-inventorship safeguard

AI may assist at every stage above, but only natural persons can be inventors, and conception requires a specific, settled, complete operative solution — not a research goal (this is current USPTO guidance on AI-assisted inventorship, and the holding in *Thaler v. Vidal*). Do not put anyone's name on a card as a contributor based on what an AI drafted.

Before anything is filed, incubated as IP, or published defensively under a person's name, run a **human invention workshop** in which the prospective inventors materially:

- Formulate and document the exact algorithm and state transitions themselves.
- Work through alternatives and boundary cases.
- Articulate why the combination is not routine.
- Review or produce the experimental design and results.
- Identify each person's individual claim-level contribution.

Counsel makes the final inventorship determination — this skill produces the record counsel reviews, not the determination itself.

## Prototype, then file, before disclosure

For anything dispositioned toward filing:

1. Build an enabling prototype privately — one that fills the §112 gaps identified in `$inventor-gate`: schemas, concurrency behavior, crash recovery, canonicalization, alternative embodiments, and test results.
2. File the provisional before any public disclosure. A U.S. provisional only preserves what it adequately describes.
3. The corresponding nonprovisional is normally due within 12 months of the provisional.
4. Pre-filing disclosure can destroy foreign filing rights even where a domestic grace period would otherwise apply (Europe treats anything publicly available before filing as prior art — EPC Article 54). Log every disclosure — demo, commit, issue, talk, sale — in `docs/disclosures.md` the moment it happens.

## Refresh the search — this does not end at disposition

Most U.S. nonprovisional applications stay unpublished for around 18 months (MPEP §1120), so a search that came back clear can go stale invisibly while a colliding application is still in the dark. Re-run `$inventor-search` for any card still active:

- Before filing the provisional.
- Before the nonprovisional/PCT deadline.
- Before launch.
- Whenever the implementation materially changes.
- Periodically for as long as an important application remains pending.

`node scripts/refresh-check.js` scans `docs/cards/*.md` for `- Refresh by:` and `- Filing deadline:` dates and reports which cards are due for another look — run it on a schedule, not just when someone remembers.
