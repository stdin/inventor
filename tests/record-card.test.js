const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { slugify, pad, nextCardNumber, renderCard, recordCard, DECISIONS } = require('../scripts/record-card');

assert.equal(slugify('Stale-Evidence Retry Fence'), 'stale-evidence-retry-fence');
assert.equal(slugify(''), 'candidate');
assert.equal(pad(3), '0003');
assert.ok(DECISIONS.includes('trade-secret'));

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'inventor-cards-'));
assert.equal(nextCardNumber(dir), 1);

const card = renderCard({
  number: 1,
  candidate: 'Vector-clock conflict fence',
  problem: 'Concurrent tenant writes race on the same order-state transaction.',
  decision: 'incubate'
});
assert.match(card, /^# 0001\. Vector-clock conflict fence/);
assert.match(card, /- Decision: incubate/);
assert.match(card, /## Human contributors and claimed contribution/);
assert.match(card, /Leave blank until the human invention workshop/);

const file = recordCard(dir, { candidate: 'Vector-clock conflict fence', decision: 'incubate' });
assert.ok(fs.existsSync(file));
assert.match(path.basename(file), /^0001-vector-clock-conflict-fence\.md$/);
assert.equal(nextCardNumber(dir), 2);

assert.throws(() => recordCard(dir, { candidate: 'Bad', decision: 'not-a-real-bucket' }), /Unknown decision/);

console.log('record-card tests passed');
