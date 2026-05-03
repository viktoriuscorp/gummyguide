import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Config restaurada al estado pre-27-abr-2026 (cuando trafico e indexacion
// funcionaban). El commit 2fb0db5 introdujo lastmod+priority+changefreq+
// serialize que provoco "lastmod stampede" y bloqueo indexacion en Google.
// Vuelta a sitemap() sin opciones — sitemap minimo (solo <loc>), Google se
// encarga del crawl con sus heuristicas.
export default defineConfig({
  site: 'https://gummy-guide.com',
  integrations: [sitemap(), mdx()],
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // PageSpeed fix (2-may): inline el CSS del BaseLayout para eliminar
    // request bloqueante (-190ms LCP). No afecta SEO ni sitemap.
    inlineStylesheets: 'always',
  },
});
