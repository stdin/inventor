const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const marketplace = readJson('.agents/plugins/marketplace.json');

assert.equal(marketplace.name, 'inventor');
assert.equal(marketplace.plugins.length, 1);
assert.equal(marketplace.plugins[0].name, 'inventor');
assert.equal(marketplace.plugins[0].source.path, './plugins/inventor');
assert.equal(marketplace.plugins[0].policy.installation, 'AVAILABLE');
assert.equal(marketplace.plugins[0].policy.authentication, 'ON_INSTALL');

const claudeMarketplace = readJson('.claude-plugin/marketplace.json');
assert.equal(claudeMarketplace.name, 'inventor');
assert.equal(claudeMarketplace.plugins[0].source, './');

const SKILLS = [
  'inventor',
  'inventor-archaeology',
  'inventor-whitespace',
  'inventor-card',
  'inventor-search',
  'inventor-gate',
  'inventor-disposition'
];

const copiedFiles = [
  ['.codex-plugin/plugin.json', 'plugins/inventor/.codex-plugin/plugin.json'],
  ['hooks/hooks.json', 'plugins/inventor/hooks/hooks.json'],
  ['hooks/inventor-activate.js', 'plugins/inventor/hooks/inventor-activate.js'],
  ['hooks/inventor-instructions.js', 'plugins/inventor/hooks/inventor-instructions.js'],
  ['hooks/inventor-config.js', 'plugins/inventor/hooks/inventor-config.js'],
  ...SKILLS.map(name => [`skills/${name}/SKILL.md`, `plugins/inventor/skills/${name}/SKILL.md`])
];

for (const [source, copy] of copiedFiles) {
  assert.equal(read(source), read(copy), `${copy} drifted from ${source}`);
}

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
}

function readJson(file) {
  return JSON.parse(read(file));
}

console.log('marketplace tests passed');
