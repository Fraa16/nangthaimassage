/**
 * /llms.txt: kompaktes Profil für KI-Suchmaschinen (Vorschlag llmstxt.org).
 * Wird aus denselben Stammdaten erzeugt wie die Website.
 */
import type { APIRoute } from 'astro';
import { business, fullAddress, hoursSummary, hoursExtras } from '../data/business';
import { services, formatPrice } from '../data/services';
import { about, yearsOfExperience } from '../data/about';

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href;
  const hours = [hoursSummary(), hoursExtras()].filter(Boolean).join(', ');
  const lines = [
    `# ${business.name}`,
    '',
    `> Studio für traditionelle Thaimassage in ${business.address.city} (${business.address.district}, ${business.address.region}). Nang massiert seit ${yearsOfExperience} Jahren, Schwerpunkt: ${about.focusAreas.join(', ')}. Ausschließlich seriöse Wellnessmassagen nach thailändischer Tradition.`,
    '',
    '## Kontakt',
    '',
    `- Adresse: ${fullAddress}`,
    `- Telefon und WhatsApp: ${business.phone.display} (${business.phone.e164})`,
    `- Öffnungszeiten: ${hours}`,
    `- Termine: per Anruf oder WhatsApp`,
    `- Bezahlung: vor Ort beim Termin`,
    '',
    '## Massagen und Preise',
    '',
    ...services.map(
      (s) => `- [${s.name}](${url(`/leistungen/#${s.slug}`)}): ${s.options.map((o) => `${o.minutes} Min. ${formatPrice(o.price)}`).join(', ')}. ${s.teaser}`,
    ),
    '',
    '## Seiten',
    '',
    `- [Startseite](${url('/')}): Überblick, Öffnungszeiten, häufige Fragen`,
    `- [Leistungen & Preise](${url('/leistungen/')}): Preistabelle, Beschreibung jeder Massage, häufige Fragen`,
    `- [Über uns](${url('/ueber-uns/')}): Nang, Erfahrung, Schwerpunkt und Arbeitsweise`,
    `- [Kontakt & Anfahrt](${url('/kontakt/')}): Adresse, Karte, Terminanfrage per WhatsApp`,
    '',
    '## Hinweis',
    '',
    '- Die Massagen sind Wellnessmassagen. Sie dienen der Entspannung und dem Wohlbefinden und ersetzen keine ärztliche Behandlung. Nang ist keine Ärztin und stellt keine Diagnosen.',
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
