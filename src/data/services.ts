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
  /** Name und Kurztext für die englische Seite */
  en: { name: string; teaser: string };
}

export const services: Service[] = [
  {
    slug: 'traditionelle-thaimassage',
    name: 'นวดแผนไทยแบบดั้งเดิม',
    teaser: 'กดน้ำหนักแน่นตามแนวเส้นพลังงาน และยืดเหยียดอย่างนุ่มนวล ตั้งแต่เท้าจนถึงศีรษะ',
    en: {
      name: 'Traditional Thai massage',
      teaser: 'Rhythmic pressure along the energy lines and gentle stretches, without oil and fully clothed.',
    },
    options: [
      { minutes: 30, price: 30 },
      { minutes: 60, price: 55 },
      { minutes: 90, price: 80 },
      { minutes: 120, price: 110 },
    ],
  },
  {
    slug: 'thai-oelmassage',
    name: 'นวดน้ำมันแบบไทย',
    teaser: 'ลูบนวดยาวต่อเนื่องด้วยน้ำมันอุ่น สงบและนุ่มนวลกว่านวดแผนไทยแบบดั้งเดิม',
    en: {
      name: 'Thai oil massage with warm oil',
      teaser: 'Long, flowing strokes with warm oil, calmer and gentler than the traditional Thai massage.',
    },
    options: [
      { minutes: 30, price: 30 },
      { minutes: 60, price: 55 },
      { minutes: 90, price: 80 },
      { minutes: 120, price: 110 },
    ],
  },
  {
    slug: 'ruecken-nacken-schulter-massage',
    name: 'นวดหลัง คอ และบ่าไหล่',
    teaser: 'หลัง คอ บ่าไหล่ และศีรษะหากต้องการ: นวดตรงจุดที่ความตึงจากการนั่งทำงานและความเครียดสะสมอยู่',
    en: {
      name: 'Back, neck and shoulder massage',
      teaser: 'Focused on back, neck and shoulders, including the head on request.',
    },
    options: [
      { minutes: 30, price: 30 },
      { minutes: 60, price: 45 },
      { minutes: 90, price: 65 },
      { minutes: 120, price: 80 },
    ],
  },
  {
    slug: 'kraeuterstempelmassage',
    name: 'นวดประคบสมุนไพร',
    teaser: 'ลูกประคบสมุนไพรอุ่น การกดจุด และน้ำมันหอมระเหย สำหรับการพักผ่อนที่ยาวนานและสงบ',
    en: {
      name: 'Thai herbal compress massage',
      teaser: 'Warm herbal compresses, acupressure and essential oils for a long, calm break.',
    },
    options: [
      { minutes: 90, price: 90 },
      { minutes: 120, price: 120 },
    ],
  },
  {
    slug: 'fussreflexzonenmassage',
    name: 'นวดเท้ากดจุดสะท้อน',
    teaser: 'กดจุดสะท้อนที่ฝ่าเท้าอย่างตรงจุด รู้สึกสบายหลังจากยืนหรือเดินมาทั้งวัน',
    en: {
      name: 'Foot reflexology massage',
      teaser: 'Thai-style foot massage with targeted pressure on the reflex zones of the soles.',
    },
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
export const formatMinutes = (minutes: number) => `${minutes} นาที`;

export const getService = (slug: string) => {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unbekannte Leistung: ${slug}`);
  return service;
};
