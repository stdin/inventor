# Inventor

**An AI coding agent that invents things that haven't existed before — not the next backlog item.**

Inventor is a Claude Code skill that looks at a codebase, finds where it's thin or breaks, and proposes genuinely new features and products — tested not just against your own code, but against the wider landscape of what's already been built, patented, or published. Patent search isn't a legal chore bolted on the side here; it's a core ideation input. Patents are full of specific, well-worked mechanisms for problems adjacent to yours, and searching them element-by-element is one of the fastest ways to find out whether an idea is actually new or just familiar in disguise — and to steal a better mechanism when it isn't.

It stops short of one thing on purpose: it will not generate a legal opinion. No claim charts, no §101/§102/§103 pass/fail verdicts, no freedom-to-operate analysis. An LLM confidently asserting a patent's legal status is exactly the kind of authoritative-sounding wrongness that gets people in trouble — so Inventor sparks and stress-tests ideas, then hands the real diligence to an actual person the moment an idea is worth building on seriously. Only a natural person can legally be listed as a patent inventor anyway; that part isn't optional, and no amount of "fully-featured" changes it.

## How it invents

1. **Archaeology** — build a capability matrix of what the codebase already does, mapped to mechanisms (stored state, trust boundaries, retry behavior, failure states) rather than feature names. Kills the "we already shipped this under a different name" trap before it wastes anyone's time.
2. **Whitespace from failure** — stress every guarantee the surviving area makes with failure-mode lenses (common-mode failure, version skew, concurrent actors, stale evidence, ambiguous-effect retries, delegation revocation, tenant interleaving, fallback privacy loss, inability to compensate, hidden proof inputs) and turn what breaks into candidate mechanisms.
3. **Patent-informed novelty search** — search patents and technical literature around each candidate's underlying mechanism, element by element, not the headline idea. This is where inspiration lives (borrow a mechanism from an unrelated domain) and where real novelty gets tested (nothing close is a strong signal; something close means push further or build it anyway for its value, not its novelty).
4. **Push past incremental** — combine candidates, generalize past the one case that inspired them, or take a mechanism to its logical extreme. A candidate that only clears "mildly useful and nobody happened to build it" isn't done yet.
5. **Sanity check** — every finalist has to name a technical state machine, data representation, or algorithm. "Use AI to," "apply policy," "generate a score," "use a blockchain," "sign a receipt," and "store evidence" name outcomes, not mechanisms, and don't survive this step.

Output: a short list of feature or product ideas, each with its mechanism, why the codebase doesn't already cover it, and a one-line novelty read from the search pass.

## Before You Commit

For the rare idea that comes back looking genuinely novel and worth pursuing seriously: loop in an actual person, and counsel if filing a patent is a real possibility. The search pass above is diligence-*flavored* — it sparks and pressure-tests ideas — but it isn't freedom-to-operate analysis and doesn't clear anything for filing. Never let an AI conversation be the entire record for something you might actually file on.

## Use it

This ships as a Claude Code skill.

- **Claude Code:** use the Claude plugin flow with this repository as the source, or copy `skills/` directly into your project's `.claude/skills/`.
- **Anything that reads `AGENTS.md`:** copy `AGENTS.md` (or `CLAUDE.md` — same content) into your project for instruction-only mode.

There's no installer, no config file, and no background hook — invoke `$inventor` (or let it trigger on "what should we build next," "invent a feature," "what haven't we built yet") and it runs the method above in the conversation.

## Skills

| Skill | Use it when |
| --- | --- |
| `$inventor` | Invent a new feature or product for this codebase — the full method, steps 1–5. |
| `$inventor-archaeology` | Just need the capability matrix — what this codebase already does, before ideating. |
| `$inventor-whitespace` | Just need candidate mechanisms from failure-mode analysis, given an existing capability matrix. |

## Development

```bash
npm test
```

That's the whole dev loop — three markdown skill files and a shape check on their frontmatter. There's no CLI to install, no multi-host mirror to keep in sync, and no session hook: keeping the surface area this small is deliberate, not unfinished. It grows if and when real usage demands it, not speculatively.

## FAQ

**Why doesn't this generate patentability or freedom-to-operate verdicts?**
Because an LLM asserting a patent claim's legal status — live or expired, novel or obvious — is confidently-wrong-shaped in exactly the way that causes real damage, and a generated claim chart is a liability, not a safeguard: it's an unprivileged written record of what you knew and built anyway. Search is used here to spark and pressure-test ideas, not to clear them.

**Can the AI be listed as an inventor?**
No. Only a natural person can legally be an inventor, and conception requires a specific, settled, complete solution a human actually owns — not a research goal an AI helped explore. If an idea from here goes anywhere near a real filing, a person has to genuinely do that part.

**Is the patent search automated against USPTO/EPO/WIPO?**
No — it's a search discipline (search the mechanism and its elements, not the headline; treat what you find as inspiration and as a signal, not a verdict) that you or the agent run against whatever search tools are available. Nothing here is a data feed or a substitute for a professional prior-art search.

**Why is this scoped to Claude Code only, and so small?**
Because the actual product is the method, not the distribution surface. Shipping to ten agent hosts before the ideation loop itself has been used and iterated on by a real person is exactly the kind of premature infrastructure this project should avoid building.

## License

[MIT](LICENSE).
