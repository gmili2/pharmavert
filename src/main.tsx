import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { api, setProducts, type Product } from './data/catalog';
import './styles.css';

const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);

/** Produits à jour, tels qu'enregistrés dans le back-office. */
const fetchProducts = () =>
  fetch(api('produits.php'), { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null))
    .then((list: Product[] | null) => { if (Array.isArray(list)) setProducts(list); })
    .catch(() => {});

// Pages pré-rendues : React reprend le HTML existant avec les produits du pré-rendu, puis
// affiche ceux du back-office. Sinon (back-office, produit ajouté depuis, développement) :
// on charge d'abord les produits puis on affiche la page.
const root = document.getElementById('root')!;
const embedded = document.getElementById('produits-data');
if (root.hasChildNodes() && embedded) {
  setProducts(JSON.parse(embedded.textContent!));
  hydrateRoot(root, app);
  fetchProducts();
} else {
  fetchProducts().then(() => createRoot(root).render(app));
}
