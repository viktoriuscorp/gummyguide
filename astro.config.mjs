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
      // NO lastmod — un lastmod global con la fecha del build hace que TODAS las
      // URLs muten en cada deploy ("lastmod stampede"), Google lo lee como
      // inestabilidad y baja el crawl budget. Mejor sin lastmod que mintiendo.
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        const path = new URL(item.url).pathname;

        // Garantizar que ningún lastmod se cuele desde defaults del plugin
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
          ['/about/', '/affiliate-disclosure/', '/editorial-process/'].includes(path) ||
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
    inlineStylesheets: 'always',
  },
});
