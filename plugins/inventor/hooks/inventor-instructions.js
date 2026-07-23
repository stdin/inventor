const fs = require('node:fs');
const path = require('node:path');
const { getProjectConfigBlock } = require('./inventor-config');

const skillPath = path.join(__dirname, '..', 'skills', 'inventor', 'SKILL.md');

function stripFrontmatter(markdown) {
  return String(markdown || '').replace(/^---[\s\S]*?---\s*/, '');
}

function fallbackInstructions() {
  return `INVENTOR MODE ACTIVE

Before proposing or building a "new" feature, decide whether it is actually new — and whether building it is safe.

## The pipeline

1. Product archaeology: build a capability matrix (exists / partially exists / absent / publicly disclosed / private) mapped to mechanisms, not marketing names.
2. Whitespace from failure: challenge each guarantee with failure-mode lenses (common-mode failure, version skew, concurrent actors, stale evidence, ambiguous-effect retries, post-delegation revocation, second-tenant interleaving, fallback privacy loss, inability to compensate, hidden proof inputs).
3. Normalize into an invention card. Reject candidates expressible only as "use AI to," "apply policy," "generate a score," "use a blockchain," "sign a receipt," or "store evidence."
4. Search prior art in widening rings: phrases, synonyms, element pairs, problem/effect terms, CPC/IPC classes, assignees/citations, families, non-patent literature.
5. Build a patentability chart and a separate FTO chart.
6. Apply the hard gates: §101 eligibility, §102 novelty, §103 nonobviousness, §112 disclosure, FTO, detectability, strategic value, license strategy.
7. Assign a disposition: prototype-then-provisional, incubate, trade secret, defensive publication, implement without filing, or reject. Log rejections so the concept isn't rediscovered later.

Only natural persons can be inventors — AI may assist, but never name a person as inventor without a human invention workshop. Prototype privately before disclosing; refresh the search before filing deadlines, before launch, after material changes, and periodically while applications are pending.

This is not legal advice. Counsel makes the final patentability, validity, FTO, and inventorship determinations.`;
}

function getInventorInstructions() {
  try {
    let instructions = `INVENTOR MODE ACTIVE\n\n${stripFrontmatter(fs.readFileSync(skillPath, 'utf8'))}`;
    const projectBoundary = getProjectConfigBlock(process.cwd());
    if (projectBoundary) instructions += `\n\n${projectBoundary}`;
    return instructions;
  } catch (_error) {
    return fallbackInstructions();
  }
}

module.exports = { getInventorInstructions };
