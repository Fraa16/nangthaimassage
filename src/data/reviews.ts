/**
 * Ausgewählte Google-Bewertungen für die Startseite.
 *
 * Solange die Liste leer ist, blendet die Startseite den Abschnitt aus.
 * Nur echte Bewertungen wörtlich übernehmen. Kürzungen mit „[…]“ kennzeichnen,
 * Emojis dürfen wegfallen. Vorname und erster Buchstabe des Nachnamens reichen.
 *
 * WICHTIG – Heilmittelwerbegesetz: Keine Aussagen übernehmen, die Heilung oder
 * Schmerzfreiheit versprechen („keine Schmerzen mehr“, „Verspannungen gelöst“).
 * Solche Sätze werden weggekürzt. Gut geeignet sind Aussagen über Nangs Können,
 * die Atmosphäre, Freundlichkeit und Sauberkeit.
 * Keine Bewertungen mit Leistungen oder Preisen, die es nicht (mehr) gibt.
 *
 * WICHTIG – UWG: Unter den Bewertungen steht „Alle hier gezeigten Bewertungen stammen
 * von Gästen, die Nang persönlich kennt.“ Neue Bewertungen deshalb nur aufnehmen,
 * wenn Nang die Person als Gast kennt. Sonst den Hinweis anpassen.
 */
/** Wann die Auswahl zuletzt mit Google abgeglichen wurde (steht im Hinweis unter den Bewertungen). */
export const reviewsAsOf = 'ตุลาคม 2026';

export interface Review {
  text: string;
  author: string;
  /** Sterne auf Google (1–5) */
  rating: number;
}

export const reviews: Review[] = [
  {
    text: 'มาหา Nang หลายครั้งแล้ว และขอแนะนำเลย! อบอุ่นเป็นกันเองมาก และเธอหาจุดที่ตึงเจอทุกจุด รู้สึกดีมากจริง ๆ',
    author: 'Bettina K.',
    rating: 5,
  },
  {
    text: 'เป็นมิตรมาก สะอาด และเชี่ยวชาญจริง ๆ… นัดครั้งต่อไปไว้เลยทันที',
    author: 'T. E.',
    rating: 5,
  },
  {
    text: 'แนะนำเลย Nang เก่งและอบอุ่นมาก นัดครั้งต่อไปไว้ทันที',
    author: 'Christine G.',
    rating: 5,
  },
  {
    text: 'ใส่ใจเป็นรายบุคคลและเป็นมิตร บรรยากาศดีและผ่อนคลาย! […] จะกลับมาอีกแน่นอน!',
    author: 'Julia A.',
    rating: 5,
  },
  {
    text: 'ได้รับนวดน้ำมันอโรมาเป็นของขวัญจากสามี […] รู้สึกสบายมาก Nang เป็นมิตรสุด ๆ และห้องก็น่าอยู่',
    author: 'S. T.',
    rating: 5,
  },
  {
    text: 'นวดดีมาก แนะนำต่อได้เลย เป็นมิตรและเก่งมาก กลับมาอีกได้ทุกเมื่อ!!!',
    author: 'Fieth F.',
    rating: 5,
  },
];
