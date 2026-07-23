#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const cwd = process.cwd();

const USAGE = `Usage:
  inventor init [--goal <offensive|defensive|fundraising|licensing|publication>] [--jurisdiction <code>]... [--always-on] [--agents-only] [--force] [--dry-run]
  inventor --help

Installs the Inventor patent-whitespace playbook into the current repository.
The pipeline runs on demand via the $inventor skills by default; pass
--always-on to have it injected into every agent session instead (opt-in,
mirrors buy-vs-build's always-on model — off by default because most coding
sessions have nothing to do with patent diligence).`;

const GOALS = ['offensive', 'defensive', 'fundraising', 'licensing', 'publication'];

function hasFlag(name) {
  return process.argv.includes(name);
}

function flagValue(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function flagValues(name) {
  const out = [];
  for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === name && process.argv[i + 1]) out.push(process.argv[i + 1]);
  }
  return out;
}

function source(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function target(rel) {
  return path.join(cwd, rel);
}

function writeFile(rel, content) {
  const file = target(rel);
  const exists = fs.existsSync(file);
  if (exists && !hasFlag('--force')) {
    return { rel, status: 'skipped', reason: 'exists' };
  }
  if (!hasFlag('--dry-run')) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
  return { rel, status: exists ? 'overwritten' : 'created' };
}

function renderConfig() {
  const goal = flagValue('--goal') || 'defensive';
  if (!GOALS.includes(goal)) {
    console.error(`Unknown --goal "${goal}". Expected one of: ${GOALS.join(', ')}`);
    process.exit(1);
  }
  const jurisdictions = flagValues('--jurisdiction');
  return JSON.stringify({
    alwaysOn: hasFlag('--always-on'),
    jurisdictions: jurisdictions.length ? jurisdictions : ['US'],
    searchCutoffDate: null,
    goal,
    owners: [],
    assignmentObligations: '',
    repositoryLicense: '',
    dependencyLicensePolicy: 'inherit',
    disclosureLog: 'docs/disclosures.md',
    counsel: { name: '', contact: '' },
    priorities: [],
    excludedDomains: [],
    notes: 'Inventor is installed to make coding agents run product archaeology and prior-art diligence before pitching a feature as a new invention. Not legal advice; counsel makes the final call.'
  }, null, 2) + '\n';
}

function install() {
  const results = [];
  results.push(writeFile('AGENTS.md', source('AGENTS.md')));
  results.push(writeFile('.inventor.json', renderConfig()));
  if (!hasFlag('--agents-only')) {
    results.push(writeFile('docs/cards/0000-template.md', source('docs/cards/0000-template.md')));
    results.push(writeFile('docs/cards/README.md', source('docs/cards/README.md')));
    results.push(writeFile('docs/capability-matrix-template.md', source('docs/capability-matrix-template.md')));
    results.push(writeFile('docs/claim-charts/patentability-chart-template.md', source('docs/claim-charts/patentability-chart-template.md')));
    results.push(writeFile('docs/claim-charts/fto-chart-template.md', source('docs/claim-charts/fto-chart-template.md')));
    results.push(writeFile('docs/rejected-candidates.md', source('docs/rejected-candidates.md')));
    results.push(writeFile('docs/disclosures.md', source('docs/disclosures.md')));
  }
  return results;
}

function printResults(results) {
  const verb = hasFlag('--dry-run') ? 'Would install' : 'Installed';
  console.log(`${verb} Inventor in ${cwd}`);
  for (const result of results) {
    const suffix = result.reason ? ` (${result.reason}; pass --force to overwrite)` : '';
    console.log(`- ${result.status}: ${result.rel}${suffix}`);
  }
  console.log(hasFlag('--always-on')
    ? 'alwaysOn: true — the pipeline will be injected into every agent session.'
    : 'alwaysOn: false (default) — run the pipeline on demand with $inventor, or set "alwaysOn": true in .inventor.json.');
}

function main() {
  const command = process.argv[2];
  if (!command || command === '--help' || command === '-h') {
    console.log(USAGE);
    return;
  }
  if (command !== 'init') {
    console.error(`Unknown command: ${command}\n\n${USAGE}`);
    process.exit(1);
  }
  printResults(install());
}

if (require.main === module) main();

module.exports = { renderConfig, install, GOALS };
