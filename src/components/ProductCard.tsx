import { Link } from 'react-router-dom';
import type { Product } from '../data/catalog';
import { img } from '../data/catalog';
import { Icon, ProductBadge } from './Art';

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="card">
      <Link to={`/produit/${p.slug}`} className="card-media" tabIndex={-1} aria-hidden="true">
        <img src={img(p.image)} alt="" loading="lazy" />
        {p.isNew && <span className="tag-new">Nouveau</span>}
        <ProductBadge p={p} />
      </Link>
      <div className="card-body">
        <h3 style={{ color: p.ink }}><Link to={`/produit/${p.slug}`}>{p.name}</Link></h3>
        <p>{p.desc}</p>
        <Link className="card-link" to={`/produit/${p.slug}`}>Voir la fiche <Icon name="arrow" size={16} stroke={2.4} /></Link>
      </div>
    </article>
  );
}
