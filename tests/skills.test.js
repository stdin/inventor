const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

const SKILLS = [
  'inventor',
  'inventor-archaeology',
  'inventor-whitespace',
  'inventor-card',
  'inventor-search',
  'inventor-gate',
  'inventor-disposition'
];

for (const name of SKILLS) {
  const skillPath = path.join(root, 'skills', name, 'SKILL.md');
  assert.ok(fs.existsSync(skillPath), `missing ${skillPath}`);
  const text = fs.readFileSync(skillPath, 'utf8');
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(frontmatter, `${name}/SKILL.md is missing YAML frontmatter`);
  assert.match(frontmatter[1], new RegExp(`name:\\s*${name}\\b`), `${name}/SKILL.md frontmatter name mismatch`);
  assert.match(frontmatter[1], /description:\s*Use when/, `${name}/SKILL.md description should start with "Use when"`);

  const agentPath = path.join(root, 'skills', name, 'agents', 'openai.yaml');
  assert.ok(fs.existsSync(agentPath), `missing ${agentPath}`);
  const agentText = fs.readFileSync(agentPath, 'utf8');
  assert.match(agentText, /display_name:/);
  assert.match(agentText, new RegExp(`\\$${name}\\b`), `${name}/agents/openai.yaml default_prompt should reference $${name}`);
}

console.log(`skills tests passed (${SKILLS.length} skills)`);
