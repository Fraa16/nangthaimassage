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
| `src/data/about.ts`     | Nangs Erfahrung, Schwerpunkt und Arbeitsweise; persönliche Geschichte (erscheint erst, wenn ausgefüllt) |
| `src/data/navigation.ts`| Menüpunkte                                                              |

Preise, Leistungen und Öffnungszeiten stammen aus Nangs Flyer (Stand 25.09.2026) und dem
massageando-Eintrag (Stand 24.09.2026); wo beide abweichen, gilt der Flyer.
Die Texte sind bewusst ohne Heilversprechen formuliert (Heilmittelwerbegesetz, Heilpraktikergesetz):
Nang ist keine Ärztin. Die Website zeigt, was sie kann (25 Jahre Erfahrung, Schwerpunkt Nacken,
Schultern, Kopf und Rücken, ihre Arbeitsweise), verspricht aber keine Wirkung. Nicht schreiben:
„hilft bei Migräne“, „gegen Kopfschmerzen“, „löst Schmerzen oder Blockaden“, „ohne Schmerzmittel“,
„Behandlung“, „Therapie“, „Patienten“. Was Gäste erlebt haben, steht in den Google-Bewertungen,
auf die die Website verlinkt. Diese Texte stehen gesammelt in `src/data/about.ts`.

## Vor dem Livegang

`npm run build` listet fehlende Angaben auf. Offen sind:

- [ ] **Vor- und Nachname der Inhaberin** (`business.owner`), Pflicht fürs Impressum
- [ ] **E-Mail-Adresse** (`business.email`), Pflicht fürs Impressum
- [ ] Umsatzsteuer-ID, falls vorhanden (`business.vatId`)
- [ ] Name exakt wie im Google-Profil schreiben (`business.name`)
- [ ] Eigene Domain in Vercel verbinden
- [ ] Optional, aber wirkungsvoll: persönliche Geschichte und Foto von Nang (`src/data/about.ts`)
- [ ] Nach dem Livegang: im Google-Unternehmensprofil die Website von massageando auf die neue Domain umstellen
- [ ] Öffnungszeiten (täglich 10–20 Uhr, auch an Feiertagen) und Preise im Google-Profil und bei massageando an den Flyer angleichen

**Fehlende Angaben:** Solange in `src/data/business.ts` noch `TODO:`-Platzhalter stehen,
warnt jeder Build im Log, und Impressum sowie Datenschutzerklärung zeigen die Lücken gelb markiert.
Der Build läuft trotzdem durch. Wer vor dem Livegang sicher gehen will, baut mit
`STRICT_PLACEHOLDERS=1 npm run build`; dann bricht der Build bei fehlenden Angaben ab.

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
