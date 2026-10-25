import type { Product } from '../data/catalog';
import { categoryOf } from '../data/catalog';

/** Illustration vectorielle du produit (en attendant les vraies photos). */
export function ProductArt({ p, view = 'boite', big = false }: { p: Product; view?: 'boite' | 'plaquette' | 'notice'; big?: boolean }) {
  const c = categoryOf(p.category).color;
  if (view === 'plaquette') return <Blister color={c} />;
  if (view === 'notice') return <Notice p={p} color={c} />;
  switch (p.shape) {
    case 'flacon': return <Bottle color={c} />;
    case 'tube': return <Tube color={c} />;
    case 'effervescent': return <Effervescent color={c} />;
    case 'unidoses': return <Unidoses color={c} />;
    default: return <Box color={c} p={big ? p : undefined} />;
  }
}

const shadow = <ellipse cx="160" cy="176" rx="96" ry="9" fill="#D5E3CB" />;

function Box({ color, p }: { color: string; p?: Product }) {
  return (
    <svg viewBox="0 0 320 190" className="art" aria-hidden="true">
      {shadow}
      <path d="M86 52 L116 30 L246 30 L216 52 Z" fill="#F4F7F1" stroke="#B9C9AE" strokeWidth="2" />
      <path d="M216 52 L246 30 L246 140 L216 162 Z" fill="#DDE7D6" stroke="#B9C9AE" strokeWidth="2" />
      <rect x="86" y="52" width="130" height="110" fill="#fff" stroke="#B9C9AE" strokeWidth="2" />
      <rect x="86" y="52" width="9" height="110" fill={color} />
      <rect x="86" y="138" width="130" height="24" fill={color} />
      {p && (
        <>
          <text x="104" y="84" fontSize="16" fontWeight="800" fill="#1B2A1E">{p.molecule.split(' ')[0]}</text>
          <text x="104" y="104" fontSize="11" fill="#56655A">{p.dosage} · {p.pack}</text>
          <text x="98" y="155" fontSize="11" fontWeight="700" fill="#fff">Voie {p.route.toLowerCase()}</text>
        </>
      )}
    </svg>
  );
}

function Bottle({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 190" className="art" aria-hidden="true">
      {shadow}
      <rect x="140" y="16" width="40" height="22" rx="4" fill="#C8372D" />
      <path d="M146 38 h28 v14 l26 22 v92 a8 8 0 0 1 -8 8 h-64 a8 8 0 0 1 -8 -8 v-92 l26 -22 z" fill={color} />
      <rect x="128" y="92" width="64" height="52" rx="4" fill="#fff" />
      <rect x="128" y="92" width="64" height="10" fill="#C8372D" />
    </svg>
  );
}

function Tube({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 190" className="art" aria-hidden="true">
      {shadow}
      <path d="M70 70 L210 76 L210 124 L70 130 Z" fill="#fff" stroke="#B9C9AE" strokeWidth="2" />
      <rect x="62" y="68" width="10" height="64" fill="#DDE7D6" />
      <rect x="208" y="76" width="26" height="48" fill={color} />
      <rect x="234" y="86" width="30" height="28" rx="5" fill={color} />
    </svg>
  );
}

function Effervescent({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 190" className="art" aria-hidden="true">
      {shadow}
      <rect x="76" y="74" width="168" height="52" rx="14" fill="#E4E9EE" stroke="#B9C9AE" strokeWidth="2" />
      <rect x="96" y="74" width="120" height="52" fill={color} />
      <rect x="226" y="70" width="34" height="60" rx="10" fill="#fff" stroke="#B9C9AE" strokeWidth="2" />
    </svg>
  );
}

function Unidoses({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 190" className="art" aria-hidden="true">
      {shadow}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${104 + i * 30} 0)`}>
          <rect x="6" y="26" width="12" height="14" rx="3" fill="#3D6FB6" />
          <rect x="0" y="38" width="24" height="124" rx="7" fill="#fff" stroke="#3D6FB6" strokeWidth="3" />
          <rect x="1.5" y="104" width="21" height="16" fill={color === '#A85A1C' ? '#7FAEE0' : color} />
        </g>
      ))}
    </svg>
  );
}

function Blister({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 190" className="art" aria-hidden="true">
      {shadow}
      <rect x="70" y="34" width="180" height="128" rx="10" fill="#E4E9EE" stroke="#B9C9AE" strokeWidth="2" />
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx={98 + (i % 4) * 42} cy={i < 4 ? 72 : 124} rx="15" ry="15" fill="#fff" stroke={color} strokeWidth="3" />
      ))}
    </svg>
  );
}

function Notice({ p, color }: { p: Product; color: string }) {
  return (
    <svg viewBox="0 0 320 190" className="art" aria-hidden="true">
      {shadow}
      <rect x="100" y="20" width="120" height="150" rx="4" fill="#fff" stroke="#B9C9AE" strokeWidth="2" />
      <rect x="100" y="20" width="120" height="8" fill={color} />
      <text x="112" y="48" fontSize="9" fontWeight="800" fill="#1B2A1E">NOTICE</text>
      <text x="112" y="60" fontSize="8" fill="#56655A">{p.name}</text>
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x="112" y={72 + i * 10} width={i % 3 === 2 ? 60 : 96} height="4" rx="2" fill="#DDE7D6" />
      ))}
    </svg>
  );
}

export function Logo({ size = 46 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="46" cy="11" r="7" fill="#A6D07A" />
      <path d="M6 26 C 2 40, 12 50, 26 48 C 28 36, 20 26, 6 26 Z" fill="#A6D07A" />
      <path d="M22 20 C 34 30, 36 52, 30 76" stroke="#A6D07A" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M31 31 C 44 31, 56 23, 66 15" stroke="#A6D07A" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M40 44 C 48 32, 64 28, 78 32 C 70 44, 54 50, 40 44 Z" fill="#A6D07A" />
    </svg>
  );
}

const ICON: Record<string, string> = {
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3',
  alert: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01',
  file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6M9 15l3 3 3-3',
  pill: 'M10.5 20.5 3.5 13.5a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7zM8.5 8.5l7 7',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4',
  leaf: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10zM2 21c0-3 1.9-5.4 5.1-6',
  truck: 'M1 3h15v13H1zM16 8h4l3 3v5h-7zM5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
  pin: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  menu: 'M3 6h18M3 12h18M3 18h18',
  close: 'M18 6 6 18M6 6l12 12',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  flask: 'M9 2h6M10 2v6L4.5 18.5A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.8-2.5L14 8V2M7 15h10',
};

export function Icon({ name, size = 18 }: { name: keyof typeof ICON | string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
