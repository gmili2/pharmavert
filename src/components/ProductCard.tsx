import { Link } from 'react-router-dom';
import type { Product } from '../data/catalog';
import { categoryOf } from '../data/catalog';
import { ProductArt } from './Art';

export function DeliveryBadge({ p }: { p: Product }) {
  return p.delivery === 'sur'
    ? <span className="badge badge-rx">Sur ordonnance</span>
    : <span className="badge">Sans ordonnance</span>;
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="card">
      <Link to={`/produit/${p.slug}`} className="card-art" tabIndex={-1} aria-hidden="true">
        <DeliveryBadge p={p} />
        <ProductArt p={p} />
      </Link>
      <div className="card-body">
        <span className="eyebrow">{categoryOf(p.category).name}</span>
        <h3><Link to={`/produit/${p.slug}`}>{p.name}</Link></h3>
        <p className="muted">{p.form} · {p.pack}</p>
        <div className="card-foot">
          <span className="small">Molécule : <b>{p.molecule}</b></span>
          <Link className="btn" to={`/produit/${p.slug}`}>Voir la fiche</Link>
        </div>
      </div>
    </article>
  );
}
