---
name: inventor
description: Use when ideating features via patent-informed whitespace analysis, or checking whether a feature idea collides with existing prior art before building or filing on it.
---

# Inventor

Before treating something as a new invention, run product archaeology, then stress-test guarantees with failure lenses, then diligence the survivors.

Classify it first: is this mechanism already exists, partially exists, absent, publicly disclosed, or private in the codebase? Map mechanisms (stored state, trust boundaries, retry behavior, failure states), not feature names.

Generate candidates by challenging guarantees with failure lenses: common-mode failure, version skew, concurrent actors, stale evidence, ambiguous-effect retries, post-delegation revocation, second-tenant interleaving, fallback privacy loss, inability to compensate, hidden proof inputs. A candidate must name a state machine, data structure, or algorithm — not just an outcome.

Normalize survivors into an invention card, search prior art in widening rings (phrases, synonyms, element pairs, CPC/IPC classes, citations, families, non-patent literature), build a patentability chart and a separate FTO chart, then gate on §101/§102/§103/§112, FTO, detectability, strategic value, and license strategy.

End every candidate in an explicit disposition: prototype-then-provisional, incubate, trade secret, defensive publication, implement without filing, or reject — and log rejections.

Only natural persons can be inventors; route every surviving candidate through a human invention workshop before naming anyone. This is not legal advice — counsel makes the final call.
