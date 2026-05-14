import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

const SILO_HUBS = [
  'beauty', 'sports', 'sleep', 'vitamins', 'mushroom',
  'weight-loss', 'immunity', 'trending', 'candy', 'blog',
];

export default defineConfig({
  site: 'https://gummy-guide.com',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        const path = new URL(item.url).pathname;

        // Never emit global build-time lastmod. False freshness hurts crawl trust.
        delete item.lastmod;

        if (path === '/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (SILO_HUBS.some((silo) => path === `/${silo}/`)) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (path.startsWith('/blog/')) {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        } else if (SILO_HUBS.some((silo) => path.startsWith(`/${silo}/`))) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (
          ['/about/', '/affiliate-disclosure/', '/contact/', '/editorial-process/'].includes(path) ||
          path.startsWith('/legal/')
        ) {
          item.priority = 0.3;
          item.changefreq = 'yearly';
        } else {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }

        return item;
      },
    }),
    mdx(),
  ],
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // PageSpeed fix (2-may): inline el CSS del BaseLayout para eliminar
    // request bloqueante (-190ms LCP). No afecta SEO ni sitemap.
    inlineStylesheets: 'always',
  },
});
