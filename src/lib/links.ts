import { business, fullAddress } from '../data/business';

export const telHref = `tel:${business.phone.e164}`;

/** WhatsApp-Link, optional mit vorausgefüllter Nachricht. */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${business.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

const placeQuery = `${business.name}, ${fullAddress}`;

/** Studio in Google Maps (Profil, falls hinterlegt, sonst Suche). */
export const googleMapsUrl =
  business.googleProfileUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeQuery)}`;

/** Routenplanung zum Studio. */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(placeQuery)}`;

export const appleMapsUrl = `https://maps.apple.com/?address=${encodeURIComponent(fullAddress)}&q=${encodeURIComponent(business.name)}`;

/** Wird erst nach Einwilligung geladen (siehe MapEmbed). */
export const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(placeQuery)}&hl=de&z=16&output=embed`;

export const hasEmail = !business.email.startsWith('TODO');
export const mailHref = `mailto:${business.email}`;
