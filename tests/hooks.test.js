const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { isAlwaysOn } = require('../hooks/inventor-config');

const root = path.resolve(__dirname, '..');
const activate = path.join(root, 'hooks', 'inventor-activate.js');

function runActivate(cwd) {
  return spawnSync(process.execPath, [activate], { cwd, encoding: 'utf8' });
}

// No .inventor.json at all: opt-in default is off, hook stays silent.
const noConfigDir = fs.mkdtempSync(path.join(os.tmpdir(), 'inventor-hook-noconfig-'));
assert.equal(isAlwaysOn(noConfigDir), false);
const noConfigResult = runActivate(noConfigDir);
assert.equal(noConfigResult.status, 0);
assert.equal(noConfigResult.stdout, '', 'hook must produce no output when the project has not opted in');

// .inventor.json present but alwaysOn not set (or false): still silent.
const offDir = fs.mkdtempSync(path.join(os.tmpdir(), 'inventor-hook-off-'));
fs.writeFileSync(path.join(offDir, '.inventor.json'), JSON.stringify({ goal: 'defensive' }));
assert.equal(isAlwaysOn(offDir), false);
assert.equal(runActivate(offDir).stdout, '');

// alwaysOn: true opts in — the hook emits the SessionStart payload.
const onDir = fs.mkdtempSync(path.join(os.tmpdir(), 'inventor-hook-on-'));
fs.writeFileSync(path.join(onDir, '.inventor.json'), JSON.stringify({ alwaysOn: true, goal: 'offensive' }));
assert.equal(isAlwaysOn(onDir), true);
const onResult = runActivate(onDir);
assert.equal(onResult.status, 0);
const payload = JSON.parse(onResult.stdout);
assert.equal(payload.systemMessage, 'INVENTOR:ACTIVE');
assert.equal(payload.hookSpecificOutput.hookEventName, 'SessionStart');
assert.match(payload.hookSpecificOutput.additionalContext, /INVENTOR MODE ACTIVE/);
assert.match(payload.hookSpecificOutput.additionalContext, /Goal: offensive/);

console.log('hooks tests passed');
