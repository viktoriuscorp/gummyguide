import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://gummyguide.com',
  integrations: [sitemap(), mdx()],
  trailingSlash: 'always',

  build: {
    format: 'directory',
  },

  adapter: cloudflare(),
});