import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import vm from 'node:vm';
import { parseHTML } from 'linkedom';

const root = resolve(import.meta.dirname, '..');
const html = await readFile(resolve(root, 'dist/index.html'), 'utf8');
const script = await readFile(resolve(root, 'dist/lab.js'), 'utf8');

function page(url = 'https://ohl.arca.computer/', source = html) {
  const { window, document } = parseHTML(source);
  window.location = new URL(url);
  window.matchMedia = () => ({ addEventListener() {} });
  vm.runInNewContext(script, { window, document, URLSearchParams });
  return { window, document };
}

function key(window, target, value) {
  const event = new window.Event('keydown', {
    bubbles: true,
    cancelable: true,
  });
  Object.defineProperty(event, 'key', { value });
  target.dispatchEvent(event);
  return event;
}

function assertSelected(document, expected) {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const panels = [...document.querySelectorAll('[role="tabpanel"]')];
  assert.equal(
    tabs.filter((tab) => tab.getAttribute('aria-selected') === 'true').length,
    1,
  );
  assert.equal(
    tabs.filter((tab) => tab.getAttribute('tabindex') === '0').length,
    1,
  );
  assert.equal(tabs[expected].getAttribute('aria-selected'), 'true');
  assert.equal(panels.filter((panel) => !panel.hidden).length, 1);
  assert.equal(panels[expected].hidden, false);
  assert.equal(
    panels[expected].getAttribute('aria-labelledby'),
    tabs[expected].id,
  );
}

test('all research remains readable and navigation available without JavaScript', () => {
  const { document } = parseHTML(html);
  const panels = [...document.querySelectorAll('[data-track-panel]')];
  assert.equal(panels.length, 4);
  assert.ok(
    panels.every((panel) => !panel.hidden && panel.querySelector('h3')),
  );
  assert.ok(document.querySelector('.track-selector').hidden);
  assert.ok(document.querySelector('.menu-toggle').hidden);
  assert.equal(
    document.querySelector('.site-header').hasAttribute('data-enhanced'),
    false,
  );
  assert.equal(document.querySelector('#primary-navigation').hidden, false);
});

test('track selection keeps exactly one selected tab, tab stop and visible panel', () => {
  const { document } = page();
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  assertSelected(document, 0);
  for (const index of [2, 1, 3, 0]) {
    tabs[index].click();
    assertSelected(document, index);
  }
});

test('track keyboard controls wrap and support Home and End', () => {
  const { document, window } = page();
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  assert.equal(key(window, tabs[0], 'ArrowUp').defaultPrevented, true);
  assertSelected(document, 3);
  key(window, tabs[3], 'ArrowDown');
  assertSelected(document, 0);
  key(window, tabs[0], 'End');
  assertSelected(document, 3);
  key(window, tabs[3], 'Home');
  assertSelected(document, 0);
  key(window, tabs[0], 'ArrowRight');
  assertSelected(document, 1);
  key(window, tabs[1], 'ArrowLeft');
  assertSelected(document, 0);
  assert.equal(key(window, tabs[0], 'Tab').defaultPrevented, false);
});

test('an incoming research fragment opens the requested panel', () => {
  const { document } = page('https://ohl.arca.computer/#track-agents');
  assertSelected(document, 2);
});

test('menu expands, closes on navigation and dismisses with Escape', () => {
  const { document, window } = page();
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-navigation');
  assert.equal(button.hidden, false);
  assert.equal(button.getAttribute('aria-expanded'), 'false');
  button.click();
  assert.equal(button.getAttribute('aria-expanded'), 'true');
  assert.equal(nav.hasAttribute('data-open'), true);
  nav.querySelector('a').click();
  assert.equal(button.getAttribute('aria-expanded'), 'false');
  assert.equal(nav.hasAttribute('data-open'), false);
  button.click();
  key(window, nav, 'Escape');
  assert.equal(button.getAttribute('aria-expanded'), 'false');
  assert.equal(nav.hasAttribute('data-open'), false);
});

test('support return message is conditional and does not assert payment verification', () => {
  assert.equal(page().document.querySelector('#support-thanks').hidden, true);
  assert.equal(
    page('https://ohl.arca.computer/?support=no').document.querySelector(
      '#support-thanks',
    ).hidden,
    true,
  );
  const thanks = page(
    'https://ohl.arca.computer/?support=thanks',
  ).document.querySelector('#support-thanks');
  assert.equal(thanks.hidden, false);
  assert.match(thanks.textContent, /If your payment completed/);
  assert.doesNotMatch(thanks.textContent, /Support received/);
});

for (const route of ['index.html', 'support-terms/index.html', '404.html']) {
  test(`${route}: document landmarks, unique IDs and local assets are intact`, async () => {
    const source = await readFile(resolve(root, 'dist', route), 'utf8');
    const { document } = page('https://ohl.arca.computer/', source);
    assert.equal(document.querySelectorAll('main').length, 1);
    assert.equal(document.querySelectorAll('h1').length, 1);
    assert.equal(document.documentElement.lang, 'en');
    assert.ok(document.querySelector('#main-content'));
    assert.equal(
      document.querySelector('.skip-link').getAttribute('href'),
      '#main-content',
    );
    const ids = [...document.querySelectorAll('[id]')].map(
      (element) => element.id,
    );
    assert.equal(new Set(ids).size, ids.length, 'IDs must be unique');
    for (const anchor of document.querySelectorAll('a[href^="#"]')) {
      assert.ok(
        document.getElementById(anchor.getAttribute('href').slice(1)),
        `Missing anchor: ${anchor.getAttribute('href')}`,
      );
    }
    for (const asset of document.querySelectorAll(
      'script[src], link[rel="stylesheet"], link[rel="preload"], link[rel="icon"]',
    )) {
      const path = asset.getAttribute('src') || asset.getAttribute('href');
      assert.ok(path.startsWith('/'), `Asset must be hosted locally: ${path}`);
      assert.ok((await stat(resolve(root, 'dist', path.slice(1)))).size > 0);
    }
  });
}
