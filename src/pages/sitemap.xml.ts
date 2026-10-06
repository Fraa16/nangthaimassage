/**
 * /sitemap.xml: alle Seiten mit Priorität, Änderungsfrequenz und Datum der letzten Änderung.
 *
 * Seiten aus src/pages erscheinen automatisch (die 404-Seite nicht). Eine neue Seite
 * bekommt Priorität 0.5, solange sie unten nicht eingetragen ist.
 */
import type { APIRoute } from 'astro';
import { execFileSync } from 'node:child_process';

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

const settings: Record<string, { priority: number; changefreq: ChangeFreq }> = {
  '/': { priority: 1.0, changefreq: 'weekly' },
  '/leistungen/': { priority: 0.9, changefreq: 'monthly' },
  '/kontakt/': { priority: 0.8, changefreq: 'monthly' },
  '/ueber-uns/': { priority: 0.7, changefreq: 'monthly' },
  '/en/': { priority: 0.7, changefreq: 'monthly' },
  '/impressum/': { priority: 0.3, changefreq: 'yearly' },
  '/datenschutz/': { priority: 0.3, changefreq: 'yearly' },
};
const defaults = { priority: 0.5, changefreq: 'monthly' as ChangeFreq };

/** „./index.astro“ → „/“, „./en/index.astro“ → „/en/“, „./kontakt.astro“ → „/kontakt/“ */
const routes = Object.keys(import.meta.glob('./**/*.astro'))
  .map((file) => `/${file.slice(2).replace(/\.astro$/, '').replace(/(^|\/)index$/, '')}/`.replace(/\/+/g, '/'))
  .filter((route) => route !== '/404/' && !route.includes('['));

/** Letzte Änderung an Inhalten (src, public) laut Git, sonst das Build-Datum. */
function lastModified(): string {
  try {
    const date = execFileSync('git', ['log', '-1', '--format=%cd', '--date=short', '--', 'src', 'public'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  } catch {
    // Kein Git im Build: Build-Datum verwenden.
  }
  return new Date().toISOString().slice(0, 10);
}

export const GET: APIRoute = ({ site }) => {
  const lastmod = lastModified();
  const urls = routes
    .map((route) => ({ route, ...(settings[route] ?? defaults) }))
    .sort((a, b) => b.priority - a.priority || a.route.localeCompare(b.route))
    .map((page) =>
      [
        '  <url>',
        `    <loc>${new URL(page.route, site).href}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${page.changefreq}</changefreq>`,
        `    <priority>${page.priority.toFixed(1)}</priority>`,
        '  </url>',
      ].join('\n'),
    );
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
