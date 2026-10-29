import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AUDIENCES, PRODUCTS, img, productBySlug, telLink, waLink } from '../data/catalog';
import { Icon, ProductBadge, WhatsAppIcon } from '../components/Art';
import { ProductCard, boxBg } from '../components/ProductCard';
import { canonical, absUrl, useSeo } from '../seo';
import NotFound from './NotFound';

const TABS = [
  ['bienfaits', 'Bienfaits'],
  ['utilisation', 'Conseils d’utilisation'],
  ['precautions', 'Précautions'],
  ['composition', 'Composition'],
  ['conservation', 'Conservation'],
] as const;

export default function ProductPage() {
  const { slug = '' } = useParams();
  const p = productBySlug(slug);
  const [tab, setTab] = useState<(typeof TABS)[number][0]>('bienfaits');
  if (!p) return <NotFound />;
  return <ProductView slug={slug} p={p} tab={tab} setTab={setTab} />;
}

function ProductView({ slug, p, tab, setTab }: { slug: string; p: NonNullable<ReturnType<typeof productBySlug>>; tab: (typeof TABS)[number][0]; setTab: (t: (typeof TABS)[number][0]) => void }) {
  const description = `${p.name}${p.gamme ? ` (${p.gamme.toLowerCase()})` : ''} : ${p.desc}${p.pack ? ` ${p.pack}.` : ''} Complément alimentaire Pharma Vert en vente en pharmacies au Maroc.`;
  useSeo({
    title: `${p.name}${p.gamme ? ` – ${p.gamme}` : ''} | Pharma Vert`,
    description: description.length > 170 ? description.slice(0, 167).replace(/\s+\S*$/, '') + '…' : description,
    path: `/produit/${p.slug}`,
    image: img(p.box ?? p.image),
    type: 'product',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        description: p.summary,
        image: absUrl(img(p.box ?? p.image)),
        url: canonical(`/produit/${p.slug}`),
        category: p.gamme ? `Complément alimentaire · ${p.gamme}` : 'Complément alimentaire',
        brand: { '@type': 'Brand', name: 'Pharma Vert' },
        manufacturer: { '@id': canonical('/') + '#organization' },
        ...(p.actifs ? { additionalProperty: [{ '@type': 'PropertyValue', name: 'Actifs', value: p.actifs }] } : {})
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: canonical('/') },
          { '@type': 'ListItem', position: 2, name: 'Nos produits', item: canonical('/catalogue') },
          { '@type': 'ListItem', position: 3, name: p.name, item: canonical(`/produit/${p.slug}`) }
        ]
      }
    ]
  });

  // Ancienne adresse : on bascule sur l'adresse actuelle du produit.
  if (p.slug !== slug) return <Navigate to={`/produit/${p.slug}`} replace />;

  const others = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  const audience = AUDIENCES.find((a) => a.slug === p.audience)!.name;

  return (
    <>
      <section className="sec sec-soft page-top">
        <div className="wrap">
          <nav className="crumbs" aria-label="Fil d’Ariane">
            <Link to="/">Accueil</Link> › <Link to="/catalogue">Nos produits</Link> › <span>{p.name}</span>
          </nav>
          <div className="product-top">
            <div className={`product-media${p.box ? ' product-media-box' : ''}`} style={p.box ? { background: boxBg(p) } : undefined}>
              <img src={img(p.box ?? p.image)} alt={p.box ? `Boîte ${p.name}${p.pack ? `, ${p.pack.toLowerCase()}` : ''}` : `Illustration : ${p.name}`} />
              {p.isNew && <span className="tag-new">Nouveau</span>}
              <ProductBadge p={p} size={72} />
            </div>
            <div className="product-info">
              <span className="kicker">{p.gamme ?? 'Complément alimentaire'} · {audience}</span>
              <h1 style={{ color: p.ink }}>{p.name}</h1>
              <p className="lead">{p.desc}</p>
              <p className="prose">{p.summary}</p>
              {(p.actifs || p.pack) && (
                <dl className="facts">
                  {p.actifs && <div><dt>Actifs</dt><dd>{p.actifs}</dd></div>}
                  {p.pack && <div><dt>Présentation</dt><dd>{p.pack}</dd></div>}
                </dl>
              )}
              <div className="actions">
                <a className="btn btn-pill btn-lg" href={waLink(`Bonjour, j’ai une question sur le produit « ${p.name} ».`)} target="_blank" rel="noreferrer">
                  <WhatsAppIcon /> Poser une question
                </a>
                <a className="btn btn-pill btn-outline btn-lg" href={telLink}><Icon name="phone" /> Appeler le délégué</a>
              </div>
              <div className="note"><Icon name="info" /><span>Disponible en pharmacie. Demandez conseil à votre pharmacien.</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-white">
        <div className="wrap">
          <div className="tabs">
            <div className="tab-list" role="tablist">
              {TABS.map(([k, l]) => (
                <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'active' : ''} onClick={() => setTab(k)}>{l}</button>
              ))}
            </div>
            <div className="tab-panel" role="tabpanel">
              <h2>{TABS.find(([k]) => k === tab)![1]}</h2>
              <p style={{ whiteSpace: 'pre-line' }}>{p.tabs[tab]}</p>
            </div>
          </div>

          <h2 className="others-t">Découvrez aussi</h2>
          <div className="grid grid-3">
            {others.map((o) => <ProductCard key={o.slug} p={o} />)}
          </div>
        </div>
      </section>
    </>
  );
}
