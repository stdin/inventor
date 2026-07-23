const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

const SKILLS = ['inventor', 'inventor-archaeology', 'inventor-whitespace'];
const packageJson = readJson('package.json');

for (const name of SKILLS) {
  const skillPath = path.join(root, 'skills', name, 'SKILL.md');
  const metadataPath = path.join(root, 'skills', name, 'agents', 'openai.yaml');
  assert.ok(fs.existsSync(skillPath), `missing ${skillPath}`);
  assert.ok(fs.existsSync(metadataPath), `missing ${metadataPath}`);

  const text = fs.readFileSync(skillPath, 'utf8');
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(frontmatter, `${name}/SKILL.md is missing YAML frontmatter`);
  assert.match(frontmatter[1], new RegExp(`name:\\s*${name}\\b`), `${name}/SKILL.md frontmatter name mismatch`);
  assert.match(frontmatter[1], /description:\s*Use when/, `${name}/SKILL.md description should start with "Use when"`);

  const metadata = fs.readFileSync(metadataPath, 'utf8');
  assert.match(metadata, /interface:\n/, `${name}/agents/openai.yaml is missing interface metadata`);
  assert.match(metadata, /default_prompt:\s*".+"/, `${name}/agents/openai.yaml is missing a default prompt`);
  assert.match(metadata, /allow_implicit_invocation:\s*true/, `${name}/agents/openai.yaml should allow implicit invocation`);
}

const codexManifest = readJson('.codex-plugin/plugin.json');
assert.equal(codexManifest.name, packageJson.name);
assert.equal(codexManifest.version, packageJson.version);
assert.equal(codexManifest.skills, './skills/');
assert.equal(codexManifest.interface.displayName, 'Inventor');
assert.ok(codexManifest.interface.defaultPrompt.length <= 3);

const claudeManifest = readJson('.claude-plugin/plugin.json');
const claudeMarketplace = readJson('.claude-plugin/marketplace.json');
assert.equal(claudeManifest.version, packageJson.version);
assert.equal(claudeMarketplace.plugins[0].version, packageJson.version);

const canonicalRule = read('rules/inventor.md');
for (const copy of ['AGENTS.md', 'CLAUDE.md']) {
  assert.equal(read(copy), canonicalRule, `${copy} drifted from rules/inventor.md`);
}

const readme = read('README.md');
assert.match(readme, /npx skills add stdin\/inventor/, 'README.md is missing the universal quick install');
assert.match(readme, /codex plugin marketplace add stdin\/inventor && codex plugin add inventor@inventor/, 'README.md is missing the one-line Codex install');
assert.match(readme, /claude plugin marketplace add stdin\/inventor && claude plugin install inventor@inventor/, 'README.md is missing the one-line Claude install');

// The main skill must not still be pointing at the deleted formal-diligence skills.
const mainSkill = read('skills/inventor/SKILL.md');
for (const removed of ['inventor-card', 'inventor-search', 'inventor-gate', 'inventor-disposition']) {
  assert.ok(!mainSkill.includes(`$${removed}`), `skills/inventor/SKILL.md still references removed skill $${removed}`);
}

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
}

function readJson(file) {
  return JSON.parse(read(file));
}

console.log(`plugin tests passed (${SKILLS.length} skills, ${packageJson.version})`);
