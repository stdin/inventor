# Inventor

**Ask your AI coding agent to invent a new feature. Watch it immediately have to prove a human thought of it.**

Inventor is a feature-ideation tool for AI coding agents, backed by a patent-informed whitespace playbook. Ask it for a new feature and, by default, it just gives you one — grounded in what your codebase is missing or gets wrong, not in vibes. If an idea is good enough to actually build on or file for, an opt-in diligence safeguard is sitting right behind it: prior-art search, claim charts, legal gates, and — this is the part with the raised eyebrow — a hard requirement that a human, not the AI that helped brainstorm it, does the actual inventing.

> Is this actually absent from the codebase — or did we already ship it under a different name? Does it name a real mechanism, or just an outcome? If it's worth pursuing: has someone else already claimed it, and are we clear to build it?

A tool this AI-assisted spending most of its rulebook on "please don't let the AI take credit" is not lost on us. USPTO guidance and *Thaler v. Vidal* are unambiguous that only natural persons can be inventors, so that's exactly what the safeguard track enforces — the irony is the point, not a bug.

## Two modes, on purpose

- **Default — Invent.** "What should we build next?" gets a short list of concrete feature ideas, each tied to a real gap or failure mode in the codebase. No search, no legal gates, no paperwork. This is what `$inventor` does unless you ask for more.
- **Opt-in — Diligence Safeguard.** "Is this one safe to build on, or worth protecting?" is a different, heavier question, and it only runs when you ask it to. It produces the record a human and counsel need to decide whether to prototype, patent, keep secret, publish defensively, or drop an idea — and it will not let a candidate skip a step to get there faster.

Inventor never tells you whether to file. It also never lets the AI sign its name to an idea.

## The problem it solves

Left alone, a fast-moving team (with or without an AI agent writing the code) will happily:

- **Pitch an outcome as an invention** — "use AI to detect fraud better" is not a technical candidate; it's a wish. Real claims need a state machine, data structure, or algorithm underneath.
- **Rediscover their own feature** — six months later, nobody remembers that this "new" idea shipped already, under a different name, as part of a different feature.
- **Search the headline instead of the elements** — most real prior-art collisions hide at the level of individual claim elements, not the whole idea searched as one phrase.
- **Confuse "no patent found" with "clear to build"** — patentability, validity, and freedom-to-operate (FTO) are three different questions. A codebase can be clear on one and blocked on another.
- **Let a rejected idea get re-pitched** — without a log, the same crowded concept comes back from scratch.
- **Attach a name to an AI draft** — only natural persons can be inventors, and conception requires a specific, settled, complete operative solution, not a research goal.

Each of these is a bill that arrives later: a rejected application, an invalidated patent, an infringement letter, or a legal team redoing diligence someone already did and lost.

## Default: Invent

1. **Quick archaeology** — scoped to the relevant area, not the whole repo. Catalog what already exists, partially exists, or is absent, mapped to *mechanisms* — stored state, trust boundaries, retry behavior, failure states — not feature names. This alone usually kills half a naive idea list as "already shipped."
2. **Whitespace from failure** — challenge the surviving guarantees with failure lenses: common-mode failure, version skew, concurrent actors, stale evidence, ambiguous-effect retries, post-delegation revocation, second-tenant interleaving, fallback privacy loss, inability to compensate, hidden proof inputs.
3. **Sanity check** — each survivor must name a state machine, data structure, or algorithm, not just an outcome. "Use AI to," "apply policy," "generate a score," "use a blockchain," "sign a receipt," and "store evidence" don't count; push past the phrase or drop the idea.

Output: a short list — name, mechanism, why the codebase doesn't already cover it. Done.

## Opt-in: Diligence Safeguard

Only for a candidate worth checking before you build on it or before anyone considers filing:

1. **Invention cards** — normalize the candidate into a strict template.
2. **Widening-ring search** — phrases, element synonyms, element pairs, problem/effect terms, CPC/IPC classes, assignees/citations, patent families, non-patent literature. Read independent claims, not abstracts.
3. **Claim charts** — a patentability chart (every reference, including expired/abandoned/NPL) and a separate FTO chart (live claims only, charted against your actual planned implementation).
4. **Hard gates** — §101 eligibility, §102 novelty, §103 nonobviousness, §112 disclosure, FTO, detectability, strategic value, and license strategy. A candidate needs to survive all of them.
5. **Disposition** — prototype-then-provisional, incubate, trade secret, defensive publication, implement without filing, or reject — with every rejection logged so it isn't rediscovered later.

Human conception is not optional: AI may assist at every step above, but only natural persons can be inventors. Every candidate that reaches a disposition goes through a human invention workshop before anyone's name is attached, and counsel makes the final call.

**This is not legal advice.**

## Quick Start

Install the agent rule and diligence templates in any repository:

```bash
npx inventor init
```

That writes:

- `AGENTS.md` with the invent-by-default, diligence-opt-in pipeline for agent hosts that read it.
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

By default, Inventor stays quiet until you ask for it — nothing is injected into your agent's context automatically. If you want the pipeline pushed into every session instead (buy-vs-build-style always-on), opt in explicitly:

```bash
npx inventor init --always-on
```

## Tune It Per Project

Drop an `.inventor.json` at your repo root (or let `init` generate one) to declare the boundary every candidate is diligenced against:

```json
{
  "alwaysOn": false,
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

Every field is optional. Malformed config is ignored, never fatal. `alwaysOn` defaults to `false` — most coding sessions have nothing to do with patent diligence, so Inventor doesn't force its way into them. Set it to `true` and the SessionStart hook injects the resolved boundary alongside the rule on every turn instead. See `docs/cards/README.md` for the full field reference.

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

The hook files are included for hosts that support lifecycle injection, and stay silent unless the project opts in with `alwaysOn: true`. Hosts that only read instruction files still get the rule, just invoked on demand rather than injected.

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

| Skill | Mode | Use it when |
| --- | --- | --- |
| `$inventor` | Both | Default: propose new features. Also orchestrates the opt-in safeguard when asked. |
| `$inventor-archaeology` | Invent | Build a codebase capability matrix before ideating. |
| `$inventor-whitespace` | Invent | Generate mechanism-grounded candidates from failure-mode lenses. |
| `$inventor-card` | Safeguard | Normalize a raw idea into the full invention-card template. |
| `$inventor-search` | Safeguard | Search patent and non-patent prior art in widening rings. |
| `$inventor-gate` | Safeguard | Build claim charts and run the §101/§102/§103/§112/FTO/strategic gates. |
| `$inventor-disposition` | Safeguard | Decide disposition, run the human-inventorship workshop, set filing/refresh dates. |

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

**Why isn't this always-on like buy-vs-build?**
Because buy-vs-build's rule applies to nearly every coding decision, and Inventor's doesn't — most sessions are not "should we patent this." Forcing a legal-diligence checklist into every turn regardless of relevance is exactly the kind of unnecessary ownership this project's sibling project would tell you not to build. `alwaysOn` exists for teams that genuinely want it; it defaults to off.

**Does this replace patent counsel?**
No. It produces the diligence record — capability matrix, invention card, prior-art search, claim charts, gate results — that counsel reviews to make the actual patentability, validity, FTO, and inventorship determinations.

**Can the AI be listed as an inventor?**
No, and we mean it enough to put it in the README twice. Only natural persons can be inventors, and conception requires a human's specific, settled, complete operative solution, not a research goal. Every candidate that reaches a disposition goes through a human invention workshop before anyone is named — including, especially, when an AI helped find it.

**What if we don't want to file anything, ever?**
The safeguard track still pays for itself at the archaeology step and the FTO gate: catching self-prior-art before it's pitched internally as a feature, and catching a live blocking claim before you build on top of it. You can run diligence purely defensively and never touch a filing.

**Is `$inventor-search` an automated patent search API?**
No — it's a structured methodology (widening rings, CPC/IPC classes, claim charts) pointing at USPTO Patent Public Search, EPO Espacenet, and WIPO PATENTSCOPE. Patent search requires human judgment about vocabulary and claim scope that a keyword script can't substitute for — which, incidentally, is also why an AI can't be the inventor.

## License

[MIT](LICENSE).
