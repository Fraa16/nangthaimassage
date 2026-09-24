// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domain für Canonical-URLs, Sitemap und Open Graph.
// Reihenfolge: SITE_URL (manuell) → Produktions-Domain von Vercel → lokal.
// Vercel setzt VERCEL_PROJECT_PRODUCTION_URL automatisch auf die kürzeste
// eigene Domain des Projekts (oder die .vercel.app-Adresse, solange es keine gibt).
const SITE_URL =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321');

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
