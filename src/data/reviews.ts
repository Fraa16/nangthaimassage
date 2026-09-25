/**
 * Ausgewählte Google-Bewertungen für die Startseite.
 *
 * Solange die Liste leer ist, blendet die Startseite den Abschnitt aus.
 * Nur echte Bewertungen wörtlich übernehmen (gekürzt ist in Ordnung, mit „…“),
 * Vorname und erster Buchstabe des Nachnamens reichen.
 *
 * WICHTIG – Heilmittelwerbegesetz: Keine Bewertungen auswählen, die Heilung
 * oder Schmerzfreiheit versprechen („meine Migräne ist weg“). Gut geeignet sind
 * Aussagen über Nangs Können, die Atmosphäre, Freundlichkeit und Sauberkeit.
 *
 * Beispiel:
 *   { text: 'Nang findet sofort die verspannten Stellen …', author: 'Anna K.' },
 */
export interface Review {
  text: string;
  author: string;
}

export const reviews: Review[] = [];
