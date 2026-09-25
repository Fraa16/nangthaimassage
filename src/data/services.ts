/**
 * Massagen, Dauer und Preise.
 *
 * Preise und Dauer: Nangs Flyer (Stand 25.09.2026) und massageando-Eintrag
 * (Stand 24.09.2026); wo beide abweichen, gilt der Flyer.
 * Die ausführlichen Texte je Massage stehen in service-details.ts.
 * Alle Texte sind neu formuliert: ohne Heilversprechen (Heilmittelwerbegesetz)
 * und ohne doppelten Inhalt zu massageando.
 */
export interface PriceOption {
  minutes: number;
  /** Endpreis in Euro */
  price: number;
}

export interface Service {
  slug: string;
  name: string;
  /** Ein Satz für Karten und Übersichten. */
  teaser: string;
  options: PriceOption[];
}

export const services: Service[] = [
  {
    slug: 'traditionelle-thaimassage',
    name: 'Traditionelle Thaimassage',
    teaser: 'Kräftiger Druck entlang der Energielinien und sanfte Dehnungen, von den Füßen bis zum Kopf.',
    options: [
      { minutes: 30, price: 30 },
      { minutes: 60, price: 55 },
      { minutes: 90, price: 80 },
      { minutes: 120, price: 110 },
    ],
  },
  {
    slug: 'thai-oelmassage',
    name: 'Thai-Ölmassage',
    teaser: 'Lange, fließende Griffe mit warmem Öl. Ruhiger und sanfter als die klassische Thaimassage.',
    options: [
      { minutes: 30, price: 30 },
      { minutes: 60, price: 55 },
      { minutes: 90, price: 80 },
      { minutes: 120, price: 110 },
    ],
  },
  {
    slug: 'ruecken-nacken-schulter-massage',
    name: 'Rücken-, Nacken- und Schultermassage',
    teaser: 'Rücken, Nacken, Schultern und auf Wunsch der Kopf: gezielt dort, wo sich Schreibtischarbeit und Stress festsetzen.',
    options: [
      { minutes: 30, price: 30 },
      { minutes: 60, price: 45 },
      { minutes: 90, price: 65 },
      { minutes: 120, price: 80 },
    ],
  },
  {
    slug: 'kraeuterstempelmassage',
    name: 'Kräuterstempelmassage',
    teaser: 'Warme Kräuterstempel, Akupressur und ätherische Öle für eine lange, ruhige Auszeit.',
    options: [
      { minutes: 90, price: 90 },
      { minutes: 120, price: 120 },
    ],
  },
  {
    slug: 'fussreflexzonenmassage',
    name: 'Fußreflexzonenmassage',
    teaser: 'Gezielter Druck auf die Reflexzonen der Füße. Wohltuend nach langen Tagen auf den Beinen.',
    options: [
      { minutes: 30, price: 30 },
      { minutes: 60, price: 40 },
    ],
  },
];

export const minPrice = (service: Service) => Math.min(...service.options.map((o) => o.price));

export const lowestPrice = Math.min(...services.map(minPrice));
export const highestPrice = Math.max(...services.flatMap((s) => s.options.map((o) => o.price)));

export const formatPrice = (euro: number) => `${euro.toLocaleString('de-DE')} €`;
export const formatMinutes = (minutes: number) => `${minutes} Min.`;

export const getService = (slug: string) => {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unbekannte Leistung: ${slug}`);
  return service;
};
