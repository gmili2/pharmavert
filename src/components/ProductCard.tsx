import { Link } from 'react-router-dom';
import type { Product } from '../data/catalog';
import { img } from '../data/catalog';
import { Icon, ProductBadge } from './Art';

/** Fond teinté de la couleur du produit, pour présenter la boîte détourée. */
export const boxBg = (p: Product) => `radial-gradient(circle at 50% 40%, #fff 0, color-mix(in srgb, ${p.color} 16%, #fff) 100%)`;

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="card">
      <Link to={`/produit/${p.slug}`} className={`card-media${p.box ? ' card-media-box' : ''}`} style={p.box ? { background: boxBg(p) } : undefined} tabIndex={-1} aria-hidden="true">
        <img src={img(p.box ?? p.image)} alt="" loading="lazy" />
        {p.isNew && <span className="tag-new">Nouveau</span>}
        <ProductBadge p={p} />
      </Link>
      <div className="card-body">
        {p.gamme && <span className="card-gamme">{p.gamme}</span>}
        <h3 style={{ color: p.ink }}><Link to={`/produit/${p.slug}`}>{p.name}</Link></h3>
        <p>{p.desc}</p>
        <Link className="card-link" to={`/produit/${p.slug}`}>Voir la fiche <Icon name="arrow" size={16} stroke={2.4} /></Link>
      </div>
    </article>
  );
}
