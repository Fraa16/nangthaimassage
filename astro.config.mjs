// @ts-check
import { defineConfig, envField } from 'astro/config';

// Domain für Canonical-URLs, Sitemap und Open Graph. Gilt auch für Vorschau-Deployments,
// damit Google nur die echte Domain als Original sieht. SITE_URL überschreibt sie bei Bedarf.
const SITE_URL = process.env.SITE_URL || 'https://nang-thaimassage-ehningen.de';

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
});
