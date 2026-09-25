// @ts-check
import { defineConfig, envField } from 'astro/config';
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
    // CSS direkt ins HTML: spart den blockierenden Abruf vor dem ersten Rendern (besseres LCP).
    inlineStylesheets: 'always',
  },
  // Optionale Bestätigungscodes für Google Search Console und Bing Webmaster Tools
  // (Methode „HTML-Tag“). In Vercel als Umgebungsvariable eintragen, nur den Code.
  env: {
    schema: {
      GOOGLE_SITE_VERIFICATION: envField.string({ context: 'server', access: 'public', optional: true }),
      BING_SITE_VERIFICATION: envField.string({ context: 'server', access: 'public', optional: true }),
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
