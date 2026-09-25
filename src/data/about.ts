/**
 * Nang als Person: Erfahrung, Schwerpunkt, Arbeitsweise.
 *
 * WICHTIG – Heilmittelwerbegesetz und Heilpraktikergesetz:
 * Hier keine Heilversprechen eintragen. Nicht schreiben: „hilft bei Migräne“,
 * „gegen Kopfschmerzen“, „löst Schmerzen/Blockaden“, „ohne Schmerzmittel“,
 * „Behandlung“, „Therapie“, „Patienten“. Beschreiben, was Nang kann und wie sie
 * arbeitet, nicht, was die Massage medizinisch bewirkt. Wirkung dürfen die Gäste
 * in ihren Google-Bewertungen schildern; diese Seite verlinkt nur darauf.
 */

/** Angabe vom September 2026: Nang massiert seit 25 Jahren. */
const experienceSince = new Date('2001-09-01');

export const yearsOfExperience = Math.floor(
  (Date.now() - experienceSince.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
);

export const about = {
  /** Körperpartien, auf die Nang sich besonders versteht. */
  focusAreas: ['Nacken', 'Schultern', 'Kopf', 'Rücken'],
  focus: {
    lead: 'Viele Gäste kommen zu Nang, wenn Nacken und Schultern fest sind und die Anspannung bis in den Kopf zieht.',
    text: `Nang hat die traditionelle Thaimassage gelernt und massiert seit ${yearsOfExperience} Jahren. Sie kennt den Verlauf von Muskeln und Sehnen und die Druckpunkte der Thaimassage genau. Deshalb findet sie die Stellen, an denen es festsitzt, und arbeitet gezielt daran: mit Druck, Dehnung und Akupressur, so kräftig oder sanft, wie es Ihnen guttut.`,
    approach: [
      'Sie fragt nach: Wo zieht es, seit wann, was tut Ihnen gut?',
      'Sie tastet die Muskulatur ab und findet die festen Stellen.',
      'Sie arbeitet gezielt statt nach Schema, auch an Nacken und Kopf.',
      'Sie sagt ehrlich, wenn eine Massage nicht das Richtige ist.',
    ],
    note: 'Nang ist keine Ärztin und stellt keine Diagnosen. Starke, anhaltende oder neue Kopfschmerzen gehören ärztlich abgeklärt.',
  },
  /**
   * Persönliche Geschichte (Herkunft, wo sie gelernt hat, seit wann in Ehningen).
   * Solange leer, blendet „Über uns“ den Abschnitt aus.
   */
  story: [] as string[],
  /** Überschrift des Abschnitts, z. B. „Ich bin Nang“ */
  storyTitle: '',
};
