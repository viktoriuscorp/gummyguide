import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

const SILO_HUBS = [
  'beauty', 'sports', 'sleep', 'vitamins', 'mushroom',
  'weight-loss', 'immunity', 'trending', 'candy', 'blog',
];

// Indexation recovery mode (May 2026): Google has crawled ~100 URLs but is
// holding them as "Crawled - currently not indexed". Keep only the strongest
// URLs in the XML sitemap for now, then re-add long-tail pages in small batches.
const RECOVERY_SITEMAP_URLS = new Set([
  '/',
  '/about/',
  '/affiliate-disclosure/',
  '/editorial-process/',
  '/sitemap/',
  '/beauty/',
  '/sports/',
  '/sleep/',
  '/vitamins/',
  '/mushroom/',
  '/weight-loss/',
  '/immunity/',
  '/trending/',
  '/candy/',
  '/blog/',
  '/best-creatine-gummies/',
  '/best-melatonin-gummies/',
  '/best-ashwagandha-gummies/',
  '/best-prenatal-gummies/',
  '/best-sea-moss-gummies/',
  '/best-sleep-gummies/',
  '/best-mushroom-gummies/',
  '/best-apple-cider-vinegar-gummies/',
  '/best-elderberry-gummies/',
  '/best-fiber-gummies/',
  '/best-iron-gummies/',
  '/best-gummies-for-women/',
  '/best-gummies-for-men/',
  '/gummies-vs-pills/',
  '/sugar-free-gummies/',
  '/vegan-gummies/',
]);

export default defineConfig({
  site: 'https://gummy-guide.com',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      filter(page) {
        return RECOVERY_SITEMAP_URLS.has(new URL(page).pathname);
      },
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
