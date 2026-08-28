import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFile(resolve(root, path), 'utf8');
const mustInclude = (text, value, label) => {
  if (!text.includes(value)) throw new Error(`${label}: missing ${value}`);
};

const [home, notFound, headers, robots, config, script] = await Promise.all([
  read('dist/index.html'),
  read('dist/404.html'),
  read('dist/_headers'),
  read('dist/robots.txt'),
  read('wrangler.jsonc'),
  read('dist/lab.js'),
]);

for (const [value, label] of [
  ['Test hardware.', 'hero'],
  ['Purchased in Chile', 'local purchasing route'],
  ['Hardware Partner Program', 'partner program'],
  ['Temporary loaner', 'loaner intake'],
  ['Permanent lab unit', 'long-term intake'],
  ['mailto:ohl@arca.computer?subject=Open%20Hardware%20Lab%20intake', 'dedicated lab inbox link'],
  ['ohl@arca.computer', 'visible lab contact'],
  ['Checkout disabled in prototype', 'payment boundary'],
  ['not affiliated with or endorsed by Omarchy or 37signals.', 'affiliation disclaimer'],
  ['https://github.com/arcacomputer/open-hardware-lab', 'public repository link'],
  ['rel="canonical"', 'canonical metadata'],
  ['og:title', 'Open Graph metadata'],
]) mustInclude(home, value, label);

mustInclude(notFound, 'Nothing compiled here.', 'custom 404');
mustInclude(home, '<link rel="canonical" href="https://ohl.arca.computer/">', 'custom-domain canonical');
mustInclude(headers, "default-src 'self'", 'CSP');
mustInclude(headers, 'payment=()', 'payment permission');
mustInclude(headers, 'Cache-Control: no-transform', 'HTML transform protection');
mustInclude(robots, 'https://ohl.arca.computer/sitemap-index.xml', 'custom-domain sitemap discovery');
mustInclude(config, '"directory": "./dist"', 'asset directory');
mustInclude(config, '"not_found_handling": "404-page"', '404 handling');
mustInclude(config, '"pattern": "ohl.arca.computer"', 'custom domain route');
mustInclude(config, '"custom_domain": true', 'custom domain mode');
mustInclude(config, '"workers_dev": false', 'provider hostname disabled');
mustInclude(script, 'showModal()', 'checkout preview interaction');

const visible = `${home}\n${notFound}\n${script}`;
for (const marker of ['sk_live_', 'sk_test_', 'pk_live_', 'pk_test_']) {
  if (visible.includes(marker)) throw new Error(`secret scan: found ${marker}`);
}
if (/https?:\/\/(?!ohl\.arca\.computer)/.test(script)) {
  throw new Error('network boundary: client script contains an unexpected external URL');
}
for (const path of [
  'dist/sitemap-index.xml',
  'governance/independence.md',
  'hardware/TEMPLATE.md',
  'methodology/README.md',
  'LICENSES/MIT.txt',
  'LICENSES/CC-BY-4.0.txt',
]) await stat(resolve(root, path));
console.log('site and research-program contract: pass');
