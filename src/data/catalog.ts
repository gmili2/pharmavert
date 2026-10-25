// Contenu du site : tout ce qui change souvent (produits, contact) est ici.
// Les textes produits sont des PREMIÈRES VERSIONS : bienfaits, conseils d'utilisation et composition
// sont à remplacer par les textes validés figurant sur l'étiquetage de chaque complément.

export const CONTACT = {
  name: 'El Amrani El Hassan',
  role: 'Délégué médical',
  phone: '06 61 70 67 39',
  phoneIntl: '212661706739',
  city: 'Maroc',
  hours: 'Du lundi au samedi, 9h – 18h',
};

/** Chemin d'une image de public/img, compatible avec le sous-dossier GitHub Pages. */
export const img = (file: string) => `${import.meta.env.BASE_URL}img/${file}`;

export type IconKey = 'joint' | 'muscle' | 'stomach' | 'mg' | 'fork' | 'cough';
export type Audience = 'adulte' | 'enfant' | 'famille';

export type Product = {
  slug: string;
  name: string;
  desc: string;
  image: string;
  /** Couleur de la pastille. */
  color: string;
  /** Couleur (plus foncée) du titre. */
  ink: string;
  icon: IconKey;
  audience: Audience;
  isNew?: boolean;
  /** Mots-clés de recherche (symptômes, synonymes). */
  keys: string;
  summary: string;
  tabs: { bienfaits: string; utilisation: string; precautions: string; composition: string; conservation: string };
};

export const AUDIENCES: { slug: Audience | ''; name: string }[] = [
  { slug: '', name: 'Tous' },
  { slug: 'adulte', name: 'Adultes' },
  { slug: 'enfant', name: 'Enfants' },
  { slug: 'famille', name: 'Toute la famille' },
];

const A_COMPLETER = 'À compléter avec le texte figurant sur l’étiquetage du produit.';
const CONSERVATION = 'À conserver dans un endroit sec, à température ambiante, à l’abri de la lumière et hors de la portée des enfants.';
const PRECAUTIONS = 'Ne pas dépasser la dose journalière recommandée. Un complément alimentaire ne remplace pas une alimentation variée et équilibrée ni un mode de vie sain. Demandez conseil à votre médecin ou pharmacien en cas de grossesse, d’allaitement ou de traitement en cours.';

const tabs = (bienfaits = A_COMPLETER, conservation = CONSERVATION) =>
  ({ bienfaits, utilisation: A_COMPLETER, precautions: PRECAUTIONS, composition: A_COMPLETER, conservation });

export const PRODUCTS: Product[] = [
  {
    slug: 'anti-inflammatoire', name: 'Anti-inflammatoire', desc: 'Soulage les douleurs et réduit l’inflammation.',
    image: 'anti-inflammatoire.jpg', color: '#E8891C', ink: '#A04A0C', icon: 'joint', audience: 'adulte',
    keys: 'douleur articulation genou inflammation',
    summary: 'Complément alimentaire conçu pour accompagner le confort des articulations au quotidien.',
    tabs: tabs(),
  },
  {
    slug: 'decontractant', name: 'Décontractant', desc: 'Aide à détendre les muscles et à retrouver la mobilité.',
    image: 'decontractant.jpg', color: '#2D8BD0', ink: '#1A66A3', icon: 'muscle', audience: 'adulte',
    keys: 'muscle dos contracture crampe',
    summary: 'Complément alimentaire pour accompagner la détente musculaire et la mobilité.',
    tabs: tabs(),
  },
  {
    slug: 'anti-ballonnement', name: 'Anti ballonnement', desc: 'Favorise une digestion légère et confortable.',
    image: 'anti-ballonnement.jpg', color: '#2F8F45', ink: '#1E6B34', icon: 'stomach', audience: 'famille',
    keys: 'digestion ventre ballonnement estomac gaz',
    summary: 'Complément alimentaire pour retrouver une digestion légère et un ventre plus confortable.',
    tabs: tabs(),
  },
  {
    slug: 'magnesium', name: 'Magnésium', desc: 'Contribue à réduire la fatigue et au bon fonctionnement musculaire.',
    image: 'magnesium.jpg', color: '#7A4FA0', ink: '#5F3A85', icon: 'mg', audience: 'adulte', isNew: true,
    keys: 'fatigue stress mg vitamine sommeil',
    summary: 'Le magnésium contribue à réduire la fatigue et au fonctionnement normal du système musculaire.',
    tabs: tabs('Le magnésium contribue à réduire la fatigue, au fonctionnement normal du système nerveux et au fonctionnement normal des muscles.'),
  },
  {
    slug: 'stimulant-appetit', name: 'Stimulant d’appétit', desc: 'Aide à retrouver le plaisir de manger.',
    image: 'stimulant-appetit.jpg', color: '#D23A7E', ink: '#AD2263', icon: 'fork', audience: 'enfant',
    keys: 'appetit enfant manger croissance',
    summary: 'Complément alimentaire pour aider à retrouver le plaisir de manger.',
    tabs: tabs(),
  },
  {
    slug: 'sirop-toux', name: 'Sirop pour la toux', desc: 'Apaise la gorge et facilite la respiration.',
    image: 'sirop-toux.jpg', color: '#2D8BD0', ink: '#1A66A3', icon: 'cough', audience: 'enfant', isNew: true,
    keys: 'toux gorge rhume respiration sirop enfant',
    summary: 'Sirop pour apaiser la gorge irritée et accompagner le confort respiratoire.',
    tabs: tabs(A_COMPLETER, 'Bien refermer le flacon après usage. ' + CONSERVATION),
  },
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

/** Lien WhatsApp vers le délégué avec un message pré-rempli. */
export const waLink = (text: string) => `https://wa.me/${CONTACT.phoneIntl}?text=${encodeURIComponent(text)}`;
export const telLink = `tel:+${CONTACT.phoneIntl}`;

/** Recherche insensible aux accents sur nom, description et mots-clés. */
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
export function matches(p: Product, q: string) {
  if (!q.trim()) return true;
  const hay = norm([p.name, p.desc, p.keys].join(' '));
  return norm(q).split(/\s+/).every((w) => hay.includes(w));
}
