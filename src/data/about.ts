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
  focusAreas: ['คอ', 'บ่าไหล่', 'ศีรษะ', 'หลัง'],
  focus: {
    lead: 'ลูกค้าหลายคนมาหา Nang เมื่อคอและบ่าไหล่ตึง และความตึงลามขึ้นไปถึงศีรษะ',
    text: `Nang เรียนนวดแผนไทยแบบดั้งเดิมมา และนวดมาแล้ว ${yearsOfExperience} ปี เธอรู้จักแนวกล้ามเนื้อและเส้นเอ็น รวมถึงจุดกดของการนวดไทยเป็นอย่างดี จึงหาจุดที่ตึงเจอและนวดตรงจุดนั้นได้อย่างแม่นยำ ด้วยการกด การยืด และการกดจุด หนักหรือเบาตามที่คุณรู้สึกสบาย`,
    approach: [
      'เธอถามก่อน: ตึงตรงไหน เป็นมานานเท่าไร และแบบไหนที่คุณรู้สึกสบาย',
      'เธอคลำกล้ามเนื้อและหาจุดที่ตึง',
      'เธอนวดตรงจุด ไม่ได้นวดตามสูตรเดิม ๆ รวมถึงที่คอและศีรษะ',
      'เธอบอกตรง ๆ หากการนวดไม่เหมาะกับคุณ',
    ],
    note: 'Nang ไม่ใช่แพทย์และไม่ได้วินิจฉัยโรค หากปวดศีรษะรุนแรง ปวดต่อเนื่อง หรือเพิ่งเริ่มปวดแบบใหม่ ควรไปพบแพทย์',
  },
  /**
   * Persönliche Geschichte (Herkunft, wo sie gelernt hat, seit wann in Ehningen).
   * Solange leer, blendet „Über uns“ den Abschnitt aus.
   */
  story: [] as string[],
  /** Überschrift des Abschnitts, z. B. „Ich bin Nang“ */
  storyTitle: '',
};
