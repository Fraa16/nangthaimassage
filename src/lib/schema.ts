/** Strukturierte Daten (JSON-LD) für Google und KI-Suchmaschinen. */
import { business } from '../data/business';
import { services, lowestPrice, highestPrice, formatPrice } from '../data/services';
import type { FaqItem } from '../data/faq';
import { googleMapsUrl } from './links';
import { yearsOfExperience } from '../data/about';

type JsonLd = Record<string, unknown>;

export const businessId = (site: URL) => new URL('/#business', site).href;

export function localBusinessSchema(site: URL, logoUrl: string): JsonLd {
  const hours = business.openingHours;
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': businessId(site),
    name: business.name,
    alternateName: business.alternateName,
    description: `Studio für traditionelle Thaimassage in Ehningen. Nang massiert seit ${yearsOfExperience} Jahren. Angebot: Thaimassage, Thai-Ölmassage, Rücken-, Nacken- und Schultermassage, Kräuterstempelmassage und Fußreflexzonenmassage.`,
    url: new URL('/', site).href,
    telephone: business.phone.e164,
    image: new URL('/og-image.jpg', site).href,
    logo: logoUrl,
    priceRange: `${formatPrice(lowestPrice)} – ${formatPrice(highestPrice)}`,
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    hasMap: googleMapsUrl,
    openingHoursSpecification: groupHours(hours).map((g) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: g.days,
      opens: g.opens,
      closes: g.closes,
    })),
    areaServed: [business.address.city, ...business.nearbyTowns].map((name) => ({ '@type': 'City', name })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Massagen',
      itemListElement: services.map((s) => ({
        '@type': 'OfferCatalog',
        name: s.name,
        itemListElement: s.options.map((o) => ({
          '@type': 'Offer',
          price: o.price.toFixed(2),
          priceCurrency: 'EUR',
          itemOffered: {
            '@type': 'Service',
            name: `${s.name}, ${o.minutes} Minuten`,
            description: s.teaser,
          },
        })),
      })),
    },
    ...(business.googleProfileUrl ? { sameAs: [business.googleProfileUrl] } : {}),
  };
}

export function websiteSchema(site: URL): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: business.name,
    url: new URL('/', site).href,
    inLanguage: 'de-DE',
    publisher: { '@id': businessId(site) },
  };
}

export function faqSchema(items: FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbSchema(site: URL, trail: { name: string; href: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: new URL(crumb.href, site).href,
    })),
  };
}

function groupHours(hours: typeof business.openingHours) {
  const groups: { days: string[]; opens: string; closes: string }[] = [];
  for (const d of hours) {
    const g = groups.find((x) => x.opens === d.opens && x.closes === d.closes);
    if (g) g.days.push(d.schemaDay);
    else groups.push({ days: [d.schemaDay], opens: d.opens, closes: d.closes });
  }
  return groups;
}
