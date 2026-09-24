/**
 * Massagen, Dauer und Preise.
 *
 * Preise und Dauer stammen 1:1 aus dem massageando-Eintrag (Stand 24.09.2026).
 * Die Beschreibungen sind neu formuliert: ohne Heilversprechen (Heilmittel-
 * werbegesetz) und ohne doppelten Inhalt zu massageando.
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
  /** Absätze für die Seite „Leistungen“. */
  description: string[];
  /** Für wen die Massage besonders passt. */
  suitedFor: string;
  options: PriceOption[];
}

export const services: Service[] = [
  {
    slug: 'traditionelle-thaimassage',
    name: 'Traditionelle Thaimassage',
    teaser: 'Kräftiger Druck entlang der Energielinien und sanfte Dehnungen, von den Füßen bis zum Kopf.',
    description: [
      'In Thailand heißt sie Nuad Thai oder Nuat Phaen Boran, frei übersetzt „Massage nach altem Muster“. Mit Daumen, Handballen und Ellbogen wird rhythmischer Druck entlang der Energielinien ausgeübt, den sogenannten Sen. Dazu kommen passive Dehnungen, die an Yoga erinnern. Hierzulande kennt man sie deshalb auch als Thai-Yoga-Massage.',
      'Die Massage bezieht den ganzen Körper ein und wird traditionell ohne Öl ausgeführt. Sagen Sie uns einfach, wie kräftig Sie es mögen.',
    ],
    suitedFor: 'Für alle, die kräftigen Druck und Dehnungen mögen.',
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
    teaser: 'Lange, fließende Griffe mit Massageöl. Ruhiger und sanfter als die klassische Thaimassage.',
    description: [
      'Bei der Thai-Ölmassage gleiten die Hände mit Massageöl in langen, ruhigen Bewegungen über den Körper. Dazu kommen Druckgriffe aus der traditionellen Thaimassage, die kräftigen Dehnungen fallen weg.',
      'Die richtige Wahl, wenn Sie vor allem abschalten und zur Ruhe kommen möchten.',
    ],
    suitedFor: 'Für alle, die eine ruhige Ganzkörpermassage suchen, auch als Einstieg.',
    options: [{ minutes: 60, price: 55 }],
  },
  {
    slug: 'ruecken-nacken-schulter-massage',
    name: 'Rücken-, Nacken- und Schultermassage',
    teaser: 'Gezielt für die Partie, die bei Schreibtischarbeit und Stress am meisten abbekommt.',
    description: [
      'Diese Massage konzentriert sich auf Rücken, Nacken und Schultern. Akupressur, Elemente aus dem Shiatsu, Dehnungen und Reflexzonentechniken ergeben zusammen eine wärmende, gründliche Massage des Oberkörpers.',
      'Ideal, wenn Sie viel sitzen, lange am Bildschirm arbeiten oder den Alltag buchstäblich im Nacken spüren.',
    ],
    suitedFor: 'Für alle, die viel sitzen und Verspannungen im Oberkörper spüren.',
    options: [
      { minutes: 30, price: 30 },
      { minutes: 60, price: 55 },
      { minutes: 90, price: 80 },
      { minutes: 120, price: 120 },
    ],
  },
  {
    slug: 'kraeuterstempelmassage',
    name: 'Kräuterstempelmassage',
    teaser: 'Warme Kräuterstempel, Akupressur und ätherische Öle für eine lange, ruhige Auszeit.',
    description: [
      'Für die Kräuterstempelmassage werden Stoffsäckchen mit Kräutern gefüllt, erwärmt und mit sanftem Druck über den Körper geführt. Die Wärme und der Duft der Kräuter verbinden sich mit Akupressur und warmen ätherischen Ölen.',
      'Eine besonders intensive Anwendung für alle, die sich bewusst Zeit nehmen möchten. Deshalb bieten wir sie nur als lange Massage an.',
    ],
    suitedFor: 'Für eine ausgiebige Auszeit, besonders in der kalten Jahreszeit.',
    options: [
      { minutes: 90, price: 90 },
      { minutes: 120, price: 120 },
    ],
  },
  {
    slug: 'fussreflexzonenmassage',
    name: 'Fußreflexzonenmassage',
    teaser: 'Gezielter Druck auf die Reflexzonen der Füße. Wohltuend nach langen Tagen auf den Beinen.',
    description: [
      'Die Fußreflexzonenmassage arbeitet mit gezieltem Druck auf die Zonen der Fußsohlen. Nach traditioneller Vorstellung spiegelt sich in den Füßen der ganze Körper wider.',
      'Die Massage tut müden Füßen gut und entspannt spürbar. Ideal nach einem langen Tag im Stehen oder Gehen, oder als kurze Auszeit zwischendurch.',
    ],
    suitedFor: 'Für alle, die viel stehen oder gehen.',
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
