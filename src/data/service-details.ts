/**
 * Inhalte der Unterseiten je Massage (/leistungen/<slug>/).
 *
 * WICHTIG – Heilmittelwerbegesetz: keine Heilversprechen. Beschreiben, wie die
 * Massage abläuft und für wen sie sich eignet, nicht, was sie medizinisch
 * bewirkt (siehe Hinweis in about.ts). Preise und Dauer stehen in services.ts
 * und werden hier nur eingesetzt, damit alles an einer Stelle gepflegt wird.
 */
import type { FaqItem } from './faq';
import { business, hoursSummary } from './business';
import { formatPrice, getService, type Service } from './services';

export interface ServiceDetail {
  /** Title-Tag ohne Markenname, max. ca. 42 Zeichen */
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  lead: string;
  howTitle: string;
  how: string[];
  /** Empfehlung je Dauer (Minuten → kurzer Satz) */
  durationGuide: Record<number, string>;
  forWhomTitle: string;
  forWhom: string;
  notes: string[];
  faq: FaqItem[];
  /** Weiterführende Links unter dem Text (Quelle, verwandte Inhalte) */
  links?: { href: string; label: string; external?: boolean }[];
}

/** Beschluss der UNESCO zur Aufnahme von Nuad Thai (2019) */
export const unescoSource = 'https://ich.unesco.org/en/Decisions/14.COM/10.b.37';

/** „30 € für 30 Minuten, 55 € für 60 Minuten und 80 € für 90 Minuten“ */
export function priceSentence(service: Service): string {
  const parts = service.options.map((o) => `${formatPrice(o.price)} für ${o.minutes} Minuten`);
  return parts.length > 1 ? `${parts.slice(0, -1).join(', ')} und ${parts.at(-1)}` : parts[0];
}

const hours = hoursSummary()?.replace('Täglich', 'täglich') ?? 'zu unseren Öffnungszeiten';
const p = (slug: string) => priceSentence(getService(slug));

export const serviceDetails: Record<string, ServiceDetail> = {
  'traditionelle-thaimassage': {
    seoTitle: 'Traditionelle Thaimassage: Ablauf & Preise',
    metaDescription:
      'Traditionelle Thaimassage (Nuad Thai) in Ehningen: Druck entlang der Energielinien und sanfte Dehnungen, ohne Öl. 30 bis 120 Minuten, ab 30 €.',
    eyebrow: 'Nuad Thai',
    lead: 'Rhythmischer Druck entlang der Energielinien und sanfte Dehnungen, von den Füßen bis zum Kopf. Bei Nang in Ehningen mit 30, 60, 90 oder 120 Minuten.',
    howTitle: 'Wie läuft eine traditionelle Thaimassage ab?',
    how: [
      'Die traditionelle Thaimassage, in Thailand Nuad Thai oder Nuat Phaen Boran genannt, wird ohne Öl und in bequemer Kleidung ausgeführt. Mit Daumen, Handballen und Ellbogen arbeitet Nang rhythmisch entlang der Energielinien, der sogenannten Sen. Dazu kommen passive Dehnungen: Sie werden sanft bewegt und gedehnt, ohne selbst mitzuarbeiten. Hierzulande heißt sie deshalb auch Thai-Yoga-Massage.',
      'Die Massage bezieht den ganzen Körper ein, von den Füßen über Beine, Rücken und Arme bis zu Schultern, Nacken und Kopf. Vorher klären Sie kurz, wie kräftig es sein darf und ob es Stellen gibt, auf die Nang besonders achten soll.',
    ],
    durationGuide: {
      30: 'für eine kurze Pause zwischendurch',
      60: 'die klassische Ganzkörpermassage, ideal für das erste Mal',
      90: 'mehr Zeit für Dehnungen und für die Partien, die es besonders brauchen',
      120: 'die ausführliche Variante für eine lange Auszeit',
    },
    forWhomTitle: 'Für wen eignet sich die traditionelle Thaimassage?',
    forWhom:
      'Für alle, die kräftigen Druck und Dehnungen mögen und eine Massage suchen, die den ganzen Körper einbezieht. Wer es lieber sanft und fließend mag, ist mit der Thai-Ölmassage besser beraten.',
    notes: [
      'Tragen Sie bequeme, lockere Kleidung, in der Sie sich gut bewegen können.',
      'Planen Sie die Massage am besten nicht direkt nach einer großen Mahlzeit.',
    ],
    faq: [
      {
        question: 'Was kostet eine traditionelle Thaimassage in Ehningen?',
        answer: `Bei ${business.name} kostet die traditionelle Thaimassage ${p('traditionelle-thaimassage')}. Alle Preise sind Endpreise, bezahlt wird vor Ort beim Termin.`,
      },
      {
        question: 'Tut eine Thaimassage weh?',
        answer:
          'Sie ist kräftiger als eine klassische Wellnessmassage, sollte aber nie unangenehm sein. Sagen Sie Nang einfach, wenn der Druck zu stark oder zu schwach ist. Sie passt ihn an, damit die Massage für Sie angenehm bleibt.',
      },
      {
        question: 'Wird bei der traditionellen Thaimassage Öl verwendet?',
        answer:
          'Nein. Die traditionelle Thaimassage wird ohne Öl und in Kleidung ausgeführt. Mit warmem Öl massiert Nang bei der Thai-Ölmassage und bei der Kräuterstempelmassage.',
      },
      {
        question: 'Was bedeutet Nuad Thai?',
        answer:
          'Nuad Thai ist der thailändische Name der traditionellen Thaimassage. Nuat Phaen Boran heißt frei übersetzt „Massage nach altem Muster“. 2019 hat die UNESCO Nuad Thai in die Liste des immateriellen Kulturerbes der Menschheit aufgenommen.',
      },
    ],
    links: [{ href: unescoSource, label: 'UNESCO-Beschluss zu Nuad Thai (2019, englisch)', external: true }],
  },

  'thai-oelmassage': {
    seoTitle: 'Thai-Ölmassage mit warmem Öl in Ehningen',
    metaDescription:
      'Thai-Ölmassage in Ehningen: lange, fließende Griffe mit warmem Öl, sanfter als die klassische Thaimassage. 30 bis 120 Minuten, ab 30 €. Termin per WhatsApp.',
    eyebrow: 'Mit warmem Öl',
    lead: 'Lange, fließende Griffe mit warmem Öl, ruhiger und sanfter als die klassische Thaimassage. Bei Nang in Ehningen mit 30, 60, 90 oder 120 Minuten.',
    howTitle: 'Wie läuft eine Thai-Ölmassage ab?',
    how: [
      'Bei der Thai-Ölmassage gleiten die Hände mit warmem Öl in langen, ruhigen Bewegungen über den Körper. Dazu kommen Druckgriffe aus der traditionellen Thaimassage, die kräftigen Dehnungen fallen weg. So entsteht eine Ganzkörpermassage, bei der Sie vor allem abschalten können.',
      'Vor der Massage besprechen Sie mit Nang, was Sie ablegen möchten. Sie bestimmen, was für Sie angenehm ist. Sagen Sie ihr auch, ob Sie eher sanften oder kräftigeren Druck mögen.',
    ],
    durationGuide: {
      30: 'für eine kurze Auszeit',
      60: 'die klassische Ganzkörpermassage',
      90: 'mehr Ruhe und mehr Zeit für einzelne Partien',
      120: 'die ausführliche Variante für eine lange Auszeit',
    },
    forWhomTitle: 'Für wen eignet sich die Thai-Ölmassage?',
    forWhom:
      'Für alle, die eine ruhige, entspannende Massage suchen, und als Einstieg für alle, die Thaimassage zum ersten Mal ausprobieren. Wer kräftigen Druck und Dehnungen mag, wählt die traditionelle Thaimassage.',
    notes: ['Nach der Massage kann etwas Öl auf der Haut bleiben. Empfindliche Kleidung lassen Sie am besten zu Hause.'],
    faq: [
      {
        question: 'Was kostet eine Thai-Ölmassage in Ehningen?',
        answer: `Die Thai-Ölmassage mit warmem Öl kostet ${p('thai-oelmassage')}. Alle Preise sind Endpreise.`,
      },
      {
        question: 'Was ist der Unterschied zur traditionellen Thaimassage?',
        answer:
          'Die traditionelle Thaimassage wird ohne Öl und in Kleidung ausgeführt und arbeitet mit kräftigen Dehnungen. Die Thai-Ölmassage ist fließender und sanfter: warmes Öl, lange Streichungen und gezielter Druck, aber keine Dehnungen.',
      },
      {
        question: 'Welche Dauer ist für eine Ölmassage sinnvoll?',
        answer:
          'Für eine Ganzkörpermassage empfehlen sich 60 Minuten. Wer richtig abschalten möchte, bucht 90 oder 120 Minuten. Für eine kurze Pause gibt es die Ölmassage auch mit 30 Minuten.',
      },
    ],
  },

  'ruecken-nacken-schulter-massage': {
    seoTitle: 'Rücken- und Nackenmassage in Ehningen',
    metaDescription:
      'Rücken-, Nacken- und Schultermassage in Ehningen, auf Wunsch mit Kopf: Akupressur, Shiatsu-Elemente und Dehnungen. 30 bis 120 Minuten, ab 30 €.',
    eyebrow: 'Auf Wunsch mit Kopf',
    lead: 'Gezielt für Rücken, Nacken und Schultern, auf Wunsch mit Kopf: Nangs Schwerpunkt. Mit 30, 60, 90 oder 120 Minuten.',
    howTitle: 'Wie läuft die Rücken-, Nacken- und Schultermassage ab?',
    how: [
      'Diese Massage konzentriert sich auf den Oberkörper. Akupressur, Elemente aus dem Shiatsu, Dehnungen und Reflexzonentechniken ergeben zusammen eine wärmende, gründliche Massage. Nang arbeitet an Rücken, Nacken und Schultern und bezieht auf Wunsch auch den Kopf mit ein.',
      'Nacken, Schultern und Kopf sind Nangs Schwerpunkt. Sie kennt den Verlauf der Muskulatur genau, findet die Stellen, an denen es festsitzt, und arbeitet gezielt daran, so kräftig oder sanft, wie es Ihnen guttut.',
    ],
    durationGuide: {
      30: 'passt gut in eine Mittagspause',
      60: 'gründlich für Rücken, Nacken und Schultern',
      90: 'mit viel Zeit für Nacken und Kopf',
      120: 'die ausführliche Variante für den ganzen Oberkörper',
    },
    forWhomTitle: 'Für wen eignet sich die Massage?',
    forWhom:
      'Für alle, die viel sitzen, lange am Bildschirm arbeiten oder den Alltag buchstäblich im Nacken spüren. Mit 30 Minuten passt sie auch in eine Mittagspause.',
    notes: [],
    faq: [
      {
        question: 'Was kostet eine Nackenmassage in Ehningen?',
        answer: `Die Rücken-, Nacken- und Schultermassage kostet ${p('ruecken-nacken-schulter-massage')}. Alle Preise sind Endpreise, bezahlt wird vor Ort.`,
      },
      {
        question: 'Wird auch der Kopf massiert?',
        answer:
          'Auf Wunsch ja. Sagen Sie es bei der Terminvereinbarung oder vor der Massage, dann bezieht Nang den Kopf mit ein. Nacken, Schultern und Kopf gehören zu ihrem Schwerpunkt.',
      },
      {
        question: 'Welche Dauer passt für Nacken und Schultern?',
        answer:
          'Für eine kurze Pause reichen 30 Minuten. Wer Rücken, Nacken und Schultern gründlich massieren lassen möchte, bucht 60 Minuten. Mit 90 oder 120 Minuten bleibt viel Zeit für einzelne Partien und den Kopf.',
      },
    ],
    links: [{ href: '/ueber-uns/#schwerpunkt', label: 'So arbeitet Nang' }],
  },

  kraeuterstempelmassage: {
    seoTitle: 'Kräuterstempelmassage in Ehningen',
    metaDescription:
      'Thai-Kräuterstempelmassage in Ehningen: warme Kräuterstempel, Akupressur und ätherische Öle. 90 Minuten 90 €, 120 Minuten 120 €. Termin per Anruf oder WhatsApp.',
    eyebrow: 'Luk Pra Kob',
    lead: 'Warme Kräuterstempel, Akupressur und ätherische Öle für eine lange, ruhige Auszeit. Bei Nang in Ehningen mit 90 oder 120 Minuten.',
    howTitle: 'Wie läuft eine Kräuterstempelmassage ab?',
    how: [
      'Für die Kräuterstempelmassage werden Stoffsäckchen mit Kräutern gefüllt und erwärmt. Nang führt die warmen Stempel mit sanftem Druck über den Körper und verbindet das mit Akupressur und warmen ätherischen Ölen. Wärme und Kräuterduft machen diese Massage besonders intensiv.',
      'In Thailand heißt der Kräuterstempel Luk Pra Kob. Er gehört seit Generationen zur traditionellen thailändischen Massage. Damit genug Zeit für Wärme, Akupressur und Öl bleibt, gibt es die Kräuterstempelmassage mit 90 oder 120 Minuten.',
    ],
    durationGuide: {
      90: 'die klassische Kräuterstempelmassage',
      120: 'mit noch mehr Ruhe für den ganzen Körper',
    },
    forWhomTitle: 'Für wen eignet sich die Kräuterstempelmassage?',
    forWhom:
      'Für alle, die sich bewusst eine lange Auszeit nehmen möchten, und für alle, die Wärme mögen, besonders in der kalten Jahreszeit.',
    notes: [],
    faq: [
      {
        question: 'Was kostet eine Kräuterstempelmassage in Ehningen?',
        answer: `Die Kräuterstempelmassage kostet ${p('kraeuterstempelmassage')}. Alle Preise sind Endpreise, bezahlt wird vor Ort beim Termin.`,
      },
      {
        question: 'Was ist ein Kräuterstempel?',
        answer:
          'Ein Stoffsäckchen, gefüllt mit Kräutern. Es wird erwärmt und dann mit sanftem Druck auf den Körper gedrückt und darüber gerollt. In Thailand heißt der Kräuterstempel Luk Pra Kob.',
      },
      {
        question: 'Warum dauert die Kräuterstempelmassage mindestens 90 Minuten?',
        answer:
          'Die Stempel werden vorher erwärmt, und die Massage verbindet Wärme, Akupressur und ätherische Öle. Damit dafür genug Ruhe bleibt, gibt es sie mit 90 oder 120 Minuten.',
      },
    ],
  },

  fussreflexzonenmassage: {
    seoTitle: 'Fußmassage & Fußreflexzonen in Ehningen',
    metaDescription:
      'Fußmassage nach thailändischer Tradition in Ehningen: gezielter Druck auf die Reflexzonen der Füße. 30 Minuten 30 €, 60 Minuten 40 €. Termin per WhatsApp.',
    eyebrow: 'Thai-Fußmassage',
    lead: 'Eine ausgiebige Fußmassage nach thailändischer Tradition, mit gezieltem Druck auf die Reflexzonen der Füße. Mit 30 oder 60 Minuten.',
    howTitle: 'Wie läuft die Fußreflexzonenmassage ab?',
    how: [
      'Nang massiert die Füße mit gezieltem Druck auf die Zonen der Fußsohlen, dazu kommen streichende und knetende Griffe. Nach traditioneller Vorstellung spiegelt sich in den Füßen der ganze Körper wider.',
      'Die Massage tut müden Füßen gut und entspannt spürbar. Sagen Sie Nang einfach, wie kräftig es sein darf.',
    ],
    durationGuide: {
      30: 'als kurze Auszeit zwischendurch',
      60: 'ausgiebig, mit viel Zeit für beide Füße',
    },
    forWhomTitle: 'Für wen eignet sich die Fußmassage?',
    forWhom: 'Für alle, die viel stehen oder gehen, nach einem langen Tag auf den Beinen oder als kurze Auszeit zwischendurch.',
    notes: [],
    faq: [
      {
        question: 'Was kostet eine Fußmassage in Ehningen?',
        answer: `Die Fußreflexzonenmassage kostet ${p('fussreflexzonenmassage')}. Alle Preise sind Endpreise, bezahlt wird vor Ort.`,
      },
      {
        question: 'Ist Fußmassage dasselbe wie Fußreflexzonenmassage?',
        answer:
          'Bei Nang Thai Massage ist es dieselbe Anwendung: eine Fußmassage nach thailändischer Tradition, die gezielt mit den Reflexzonen der Fußsohlen arbeitet. Sie buchen sie mit 30 oder 60 Minuten.',
      },
      {
        question: 'Passt eine Fußmassage in die Mittagspause?',
        answer: `Ja, mit 30 Minuten passt sie gut in eine Pause. ${business.name} hat ${hours} geöffnet. Fragen Sie am besten kurz per WhatsApp nach einem freien Termin.`,
      },
    ],
  },
};

export function getServiceDetail(slug: string): ServiceDetail {
  const detail = serviceDetails[slug];
  if (!detail) throw new Error(`Keine Detailseite für: ${slug}`);
  return detail;
}
