const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function filesIn(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  });
}

test('all generated public HTML uses the shared brand, a skip target and one main landmark', () => {
  const pages = filesIn('_site').filter(file => file.endsWith('.html') && !file.startsWith('_site/admin/'));
  assert.ok(pages.length > 100, 'Run the production build first');
  for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    assert.match(html, /href="\/assets\/css\/brand.css"/, file);
    assert.match(html, /href="#main-content"/, file);
    assert.match(html, /<main id="main-content" tabindex="-1">/, file);
    assert.equal((html.match(/<main(?:\s|>)/g) || []).length, 1, file);
    assert.equal((html.match(/<\/main>/g) || []).length, 1, file);
    assert.match(html, /<button type="button" class="navbar-burger"[^>]*aria-controls="navbarMenu"/, file);
  }
});

test('published tag and category archives contain real articles without scheduled content', () => {
  const tagged = fs.readFileSync('_site/tags/reflection/index.html', 'utf8');
  const category = fs.readFileSync('_site/category/technology/index.html', 'utf8');
  const tags = fs.readFileSync('_site/tags/index.html', 'utf8');
  assert.match(tagged, /class="archive-list"[\s\S]*<h2><a href="\/writings\//);
  assert.match(category, /class="writing-card"/);
  assert.match(tags, /href="\/tags\/reflection\/"/);
  for (const html of [tagged, category]) {
    if (Date.now() < Date.parse('2026-10-26T00:33:00+08:00')) {
      assert.doesNotMatch(html, /href="[^"]*2026-10-19-eight-years-later/);
    }
  }
  assert.match(fs.readFileSync('_site/404.html', 'utf8'), /Content not found\./);
});

test('the tape contains HELEN B with five data holes and an independent feed hole per column', () => {
  const html = fs.readFileSync('_site/index.html', 'utf8');
  assert.ok(html.includes('class="reader-tape"'), 'Full reader tape must be rendered');
  const tape = html.split('class="reader-tape"')[1].split('class="reader-status"')[0];
  const columns = [...tape.matchAll(/<div class="tape-character[^>]*>([\s\S]*?)<\/div>/g)];
  assert.equal(columns.length, 7);
  const bits = columns.map(([, column]) => {
    assert.equal((column.match(/class="feed-hole"/g) || []).length, 1);
    assert.match(column, /tape-hole[^<]*<\/span>\s*<span class="feed-hole"><\/span>\s*<span class="tape-hole/);
    const data = [...column.matchAll(/class="tape-hole([^\"]*)"/g)];
    assert.equal(data.length, 5);
    return data.map(([, classes]) => classes.includes('is-punched') ? '1' : '0').join('');
  });
  assert.deepEqual(bits, ['00101', '10000', '01001', '10000', '00110', '00100', '10011']);
});

function navigation() {
  const callbacks = {};
  const expanded = { value: 'false' };
  const menuState = { open: false };
  const burger = {
    setAttribute: (name, value) => { if (name === 'aria-expanded') expanded.value = value; },
    getAttribute: () => expanded.value,
    addEventListener: (name, callback) => { callbacks[name] = callback; },
    focus: () => { callbacks.focused = true; },
  };
  const menu = {
    classList: { toggle: (_, value) => { menuState.open = value; } },
    addEventListener: (name, callback) => { callbacks[`menu-${name}`] = callback; },
  };
  const document = {
    body: { classList: { add: () => {} } },
    addEventListener: (_, callback) => { callbacks.ready = callback; },
    querySelector: selector => ({ '.navbar-burger': burger, '#navbarMenu': menu, '.site-header': {
      addEventListener: (_, callback) => { callbacks.keydown = callback; },
    } })[selector],
    querySelectorAll: () => [],
  };
  const source = fs.readFileSync('src/_includes/layouts/base.njk', 'utf8');
  const script = [...source.matchAll(/<script>([\s\S]*?)<\/script>/g)].find(([, code]) => code.includes('const burger'))[1];
  vm.runInNewContext(script, {
    document,
    window: { matchMedia: () => ({ addEventListener: (_, callback) => { callbacks.resize = callback; } }) },
  });
  callbacks.ready();
  return { callbacks, expanded, menuState };
}

test('menu keeps its announced state in sync and Escape closes it and restores focus', () => {
  const { callbacks, expanded, menuState } = navigation();
  callbacks.click();
  assert.equal(expanded.value, 'true');
  assert.equal(menuState.open, true);
  callbacks.keydown({ key: 'Escape' });
  assert.equal(expanded.value, 'false');
  assert.equal(menuState.open, false);
  assert.equal(callbacks.focused, true);
  callbacks.click();
  callbacks['menu-click']({ target: { closest: () => ({}) } });
  assert.equal(expanded.value, 'false');
  callbacks.click();
  callbacks.resize();
  assert.equal(menuState.open, false);
});

test('Escape while closed does not move focus and non-links leave the menu open', () => {
  const { callbacks, expanded } = navigation();
  callbacks.keydown({ key: 'Escape' });
  assert.equal(callbacks.focused, undefined);
  callbacks.click();
  callbacks['menu-click']({ target: { closest: () => null } });
  callbacks.keydown({ key: 'Tab' });
  assert.equal(expanded.value, 'true');
});

test('cover availability checks stay within assets and reject missing or invalid paths', () => {
  const filters = {};
  require('../.eleventy.js')(new Proxy({}, {
    get: (_, name) => (...args) => {
      if (name === 'addFilter') filters[args[0]] = args[1];
    },
  }));
  const exists = filters.localImageExists;
  assert.equal(exists('/assets/images/books/atomic-habits.jpg'), true);
  for (const invalid of [undefined, null, 42, '/assets/images/books/absent.jpg', '/assets/images/books', '/assets/../package.json', '/assets/../../etc/passwd', 'https://example.com/cover.jpg']) {
    assert.equal(exists(invalid), false, String(invalid));
  }
});

test('reading shelf retains every cover reference and renders missing covers as labelled real book data', () => {
  const matter = require('gray-matter');
  const html = fs.readFileSync('_site/reading/index.html', 'utf8');
  const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  for (const file of filesIn('src/books').filter(file => file.endsWith('.md'))) {
    const { data } = matter.read(file);
    assert.ok(html.includes(`data-cover-src="${escape(data.coverImage)}"`), file);
    if (fs.existsSync(data.coverImage.slice(1))) {
      assert.ok(html.includes(`src="${data.coverImage}"`), file);
    } else {
      const book = fs.readFileSync(path.join('_site/books', path.basename(file, '.md'), 'index.html'), 'utf8');
      assert.match(book, /class="book-cover-fallback"/);
      assert.ok(book.includes(data.title), file);
      assert.ok(book.includes(data.author), file);
      assert.ok(book.includes('Cover image unavailable'), file);
      assert.ok(!book.includes(`src="${data.coverImage}"`), file);
    }
  }
});
