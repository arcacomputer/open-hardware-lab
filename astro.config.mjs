import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://arca-open-hardware-lab.lf-e32.workers.dev',
  output: 'static',
  integrations: [sitemap()],
});
