const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync, readdirSync, existsSync } = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
const sharp = require('sharp');

const books = readdirSync('src/books')
  .filter(file => file.endsWith('.md'))
  .map(file => ({ file, data: matter.read(path.join('src/books', file)).data }));

test('every book has a readable local cover and the expected layout', async () => {
  assert.ok(books.length > 0);
  for (const { file, data } of books) {
    assert.equal(data.layout, 'layouts/book.njk', file);
    assert.ok(data.coverImage?.startsWith('/assets/images/books/'), `${file}: local cover required`);
    const image = data.coverImage.slice(1);
    assert.ok(existsSync(image), `${file}: missing ${image}`);
    const { width, height } = await sharp(image).metadata();
    assert.ok(width > 0 && height > 0, `${file}: invalid cover`);
  }
});

test('reading shelf and every book page use the original cover copied into the build', () => {
  assert.ok(existsSync('_site/reading/index.html'), 'Run npm run build first');
  const shelf = readFileSync('_site/reading/index.html', 'utf8');
  const covers = [...shelf.matchAll(/<img\b[^>]*class="book-cover"[^>]*>/g)];
  assert.equal(covers.length, books.length, 'Every book must retain its shelf cover');

  for (const { file, data } of books) {
    const image = data.coverImage;
    assert.ok(covers.some(([img]) => img.includes(`src="${image}"`)), `${file}: missing shelf cover`);
    const page = path.join('_site/books', path.basename(file, '.md'), 'index.html');
    const html = readFileSync(page, 'utf8');
    assert.ok(html.includes(`background-image: url('${image}')`), `${file}: missing book hero`);
    assert.ok(html.includes(`<img src="${image}"`), `${file}: missing book cover`);
    const built = path.join('_site', image.slice(1));
    assert.ok(existsSync(built), `${file}: missing built cover`);
    assert.deepEqual(readFileSync(built), readFileSync(image.slice(1)), `${file}: cover changed during build`);
  }
});
