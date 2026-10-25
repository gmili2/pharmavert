import { useState } from 'react';
import { CONTACT, telLink, waLink } from '../data/catalog';
import { Icon, WhatsAppIcon } from '../components/Art';
import { useTitle } from '../seo';

const PROFILES = ['Pharmacien', 'Médecin', 'Particulier', 'Autre'];

export default function Contact() {
  useTitle('Contact · Pharmavert');
  const [f, setF] = useState({ name: '', profile: PROFILES[0], city: '', message: '' });
  const up = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  // Pas de serveur : le message est envoyé au délégué via WhatsApp.
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Bonjour, je suis ${f.name} (${f.profile}${f.city ? `, ${f.city}` : ''}).\n\n${f.message}`;
    window.open(waLink(text), '_blank', 'noopener');
  };

  return (
    <>
      <section className="hero hero-compact">
        <div className="wrap">
          <span className="eyebrow eyebrow-light">Contact</span>
          <h1>Parlons de vos besoins</h1>
          <p className="lead">Une question sur un produit, une notice, une commande ? Votre délégué médical vous répond rapidement.</p>
        </div>
      </section>

      <section className="wrap section contact">
        <div className="contact-cards">
          <a className="contact-card" href={telLink}>
            <span className="strength-icon"><Icon name="phone" size={22} /></span>
            <span><b>Appeler</b><small>{CONTACT.phone}</small></span>
          </a>
          <a className="contact-card" href={waLink('Bonjour, je vous contacte depuis le site Pharmavert.')} target="_blank" rel="noreferrer">
            <span className="strength-icon wa"><WhatsAppIcon size={22} /></span>
            <span><b>WhatsApp</b><small>Réponse rapide</small></span>
          </a>
          <div className="contact-card">
            <span className="strength-icon"><Icon name="clock" size={22} /></span>
            <span><b>Disponibilité</b><small>{CONTACT.hours}</small></span>
          </div>
          <div className="contact-card">
            <span className="strength-icon"><Icon name="users" size={22} /></span>
            <span><b>{CONTACT.name}</b><small>{CONTACT.role}</small></span>
          </div>
        </div>

        <form className="form" onSubmit={send}>
          <h2>Envoyer un message</h2>
          <label>Nom complet<input required value={f.name} onChange={up('name')} autoComplete="name" /></label>
          <div className="form-row">
            <label>Vous êtes
              <select value={f.profile} onChange={up('profile')}>{PROFILES.map((p) => <option key={p}>{p}</option>)}</select>
            </label>
            <label>Ville<input value={f.city} onChange={up('city')} autoComplete="address-level2" /></label>
          </div>
          <label>Message<textarea required rows={5} value={f.message} onChange={up('message')} /></label>
          <button className="btn btn-lg"><WhatsAppIcon /> Envoyer via WhatsApp</button>
          <p className="small muted">Votre message s’ouvre dans WhatsApp, prêt à être envoyé au délégué.</p>
        </form>
      </section>
    </>
  );
}
