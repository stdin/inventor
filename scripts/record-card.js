#!/usr/bin/env node
// Capture an invention candidate as a numbered card under docs/cards/.
//
// $inventor-card normalizes a raw idea into the full template by hand, but the
// card still needs a stable number and filename so it can be cross-referenced
// from docs/rejected-candidates.md, docs/disclosures.md, and later disposition
// notes. This script owns just that bookkeeping: allocate the next number,
// render the template with whatever fields were passed, and write the file.
// Pure helpers are exported for testing; the CLI runs when invoked directly.
// Zero dependencies.
const fs = require('node:fs');
const path = require('node:path');

const DECISIONS = ['prototype-then-provisional', 'incubate', 'trade-secret', 'defensive-publication', 'implement-without-filing', 'reject'];

function slugify(title) {
  return String(title || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'candidate';
}

function pad(number) {
  return String(number).padStart(4, '0');
}

function nextCardNumber(dir) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir);
  } catch (_error) {
    return 1;
  }
  let max = 0;
  for (const name of entries) {
    const match = name.match(/^(\d{4})-/);
    if (match) max = Math.max(max, Number(match[1]));
  }
  return max + 1;
}

function section(heading, value, placeholder) {
  return [`## ${heading}`, '', value || placeholder];
}

function renderCard(fields) {
  const {
    number, candidate, status = 'Draft', date, refreshBy, filingDeadline, decision,
    contributors, problem, baseline, absent, state, algorithm, failureBehavior, effect,
    alternatives, claimElements, nearestPatentArt, nearestNonPatentArt,
    singleRefAttack, multiRefAttack, eligibilityRisk, enablementGaps, ftoRisk,
    designAround, disclosureHistory, decisionNotes
  } = fields;

  const lines = [
    `# ${pad(number)}. ${candidate}`,
    '',
    `- Status: ${status}`,
    date ? `- Date: ${date}` : null,
    refreshBy ? `- Refresh by: ${refreshBy}` : '- Refresh by: <YYYY-MM-DD>',
    filingDeadline ? `- Filing deadline: ${filingDeadline}` : null,
    decision ? `- Decision: ${decision}` : '- Decision: <prototype-then-provisional|incubate|trade-secret|defensive-publication|implement-without-filing|reject>',
    ''
  ];

  lines.push(...section('Candidate', candidate, '<Short name and one-sentence description.>'), '');
  lines.push(...section('Human contributors and claimed contribution', contributors, '<Leave blank until the human invention workshop in $inventor-disposition. Never pre-fill from an AI draft.>'), '');
  lines.push(...section('Technical problem', problem, '<The specific failure or gap this addresses.>'), '');
  lines.push(...section('Existing project baseline', baseline, '<What the codebase does today, from the capability matrix.>'), '');
  lines.push(...section('Functionality currently absent', absent, '<The delta between baseline and this candidate.>'), '');
  lines.push(...section('Persistent state / data structures', state, "<What's stored, in what shape, with what invariants.>"), '');
  lines.push(...section('Exact algorithm or state transitions', algorithm, '<States, transitions, triggers — or the concrete algorithmic steps.>'), '');
  lines.push(...section('Failure behavior', failureBehavior, '<What happens when this mechanism itself fails.>'), '');
  lines.push(...section('Measured technical effect', effect, '<The concrete, ideally measurable improvement. Note if this is still a hypothesis pending evidence.>'), '');
  lines.push(...section('Alternative embodiments', alternatives, '<Other ways to implement the same mechanism.>'), '');
  lines.push(...section('Potential independent-claim elements', claimElements, '<The elements that would need to appear together in a claim.>'), '');
  lines.push(...section('Nearest patent art', nearestPatentArt, '<References found by $inventor-search, with the claim element(s) each discloses and whether live/expired/abandoned.>'), '');
  lines.push(...section('Nearest non-patent art', nearestNonPatentArt, '<Standards, papers, docs, source repositories.>'), '');
  lines.push(...section('Single-reference novelty attack', singleRefAttack, '<The strongest single reference against §102 novelty, from $inventor-gate.>'), '');
  lines.push(...section('Multi-reference obviousness attack', multiRefAttack, '<The strongest two- or three-reference combination against §103, from $inventor-gate.>'), '');
  lines.push(...section('Eligibility risk', eligibilityRisk, '<§101 analysis — is this a specific technical improvement, or generic information analysis?>'), '');
  lines.push(...section('Enablement gaps', enablementGaps, '<§112 — what is missing to teach the full scope without undue experimentation?>'), '');
  lines.push(...section('Active-claim/FTO risk', ftoRisk, '<Live claims that could be infringed, by jurisdiction, with expiration and family status.>'), '');
  lines.push(...section('Design-around', designAround, '<An alternative implementation that avoids a blocking claim, if one exists.>'), '');
  lines.push(...section('Public-disclosure history', disclosureHistory, '<Cross-reference docs/disclosures.md.>'), '');
  lines.push(...section('Decision', decisionNotes || decision, '<The final disposition and reasoning. If rejected, also add an entry to docs/rejected-candidates.md.>'));

  return lines.filter(line => line !== null).join('\n') + '\n';
}

function recordCard(dir, fields) {
  if (fields.decision && !DECISIONS.includes(fields.decision)) {
    throw new Error(`Unknown decision "${fields.decision}". Expected one of: ${DECISIONS.join(', ')}`);
  }
  fs.mkdirSync(dir, { recursive: true });
  const number = fields.number || nextCardNumber(dir);
  const file = path.join(dir, `${pad(number)}-${slugify(fields.candidate)}.md`);
  fs.writeFileSync(file, renderCard({ ...fields, number }));
  return file;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const get = (name) => {
    const index = args.indexOf(name);
    return index === -1 ? undefined : args[index + 1];
  };
  const candidate = get('--candidate');
  if (!candidate) {
    console.error('Usage: node scripts/record-card.js --candidate "..." [--problem "..."] [--decision <bucket>] [--refresh-by YYYY-MM-DD] [--filing-deadline YYYY-MM-DD] [--date YYYY-MM-DD] [--dir docs/cards]');
    console.error(`Decisions: ${DECISIONS.join(', ')}`);
    process.exit(1);
  }
  const dir = get('--dir') || path.join('docs', 'cards');
  try {
    const file = recordCard(dir, {
      candidate,
      problem: get('--problem'),
      decision: get('--decision'),
      refreshBy: get('--refresh-by'),
      filingDeadline: get('--filing-deadline'),
      date: get('--date') || new Date().toISOString().slice(0, 10)
    });
    console.log(`Wrote ${file}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = { slugify, pad, nextCardNumber, renderCard, recordCard, DECISIONS };
