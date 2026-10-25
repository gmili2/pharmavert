import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { CONTACT, telLink, waLink } from '../data/catalog';
import { Icon, Logo, WhatsAppIcon } from './Art';

const LINKS = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/a-propos', label: 'Notre entreprise' },
  { to: '/catalogue', label: 'Nos produits' },
  { to: '/#engagements', label: 'Nos engagements' },
  { to: '/contact', label: 'Contact' },
];

function NavLinks() {
  const { pathname, hash } = useLocation();
  return (
    <>
      {LINKS.map((l) => l.to.includes('#')
        // NavLink ignore le hash : l'état actif de l'ancre est calculé à la main.
        ? <Link key={l.to} to={l.to} className={pathname === '/' && hash === '#engagements' ? 'active' : ''}>{l.label}</Link>
        : <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive && !(l.end && hash) ? 'active' : '')}>{l.label}</NavLink>)}
    </>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname, hash]);

  return (
    <header className="header">
      <div className="wrap header-row">
        <Link to="/" className="logo" aria-label="Pharma Vert, accueil">
          <Logo />
        </Link>
        <nav className={`nav${open ? ' open' : ''}`} aria-label="Navigation principale">
          <NavLinks />
        </nav>
        <div className="header-actions">
          <Link to="/catalogue" className="icon-btn" aria-label="Rechercher un produit">
            <Icon name="search" size={22} />
          </Link>
          <Link to="/catalogue" className="btn btn-pill header-cta">
            <Icon name="leaf" /> Nos produits
          </Link>
          <button className="burger icon-btn" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <span className="footer-brand"><b>Pharma Vert</b><span>Santé &amp; Bien-être</span></span>
        <nav aria-label="Liens du pied de page" className="footer-nav">
          {LINKS.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
        </nav>
        <a className="footer-phone" href={telLink}><Icon name="phone" size={16} /> {CONTACT.phone}</a>
      </div>
      <div className="wrap footer-legal">
        <span>© {new Date().getFullYear()} Pharma Vert · Une entreprise marocaine</span>
        <span>Les compléments alimentaires ne remplacent pas une alimentation variée et équilibrée ni l’avis d’un professionnel de santé.</span>
      </div>
    </footer>
  );
}

export function Layout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // Accolades obligatoires : dans les Chrome récents scrollTo renvoie une Promise, que React prendrait pour une fonction de nettoyage.
    const el = hash ? document.getElementById(hash.slice(1)) : null;
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); } else { window.scrollTo(0, 0); }
  }, [pathname, hash]);
  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer />
      <a className="wa-float" href={waLink('Bonjour, je vous contacte depuis le site Pharma Vert.')} target="_blank" rel="noreferrer" aria-label="Écrire sur WhatsApp">
        <WhatsAppIcon size={28} />
      </a>
    </>
  );
}
