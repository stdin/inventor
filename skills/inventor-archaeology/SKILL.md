---
name: inventor-archaeology
description: Use when building a capability matrix for a codebase before ideating features or searching prior art — cataloguing what exists, partially exists, is absent, or is already publicly disclosed, mapped to underlying mechanisms rather than feature names.
---

# Inventor: Product Archaeology

Before anyone can claim something is a new invention, establish what the codebase already does — precisely, and in mechanism terms, not marketing terms. This is step 1 of `$inventor` and exists to catch self-prior-art before it gets pitched as a future feature.

## What to inspect

- Source code and architecture (services, data flow, trust boundaries).
- Tests (they encode the guarantees the team actually believes it ships).
- Documentation, READMEs, ADRs/decision records.
- Release notes, changelogs, and version history.
- Public roadmap, issues, and discussions — these are disclosures, not just plans.

## Map mechanisms, not names

A feature name ("smart retry") hides the mechanism. Extract instead:

- **Stored state** — what persists, where, and in what shape?
- **Trust boundaries** — what crosses a boundary, and what's verified there?
- **Transaction boundaries** — what's atomic, and what can partially fail?
- **Retry behavior** — idempotency, backoff, dedup keys, at-least/exactly-once.
- **Enforcement points** — where is a rule actually checked, vs. merely documented?
- **Protocols** — the wire format and state machine, not just "uses gRPC."
- **Failure states** — what state does the system land in in the sad path, and can it get stuck there?

## Build the capability matrix

For each candidate area of functionality, classify it:

| State | Meaning |
| --- | --- |
| Exists | Shipped and observable in the current codebase. |
| Partially exists | A related mechanism exists but doesn't cover the full scope of a later candidate. |
| Absent | Nothing in the codebase does this today. |
| Publicly disclosed | Described in a commit, issue, demo, doc, or talk — counts as prior art against your own future filing. |
| Private/confidential | Exists but has never left the org — still eligible for a later filing if disclosure stays controlled. |

Use `docs/capability-matrix-template.md` as the working table. Every row should name a mechanism, not a feature — "optimistic-lock retry with vector-clock conflict detection on the order-state transaction," not "better checkout."

## Why this matters before anything else

- It stops the team from "inventing" something that already shipped eighteen months ago under a different name.
- It surfaces which mechanisms are already publicly disclosed — meaning the clock on your own filing rights may already be running.
- It gives `$inventor-whitespace` real guarantees to interrogate, instead of guessing at what the system promises.

Hand the finished capability matrix to `$inventor-whitespace` next.
