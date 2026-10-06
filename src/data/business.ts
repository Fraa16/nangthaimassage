/**
 * Stammdaten von Nang Thai Massage.
 *
 * Alles hier erscheint auf mehreren Seiten (Header, Footer, Kontakt, Impressum,
 * strukturierte Daten für Google). Änderungen deshalb nur an dieser Stelle.
 *
 * Werte, die mit „TODO:“ beginnen, fehlen noch. `npm run build` listet sie als
 * Warnung auf; mit STRICT_PLACEHOLDERS=1 bricht der Build ab (siehe README).
 *
 * Quellen: Nangs Flyer (Stand 25.09.2026) und der Eintrag auf massageando.de
 * (Stand 24.09.2026). Wo beide abweichen, gilt der Flyer.
 */
export const business = {
  /** Muss exakt so geschrieben sein wie im Google-Unternehmensprofil. */
  name: 'Nang Thai Massage',
  alternateName: 'Nang Thaimassage',
  owner: 'TODO: Vor- und Nachname der Inhaberin',
  address: {
    street: 'Königstraße 25',
    postalCode: '71139',
    city: 'Ehningen',
    district: 'Landkreis Böblingen',
    region: 'Baden-Württemberg',
    country: 'DE',
  },
  phone: {
    display: '0179 1093532',
    e164: '+491791093532',
  },
  /** Nummer für wa.me-Links: Ländervorwahl ohne „+“ und ohne führende Null. */
  whatsapp: '491791093532',
  /**
   * Pflichtangabe im Impressum (§ 5 DDG). Steht bewusst NUR dort und ohne Link:
   * Nang möchte nicht per E-Mail kontaktiert werden, Termine laufen über Telefon und WhatsApp.
   */
  email: 'nang.thaimassage.ehningen@gmail.com',
  /** Umsatzsteuer-Identifikationsnummer, falls vorhanden. Leer lassen, wenn nicht. */
  vatId: '',
  /** Öffnungszeiten laut Flyer: täglich 10–20 Uhr. */
  openingHours: [
    { day: 'Montag', schemaDay: 'Monday', opens: '10:00', closes: '20:00' },
    { day: 'Dienstag', schemaDay: 'Tuesday', opens: '10:00', closes: '20:00' },
    { day: 'Mittwoch', schemaDay: 'Wednesday', opens: '10:00', closes: '20:00' },
    { day: 'Donnerstag', schemaDay: 'Thursday', opens: '10:00', closes: '20:00' },
    { day: 'Freitag', schemaDay: 'Friday', opens: '10:00', closes: '20:00' },
    { day: 'Samstag', schemaDay: 'Saturday', opens: '10:00', closes: '20:00' },
    { day: 'Sonntag', schemaDay: 'Sunday', opens: '10:00', closes: '20:00' },
  ],
  /** Laut Flyer auch an Feiertagen geöffnet. */
  openOnHolidays: true,
  /** Laut Flyer: Termine auch nach Vereinbarung. */
  byAppointment: true,
  /**
   * Link zum Google-Unternehmensprofil (in Google Maps „Teilen“ → Link kopieren).
   * Solange leer, verlinkt die Seite auf eine Google-Maps-Suche nach dem Studio.
   */
  googleProfileUrl: 'https://share.google/IngWGfw2y5CjuSdL7',
  /** Weitere offizielle Einträge des Studios (für sameAs in den strukturierten Daten). */
  profiles: ['https://massageando.de/Home/Details/nang-thaimassage-ehningen-58'],
  /** Orte im Umkreis, die im Text und in den strukturierten Daten genannt werden. */
  nearbyTowns: ['Gärtringen', 'Aidlingen', 'Nufringen', 'Böblingen', 'Sindelfingen', 'Herrenberg', 'Holzgerlingen'],
} as const;

/** Hosting-Anbieter für die Datenschutzerklärung. */
export const hosting = {
  name: 'Vercel Inc.',
  address: '440 N Barranca Ave #4133, Covina, CA 91723, USA',
  privacyUrl: 'https://vercel.com/legal/privacy-policy',
  dpaUrl: 'https://vercel.com/legal/dpa',
} as const;

export const fullAddress = `${business.address.street}, ${business.address.postalCode} ${business.address.city}`;

/** Die Öffnungszeit, wenn alle sieben Tage gleich sind, sonst null. */
export function dailyHours() {
  const [first] = business.openingHours;
  const same = business.openingHours.every((d) => d.opens === first.opens && d.closes === first.closes);
  return same && business.openingHours.length === 7 ? first : null;
}

/** „Täglich 10–20 Uhr“, wenn alle Tage gleich sind, sonst null. */
export function hoursSummary(): string | null {
  const daily = dailyHours();
  return daily ? `Täglich ${formatTime(daily.opens)}–${formatTime(daily.closes)} Uhr` : null;
}

/** „Daily 10 am – 8 pm“ für die englische Seite, sonst null. */
export function hoursSummaryEn(): string | null {
  const daily = dailyHours();
  return daily ? `Daily ${formatTime12(daily.opens)} – ${formatTime12(daily.closes)}` : null;
}

/** „auch an Feiertagen und nach Vereinbarung“ bzw. die Teile, die zutreffen; sonst null. */
export function hoursExtras(): string | null {
  const parts = [business.openOnHolidays && 'an Feiertagen', business.byAppointment && 'nach Vereinbarung'].filter(Boolean);
  return parts.length ? `auch ${parts.join(' und ')}` : null;
}

/** „12:00“ → „12“, „12:30“ → „12:30“ */
export function formatTime(t: string): string {
  return t.endsWith(':00') ? t.slice(0, -3) : t;
}

/** „10:00“ → „10 am“, „20:30“ → „8:30 pm“ */
export function formatTime12(t: string): string {
  const [hours, minutes] = t.split(':');
  const h = Number(hours);
  return `${h % 12 || 12}${minutes === '00' ? '' : `:${minutes}`} ${h < 12 ? 'am' : 'pm'}`;
}
