import { createContext, useContext, useEffect } from 'react';
import { CONTACT, SOCIALS } from './data/catalog';

/** Adresse publique du site (URL canoniques, sitemap, images de partage). */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://pharmavert.ma').replace(/\/$/, '');
export const SITE_NAME = 'Pharma Vert';
const DEFAULT_IMAGE = '/img/famille.jpg';

export type PageMeta = {
  title: string;
  description: string;
  /** Chemin de la page (ex. /catalogue), sans domaine. */
  path: string;
  /** Image de partage (chemin du site ou URL absolue). */
  image?: string;
  type?: 'website' | 'product';
  noindex?: boolean;
  /** Données structurées schema.org propres à la page. */
  jsonLd?: object[];
};

/** Pendant le pré-rendu, la page déclare ses métadonnées dans ce collecteur. */
export const SeoContext = createContext<{ meta?: PageMeta } | null>(null);

export const absUrl = (u: string) => (/^https?:\/\//.test(u) ? u : SITE_URL + (u.startsWith('/') ? u : '/' + u));
export const canonical = (path: string) => SITE_URL + (path === '/' ? '/' : path.replace(/\/$/, ''));

/** Données structurées communes : l'entreprise et le site. */
export function siteJsonLd(): object[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': SITE_URL + '/#organization',
      name: SITE_NAME,
      url: SITE_URL + '/',
      logo: absUrl('/img/logo.png'),
      description: 'Société marocaine de fabrication et de commercialisation de compléments alimentaires pour enfants et adultes, en vente en pharmacies.',
      address: { '@type': 'PostalAddress', addressCountry: 'MA' },
      email: CONTACT.email,
      contactPoint: [{ '@type': 'ContactPoint', telephone: '+' + CONTACT.phoneIntl, contactType: 'customer service', areaServed: 'MA', availableLanguage: ['fr', 'ar'] }],
      sameAs: SOCIALS.map((s) => s.url)
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': SITE_URL + '/#website',
      name: SITE_NAME,
      url: SITE_URL + '/',
      inLanguage: 'fr-MA',
      publisher: { '@id': SITE_URL + '/#organization' }
    }
  ];
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Un JSON-LD ne doit jamais pouvoir fermer la balise <script>.
const jsonForScript = (o: object) => JSON.stringify(o).replace(/</g, '\\u003c');
const robots = (m: PageMeta) => (m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');

/** Balises <head> d'une page, écrites dans le HTML par le pré-rendu. */
export function headTags(m: PageMeta): string {
  const url = canonical(m.path);
  const image = absUrl(m.image ?? DEFAULT_IMAGE);
  const ld = [...siteJsonLd(), ...(m.jsonLd ?? [])];
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${robots(m)}" />`,
    m.noindex ? '' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="fr_MA" />`,
    `<meta property="og:type" content="${m.type === 'product' ? 'product' : 'website'}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...ld.map((o) => `<script type="application/ld+json">${jsonForScript(o)}</script>`)
  ].filter(Boolean).join('\n    ');
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

/** Met à jour le <head> lors de la navigation dans le navigateur. */
function applyToDocument(m: PageMeta) {
  const url = canonical(m.path);
  const image = absUrl(m.image ?? DEFAULT_IMAGE);
  document.title = m.title;
  setMeta('name', 'description', m.description);
  setMeta('name', 'robots', robots(m));
  const og: [string, string][] = [['og:title', m.title], ['og:description', m.description], ['og:url', url], ['og:image', image], ['og:type', m.type === 'product' ? 'product' : 'website']];
  for (const [k, v] of og) setMeta('property', k, v);
  setMeta('name', 'twitter:title', m.title);
  setMeta('name', 'twitter:description', m.description);
  setMeta('name', 'twitter:image', image);
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (m.noindex) link?.remove();
  else {
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((s) => s.remove());
  for (const o of [...siteJsonLd(), ...(m.jsonLd ?? [])]) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = jsonForScript(o);
    document.head.appendChild(s);
  }
}

/** Déclare les métadonnées SEO de la page (pré-rendu + navigation dans le navigateur). */
export function useSeo(meta: PageMeta) {
  const collector = useContext(SeoContext);
  if (collector) collector.meta = meta;
  const key = JSON.stringify(meta);
  useEffect(() => {
    applyToDocument(meta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
