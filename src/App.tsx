import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductPage from './pages/ProductPage';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Back-office : chargé seulement quand on ouvre /admin.
const Admin = lazy(() => import('./pages/Admin'));

/** Routes partagées par le navigateur (main.tsx) et le pré-rendu (entry-server.tsx). */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="admin" element={<Suspense fallback={null}><Admin /></Suspense>} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogue" element={<Catalog />} />
        <Route path="produit/:slug" element={<ProductPage />} />
        <Route path="a-propos" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
