import { about, yearsOfExperience } from './about';
import { business, hoursSummary } from './business';
import { formatPrice, getService, minPrice } from './services';

export interface FaqItem {
  question: string;
  answer: string;
}

const thai = getService('traditionelle-thaimassage');
const thaiPrices = thai.options.map((o) => `${formatPrice(o.price)} für ${o.minutes} Minuten`);
const hours = hoursSummary()?.replace('Täglich', 'täglich') ?? 'zu unseren Öffnungszeiten';

/** „A, B und C“ */
const listJoin = (items: readonly string[]) => `${items.slice(0, -1).join(', ')} und ${items.at(-1)}`;

/** Antworten bewusst 30–60 Wörter: vollständig, zitierfähig, ohne Einleitung. */
export const faq: FaqItem[] = [
  {
    question: 'Was kostet eine Thaimassage in Ehningen?',
    answer: `Bei ${business.name} kostet die traditionelle Thaimassage ${thaiPrices.slice(0, -1).join(', ')} und ${thaiPrices.at(-1)}. Die Fußreflexzonenmassage gibt es ab ${formatPrice(minPrice(getService('fussreflexzonenmassage')))}, die Kräuterstempelmassage ab ${formatPrice(minPrice(getService('kraeuterstempelmassage')))}. Alle Preise sind Endpreise und stehen auf der Seite Leistungen.`,
  },
  {
    question: 'Wie viel Erfahrung hat Nang?',
    answer: `Nang hat die traditionelle Thaimassage gelernt und massiert seit ${yearsOfExperience} Jahren. Sie kennt Muskeln, Sehnen und die Druckpunkte der Thaimassage genau. Ihr Schwerpunkt sind ${listJoin(about.focusAreas)}, also die Partien, in denen sich Stress und langes Sitzen am meisten festsetzen.`,
  },
  {
    question: 'Wie bekomme ich einen Termin?',
    answer: `Rufen Sie an oder schreiben Sie per WhatsApp an ${business.phone.display}. Nennen Sie am besten gleich die gewünschte Massage, die Dauer und zwei, drei passende Zeiten. Wir sind ${hours} erreichbar und bestätigen Ihren Termin so schnell wie möglich.`,
  },
  {
    question: 'Haben Sie auch am Wochenende geöffnet?',
    answer: `Ja. ${business.name} hat ${hours} geöffnet, auch samstags und sonntags. Gerade am Wochenende lohnt es sich, den Termin ein paar Tage vorher zu vereinbaren.`,
  },
  {
    question: 'Welche Massage passt zu mir?',
    answer:
      'Wer kräftigen Druck und Dehnungen mag, wählt die traditionelle Thaimassage. Die Thai-Ölmassage ist ruhiger und fließender. Für Nacken, Schultern und auf Wunsch den Kopf passt die Rücken-, Nacken- und Schultermassage, für müde Füße die Fußreflexzonenmassage. Unsicher? Fragen Sie bei der Terminvereinbarung, wir beraten Sie gern.',
  },
  {
    question: 'Wie lange sollte die erste Thaimassage dauern?',
    answer:
      'Für den Einstieg empfehlen wir 60 Minuten. Das reicht für eine vollständige Massage des ganzen Körpers. Wer sich richtig Zeit nehmen möchte, bucht 90 oder 120 Minuten. Für eine kurze Pause zwischendurch gibt es die Thaimassage auch mit 30 Minuten.',
  },
  {
    question: 'Was ziehe ich zur Massage an?',
    answer:
      'Bequeme Kleidung reicht. Die traditionelle Thaimassage wird ohne Öl ausgeführt, lockere Kleidung ist dafür ideal. Bei der Öl- und der Kräuterstempelmassage besprechen wir vorher mit Ihnen, was Sie ablegen möchten. Sie bestimmen, was für Sie angenehm ist.',
  },
  {
    question: 'Ist Nang Thai Massage ein seriöses Massagestudio?',
    answer:
      'Ja. Wir bieten ausschließlich seriöse Massagen nach thailändischer Tradition an: Thaimassage, Thai-Ölmassage, Rücken-, Nacken- und Schultermassage, Kräuterstempelmassage und Fußreflexzonenmassage. Unsere Massagen dienen der Entspannung und dem Wohlbefinden.',
  },
  {
    question: 'Wo finde ich das Studio?',
    answer: `In der ${business.address.street} in ${business.address.postalCode} ${business.address.city}, ${business.address.district}. Aus ${listJoin(business.nearbyTowns.slice(0, 5))} ist das Studio schnell zu erreichen. Die Route zeigt Ihnen Google Maps, der Link steht auf unserer Kontaktseite.`,
  },
];
