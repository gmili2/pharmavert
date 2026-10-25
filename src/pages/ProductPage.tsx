import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AUDIENCES, PRODUCTS, img, productBySlug, telLink, waLink } from '../data/catalog';
import { Icon, ProductBadge, WhatsAppIcon } from '../components/Art';
import { ProductCard } from '../components/ProductCard';
import { useTitle } from '../seo';

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
  useTitle(p ? `${p.name} · Pharma Vert` : 'Produit introuvable · Pharma Vert');

  if (!p) {
    return (
      <div className="wrap sec">
        <div className="empty">
          <h1>Produit introuvable</h1>
          <p className="muted">Ce produit n’existe pas ou n’est plus au catalogue.</p>
          <Link className="btn btn-pill" to="/catalogue">Voir nos produits</Link>
        </div>
      </div>
    );
  }

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
            <div className="product-media">
              <img src={img(p.image)} alt={`Illustration : ${p.name}`} />
              {p.isNew && <span className="tag-new">Nouveau</span>}
              <ProductBadge p={p} size={72} />
            </div>
            <div className="product-info">
              <span className="kicker">Complément alimentaire · {audience}</span>
              <h1 style={{ color: p.ink }}>{p.name}</h1>
              <p className="lead">{p.desc}</p>
              <p className="prose">{p.summary}</p>
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
              <p>{p.tabs[tab]}</p>
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
