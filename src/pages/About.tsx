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
            <h1>Une société marocaine au service de votre santé</h1>
            <p className="prose"><strong>Pharma Vert</strong> est une société marocaine spécialisée dans la fabrication et la commercialisation de <strong>compléments alimentaires</strong>. Nous mettons notre expertise et notre savoir-faire au service de votre bien-être, en proposant des produits de qualité, sûrs et efficaces, adaptés aux besoins de toute la famille.</p>
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
