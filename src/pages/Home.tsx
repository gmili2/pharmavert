import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES, CONTACT, PRODUCTS, telLink, waLink } from '../data/catalog';
import { Icon, Logo, WhatsAppIcon } from '../components/Art';
import { ProductCard } from '../components/ProductCard';
import { useTitle } from '../seo';

const STRENGTHS = [
  { icon: 'shield', title: 'Qualité contrôlée', text: 'Des produits fabriqués selon les standards pharmaceutiques et suivis lot par lot.' },
  { icon: 'users', title: 'Un délégué dédié', text: 'Un interlocuteur unique pour les pharmacies et les professionnels de santé.' },
  { icon: 'truck', title: 'Disponibles en pharmacie', text: 'Une gamme distribuée dans les pharmacies partout au Maroc.' },
  { icon: 'leaf', title: 'Santé au naturel', text: 'Des formules pensées pour le bien-être de toute la famille.' },
];

export default function Home() {
  useTitle('Pharmavert : trouvez votre médicament en quelques secondes');
  const [q, setQ] = useState('');
  const nav = useNavigate();

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-text">
            <h1>Trouvez votre médicament en quelques secondes</h1>
            <p className="lead">Recherchez par nom, molécule ou symptôme, puis consultez la fiche complète : posologie, composition, précautions.</p>
            <form className="search" role="search" onSubmit={(e) => { e.preventDefault(); nav(`/catalogue?q=${encodeURIComponent(q)}`); }}>
              <Icon name="search" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ex. : paracétamol, vitamine C, toux…" aria-label="Rechercher un médicament" />
              <button className="btn">Rechercher</button>
            </form>
            <div className="chips">
              {CATEGORIES.map((c) => (
                <Link key={c.slug} className="chip" to={`/catalogue?cat=${c.slug}`}>{c.name}</Link>
              ))}
            </div>
          </div>
          <div className="hero-card" aria-hidden="true">
            <Logo size={120} />
            <div className="hero-stat"><b>{PRODUCTS.length}</b><span>produits au catalogue</span></div>
            <div className="hero-stat"><b>{CATEGORIES.length}</b><span>gammes thérapeutiques</span></div>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Nos gammes</span>
            <h2>Une gamme pour chaque besoin</h2>
          </div>
          <Link className="link-arrow" to="/catalogue">Tout le catalogue <Icon name="arrow" /></Link>
        </div>
        <div className="cat-grid">
          {CATEGORIES.map((c) => {
            const n = PRODUCTS.filter((p) => p.category === c.slug).length;
            return (
              <Link key={c.slug} to={`/catalogue?cat=${c.slug}`} className="cat-card" style={{ ['--c' as string]: c.color }}>
                <span className="cat-dot"><Icon name="pill" size={22} /></span>
                <h3>{c.name}</h3>
                <p className="muted">{c.blurb}</p>
                <span className="small">{n} produit{n > 1 ? 's' : ''}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="band">
        <div className="wrap section">
          <span className="eyebrow">Pourquoi Pharmavert</span>
          <h2>L’essentiel de la santé, avec un vrai suivi</h2>
          <div className="strengths">
            {STRENGTHS.map((s) => (
              <div key={s.title} className="strength">
                <span className="strength-icon"><Icon name={s.icon} size={22} /></span>
                <h3>{s.title}</h3>
                <p className="muted">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <div>
            <span className="eyebrow">À la une</span>
            <h2>Produits phares</h2>
          </div>
          <Link className="link-arrow" to="/catalogue">Voir tout <Icon name="arrow" /></Link>
        </div>
        <div className="grid">
          {PRODUCTS.slice(0, 3).map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      <section className="wrap section">
        <div className="delegate">
          <div>
            <span className="eyebrow eyebrow-light">Professionnels de santé</span>
            <h2>Votre délégué médical à votre écoute</h2>
            <p>{CONTACT.name} vous présente la gamme, répond à vos questions et organise vos commandes en pharmacie.</p>
          </div>
          <div className="delegate-actions">
            <a className="btn-lime" href={telLink}><Icon name="phone" /> {CONTACT.phone}</a>
            <a className="btn-ghost" href={waLink('Bonjour, je souhaite des informations sur la gamme Pharmavert.')} target="_blank" rel="noreferrer">
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
