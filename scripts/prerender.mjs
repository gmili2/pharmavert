// Pré-rendu SEO : une page HTML complète par adresse publique, + 404, sitemap.xml et robots.txt.
// Lancé après « vite build » (client) et « vite build --ssr » (dist-ssr/entry-server.js).
import { createHash, randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const ssr = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);
const { render, routes, setProducts, DEFAULT_PRODUCTS } = ssr;

// Produits : ceux du back-office en ligne (pour que les pages pré-rendues soient à jour),
// sinon ceux de src/data/catalog.ts (première installation, site hors ligne).
const PRODUCTS_URL = process.env.PRODUITS_URL ?? 'https://pharmavert.ma/api/produits.php';
let products = DEFAULT_PRODUCTS;
try {
  const r = await fetch(PRODUCTS_URL, { signal: AbortSignal.timeout(15000) });
  const list = r.ok ? await r.json() : null;
  if (Array.isArray(list) && list.length) products = list;
  else throw new Error(`HTTP ${r.status}`);
  console.log(`Produits du back-office : ${products.length} (${PRODUCTS_URL})`);
} catch (e) {
  console.warn(`Back-office injoignable (${e.message}) : produits de src/data/catalog.ts`);
}
setProducts(products);
const productsJson = JSON.stringify(products).replace(/</g, '\\u003c');

// Le gabarit perd son titre et sa description génériques : chaque page reçoit les siens.
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
  .replace(/\s*<title>[\s\S]*?<\/title>/, '')
  .replace(/\s*<meta name="description"[^>]*>/, '');
if (!template.includes('<div id="root"></div>')) throw new Error('Gabarit inattendu : <div id="root"></div> introuvable');

// Les produits utilisés pour le rendu accompagnent la page : le navigateur reprend le même HTML.
const page = (url) => {
  const { html, head, meta } = render(url);
  const data = `<script id="produits-data" type="application/json">${productsJson}</script>`;
  return { meta, out: template.replace('</head>', `    ${head}\n  </head>`).replace('<div id="root"></div>', `<div id="root">${html}</div>\n    ${data}`) };
};
const fileFor = (url) => (url === '/' ? 'index.html' : `${url.slice(1)}.html`);

const pages = [];
for (const url of routes()) {
  const { out, meta } = page(url);
  const file = resolve(dist, fileFor(url));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, out);
  pages.push({ url, meta });
}
writeFileSync(resolve(dist, '404.html'), page('/page-introuvable').out);
// Coquille vide : back-office (/admin) et produits ajoutés depuis le dernier pré-rendu.
writeFileSync(resolve(dist, 'app.html'), template.replace('</head>', '    <title>Pharma Vert</title>\n  </head>'));

// Back-office : produits de départ (tant que rien n'a été enregistré) et code d'installation.
mkdirSync(resolve(dist, 'api'), { recursive: true });
writeFileSync(resolve(dist, 'api/produits-initiaux.json'), JSON.stringify(products, null, 1));
const codeFile = resolve(root, '.code-installation');
if (!existsSync(codeFile)) writeFileSync(codeFile, randomBytes(9).toString('base64url') + '\n');
const code = readFileSync(codeFile, 'utf8').trim();
writeFileSync(
  resolve(dist, 'api/_config.php'),
  `<?php\n// Généré au build. Code demandé une seule fois, pour créer le mot de passe du back-office.\nconst CODE_INSTALLATION_SHA256 = '${createHash('sha256').update(code).digest('hex')}';\n`
);

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
