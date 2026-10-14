export interface NavItem {
  href: string;
  label: string;
}

export const mainNav: NavItem[] = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/leistungen/', label: 'บริการ' },
  { href: '/ueber-uns/', label: 'เกี่ยวกับเรา' },
  { href: '/kontakt/', label: 'ติดต่อ' },
];

export const legalNav: NavItem[] = [
  { href: '/impressum/', label: 'ข้อมูลผู้ให้บริการ' },
  { href: '/datenschutz/', label: 'ความเป็นส่วนตัว' },
];

/** Englisch gibt es als eine Seite (/en/); die Navigation springt zu ihren Abschnitten. */
export const mainNavEn: NavItem[] = [
  { href: '/en/#massages', label: 'Massages & prices' },
  { href: '/en/#nang', label: 'About Nang' },
  { href: '/en/#visit', label: 'Visit' },
  { href: '/en/#faq', label: 'FAQ' },
];

/** Ziel des Sprachumschalters: der Abschnitt der englischen Seite, der zur deutschen Seite passt. */
export function englishHref(pathname: string): string {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const matches: Record<string, string> = {
    '/leistungen/': '/en/#massages',
    '/ueber-uns/': '/en/#nang',
    '/kontakt/': '/en/#visit',
  };
  return matches[path] ?? '/en/';
}

export const isCurrent = (href: string, pathname: string) => {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return href === '/' ? path === '/' : path.startsWith(href);
};
