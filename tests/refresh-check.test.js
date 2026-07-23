const assert = require('node:assert/strict');
const { parseCard, isDateDue, evaluateCard, formatReport } = require('../scripts/refresh-check');

const parsed = parseCard(`# 0001. Vector-clock conflict fence

- Status: In diligence
- Date: 2026-01-01
- Refresh by: 2026-06-01
- Filing deadline: 2027-01-01
- Decision: incubate
`);
assert.equal(parsed.number, '0001');
assert.equal(parsed.title, 'Vector-clock conflict fence');
assert.equal(parsed.refreshBy, '2026-06-01');
assert.equal(parsed.filingDeadline, '2027-01-01');
assert.equal(parsed.decision, 'incubate');

assert.equal(isDateDue('2026-01-01', '2026-06-01'), true);
assert.equal(isDateDue('2026-12-01', '2026-06-01'), false);
assert.equal(isDateDue(null, '2026-06-01'), false);

const due = evaluateCard(parsed, { now: '2026-07-01' });
assert.equal(due.status, 'due');
assert.match(due.reason, /refresh date 2026-06-01 has passed/);

const pending = evaluateCard(parsed, { now: '2026-02-01' });
assert.equal(pending.status, 'pending');

const rejected = evaluateCard({ number: '0002', title: 'X', decision: 'reject' }, { now: '2026-07-01' });
assert.equal(rejected.status, 'closed');

const manual = evaluateCard({ number: '0003', title: 'Y', decision: 'incubate' }, { now: '2026-07-01' });
assert.equal(manual.status, 'manual');

const report = formatReport([due, pending, rejected, manual]);
assert.match(report, /1 due, 1 need a human look, 1 pending, 1 closed/);
assert.match(report, /Due now/);

console.log('refresh-check tests passed');
