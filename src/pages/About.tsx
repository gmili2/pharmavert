import { img } from '../data/catalog';
import { MoroccoFlag } from '../components/Art';
import { Engagements, GreenBand, Kicker } from '../components/Sections';
import { useTitle } from '../seo';

const STEPS = [
  ['Sélection', 'Des ingrédients choisis pour répondre à un besoin précis du quotidien.'],
  ['Fabrication', 'Une production maîtrisée, réalisée au Maroc.'],
  ['Contrôle', 'Un suivi de la qualité et de la conformité de chaque lot.'],
  ['Accompagnement', 'Un délégué médical au plus près des pharmacies et des professionnels de santé.'],
];

export default function About() {
  useTitle('Notre entreprise · Pharma Vert');
  return (
    <>
      <section className="sec sec-soft page-top">
        <div className="wrap split">
          <div className="split-text">
            <Kicker center={false}>Qui sommes-nous ?</Kicker>
            <h1>Votre partenaire santé et bien-être au Maroc</h1>
            <p className="lead">Bienvenue chez Pharma Vert, votre partenaire santé et bien-être au Maroc.</p>
            <p className="prose"><strong>Pharma Vert</strong> est une société marocaine spécialisée dans la fabrication et la commercialisation de <strong>compléments alimentaires</strong> et de produits dédiés au bien-être. Notre mission est de proposer des solutions adaptées aux besoins quotidiens des enfants et des adultes, en alliant qualité, innovation et savoir-faire.</p>
            <p className="prose">Chez Pharma Vert, nous plaçons <strong>la qualité, la confiance et la satisfaction de nos clients</strong> au cœur de nos priorités. Nous nous engageons à développer des produits répondant aux exigences applicables, avec une attention particulière portée à leur qualité et à leur sécurité.</p>
            <p className="prose"><em>Pharma Vert, un engagement quotidien pour votre bien-être et celui de votre famille.</em></p>
            <p className="flag-line"><MoroccoFlag /> Fabriqué et commercialisé au Maroc</p>
          </div>
          <img src={img('laboratoire.jpg')} alt="Technicien en laboratoire, mention Qualité, Innovation, Bien-être et ingrédients naturels" className="split-img" />
        </div>
      </section>

      <section className="sec sec-white">
        <div className="wrap">
          <div className="sec-head">
            <Kicker>Notre démarche</Kicker>
            <h2>De la sélection à votre pharmacie</h2>
          </div>
          <ol className="steps">
            {STEPS.map(([t, d], i) => (
              <li key={t}><span className="step-n">{i + 1}</span><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <Engagements />
      <GreenBand />
    </>
  );
}
