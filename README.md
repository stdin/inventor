# Inventor

**An AI coding agent that invents things that haven't existed before — not the next backlog item.**

Inventor is an agent skill for Codex and Claude Code that looks at a codebase, finds where it's thin or breaks, and proposes genuinely new features and products — tested not just against your own code, but against the wider landscape of what's already been built, patented, or published. Patent search isn't a legal chore bolted on the side here; it's a core ideation input. Patents are full of specific, well-worked mechanisms for problems adjacent to yours, and searching them element-by-element is one of the fastest ways to find out whether an idea is actually new or just familiar in disguise — and to steal a better mechanism when it isn't.

## Quick install

Run this from the project where you want Inventor:

```bash
npx skills add stdin/inventor
```

It detects your agent and installs all three skills. Add `-g` to make them available in every project, and run `npx skills update` later to update the locked install. This path uses the open-source [Agent Skills CLI](https://github.com/vercel-labs/skills), which currently requires Node 22.20 or newer; if you do not use npm or want native plugin lifecycle and namespacing, use the one-line host installs below.

It stops short of one thing on purpose: it will not generate a legal opinion. No claim charts, no §101/§102/§103 pass/fail verdicts, no freedom-to-operate analysis. An LLM confidently asserting a patent's legal status is exactly the kind of authoritative-sounding wrongness that gets people in trouble — so Inventor sparks and stress-tests ideas, then hands the real diligence to an actual person the moment an idea is worth building on seriously. Only a natural person can legally be listed as a patent inventor anyway; that part isn't optional, and no amount of "fully-featured" changes it.

## How it invents

1. **Archaeology** — build a capability matrix of what the codebase already does, mapped to mechanisms (stored state, trust boundaries, retry behavior, failure states) rather than feature names. Kills the "we already shipped this under a different name" trap before it wastes anyone's time.
2. **Whitespace from failure** — stress every guarantee the surviving area makes with failure-mode lenses (common-mode failure, version skew, concurrent actors, stale evidence, ambiguous-effect retries, delegation revocation, tenant interleaving, fallback privacy loss, inability to compensate, hidden proof inputs) and turn what breaks into candidate mechanisms.
3. **Patent-informed novelty search** — search patents and technical literature around each candidate's underlying mechanism, element by element, not the headline idea. This is where inspiration lives (borrow a mechanism from an unrelated domain) and where real novelty gets tested (nothing close is a strong signal; something close means push further or build it anyway for its value, not its novelty). Queries stay at a public-safe abstraction; unavailable or incomplete search is reported as `unsearched`, never as a clean result.
4. **Push past incremental** — combine candidates, generalize past the one case that inspired them, or take a mechanism to its logical extreme. A candidate that only clears "mildly useful and nobody happened to build it" isn't done yet.
5. **Sanity check** — every finalist has to name a technical state machine, data representation, or algorithm. "Use AI to," "apply policy," "generate a score," "use a blockchain," "sign a receipt," and "store evidence" name outcomes, not mechanisms, and don't survive this step.

Output: a short list of feature or product ideas, each with its mechanism, why the codebase doesn't already cover it, and a one-line novelty read from the search pass.

## Before You Commit

For the rare idea that comes back looking genuinely novel and worth pursuing seriously: loop in an actual person, and counsel if filing a patent is a real possibility. The search pass above is diligence-*flavored* — it sparks and pressure-tests ideas — but it isn't freedom-to-operate analysis and doesn't clear anything for filing. Never let an AI conversation be the entire record for something you might actually file on.

## Native plugin install

### Codex

Add this repository as a marketplace, then install the plugin:

```bash
codex plugin marketplace add stdin/inventor && codex plugin add inventor@inventor
```

Start a new Codex session so its three bundled skills are discovered. You can also use `/plugins` in the Codex CLI or the Plugins directory in the desktop app after adding the marketplace.

In the CLI, invoke the full workflow as `$inventor:inventor`; in the desktop app, choose Inventor with `@`. Codex plugins are not loaded by the IDE extension, so for IDE use copy the three folders under `skills/` into your user-level `~/.agents/skills/` or a project's `.agents/skills/`; directly installed skills use `$inventor`.

### Claude Code

```bash
claude plugin marketplace add stdin/inventor && claude plugin install inventor@inventor
```

Start a new session (or run `/reload-plugins`), then invoke `/inventor:inventor`. You can also copy `skills/` directly into your project's `.claude/skills/`.

### Instruction-only

For any agent that reads `AGENTS.md`, copy `AGENTS.md` into your project. `CLAUDE.md` contains the same compact rule for Claude Code.

There's no custom installer, config file, or background hook. Invoke the main skill through your host's selector—or let it trigger on "what should we build next," "invent a feature," or "what haven't we built yet"—and it runs the method above in the conversation.

## Skills

The logical skill names are below; plugin installs add the host-specific namespace shown above.

| Workflow | Use it when |
| --- | --- |
| `inventor` | Invent a new feature or product for this codebase — the full method, steps 1–5. |
| `inventor-archaeology` | Just need the capability matrix — what this codebase already does, before ideating. |
| `inventor-whitespace` | Just need candidate mechanisms from failure-mode analysis, given an existing capability matrix. |

## Development

```bash
npm test
```

That's the whole dev loop — three markdown skills, small host manifests, and shape checks. There's no custom installer, multi-host mirror, background service, or session hook: keeping the surface area this small is deliberate, not unfinished. It grows if and when real usage demands it, not speculatively.

## FAQ

**Why doesn't this generate patentability or freedom-to-operate verdicts?**
Because an LLM asserting a patent claim's legal status — live or expired, novel or obvious — is confidently-wrong-shaped in exactly the way that causes real damage, and a generated claim chart is a liability, not a safeguard: it's an unprivileged written record of what you knew and built anyway. Search is used here to spark and pressure-test ideas, not to clear them.

**Can the AI be listed as an inventor?**
No. Only a natural person can legally be an inventor, and conception requires a specific, settled, complete solution a human actually owns — not a research goal an AI helped explore. If an idea from here goes anywhere near a real filing, a person has to genuinely do that part.

**Is the patent search automated against USPTO/EPO/WIPO?**
No — it's a search discipline (search the mechanism and its elements, not the headline; treat what you find as inspiration and as a signal, not a verdict) that you or the agent run against whatever search tools are available. Nothing here is a data feed or a substitute for a professional prior-art search.

**Why only Codex, Claude Code, and `AGENTS.md`?**
Because the actual product is the method, not a pile of host adapters. Codex and Claude Code both consume the same three skill files, while `AGENTS.md` covers instruction-only hosts. Supporting more surfaces should follow real demand rather than recreate a multi-host sync system.

## License

[MIT](LICENSE).
