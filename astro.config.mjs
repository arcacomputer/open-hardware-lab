import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ohl.arca.computer',
  output: 'static',
  integrations: [sitemap()],
});
