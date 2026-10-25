import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT, telLink, waLink } from '../data/catalog';
import { Icon, MoroccoFlag, WhatsAppIcon } from './Art';

/** Sur-titre centré entre deux traits, comme sur la maquette. */
export function Kicker({ children, center = true }: { children: React.ReactNode; center?: boolean }) {
  return center
    ? <span className="kicker kicker-lines"><span />{children}<span /></span>
    : <span className="kicker">{children}</span>;
}

const ENGAGEMENTS = [
  { icon: 'leaf', title: 'Qualité', text: 'Des produits rigoureusement contrôlés.' },
  { icon: 'shield', title: 'Sécurité', text: 'Des formules conformes aux normes en vigueur.' },
  { icon: 'users', title: 'Confiance', text: 'Une relation durable avec nos clients.' },
  { icon: 'heart', title: 'Satisfaction', text: 'Le bien-être de votre famille est notre moteur.' },
];

export function Engagements() {
  return (
    <section id="engagements" className="sec sec-white" aria-labelledby="eng-t">
      <div className="wrap">
        <div className="sec-head">
          <Kicker>Nos engagements</Kicker>
          <h2 id="eng-t">La qualité, la confiance et votre satisfaction</h2>
        </div>
        <div className="engagements">
          {ENGAGEMENTS.map((e) => (
            <div key={e.title} className="engagement">
              <span className="ring"><Icon name={e.icon} size={30} stroke={1.8} /></span>
              <h3>{e.title}</h3>
              <p>{e.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GreenBand() {
  return (
    <section className="band" aria-label="Ensemble pour une vie plus saine">
      <svg className="band-leaf band-leaf-l" width="360" height="300" viewBox="0 0 360 300" aria-hidden="true">
        <path d="M20 280 C 40 160, 140 80, 300 60 C 280 200, 180 270, 20 280 Z" fill="#9BCB6B" />
        <path d="M20 280 C 120 200, 200 140, 300 60" stroke="#1E6B34" strokeWidth="4" fill="none" />
      </svg>
      <svg className="band-leaf band-leaf-r" width="300" height="260" viewBox="0 0 300 260" aria-hidden="true">
        <path d="M280 10 C 260 120, 170 200, 20 230 C 40 120, 130 40, 280 10 Z" fill="#9BCB6B" />
      </svg>
      <div className="wrap band-row">
        <p className="script band-script">Ensemble pour<br />une vie plus saine</p>
        <div className="band-center">
          <span className="band-brand">Pharma <span>Vert</span></span>
          <span className="band-sub">SANTÉ &amp; BIEN-ÊTRE</span>
          <Link to="/catalogue" className="btn btn-pill btn-white btn-lg">Découvrir nos produits <Icon name="arrow" stroke={2.2} /></Link>
        </div>
        <p className="band-flag"><MoroccoFlag /> Une entreprise marocaine</p>
      </div>
    </section>
  );
}

/** Coordonnées + formulaire. Pas de serveur : le message part au délégué via WhatsApp. */
export function ContactBlock({ title = 'Une question ? Écrivez-nous ou appelez', headingLevel = 2 }: { title?: string; headingLevel?: 1 | 2 }) {
  const [f, setF] = useState({ name: '', phone: '', message: '' });
  const up = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Bonjour, je suis ${f.name}${f.phone ? ` (${f.phone})` : ''}.\n\n${f.message}`;
    window.open(waLink(text), '_blank', 'noopener');
  };
  const H = headingLevel === 1 ? 'h1' : 'h2';

  return (
    <section id="contact" className="sec sec-soft" aria-labelledby="contact-t">
      <div className="wrap">
        <div className="sec-head">
          <Kicker>Contact</Kicker>
          <H id="contact-t">{title}</H>
        </div>
        <div className="contact">
          <div className="contact-cards">
            <a className="contact-card contact-card-main" href={telLink}>
              <span className="contact-icon"><Icon name="phone" size={22} /></span>
              <span><small>{CONTACT.name} · {CONTACT.role}</small><b className="contact-phone">{CONTACT.phone}</b></span>
            </a>
            <a className="contact-card" href={waLink('Bonjour, je vous contacte depuis le site Pharma Vert.')} target="_blank" rel="noreferrer">
              <span className="contact-icon contact-icon-wa"><WhatsAppIcon size={22} /></span>
              <span><small>WhatsApp</small><b>Réponse rapide</b></span>
            </a>
            <div className="contact-card">
              <span className="contact-icon"><Icon name="clock" size={22} /></span>
              <span><small>Disponibilité</small><b>{CONTACT.hours}</b></span>
            </div>
          </div>
          <form className="form" onSubmit={send}>
            <label>Nom complet<input required value={f.name} onChange={up('name')} autoComplete="name" /></label>
            <label>Téléphone<input type="tel" value={f.phone} onChange={up('phone')} autoComplete="tel" /></label>
            <label className="full">Message<textarea required rows={5} value={f.message} onChange={up('message')} /></label>
            <div className="full form-foot">
              <span className="small muted">Votre message s’ouvre dans WhatsApp, prêt à être envoyé.</span>
              <button className="btn btn-pill btn-lg"><WhatsAppIcon /> Envoyer le message</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <form className="searchbar" role="search" onSubmit={(e) => e.preventDefault()}>
      <Icon name="search" size={20} />
      <input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Rechercher un produit : magnésium, toux, digestion…" aria-label="Rechercher un produit" />
      <button className="btn btn-pill">Rechercher</button>
    </form>
  );
}

export function NoResults({ onReset }: { onReset: () => void }) {
  return (
    <div className="empty">
      <h3>Aucun produit trouvé</h3>
      <p className="muted">Essayez un autre mot : fatigue, digestion, douleur…</p>
      <button type="button" className="btn btn-pill btn-outline" onClick={onReset}>Voir tous les produits</button>
    </div>
  );
}
