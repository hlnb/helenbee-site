const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync, readdirSync } = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
const yaml = require('js-yaml');
const categories = require('../src/_data/writingCategories.json');

function postsIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? postsIn(file) : file.endsWith('.md') ? [file] : [];
  });
}

test('writing metadata and CMS choices use the four consolidated categories', () => {
  assert.deepEqual(Object.keys(categories).sort(), ['creative', 'lived-experience', 'reflection', 'technology']);
  const counts = Object.fromEntries(Object.keys(categories).map(key => [key, 0]));
  for (const file of postsIn('src/writings')) {
    const { data } = matter.read(file);
    assert.ok(Object.hasOwn(categories, data.category), `${file}: unexpected category ${data.category}`);
    counts[data.category]++;
  }
  assert.ok(Object.values(counts).every(count => count > 0));
  const config = yaml.load(readFileSync('public/admin/config.yml', 'utf8'));
  const field = config.collections.find(collection => collection.name === 'writings')
    .fields.find(field => field.name === 'category');
  assert.deepEqual(field.options.map(option => option.value).sort(), Object.keys(categories).sort());
  for (const option of field.options) {
    assert.equal(option.label, categories[option.value]);
  }
});

test('built writings index has one grid per category and one card per listed article', () => {
  const html = readFileSync('_site/writings/index.html', 'utf8');
  const grids = [...html.matchAll(/class="books-grid" data-category="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(grids.sort(), Object.keys(categories).sort());
  for (const label of Object.values(categories)) {
    assert.ok(html.includes(`tabindex="-1">${label}</h2>`) ||
      html.includes(`tabindex="-1">${label.replace('&', '&amp;')}</h2>`), label);
  }
  const urls = [...html.matchAll(/<p class="title is-5"><a href="([^"]+)"/g)].map(match => match[1]);
  assert.ok(urls.length > 0);
  assert.equal(new Set(urls).size, urls.length, 'No duplicated article cards');
  const controls = [...html.matchAll(/class="pagination-controls"[^>]+data-category="([^"]+)"/g)]
    .map(match => match[1]);
  assert.deepEqual(controls.sort(), Object.keys(categories).sort());
  for (const category of Object.keys(categories)) {
    assert.ok(html.includes(`href="#category-${category}"`));
    assert.ok(html.includes(`id="category-${category}" tabindex="-1"`));
  }
});

test('article cards put a semantic publication date after the title', () => {
  const html = readFileSync('_site/writings/index.html', 'utf8');
  const headers = [...html.matchAll(/<header class="card-header">([\s\S]*?)<\/header>/g)];
  assert.ok(headers.length > 0);
  for (const [, header] of headers) {
    assert.match(header, /<p class="title is-5">[\s\S]*?<\/p>\s*<p class="card-published-date">/);
    assert.match(header, /<time datetime="\d{4}-\d{2}-\d{2}">[^<]+<\/time>/);
  }
  const permissionToStop = headers.find(([, header]) => header.includes('2026-01-08-permission-to-stop/'));
  assert.ok(permissionToStop, 'Publication-date regression example is present');
  assert.match(permissionToStop[1], /<time datetime="2026-01-14">January 14, 2026<\/time>/);
});
