import type { IconKey, Product } from '../data/catalog';
import { img } from '../data/catalog';

export function Logo({ height = 58 }: { height?: number }) {
  return <img src={img('logo.png')} alt="Pharma Vert – Santé & Bien-être" className="logo-img" style={{ height }} />;
}

const PRODUCT_ICON: Record<Exclude<IconKey, 'mg'>, string> = {
  joint: 'M8 3v5a4 4 0 0 0 8 0V3M8 21v-5a4 4 0 0 1 8 0v5',
  muscle: 'M12 3c4 3 6 7 6 11a6 6 0 0 1-12 0c0-4 2-8 6-11zM12 8v12',
  stomach: 'M9 3v4c0 2-3 3-3 7a6 6 0 0 0 6 6c4 0 6-2 6-5 0-2-1.5-3-3.5-3S11 13 11 11V3',
  fork: 'M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 0-3 2-3 5s1 4 3 4v9',
  cough: 'M5 20v-5a7 7 0 1 1 11 5.7V22M19 8h2M19 12h3M19 16h2',
};

/** Pastille ronde colorée avec le pictogramme du produit. */
export function ProductBadge({ p, size = 50 }: { p: Product; size?: number }) {
  return (
    <span className="p-badge" style={{ background: p.color, width: size, height: size }}>
      {p.icon === 'mg'
        ? <span className="p-badge-mg" style={{ fontSize: size * 0.34 }}>Mg</span>
        : (
          <svg width={size * 0.48} height={size * 0.48} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={PRODUCT_ICON[p.icon]} />
          </svg>
        )}
    </span>
  );
}

export function MoroccoFlag() {
  return (
    <svg width="34" height="24" viewBox="0 0 34 24" role="img" aria-label="Drapeau du Maroc">
      <rect width="34" height="24" rx="3" fill="#C1272D" />
      <path d="M17 6.2 L18.7 11.4 L24.2 11.4 L19.8 14.6 L21.5 19.8 L17 16.6 L12.5 19.8 L14.2 14.6 L9.8 11.4 L15.3 11.4 Z" fill="none" stroke="#006233" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

const ICON: Record<string, string> = {
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3',
  alert: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01',
  file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6M9 15l3 3 3-3',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM8.5 12l2.5 2.5 4.5-5',
  leaf: 'M5 21c0-9 5-15 15-16-1 10-7 15-15 16zM5 21l8-8',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  users: 'M9 11.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2zM16 14.2c2.9.3 5 2.6 5 5.8',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
  flask: 'M9 2h6M10 2v6L4.5 18.5A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.8-2.5L14 8V2M7 15h10',
  menu: 'M3 6h18M3 12h18M3 18h18',
  close: 'M18 6 6 18M6 6l12 12',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  prev: 'M15 6l-6 6 6 6',
  next: 'M9 6l6 6-6 6',
};

export function Icon({ name, size = 18, stroke = 2 }: { name: keyof typeof ICON | string; size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICON[name]} />
    </svg>
  );
}

export function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 0 1 2.2 12C2.2 6.6 6.6 2.2 12 2.2S21.8 6.6 21.8 12 17.4 21.8 12 21.8zM12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12S18.6 0 12 0z" />
    </svg>
  );
}
