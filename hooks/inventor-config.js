// Per-project inventor boundary.
//
// A project can drop an .inventor.json at its root to declare the boundary the
// playbook must respect: target jurisdictions, search cutoff, ownership and
// assignment obligations, licenses, disclosure log location, and the goal
// (offensive/defensive/fundraising/licensing/publication). This module reads
// and renders that config into a text block the SessionStart hook appends to
// the injected rule. Lives in hooks/ (not scripts/) so it ships inside the
// installed plugin, which only contains the .codex-plugin/, hooks/, and
// skills/ trees.
const fs = require('node:fs');
const path = require('node:path');

const CONFIG_FILENAME = '.inventor.json';

function loadProjectConfig(cwd) {
  const file = path.join(cwd || process.cwd(), CONFIG_FILENAME);
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch (_error) {
    return null; // no project config; this is the common case
  }
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
  } catch (error) {
    // Never break a session over a typo in the config; warn and continue.
    process.stderr.write(`inventor: ignoring malformed ${CONFIG_FILENAME}: ${error.message}\n`);
    return null;
  }
}

function list(value) {
  return Array.isArray(value) ? value.filter(item => typeof item === 'string' && item.trim()) : [];
}

function renderProjectConfig(config) {
  if (!config || typeof config !== 'object') return null;

  const header = ['## Project inventor boundary (.inventor.json)', ''];
  const rules = [];

  const jurisdictions = list(config.jurisdictions);
  if (jurisdictions.length) rules.push(`- Target jurisdictions: ${jurisdictions.join(', ')}.`);

  if (typeof config.searchCutoffDate === 'string' && config.searchCutoffDate.trim()) {
    rules.push(`- Search cutoff date: ${config.searchCutoffDate.trim()}.`);
  }

  if (typeof config.goal === 'string' && config.goal.trim()) {
    rules.push(`- Goal: ${config.goal.trim()} — let this shape which disposition is correct.`);
  }

  const owners = list(config.owners);
  if (owners.length) rules.push(`- IP owners: ${owners.join(', ')}.`);

  if (typeof config.assignmentObligations === 'string' && config.assignmentObligations.trim()) {
    rules.push(`- Assignment obligations: ${config.assignmentObligations.trim()}`);
  }

  if (typeof config.repositoryLicense === 'string' && config.repositoryLicense.trim()) {
    rules.push(`- Repository license: ${config.repositoryLicense.trim()} — check what it already grants away before assuming a patent gives exclusivity.`);
  }

  if (typeof config.dependencyLicensePolicy === 'string' && config.dependencyLicensePolicy.trim()) {
    rules.push(`- Dependency license policy: ${config.dependencyLicensePolicy.trim()}.`);
  }

  if (typeof config.disclosureLog === 'string' && config.disclosureLog.trim()) {
    rules.push(`- Public disclosure log: ${config.disclosureLog.trim()} — log every disclosure there the moment it happens.`);
  }

  const counsel = config.counsel;
  if (counsel && typeof counsel === 'object' && typeof counsel.name === 'string' && counsel.name.trim()) {
    const contact = typeof counsel.contact === 'string' && counsel.contact.trim() ? ` (${counsel.contact.trim()})` : '';
    rules.push(`- Counsel: ${counsel.name.trim()}${contact} makes the final patentability/validity/FTO/inventorship call.`);
  }

  const priorities = list(config.priorities);
  if (priorities.length) rules.push(`- Weight these first when trading off dispositions: ${priorities.join(', ')}.`);

  const excludedDomains = list(config.excludedDomains);
  if (excludedDomains.length) rules.push(`- Out of scope for ideation: ${excludedDomains.join(', ')}.`);

  if (typeof config.notes === 'string' && config.notes.trim()) {
    rules.push(`- Project notes: ${config.notes.trim()}`);
  }

  if (!rules.length) return null; // config present but empty/unrecognized
  return header.concat(rules).join('\n');
}

function getProjectConfigBlock(cwd) {
  return renderProjectConfig(loadProjectConfig(cwd));
}

module.exports = { CONFIG_FILENAME, loadProjectConfig, renderProjectConfig, getProjectConfigBlock };
