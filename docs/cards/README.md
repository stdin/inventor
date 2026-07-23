# Invention Cards

This is the durable diligence record for every candidate that comes out of `$inventor-whitespace`. It exists so that the reasoning behind a "build it," "file on it," or "reject it" call survives past the conversation that produced it — and so a rejected concept doesn't get re-pitched from scratch six months later.

- Each record is `NNNN-slug.md`, numbered in order.
- `0000-template.md` is the template — see `$inventor-card` for how to fill each field.
- Create one with `node scripts/record-card.js --candidate "..." --problem "..." --decision <bucket>`, or by hand.
- Close the loop with `npm run refresh`: it scans every card's `Refresh by:` and `Filing deadline:` dates and reports which ones are due for another prior-art pass. Most U.S. nonprovisional applications stay unpublished for around 18 months, so a card that was clear at filing can go stale invisibly if nobody re-checks it.
- Rejected candidates do not get deleted — they get a disposition of `reject` on the card and a line in `../rejected-candidates.md` so the concept is findable later.

## Pipeline

This card is the artifact of the **opt-in diligence safeguard**, not of default ideation. `$inventor`'s default action is just "invent a new feature for this codebase" via `$inventor-archaeology` (capability matrix) → `$inventor-whitespace` (candidates) — no card required. Only when a candidate is worth checking before you build on it or before anyone considers filing does it move into: `$inventor-card` (this template) → `$inventor-search` (prior art) → `$inventor-gate` (claim charts + §101/§102/§103/§112/FTO gates) → `$inventor-disposition` (final call + human inventorship workshop + filing timeline).

## Project boundary (`.inventor.json`)

Every card is diligenced against the boundary declared in the project's `.inventor.json` at the repo root:

| Field | Meaning |
| --- | --- |
| `alwaysOn` | Defaults to `false`. When `true`, the SessionStart hook injects the pipeline into every agent session (opt-in); otherwise it's invoked on demand via the `$inventor` skills and the hook produces no output. |
| `jurisdictions` | Target jurisdictions for patentability/FTO analysis (e.g. `["US", "EP"]`). |
| `searchCutoffDate` | The date prior-art searches should be treated as current through. |
| `goal` | `offensive`, `defensive`, `fundraising`, `licensing`, or `publication` — shapes which disposition is correct. |
| `owners` | Who holds the IP rights (people/orgs), for the inventorship and assignment check. |
| `assignmentObligations` | Notes on employment/assignment agreements relevant to inventorship. |
| `repositoryLicense` / `dependencyLicensePolicy` | What the repo already grants away — checked in `$inventor-gate`'s license-strategy gate. |
| `disclosureLog` | Path to the running public-disclosure log (defaults to `docs/disclosures.md`). |
| `counsel` | Contact info for the counsel who makes the final call. |
| `priorities` / `excludedDomains` / `notes` | Project-specific tuning, injected alongside the rule whenever the pipeline runs (every session if `alwaysOn` is set, on demand otherwise). |

See `.inventor.json` at the repo root for this project's own (dogfooded) configuration, and `bin/inventor.js init` for scaffolding one into a new repo.
