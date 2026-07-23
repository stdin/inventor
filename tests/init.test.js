const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { renderConfig, GOALS } = require('../bin/inventor');

const root = path.resolve(__dirname, '..');
const cli = path.join(root, 'bin', 'inventor.js');

assert.ok(GOALS.includes('defensive'));

const config = JSON.parse(renderConfig());
assert.equal(config.goal, 'defensive');
assert.deepEqual(config.jurisdictions, ['US']);

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
assert.equal(packageJson.bin.inventor, 'bin/inventor.js');

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'inventor-init-'));
const completed = spawnSync(process.execPath, [cli, 'init', '--goal', 'offensive', '--jurisdiction', 'US', '--jurisdiction', 'EP'], {
  cwd: dir,
  encoding: 'utf8'
});
assert.equal(completed.status, 0, completed.stderr);
assert.ok(fs.existsSync(path.join(dir, 'AGENTS.md')));
assert.ok(fs.existsSync(path.join(dir, '.inventor.json')));
assert.ok(fs.existsSync(path.join(dir, 'docs', 'cards', '0000-template.md')));
assert.ok(fs.existsSync(path.join(dir, 'docs', 'rejected-candidates.md')));

const installedConfig = JSON.parse(fs.readFileSync(path.join(dir, '.inventor.json'), 'utf8'));
assert.equal(installedConfig.goal, 'offensive');
assert.deepEqual(installedConfig.jurisdictions, ['US', 'EP']);

const skipped = spawnSync(process.execPath, [cli, 'init'], {
  cwd: dir,
  encoding: 'utf8'
});
assert.equal(skipped.status, 0, skipped.stderr);
assert.match(skipped.stdout, /skipped: AGENTS\.md/);

const agentsOnly = fs.mkdtempSync(path.join(os.tmpdir(), 'inventor-init-agents-only-'));
const agentsOnlyResult = spawnSync(process.execPath, [cli, 'init', '--agents-only'], {
  cwd: agentsOnly,
  encoding: 'utf8'
});
assert.equal(agentsOnlyResult.status, 0, agentsOnlyResult.stderr);
assert.ok(fs.existsSync(path.join(agentsOnly, 'AGENTS.md')));
assert.ok(!fs.existsSync(path.join(agentsOnly, 'docs', 'cards', '0000-template.md')));

console.log('init tests passed');
