import { Link } from 'react-router-dom';
import { useSeo } from '../seo';

/** Page introuvable : exclue de l'index (noindex) et servie avec un vrai code 404 par le serveur. */
export default function NotFound() {
  useSeo({
    title: 'Page introuvable | Pharma Vert',
    description: 'Cette page n’existe pas ou n’est plus disponible sur le site Pharma Vert.',
    path: '/404',
    noindex: true
  });
  return (
    <div className="wrap sec">
      <div className="empty">
        <h1>Page introuvable</h1>
        <p className="muted">Cette page n’existe pas ou n’est plus au catalogue.</p>
        <Link className="btn btn-pill" to="/catalogue">Voir nos produits</Link>
      </div>
    </div>
  );
}
