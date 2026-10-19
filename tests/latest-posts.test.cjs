const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { DateTime, Settings } = require('luxon');
const configure = require('../.eleventy.js');

const collections = {};
const filters = {};
configure(new Proxy({}, {
  get: (_, name) => (...args) => {
    if (name === 'addCollection') collections[args[0]] = args[1];
    if (name === 'addFilter') filters[args[0]] = args[1];
  },
}));

function post(title, date, publishedDate, status) {
  return { date: new Date(date), data: { title, publishedDate, status } };
}

test('homepage excludes scheduled articles before selecting the three latest posts', () => {
  const originalNow = Settings.now;
  const now = DateTime.fromISO('2026-10-19T12:00:00+08:00').toMillis();
  Settings.now = () => now;
  try {
    const posts = [
      post('Scheduled eHealth', '2026-10-26', '2026-10-26T00:33:00+08:00'),
      post('Latest published', '2026-10-18', '2026-10-18'),
      post('Second published', '2026-10-17', '2026-10-17', 'published'),
      post('Third published', '2026-10-16', '2026-10-16'),
      post('Fourth published', '2026-10-15', '2026-10-15'),
      post('Editorial draft', '2026-10-19', '2026-10-19', 'draft'),
    ];
    const selected = collections.latestPosts({ getFilteredByGlob: () => posts });
    assert.deepEqual(selected.map(post => post.data.title), ['Latest published', 'Second published', 'Third published']);
    assert.ok(selected.every(post => filters.isPublished(post.data.publishedDate)));
  } finally {
    Settings.now = originalNow;
  }
});

test('scheduled article becomes eligible at the exact Perth publication time', () => {
  const originalNow = Settings.now;
  const publicationTime = DateTime.fromISO('2026-10-26T00:33:00+08:00').toMillis();
  const scheduled = post('Scheduled eHealth', '2026-10-26', '2026-10-26T00:33:00+08:00');
  try {
    for (const [now, expected] of [[publicationTime - 1, 0], [publicationTime, 1]]) {
      Settings.now = () => now;
      assert.equal(collections.latestPosts({ getFilteredByGlob: () => [scheduled] }).length, expected);
      assert.equal(filters.isPublished(scheduled.data.publishedDate), expected === 1);
    }
  } finally {
    Settings.now = originalNow;
  }
});

test('built pages respect the eHealth publication date', () => {
  const scheduledUrl = '/writings/2026/10/2026-10-19-eight-years-later-what-happened-to-the-promise-of-ehealth/';
  const due = filters.isPublished('2026-10-26T00:33:00+08:00');
  assert.equal(readFileSync('_site/writings/index.html', 'utf8').includes(`href="${scheduledUrl}"`), due);
  if (!due) {
    assert.equal(readFileSync('_site/index.html', 'utf8').includes(`href="${scheduledUrl}"`), false);
  }
});
