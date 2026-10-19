const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync, readdirSync, existsSync } = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
const sharp = require('sharp');

function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  });
}

test('every writing has a readable local hero image and the writing layout', async () => {
  const posts = filesIn('src/writings').filter(file => file.endsWith('.md'));
  assert.ok(posts.length > 0);
  for (const post of posts) {
    const { data } = matter.read(post);
    assert.equal(data.layout, 'layouts/writing.njk', post);
    assert.ok(data.image?.startsWith('/assets/'), `${post}: local hero required`);
    const image = data.image.slice(1);
    assert.ok(existsSync(image), `${post}: missing ${image}`);
    const metadata = await sharp(image).metadata();
    assert.ok(metadata.width > 0 && metadata.height > 0, `${post}: invalid image`);
  }
});

test('built writings index cards and article heroes resolve to copied image files', () => {
  assert.ok(existsSync('_site/writings/index.html'), 'Run npm run build first');
  const pages = filesIn('_site/writings').filter(file => file.endsWith('.html'));
  let heroCount = 0;
  let cardCount = 0;
  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    const heroes = [...html.matchAll(/<img class="brand-hero-image" src="([^"]+)"/g)];
    const cards = [...html.matchAll(/<img class="card-media-img" src="([^"]+)"/g)];
    heroCount += heroes.length;
    cardCount += cards.length;
    for (const [, image] of [...heroes, ...cards]) {
      assert.ok(image.startsWith('/assets/'), `${page}: unexpected image URL ${image}`);
      assert.ok(existsSync(path.join('_site', decodeURI(image))), `${page}: missing built image ${image}`);
    }
  }
  assert.ok(heroCount >= 2, 'Index and article heroes must be checked');
  assert.ok(cardCount > 0, 'Writing cards must be checked');
});
