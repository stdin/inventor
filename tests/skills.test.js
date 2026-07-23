const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

const SKILLS = ['inventor', 'inventor-archaeology', 'inventor-whitespace'];

for (const name of SKILLS) {
  const skillPath = path.join(root, 'skills', name, 'SKILL.md');
  assert.ok(fs.existsSync(skillPath), `missing ${skillPath}`);
  const text = fs.readFileSync(skillPath, 'utf8');
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(frontmatter, `${name}/SKILL.md is missing YAML frontmatter`);
  assert.match(frontmatter[1], new RegExp(`name:\\s*${name}\\b`), `${name}/SKILL.md frontmatter name mismatch`);
  assert.match(frontmatter[1], /description:\s*Use when/, `${name}/SKILL.md description should start with "Use when"`);
}

// The main skill must not still be pointing at the deleted formal-diligence skills.
const mainSkill = fs.readFileSync(path.join(root, 'skills', 'inventor', 'SKILL.md'), 'utf8');
for (const removed of ['inventor-card', 'inventor-search', 'inventor-gate', 'inventor-disposition']) {
  assert.ok(!mainSkill.includes(`$${removed}`), `skills/inventor/SKILL.md still references removed skill $${removed}`);
}

console.log(`skills tests passed (${SKILLS.length} skills)`);
