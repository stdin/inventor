#!/usr/bin/env node
// Close the invention-card loop.
//
// Most U.S. nonprovisional applications stay unpublished for around 18 months
// (MPEP §1120), so a prior-art search that came back clear at card creation
// can go stale invisibly while a colliding application sits in the dark. Every
// card can declare a "Refresh by:" date and a "Filing deadline:" date; this
// scans docs/cards/ and reports which ones are due. Pure parsing/evaluation
// helpers are exported for tests; main() does the fs scan. Zero dependencies,
// no network calls — filing and refresh dates are project-declared, not
// derived from an external registry.
const fs = require('node:fs');
const path = require('node:path');

function parseCard(text) {
  const body = String(text);
  const heading = body.match(/^#\s*(\d{4})\.\s*(.+?)\s*$/m);
  const status = body.match(/^[-*]\s*Status:\s*(.+?)\s*$/im);
  const decision = body.match(/^[-*]\s*Decision:\s*(.+?)\s*$/im);
  const refreshBy = body.match(/^[-*]\s*Refresh by:\s*(\d{4}-\d{2}-\d{2})/im);
  const filingDeadline = body.match(/^[-*]\s*Filing deadline:\s*(\d{4}-\d{2}-\d{2})/im);
  return {
    number: heading ? heading[1] : null,
    title: heading ? heading[2].trim() : null,
    status: status ? status[1].trim() : null,
    decision: decision ? decision[1].trim() : null,
    refreshBy: refreshBy ? refreshBy[1] : null,
    filingDeadline: filingDeadline ? filingDeadline[1] : null
  };
}

function isDateDue(dateStr, now) {
  return Boolean(dateStr) && Boolean(now) && dateStr <= now;
}

// ctx: { now: 'YYYY-MM-DD' }
function evaluateCard(card, ctx = {}) {
  const now = ctx.now;
  const base = { number: card.number, title: card.title };

  if (card.decision && /^(reject|implement-without-filing)$/i.test(card.decision)) {
    return { ...base, status: 'closed', reason: `Disposition "${card.decision}" — no further refresh needed.` };
  }

  const flags = [];
  if (isDateDue(card.filingDeadline, now)) flags.push(`filing deadline ${card.filingDeadline} has passed`);
  if (isDateDue(card.refreshBy, now)) flags.push(`refresh date ${card.refreshBy} has passed`);

  if (flags.length) return { ...base, status: 'due', reason: flags.join('; ') };

  if (!card.refreshBy && !card.filingDeadline) {
    return { ...base, status: 'manual', reason: 'No Refresh by / Filing deadline set — add one or review by hand.' };
  }

  const pendingDates = [card.refreshBy, card.filingDeadline].filter(Boolean);
  return { ...base, status: 'pending', reason: `Next date: ${pendingDates.sort()[0]}.` };
}

function formatReport(results) {
  const groups = { due: [], manual: [], pending: [], closed: [] };
  for (const r of results) (groups[r.status] || groups.manual).push(r);

  const lines = ['# Invention card refresh check', ''];
  lines.push(`${groups.due.length} due, ${groups.manual.length} need a human look, ${groups.pending.length} pending, ${groups.closed.length} closed.`, '');

  const section = (title, icon, rows) => {
    if (!rows.length) return;
    lines.push(`## ${title}`, '');
    for (const r of rows) lines.push(`- ${icon} **${r.number}. ${r.title}** — ${r.reason}`);
    lines.push('');
  };
  section('Due now', '🔔', groups.due);
  section('Needs a human look', '🤔', groups.manual);
  section('Not yet due', '⏳', groups.pending);
  if (groups.closed.length) section('Closed', '🗄', groups.closed);

  if (!groups.due.length && !groups.manual.length) lines.push('_Nothing to refresh right now._', '');
  return lines.join('\n');
}

function readCards(dir) {
  let entries = [];
  try { entries = fs.readdirSync(dir); } catch (_error) { return []; }
  return entries
    .filter(name => /^\d{4}-.+\.md$/.test(name))
    .filter(name => name !== '0000-template.md')
    .sort()
    .map(name => parseCard(fs.readFileSync(path.join(dir, name), 'utf8')));
}

function main() {
  const arg = (name) => { const i = process.argv.indexOf(name); return i === -1 ? undefined : process.argv[i + 1]; };
  const dir = arg('--dir') || path.join('docs', 'cards');
  const asJson = process.argv.includes('--json');
  const now = new Date().toISOString().slice(0, 10);

  const cards = readCards(dir);
  if (!cards.length) {
    console.log(`No invention cards found in ${dir}.`);
    return;
  }
  const results = cards.map(card => evaluateCard(card, { now }));

  if (asJson) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    console.log(formatReport(results));
  }
}

if (require.main === module) main();

module.exports = { parseCard, isDateDue, evaluateCard, formatReport, readCards };
