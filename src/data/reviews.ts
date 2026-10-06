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
 */
/** Wann die Auswahl zuletzt mit Google abgeglichen wurde (steht im Hinweis unter den Bewertungen). */
export const reviewsAsOf = 'Oktober 2026';

export interface Review {
  text: string;
  author: string;
  /** Sterne auf Google (1–5) */
  rating: number;
}

export const reviews: Review[] = [
  {
    text: 'Ich war schon einige Male bei Nang und kann es nur empfehlen! Sehr herzlich und sie findet alle verspannten Stellen. Tut richtig gut.',
    author: 'Bettina K.',
    rating: 5,
  },
  {
    text: 'Sehr freundlich, sauber und absolut kompetent… Ich habe gleich den nächsten Termin vereinbart',
    author: 'T. E.',
    rating: 5,
  },
  {
    text: 'Absolut zu empfehlen, Nang ist sehr kompetent und herzlich. Gleich Folgetermin ausgemacht',
    author: 'Christine G.',
    rating: 5,
  },
  {
    text: 'Sehr persönlich und freundlich. Tolle und entspannte Atmosphäre! […] Ich komme gerne wieder!',
    author: 'Julia A.',
    rating: 5,
  },
  {
    text: 'Habe die Aroma-Öl Massage von meinem Mann geschenkt bekommen […] Ich habe mich sehr wohl gefühlt, Nang war super freundlich und auch der Raum war angenehm.',
    author: 'S. T.',
    rating: 5,
  },
  {
    text: 'Sehr gute Massage, kann ich nur weiterempfehlen. Sehr freundlich und kompetent. Jederzeit wieder!!!',
    author: 'Fieth F.',
    rating: 5,
  },
];
