import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoutes } from './App';
import { getProducts } from './data/catalog';
import { headTags, SeoContext, type PageMeta } from './seo';

/** Rendu HTML d'une page pour le pré-rendu (build). */
export function render(url: string): { html: string; head: string; meta: PageMeta } {
  const collector: { meta?: PageMeta } = {};
  const html = renderToString(
    <StrictMode>
      <SeoContext.Provider value={collector}>
        <StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppRoutes />
        </StaticRouter>
      </SeoContext.Provider>
    </StrictMode>
  );
  if (!collector.meta) throw new Error(`Aucune métadonnée SEO pour ${url}`);
  return { html, head: headTags(collector.meta), meta: collector.meta };
}

/** Toutes les pages publiques à pré-rendre (avec la liste de produits courante). */
export const routes = () => ['/', '/catalogue', '/a-propos', '/contact', ...getProducts().map((p) => `/produit/${p.slug}`)];

export { DEFAULT_PRODUCTS, getProducts, setProducts } from './data/catalog';
