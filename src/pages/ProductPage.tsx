import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PRODUCTS, categoryOf, productBySlug, waLink } from '../data/catalog';
import { Icon, ProductArt } from '../components/Art';
import { DeliveryBadge } from '../components/ProductCard';
import { useTitle } from '../seo';

const TABS = [
  ['indications', 'Indications'],
  ['posologie', 'Posologie'],
  ['contreIndications', 'Contre-indications'],
  ['composition', 'Composition'],
  ['conservation', 'Conservation'],
] as const;

const VIEWS = [['boite', 'Boîte'], ['plaquette', 'Plaquette'], ['notice', 'Notice']] as const;

export default function ProductPage() {
  const { slug = '' } = useParams();
  const p = productBySlug(slug);
  const [tab, setTab] = useState<(typeof TABS)[number][0]>('indications');
  const [view, setView] = useState<(typeof VIEWS)[number][0]>('boite');
  useTitle(p ? `${p.name} · Pharmavert` : 'Produit introuvable · Pharmavert');

  if (!p) {
    return (
      <div className="wrap section empty">
        <h1>Produit introuvable</h1>
        <p className="muted">Ce produit n’existe pas ou n’est plus au catalogue.</p>
        <Link className="btn" to="/catalogue">Retour au catalogue</Link>
      </div>
    );
  }

  const cat = categoryOf(p.category);
  const similar = PRODUCTS.filter((x) => x.slug !== p.slug).sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category)).slice(0, 4);
  const ask = waLink(`Bonjour, j’ai une question sur le produit « ${p.name} » (réf. ${p.reference}).`);
  const views = p.shape === 'boite' ? VIEWS : VIEWS.filter(([v]) => v !== 'plaquette');

  return (
    <div className="wrap product">
      <nav className="crumbs" aria-label="Fil d’Ariane">
        <Link to="/catalogue">Catalogue</Link> › <Link to={`/catalogue?cat=${cat.slug}`}>{cat.name}</Link> › <span>{p.name}</span>
      </nav>

      <div className="product-top">
        <div>
          <div className="product-art">
            <ProductArt p={p} view={view} big />
            <span className="art-note">Illustration · photo réelle à venir</span>
          </div>
          <div className="views">
            {views.map(([v, l]) => (
              <button key={v} className={view === v ? 'active' : ''} onClick={() => setView(v)}>{l}</button>
            ))}
          </div>
        </div>

        <div className="product-info">
          <div className="badges">
            <DeliveryBadge p={p} />
            <span className="badge">Disponible en pharmacie</span>
          </div>
          <h1>{p.name}</h1>
          <p className="muted big">{p.form} · {p.pack}</p>
          <p>{p.summary}</p>
          <dl className="facts">
            <div><dt>Molécule</dt><dd>{p.molecule}</dd></div>
            <div><dt>Dosage</dt><dd>{p.dosage}</dd></div>
            <div><dt>Voie</dt><dd>{p.route}</dd></div>
            <div><dt>Code produit</dt><dd>{p.reference}</dd></div>
          </dl>
          <div className="actions">
            {p.noticeUrl
              ? <a className="btn btn-lg" href={p.noticeUrl} target="_blank" rel="noreferrer"><Icon name="file" /> Télécharger la notice (PDF)</a>
              : <a className="btn btn-lg" href={waLink(`Bonjour, pouvez-vous m’envoyer la notice de « ${p.name} » ?`)} target="_blank" rel="noreferrer"><Icon name="file" /> Demander la notice</a>}
            <a className="btn-outline btn-lg" href={ask} target="_blank" rel="noreferrer">Poser une question au délégué</a>
          </div>
          {p.warning && (
            <div className="warning"><Icon name="alert" /><span>{p.warning}</span></div>
          )}
        </div>
      </div>

      <section className="tabs">
        <div className="tab-list" role="tablist">
          {TABS.map(([k, l]) => (
            <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'active' : ''} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>
        <div className="tab-panel" role="tabpanel">
          <h2>{TABS.find(([k]) => k === tab)![1]}</h2>
          <p>{p.tabs[tab]}</p>
        </div>
      </section>

      <section className="section-sm">
        <h2>Produits similaires</h2>
        <div className="similar">
          {similar.map((s) => (
            <Link key={s.slug} to={`/produit/${s.slug}`} className="mini">
              <span className="mini-icon"><Icon name="pill" /></span>
              <span><b>{s.name}</b><small>{s.form} · {s.pack}</small></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
