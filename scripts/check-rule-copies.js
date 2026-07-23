#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const canonical = read('rules/inventor.md').trim();

const copies = [
  ['AGENTS.md', text => text.trim()],
  ['CLAUDE.md', text => text.trim()],
  ['GEMINI.md', text => text.trim()],
  ['.github/copilot-instructions.md', text => text.trim()],
  ['.cursor/rules/inventor.mdc', stripFrontmatter],
  ['.windsurf/rules/inventor.md', text => text.trim()],
  ['.clinerules/inventor.md', text => text.trim()],
  ['.kiro/steering/inventor.md', stripFrontmatter],
  ['.agents/rules/inventor.md', text => text.trim()]
];

const invariants = [
  'capability matrix',
  'invention card',
  '§101',
  '§102',
  '§103',
  '§112',
  'FTO',
  'human invention workshop',
  'not legal advice'
];

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), 'utf8').replace(/\r\n/g, '\n');
}

function stripFrontmatter(text) {
  return text.replace(/^---\n[\s\S]*?\n---\n*/, '').trim();
}

let failed = false;

for (const [relPath, normalize] of copies) {
  const actual = normalize(read(relPath));
  if (actual !== canonical) {
    console.error(`${relPath} drifted from rules/inventor.md`);
    failed = true;
  }
}

const skill = read('skills/inventor/SKILL.md');
for (const phrase of invariants) {
  for (const [label, text] of [['rules/inventor.md', canonical], ['skills/inventor/SKILL.md', skill]]) {
    if (!text.includes(phrase)) {
      console.error(`${label} is missing invariant: "${phrase}"`);
      failed = true;
    }
  }
}

if (failed) {
  console.error('Update rules/inventor.md, copied instruction files, or SKILL.md.');
  process.exit(1);
}

console.log(`Rule copies match; ${invariants.length} invariants present.`);
