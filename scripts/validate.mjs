import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFile(resolve(root, path), 'utf8');
const mustInclude = (text, value, label) => {
  if (!text.includes(value)) throw new Error(`${label}: missing ${value}`);
};

const [home, supportTerms, notFound, headers, robots, config, script] = await Promise.all([
  read('dist/index.html'),
  read('dist/support-terms/index.html'),
  read('dist/404.html'),
  read('dist/_headers'),
  read('dist/robots.txt'),
  read('wrangler.jsonc'),
  read('dist/lab.js'),
]);
const [readme, independence] = await Promise.all([
  read('README.md'),
  read('governance/independence.md'),
]);

for (const [value, label] of [
  ['Test locally.', 'global-but-located hero'],
  ['What “open” means here', 'open-process definition'],
  ['The lab starts empty, not imaginary.', 'honest lab state'],
  ['No physical unit has been accepted', 'empty public inventory'],
  ['Campaigns are optional procurement tools', 'inventory-driven model'],
  ['Hardware pool', 'available hardware input'],
  ['Lab fund', 'available funding input'],
  ['Omarchy compatibility', 'Omarchy research track'],
  ['Retail Linux hardware', 'retail research track'],
  ['Agent workstations', 'agent-workstation track'],
  ['Temporary loan', 'loan intake'],
  ['Permanent placement', 'retained-unit intake'],
  ['Retail delivery', 'retailer intake'],
  ['A suggestion does not guarantee an operating system, schedule, report or positive result.', 'no intake promise'],
  ['mailto:ohl@arca.computer?subject=Open%20Hardware%20Lab%20intake', 'dedicated lab inbox link'],
  ['ohl@arca.computer', 'visible lab contact'],
  ['https://buy.stripe.com/aFacN41Lw5oH1BH7G57ss03', 'live Stripe support link'],
  ['Not a charitable contribution or tax-deductible', 'support tax disclosure'],
  ['Read the support terms', 'support terms link'],
  ['Independent from tested vendors and operating-system projects.', 'independence disclaimer'],
  ['https://github.com/arcacomputer/open-hardware-lab', 'public repository link'],
  ['rel="canonical"', 'canonical metadata'],
  ['og:title', 'Open Graph metadata'],
]) mustInclude(home, value, label);

mustInclude(notFound, 'Nothing compiled here.', 'custom 404');
mustInclude(supportTerms, 'Support terms.', 'support terms page');
mustInclude(supportTerms, 'normally final', 'refund policy');
mustInclude(supportTerms, 'not a charity or tax-exempt organization', 'entity disclosure');
mustInclude(supportTerms, 'No specific work guarantee', 'unallocated-support boundary');
mustInclude(readme, 'not access, scheduled coverage or a verdict', 'partner funding boundary');
mustInclude(independence, 'require a particular operating system, test slot, publication date or amount of coverage', 'provider scheduling boundary');
mustInclude(independence, 'must not carry invented research or publication dates', 'inventory date boundary');
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
mustInclude(script, "params.get('support') === 'thanks'", 'support completion message');

const visible = `${home}\n${supportTerms}\n${notFound}\n${script}`;
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
  'ledger/README.md',
  'methodology/README.md',
  'reports/README.md',
  'LICENSES/MIT.txt',
  'LICENSES/CC-BY-4.0.txt',
]) await stat(resolve(root, path));
console.log('site and research-program contract: pass');
