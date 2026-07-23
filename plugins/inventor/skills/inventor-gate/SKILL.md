---
name: inventor-gate
description: Use when building patentability and freedom-to-operate (FTO) claim charts for an invention card and running it through the §101/§102/§103/§112, FTO, detectability, strategic-value, and license-strategy gates before deciding what to do with it.
---

# Inventor: Claim Charts and Hard Gates

Once `$inventor-search` has attached prior art to a card, build two different charts and run the candidate through every gate. A candidate advances only if it survives all of them — partial credit doesn't count, because each gate independently kills the same downstream cost (a rejected application, an invalidated patent, or an infringement suit).

## Two different charts

**Patentability chart** — every relevant reference, including expired patents, abandoned applications, and non-patent literature. Its job is to find the strongest attack on novelty and obviousness, not to flatter the candidate.

**FTO chart** — a different exercise. For each planned product step or component, chart it against each limitation of every *relevant live claim*, noting:

- Jurisdiction.
- Expected expiration.
- Family/continuation status.
- Literal-infringement concerns and doctrine-of-equivalents concerns.
- An available design-around, if one exists.

Only live claims matter for FTO. Expired and abandoned references matter for patentability but not for FTO — keep the two charts and the two questions separate.

## The gates

A candidate only advances past this skill if it survives all of:

| Gate | Standard |
| --- | --- |
| §101 eligibility | A specific improvement to computing or another technical field, not generic information analysis (MPEP §2106). |
| §102 novelty | No single reference discloses every required element arranged as claimed (MPEP §2131). |
| §103 nonobviousness | The distinction is more than a predictable combination of known parts — construct the best two- or three-reference combination an examiner or competitor could make (MPEP §2141). |
| §112 disclosure | The team can teach the full scope without undue experimentation (MPEP §2164). |
| FTO | Live claims are avoided, expired, invalidated, or licensed. |
| Detectability | Infringement could realistically be observed or proved — an unobservable violation is not enforceable in practice. |
| Strategic value | Exclusivity would justify the filing and prosecution expense given the stated goal in `.inventor.json`. |
| License strategy | The planned distribution model does not neutralize the exclusivity you want (see below). |

## License strategy is a gate, not a footnote

Check the repository's own license before assuming a patent gives you exclusivity. A permissive license's built-in patent grant (e.g. Apache-2.0 §3) typically licenses only claims a contributor's own contribution necessarily infringes, alone or combined with the work it was contributed to — that makes such patents more naturally useful for defense, cross-licensing, or non-contributed enterprise embodiments than for blocking users of the contributed open-source implementation itself. If the codebase under analysis ships the candidate mechanism as part of an OSS contribution under such a license, name that constraint explicitly in the gate output rather than assuming the patent will let you exclude downstream users of your own code.

## Recording the outcome

For each gate, record on the card:

- Pass/fail and the one-line reasoning.
- For any fail: is this fatal, or does it point to a design-around?
- The nearest single-reference and multi-reference attacks used for §102/§103, so a future re-check can see exactly what was tried.

Hand the card, gate results, and both charts to `$inventor-disposition` for the final call.
