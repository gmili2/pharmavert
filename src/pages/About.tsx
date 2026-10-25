import { Link } from 'react-router-dom';
import { CONTACT, telLink } from '../data/catalog';
import { Icon } from '../components/Art';
import { useTitle } from '../seo';

const VALUES = [
  { icon: 'flask', title: 'Rigueur scientifique', text: 'Des formules établies sur des données reconnues et des dosages maîtrisés.' },
  { icon: 'shield', title: 'Sécurité du patient', text: 'Des informations claires, des précautions visibles et le respect de la prescription.' },
  { icon: 'users', title: 'Proximité', text: 'Un délégué présent sur le terrain, au plus près des pharmaciens et des médecins.' },
  { icon: 'leaf', title: 'Transparence', text: 'Composition, posologie et conservation consultables pour chaque produit.' },
];

const STEPS = [
  ['Sélection', 'Chaque produit est choisi pour répondre à un besoin de santé précis.'],
  ['Contrôle', 'Suivi de la qualité et de la conformité de chaque lot.'],
  ['Information', 'Fiches détaillées et notices accessibles aux professionnels et aux patients.'],
  ['Suivi', 'Accompagnement des pharmacies par votre délégué médical.'],
];

export default function About() {
  useTitle('À propos · Pharmavert');
  return (
    <>
      <section className="hero hero-compact">
        <div className="wrap">
          <span className="eyebrow eyebrow-light">À propos</span>
          <h1>L’essentiel de la santé, au naturel</h1>
          <p className="lead">Pharmavert propose une gamme de produits de santé du quotidien, avec un engagement simple : une information claire et un suivi humain, de la pharmacie au patient.</p>
        </div>
      </section>

      <section className="wrap section two-col">
        <div>
          <span className="eyebrow">Notre mission</span>
          <h2>Rendre les bons produits accessibles et bien compris</h2>
        </div>
        <div className="prose">
          <p>Nous accompagnons les pharmaciens et les professionnels de santé avec des produits fiables et une documentation complète : indications, posologie, contre-indications, composition et conservation.</p>
          <p>Notre délégué médical fait le lien entre la gamme et le terrain : présentation des produits, réponses aux questions, suivi des commandes et retours des patients.</p>
        </div>
      </section>

      <section className="band">
        <div className="wrap section">
          <span className="eyebrow">Nos valeurs</span>
          <h2>Ce qui nous guide</h2>
          <div className="strengths">
            {VALUES.map((v) => (
              <div key={v.title} className="strength">
                <span className="strength-icon"><Icon name={v.icon} size={22} /></span>
                <h3>{v.title}</h3>
                <p className="muted">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section">
        <span className="eyebrow">Notre engagement qualité</span>
        <h2>De la sélection au suivi</h2>
        <ol className="steps">
          {STEPS.map(([t, d], i) => (
            <li key={t}><span className="step-n">{i + 1}</span><h3>{t}</h3><p className="muted">{d}</p></li>
          ))}
        </ol>
      </section>

      <section className="wrap section">
        <div className="delegate">
          <div>
            <span className="eyebrow eyebrow-light">{CONTACT.role}</span>
            <h2>{CONTACT.name}</h2>
            <p>Votre interlocuteur pour découvrir la gamme, obtenir une notice ou passer commande.</p>
          </div>
          <div className="delegate-actions">
            <a className="btn-lime" href={telLink}><Icon name="phone" /> {CONTACT.phone}</a>
            <Link className="btn-ghost" to="/contact">Nous écrire</Link>
          </div>
        </div>
      </section>
    </>
  );
}
