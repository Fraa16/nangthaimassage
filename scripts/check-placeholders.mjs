// Meldet vor dem Build, ob noch Platzhalter („TODO:“) in den Stammdaten stehen.
//
// Standard: nur Warnung im Build-Log, der Build läuft weiter. Auf der Website
// sind fehlende Angaben im Impressum und in der Datenschutzerklärung gelb markiert.
// Mit STRICT_PLACEHOLDERS=1 bricht der Build ab (z. B. für einen letzten Check vor dem Livegang).
import { readFile } from 'node:fs/promises';

const file = new URL('../src/data/business.ts', import.meta.url);
const source = await readFile(file, 'utf8');

const todos = source
  .split('\n')
  .map((line, i) => ({ line: i + 1, text: line.trim() }))
  .filter(({ text }) => /['"`]TODO:/.test(text));

const siteUrl =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');

const problems = todos.map(({ line, text }) => `src/data/business.ts:${line}  ${text}`);
if (!siteUrl) problems.push('Keine Domain gesetzt (SITE_URL). Canonical-URLs und Sitemap zeigen auf localhost.');

if (problems.length === 0) process.exit(0);

const strict = process.env.STRICT_PLACEHOLDERS === '1';

const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;

console.log((strict ? red : yellow)(`\n${strict ? '✖' : '⚠'} Vor dem Livegang noch ausfüllen:`));
for (const p of problems) console.log(`  • ${p}`);
console.log('');

if (strict) {
  console.log(red('Build abgebrochen (STRICT_PLACEHOLDERS=1): Impressum und Datenschutz brauchen vollständige Angaben.\n'));
  process.exit(1);
}
