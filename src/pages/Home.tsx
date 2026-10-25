import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, img, matches } from '../data/catalog';
import { Icon, MoroccoFlag } from '../components/Art';
import { ProductCard } from '../components/ProductCard';
import { ContactBlock, Engagements, GreenBand, Kicker, NoResults, SearchBar } from '../components/Sections';
import { useTitle } from '../seo';

const SLIDES = 2;

function Carousel() {
  const [slide, setSlide] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES), 7000);
    return () => clearInterval(t);
  }, [auto]);
  // Une action de l'utilisateur arrête le défilement automatique.
  const go = (i: number) => { setAuto(false); setSlide((i + SLIDES) % SLIDES); };

  return (
    <section className="hero" aria-roledescription="carrousel" aria-label="À la une">
      {slide === 0 && (
        <div className="slide slide-family" aria-roledescription="diapositive" aria-label="1 sur 2">
          <div className="slide-text slide-text-edge">
            <img src={img('logo.png')} alt="" className="hero-logo" />
            <h1>La nature au service de votre bien-être</h1>
            <p className="lead">Compléments alimentaires et solutions naturelles pour toute la famille : enfants et adultes.</p>
            <Link to="/catalogue" className="btn btn-pill btn-lg">Découvrir nos produits <Icon name="arrow" stroke={2.2} /></Link>
          </div>
          <div className="slide-photo">
            <img src={img('famille.jpg')} alt="Une famille souriante en plein air" />
            <p className="script slide-script">Votre santé<br />notre priorité</p>
          </div>
        </div>
      )}
      {slide === 1 && (
        <div className="wrap slide slide-lab" aria-roledescription="diapositive" aria-label="2 sur 2">
          <div className="slide-text">
            <span className="kicker">Fabriqué au Maroc</span>
            <h2 className="h1">Qualité, innovation et bien-être</h2>
            <p className="lead">Des compléments alimentaires fabriqués avec exigence, pour accompagner le quotidien de toute la famille.</p>
            <Link to="/a-propos" className="btn btn-pill btn-lg">Notre entreprise</Link>
          </div>
          <img src={img('laboratoire.jpg')} alt="Technicien en laboratoire et ingrédients naturels" className="slide-lab-img" />
        </div>
      )}
      <div className="dots">
        <button type="button" onClick={() => go(slide - 1)} aria-label="Diapositive précédente"><Icon name="prev" stroke={2.4} /></button>
        {Array.from({ length: SLIDES }, (_, i) => (
          <button key={i} type="button" onClick={() => go(i)} aria-label={`Aller à la diapositive ${i + 1}`} aria-current={slide === i}>
            <span className={slide === i ? 'dot on' : 'dot'} />
          </button>
        ))}
        <button type="button" onClick={() => go(slide + 1)} aria-label="Diapositive suivante"><Icon name="next" stroke={2.4} /></button>
      </div>
    </section>
  );
}

export default function Home() {
  useTitle('Pharma Vert : compléments alimentaires pour toute la famille');
  const [q, setQ] = useState('');
  const results = PRODUCTS.filter((p) => matches(p, q));

  return (
    <>
      <Carousel />

      <section className="sec sec-white" aria-labelledby="ent-t">
        <div className="wrap split">
          <div className="split-text">
            <Kicker center={false}>Qui sommes-nous ?</Kicker>
            <h2 id="ent-t">Une société marocaine au service de votre santé</h2>
            <p className="prose"><strong>Pharma Vert</strong> est une société marocaine spécialisée dans la fabrication et la commercialisation de <strong>compléments alimentaires</strong>. Nous mettons notre expertise et notre savoir-faire au service de votre bien-être, en proposant des produits de qualité, sûrs et efficaces, adaptés aux besoins de toute la famille.</p>
            <p className="flag-line"><MoroccoFlag /> Fabriqué et commercialisé au Maroc</p>
          </div>
          <img src={img('laboratoire.jpg')} alt="Technicien en laboratoire, mention Qualité, Innovation, Bien-être et ingrédients naturels" className="split-img" />
        </div>
      </section>

      <section id="produits" className="sec sec-soft" aria-labelledby="prod-t">
        <div className="wrap stack">
          <div className="sec-head">
            <Kicker>Nos produits</Kicker>
            <h2 id="prod-t">Une gamme complète pour toute la famille</h2>
            <p className="sec-lead">Des compléments alimentaires adaptés aux besoins de chacun, pour un quotidien plus sain et plus équilibré.</p>
          </div>
          <SearchBar value={q} onChange={setQ} />
          {results.length
            ? <div className="grid">{results.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
            : <NoResults onReset={() => setQ('')} />}
        </div>
      </section>

      <Engagements />
      <GreenBand />
      <ContactBlock />
    </>
  );
}
