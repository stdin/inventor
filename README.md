# Inventor

**Stop pitching outcomes as inventions — and stop building on top of someone else's active claim.**

Inventor is an always-on patent-whitespace and collision-diligence ruleset for AI coding agents. Before an agent (or a person) pitches a "new" feature, it has to run the feature through a pipeline:

> Is this actually absent from the codebase — or did we already ship it under a different name? Does it name a real mechanism, or just an outcome? Has someone else already claimed it? And if we build it, are we clear to ship it?

That sequence catches a specific, expensive mistake: treating a desirable outcome as an invention, then discovering — after pitching it to counsel, or worse, after filing — that it already exists in your own codebase, in the prior art, or as someone else's live claim.

Inventor does not tell you whether to file. It produces the diligence record a human and counsel need to make that call, and it will not let a candidate skip a step to get there faster.

## The problem it solves

Left alone, a fast-moving team (with or without an AI agent writing the code) will happily:

- **Pitch an outcome as an invention** — "use AI to detect fraud better" is not a technical candidate; it's a wish. Real claims need a state machine, data structure, or algorithm underneath.
- **Rediscover their own feature** — six months later, nobody remembers that this "new" idea shipped already, under a different name, as part of a different feature.
- **Search the headline instead of the elements** — most real prior-art collisions hide at the level of individual claim elements, not the whole idea searched as one phrase.
- **Confuse "no patent found" with "clear to build"** — patentability, validity, and freedom-to-operate (FTO) are three different questions. A codebase can be clear on one and blocked on another.
- **Let a rejected idea get re-pitched** — without a log, the same crowded concept comes back from scratch.
- **Attach a name to an AI draft** — only natural persons can be inventors, and conception requires a specific, settled, complete operative solution, not a research goal.

Each of these is a bill that arrives later: a rejected application, an invalidated patent, an infringement letter, or a legal team redoing diligence someone already did and lost.

## The Pipeline

1. **Product archaeology** — build a capability matrix (exists / partially exists / absent / publicly disclosed / private) mapped to *mechanisms* — stored state, trust boundaries, retry behavior, failure states — not feature names. This is where self-prior-art gets caught.
2. **Whitespace from failure** — challenge every guarantee with failure lenses: common-mode failure, version skew, concurrent actors, stale evidence, ambiguous-effect retries, post-delegation revocation, second-tenant interleaving, fallback privacy loss, inability to compensate, hidden proof inputs.
3. **Invention cards** — normalize survivors into a strict template. Reject anything expressible only as "use AI to," "apply policy," "generate a score," "use a blockchain," "sign a receipt," or "store evidence."
4. **Widening-ring search** — phrases, element synonyms, element pairs, problem/effect terms, CPC/IPC classes, assignees/citations, patent families, non-patent literature. Read independent claims, not abstracts.
5. **Claim charts** — a patentability chart (every reference, including expired/abandoned/NPL) and a separate FTO chart (live claims only, charted against your actual planned implementation).
6. **Hard gates** — §101 eligibility, §102 novelty, §103 nonobviousness, §112 disclosure, FTO, detectability, strategic value, and license strategy. A candidate needs to survive all of them.
7. **Disposition** — prototype-then-provisional, incubate, trade secret, defensive publication, implement without filing, or reject — with every rejection logged so it isn't rediscovered later.

Human conception is not optional: AI may assist at every step above, but only natural persons can be inventors. Every surviving candidate goes through a human invention workshop before anyone's name is attached, and counsel makes the final call.

**This is not legal advice.**

## Quick Start

Install the agent rule and diligence templates in any repository:

```bash
npx inventor init
```

That writes:

- `AGENTS.md` with the always-on invention pipeline for agent hosts that read it.
- `.inventor.json` so the project can declare its jurisdictions, goal, and ownership boundary.
- `docs/cards/`, `docs/capability-matrix-template.md`, `docs/claim-charts/`, `docs/rejected-candidates.md`, and `docs/disclosures.md`.

For instruction-only setup without the diligence templates:

```bash
npx inventor init --agents-only
```

Set the project's goal and jurisdictions at install time:

```bash
npx inventor init --goal offensive --jurisdiction US --jurisdiction EP
```

## Tune It Per Project

Drop an `.inventor.json` at your repo root (or let `init` generate one) to declare the boundary every candidate is diligenced against:

```json
{
  "jurisdictions": ["US", "EP"],
  "searchCutoffDate": null,
  "goal": "defensive",
  "owners": ["Acme, Inc."],
  "assignmentObligations": "All engineers sign IP assignment on hire.",
  "repositoryLicense": "Apache-2.0",
  "dependencyLicensePolicy": "inherit",
  "disclosureLog": "docs/disclosures.md",
  "counsel": { "name": "Jane Doe", "contact": "jane@example.com" },
  "priorities": ["defensibility", "speed to file"],
  "excludedDomains": ["marketing copy generation"],
  "notes": "SOC2 shop; weight FTO risk heavily before any provisional."
}
```

Every field is optional. Malformed config is ignored, never fatal. The SessionStart hook injects the resolved boundary alongside the rule on every turn, so the agent sees your project's jurisdictions, goal, and ownership constraints without being told twice. See `docs/cards/README.md` for the full field reference.

## Supported Agent Surfaces

This repo ships the same rule through the files each host already knows how to read.

| Host | Files |
| --- | --- |
| Codex | `.codex-plugin/plugin.json`, `skills/inventor/`, `hooks/hooks.json`, `AGENTS.md` |
| Claude Code | `.claude-plugin/plugin.json`, `CLAUDE.md`, lifecycle hook config |
| Gemini CLI / Antigravity | `gemini-extension.json`, `GEMINI.md`, `AGENTS.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Cursor | `.cursor/rules/inventor.mdc` |
| Windsurf | `.windsurf/rules/inventor.md` |
| Cline | `.clinerules/inventor.md` |
| Kiro | `.kiro/steering/inventor.md` |
| OpenCode | `opencode.json`, `.opencode/plugins/inventor.mjs` |
| OpenClaw | `.openclaw/skills/inventor/` |
| Pi-style harnesses | `package.json` `pi.skills` |
| Generic agents | `AGENTS.md` |

The hook files are included for hosts that support lifecycle injection. Hosts that only read instruction files still get the rule, just without startup fanfare.

## Install

### Claude Code

Use the Claude plugin flow with this repository as the source, or copy `CLAUDE.md` into the target project for instruction-only mode.

### Codex

```bash
codex plugin marketplace add stdin/inventor
```

### Gemini CLI

```bash
gemini extensions install https://github.com/stdin/inventor
```

### OpenCode

Run OpenCode from a checkout of this repo, or add this plugin path to your project `opencode.json`:

```json
{
  "plugin": ["./.opencode/plugins/inventor.mjs"]
}
```

### Instruction-Only Hosts

Copy the matching file into your project: GitHub Copilot → `.github/copilot-instructions.md`, Cursor → `.cursor/rules/inventor.mdc`, Windsurf → `.windsurf/rules/inventor.md`, Cline → `.clinerules/inventor.md`, Kiro → `.kiro/steering/inventor.md`, Generic → `AGENTS.md`.

## Commands / Skills

Skill-capable hosts can use:

| Skill | Use it when |
| --- | --- |
| `$inventor` | Run or orchestrate the full pipeline end to end. |
| `$inventor-archaeology` | Build a codebase capability matrix before ideating. |
| `$inventor-whitespace` | Generate claim-shaped candidates from failure-mode lenses. |
| `$inventor-card` | Normalize a raw idea into the full invention-card template. |
| `$inventor-search` | Search patent and non-patent prior art in widening rings. |
| `$inventor-gate` | Build claim charts and run the §101/§102/§103/§112/FTO/strategic gates. |
| `$inventor-disposition` | Decide disposition, run the human-inventorship workshop, set filing/refresh dates. |

## Development

Run the test suite:

```bash
npm test
```

`npm test` also runs `scripts/sync.js --check` and `scripts/check-rule-copies.js`, so a canonical-rule edit that never got synced to the per-host copies fails CI immediately.

Record a new invention card:

```bash
npm run record-card -- --candidate "Short name" --problem "..." --decision incubate
```

Check which cards are due for a prior-art refresh (filing deadlines and declared refresh dates):

```bash
npm run refresh
```

When changing the compact rule, edit `rules/inventor.md` first, then run:

```bash
npm run sync
```

That regenerates every per-host copy (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, Copilot, Cursor, Windsurf, Cline, Kiro, `.agents/`) and mirrors `.codex-plugin/`, `hooks/`, and `skills/` into `plugins/inventor/` for the generic `.agents` marketplace format. `npm run sync:check` verifies everything is already in sync (used in CI) without writing anything.

## FAQ

**Does this replace patent counsel?**
No. It produces the diligence record — capability matrix, invention card, prior-art search, claim charts, gate results — that counsel reviews to make the actual patentability, validity, FTO, and inventorship determinations.

**Can the AI be listed as an inventor?**
No. Only natural persons can be inventors, and conception requires a human's specific, settled, complete operative solution, not a research goal. Every surviving candidate goes through a human invention workshop before anyone is named.

**What if we don't want to file anything, ever?**
The pipeline still pays for itself at step 1 and step 6's FTO gate: catching self-prior-art before it's pitched internally as a feature, and catching a live blocking claim before you build on top of it.

**Is `$inventor-search` an automated patent search API?**
No — it's a structured methodology (widening rings, CPC/IPC classes, claim charts) pointing at USPTO Patent Public Search, EPO Espacenet, and WIPO PATENTSCOPE. Patent search requires human judgment about vocabulary and claim scope that a keyword script can't substitute for.

## License

[MIT](LICENSE).
