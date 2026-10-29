// Pré-rendu SEO : une page HTML complète par adresse publique, + 404, sitemap.xml et robots.txt.
// Lancé après « vite build » (client) et « vite build --ssr » (dist-ssr/entry-server.js).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const ssr = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);
const { render, ROUTES } = ssr;

// Le gabarit perd son titre et sa description génériques : chaque page reçoit les siens.
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
  .replace(/\s*<title>[\s\S]*?<\/title>/, '')
  .replace(/\s*<meta name="description"[^>]*>/, '');
if (!template.includes('<div id="root"></div>')) throw new Error('Gabarit inattendu : <div id="root"></div> introuvable');

const page = (url) => {
  const { html, head, meta } = render(url);
  return { meta, out: template.replace('</head>', `    ${head}\n  </head>`).replace('<div id="root"></div>', `<div id="root">${html}</div>`) };
};
const fileFor = (url) => (url === '/' ? 'index.html' : `${url.slice(1)}.html`);

const pages = [];
for (const url of ROUTES) {
  const { out, meta } = page(url);
  const file = resolve(dist, fileFor(url));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, out);
  pages.push({ url, meta });
}
writeFileSync(resolve(dist, '404.html'), page('/page-introuvable').out);

const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://pharmavert.ma').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);
const priority = (u) => (u === '/' ? '1.0' : u === '/catalogue' ? '0.9' : u.startsWith('/produit/') ? '0.8' : '0.6');
const xmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const imageOf = (meta) => (meta.image ? (/^https?:/.test(meta.image) ? meta.image : SITE_URL + meta.image) : null);

writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
  .filter((p) => !p.meta.noindex)
  .map((p) => {
    const img = p.url.startsWith('/produit/') ? imageOf(p.meta) : null;
    return `  <url>
    <loc>${SITE_URL}${p.url === '/' ? '/' : p.url}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority(p.url)}</priority>${img ? `
    <image:image><image:loc>${xmlEsc(img)}</image:loc><image:title>${xmlEsc(p.meta.title)}</image:title></image:image>` : ''}
  </url>`;
  })
  .join('\n')}
</urlset>
`
);
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Pré-rendu : ${pages.length} pages + 404.html, sitemap.xml (${pages.length} URL), robots.txt`);
