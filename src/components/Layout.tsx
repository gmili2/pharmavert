import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CONTACT, telLink, waLink } from '../data/catalog';
import { Icon, Logo, WhatsAppIcon } from './Art';

export function Brand({ size = 30 }: { size?: number }) {
  return (
    <span className="brand" style={{ fontSize: size }}>
      Pharma<span>vert</span>
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const nav = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  const showSearch = pathname !== '/' && pathname !== '/catalogue';

  return (
    <header className="header">
      <div className="wrap header-row">
        <Link to="/" className="logo" aria-label="Pharmavert, accueil">
          <Logo size={42} />
          <Brand />
        </Link>
        {showSearch && (
          <form
            className="header-search"
            role="search"
            onSubmit={(e) => { e.preventDefault(); nav(`/catalogue?q=${encodeURIComponent(q)}`); }}
          >
            <Icon name="search" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un médicament…" aria-label="Rechercher un médicament" />
          </form>
        )}
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          <Icon name={open ? 'close' : 'menu'} size={24} />
        </button>
        <nav className={`nav${open ? ' open' : ''}`} aria-label="Navigation principale">
          <NavLink to="/catalogue">Catalogue</NavLink>
          <NavLink to="/a-propos">À propos</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <a className="btn-lime" href={telLink}>
            <Icon name="phone" /> Contacter le délégué
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Brand size={26} />
          <p>Votre partenaire santé : des produits de qualité, présentés et suivis par un délégué médical à votre écoute.</p>
        </div>
        <div>
          <h4>Navigation</h4>
          <Link to="/catalogue">Catalogue</Link>
          <Link to="/a-propos">À propos</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>{CONTACT.name}</h4>
          <span>{CONTACT.role}</span>
          <a className="footer-phone" href={telLink}>{CONTACT.phone}</a>
          <span>{CONTACT.hours}</span>
        </div>
      </div>
      <div className="wrap footer-legal">
        <span>© {new Date().getFullYear()} Pharmavert</span>
        <span>Ces informations ne remplacent pas l’avis d’un médecin ou d’un pharmacien.</span>
      </div>
    </footer>
  );
}

export function Layout() {
  const { pathname } = useLocation();
  // Accolades obligatoires : dans les Chrome récents scrollTo renvoie une Promise, que React prendrait pour une fonction de nettoyage.
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer />
      <a className="wa-float" href={waLink('Bonjour, je vous contacte depuis le site Pharmavert.')} target="_blank" rel="noreferrer" aria-label="Écrire sur WhatsApp">
        <WhatsAppIcon size={28} />
      </a>
    </>
  );
}
