# Capability Matrix

Produced by `$inventor-archaeology`. One row per mechanism — not per feature name — covering source, architecture, tests, docs, releases, and roadmap.

| Mechanism | State | Where it lives | Notes |
| --- | --- | --- | --- |
| <e.g. optimistic-lock retry with vector-clock conflict detection on the order-state transaction> | Exists \| Partially exists \| Absent \| Publicly disclosed \| Private | <file/service/doc reference> | <anything relevant to novelty or self-prior-art> |

## State definitions

| State | Meaning |
| --- | --- |
| Exists | Shipped and observable in the current codebase. |
| Partially exists | A related mechanism exists but doesn't cover a later candidate's full scope. |
| Absent | Nothing in the codebase does this today. |
| Publicly disclosed | Described in a commit, issue, demo, doc, or talk — counts as prior art against your own future filing. Cross-reference `docs/disclosures.md`. |
| Private/confidential | Exists but has never left the org — still eligible for a later filing if disclosure stays controlled. |

Hand rows marked "Exists" or "Partially exists" to `$inventor-whitespace` as the guarantees to interrogate with the failure lenses.
