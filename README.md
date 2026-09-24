# Nang Thai Massage – Website

Website für **Nang Thai Massage**, Königstraße 25, 71139 Ehningen.
Seiten: Startseite, Leistungen, Über uns, Kontakt sowie Impressum und Datenschutz (im Footer unter „Rechtliches“).

Gebaut mit [Astro](https://astro.build) als rein statische Seite: kein Server, keine Datenbank, keine Cookies.
Gehostet wird auf Vercel.

## Lokal starten

Voraussetzung: Node.js 22.12 oder neuer.

```bash
npm install
npm run dev       # Entwicklungsserver auf http://localhost:4321
npm run build     # Produktionsbuild nach dist/
npm run preview   # Build lokal ansehen
npm run check     # TypeScript- und Astro-Prüfung
```

## Inhalte ändern

Fast alles steht in `src/data/`. Die Seiten lesen von dort, eine Änderung wirkt überall
(Header, Footer, Kontakt, Impressum, strukturierte Daten für Google).

| Datei                   | Inhalt                                                                  |
| ----------------------- | ----------------------------------------------------------------------- |
| `src/data/business.ts`  | Name, Inhaberin, Adresse, Telefon, WhatsApp, E-Mail, Öffnungszeiten      |
| `src/data/services.ts`  | Massagen, Beschreibungen, Dauer und Preise                              |
| `src/data/faq.ts`       | Häufige Fragen auf der Startseite (Preis-Antwort rechnet automatisch)    |
| `src/data/about.ts`     | Persönliche Vorstellung auf „Über uns“ (erscheint erst, wenn ausgefüllt) |
| `src/data/navigation.ts`| Menüpunkte                                                              |

Preise und Leistungen stammen aus dem massageando-Eintrag (Stand 24.09.2026).
Die Texte sind bewusst ohne Heilversprechen formuliert (Heilmittelwerbegesetz): Wellness und
Entspannung ja, „heilt“, „lindert Schmerzen“ oder „stärkt das Immunsystem“ nein.

## Vor dem Livegang

`npm run build` listet fehlende Angaben auf. Offen sind:

- [ ] **Vor- und Nachname der Inhaberin** (`business.owner`), Pflicht fürs Impressum
- [ ] **E-Mail-Adresse** (`business.email`), Pflicht fürs Impressum
- [ ] Umsatzsteuer-ID, falls vorhanden (`business.vatId`)
- [ ] Link zum Google-Unternehmensprofil (`business.googleProfileUrl`) für den Bewertungs-Button
- [ ] Name exakt wie im Google-Profil schreiben (`business.name`)
- [ ] Eigene Domain in Vercel verbinden
- [ ] Optional, aber wirkungsvoll: persönliche Vorstellung und Foto (`src/data/about.ts`)
- [ ] Nach dem Livegang: im Google-Unternehmensprofil die Website von massageando auf die neue Domain umstellen

**Schutz vor unvollständigem Impressum:** Bei einem Produktions-Deployment auf Vercel
(`VERCEL_ENV=production`) bricht der Build ab, solange noch `TODO:`-Platzhalter in
`src/data/business.ts` stehen. Previews bauen trotzdem. Wer bewusst vorher live gehen will,
setzt in Vercel die Umgebungsvariable `ALLOW_PLACEHOLDERS=1`.

## Deployment auf Vercel

1. In Vercel **Add New → Project** und dieses Repository importieren.
2. Framework wird als Astro erkannt; Build-Befehl und Ausgabeordner stehen in `vercel.json`.
3. Domain unter **Settings → Domains** hinzufügen.

Canonical-URLs, Sitemap und Open-Graph-Links nutzen automatisch die Produktions-Domain
(`VERCEL_PROJECT_PRODUCTION_URL`). Soll eine andere Adresse gelten, `SITE_URL` setzen,
z. B. `SITE_URL=https://www.beispiel.de`.

`vercel.json` sorgt außerdem für Weiterleitungen auf URLs mit Schrägstrich am Ende,
Sicherheits-Header (inklusive Content-Security-Policy) und lange Cache-Zeiten für Bilder und Skripte.
Die Vercel-Toolbar in Previews wird durch die CSP blockiert; das betrifft nur Previews.

## Datenschutz

- Schriften liegen auf dem eigenen Server (keine Verbindung zu Google Fonts).
- Keine Cookies, kein Tracking, kein Cookie-Banner nötig.
- Google Maps lädt erst nach Klick (Zwei-Klick-Lösung).
- Die Terminanfrage auf der Kontaktseite speichert nichts: Die Angaben werden im Browser zu einer
  WhatsApp-Nachricht zusammengesetzt.

Impressum und Datenschutzerklärung sind sorgfältig erstellt, ersetzen aber keine Rechtsberatung.

## Grafiken

Die Original-Grafiken liegen in `design/reference/` (Rahmen mit drei Feldern, Volant, Schriftzug).
`npm run assets` erzeugt daraus die Web-Dateien in `src/assets/brand/` und `public/`
(freigestelltes Logo, nahtloses Ornamentband, Blütenornament, Favicons, Vorschaubild für Social Media).
Nur nötig, wenn sich die Originale ändern.

## Aufbau

```
src/
  assets/brand/      aufbereitete Grafiken (Astro optimiert sie beim Build)
  assets/patterns/   Damastmuster als SVG
  components/        Header, Footer, Schild, Karten, FAQ, Karte, Terminanfrage …
  data/              Inhalte und Stammdaten
  layouts/           Grundgerüst mit SEO-Tags und strukturierten Daten
  lib/               Links (Telefon, WhatsApp, Maps) und JSON-LD
  pages/             eine Datei pro Seite
  styles/global.css  Farben, Schriften, Grundstile
scripts/             Grafik-Aufbereitung, Platzhalter-Prüfung
```
