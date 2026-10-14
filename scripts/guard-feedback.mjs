// Sperre für den Branch „feedback-thai“: Er enthält die thailändische Übersetzung der Website,
// nur damit Nang die Inhalte lesen und Rückmeldung geben kann. Er darf nie die offizielle Seite werden.
//
// Baut Vercel diesen Stand als Produktion (zum Beispiel nach einem versehentlichen Merge in main),
// bricht der Build hier ab. Vercel lässt dann die letzte deutsche Produktionsversion online.
if (process.env.VERCEL_ENV === 'production') {
  console.error('\n✖ Thailändische Feedback-Version: darf nicht in Produktion gehen. Build abgebrochen.\n');
  process.exit(1);
}
