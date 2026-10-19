const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const script = readFileSync('assets/js/writings-pagination.js', 'utf8');

function category(count, label) {
  const items = Array.from({ length: count }, () => ({ style: {} }));
  const controls = {
    hidden: true, buttons: [],
    appendChild(button) { this.buttons.push(button); },
    querySelectorAll() { return this.buttons; },
  };
  const status = { textContent: '' };
  const heading = {
    textContent: label, focused: false, scrolled: false,
    focus() { this.focused = true; },
    scrollIntoView() { this.scrolled = true; },
  };
  const section = {
    querySelector(selector) {
      return { '.pagination-controls': controls, '.pagination-status': status, h2: heading }[selector];
    },
  };
  return {
    items, controls, status, heading,
    closest: () => section,
    querySelectorAll: () => items,
    visible: () => items.filter(item => item.style.display !== 'none'),
  };
}

function visit(grids) {
  runInNewContext(script, {
    document: {
      addEventListener: (event, callback) => callback(),
      querySelectorAll: () => grids,
      createElement: () => ({
        dataset: {}, attributes: {},
        classList: { toggle() {} },
        setAttribute(name, value) { this.attributes[name] = value; },
        removeAttribute(name) { delete this.attributes[name]; },
        addEventListener(event, callback) { this.click = callback; },
      }),
    },
  });
}

for (const count of [0, 1, 6, 7, 12, 13]) {
  test(`${count} articles: correct page boundaries and accessible state`, () => {
    const grid = category(count, 'Creative & craft');
    visit([grid]);
    assert.equal(grid.visible().length, Math.min(count, 6));
    assert.equal(grid.heading.focused, false, 'Initialisation must not steal focus');
    if (count <= 6) {
      assert.equal(grid.controls.hidden, true);
      assert.equal(grid.controls.buttons.length, 0);
      return;
    }
    const pages = Math.ceil(count / 6);
    assert.equal(grid.controls.buttons.length, pages);
    assert.equal(grid.controls.hidden, false);
    for (let page = 1; page <= pages; page++) {
      const button = grid.controls.buttons[page - 1];
      assert.equal(button.attributes['aria-label'], `Go to page ${page} in Creative & craft`);
      button.click();
      const start = (page - 1) * 6;
      assert.deepEqual(grid.visible(), grid.items.slice(start, start + 6));
      assert.equal(button.attributes['aria-current'], 'page');
      assert.equal(grid.controls.buttons.filter(b => b.attributes['aria-current']).length, 1);
      assert.ok(grid.status.textContent.includes(`Page ${page} of ${pages}`));
      assert.equal(grid.heading.focused, true);
      assert.equal(grid.heading.scrolled, true);
    }
    grid.controls.buttons[0].click();
    assert.deepEqual(grid.visible(), grid.items.slice(0, 6), 'Can return to page one');
  });
}

test('all categories paginate independently, including Creative & craft and Technology', () => {
  const grids = ['Creative & craft', 'Lived experience', 'Reflection', 'Technology']
    .map(label => category(13, label));
  visit(grids);
  grids[0].controls.buttons[2].click();
  assert.equal(grids[0].visible().length, 1);
  for (const grid of grids.slice(1)) {
    assert.deepEqual(grid.visible(), grid.items.slice(0, 6));
    assert.equal(grid.controls.buttons[0].attributes['aria-current'], 'page');
  }
});
