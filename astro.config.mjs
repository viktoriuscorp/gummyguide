import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://gummy-guide.com',
  integrations: [sitemap(), mdx()],
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
