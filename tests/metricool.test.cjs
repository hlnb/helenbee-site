const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');

const template = readFileSync('src/_includes/partials/metricool.njk', 'utf8');
const script = template.match(/<script>([\s\S]*?)<\/script>/)[1];

function visit(consent, storageBlocked = false) {
  const appended = [];
  const tracked = [];
  let accept;
  runInNewContext(script, {
    document: {
      addEventListener: (event, callback) => callback(),
      createElement: () => ({}),
      head: { appendChild: element => appended.push(element) },
      getElementById: () => ({ addEventListener: (event, callback) => { accept = callback; } }),
    },
    localStorage: { getItem: () => {
      if (storageBlocked) throw new Error('Storage blocked');
      return consent;
    } },
    beTracker: { t: options => tracked.push(options.hash) },
  });
  return { appended, tracked, accept: () => accept() };
}

test('accepted visitors load the correct tracker and initialise only after load', () => {
  const page = visit('accepted');
  assert.equal(page.appended.length, 1);
  assert.equal(page.appended[0].src, 'https://tracker.metricool.com/resources/be.js');
  assert.deepEqual(page.tracked, []);
  page.appended[0].onload();
  assert.deepEqual(page.tracked, ['6b34a182c4018ce46b6adf68b6255098']);
  page.accept();
  assert.equal(page.appended.length, 1);
});

for (const consent of [null, 'rejected']) {
  test(`consent ${consent} sends no request until acceptance`, () => {
    const page = visit(consent);
    assert.equal(page.appended.length, 0);
    page.accept();
    page.accept();
    assert.equal(page.appended.length, 1);
  });
}

test('blocked storage waits for explicit acceptance', () => {
  const page = visit(null, true);
  assert.equal(page.appended.length, 0);
  page.accept();
  assert.equal(page.appended.length, 1);
});
