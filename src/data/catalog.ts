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
  /** Nom commercial (ex. Cumax) ou nom de gamme pour les produits sans marque. */
  name: string;
  /** Gamme affichée sous le nom commercial (ex. Anti-inflammatoire). */
  gamme?: string;
  desc: string;
  /** Photo d'ambiance. */
  image: string;
  /** Photo de la boîte détourée (PNG/WebP transparent), affichée à la place de la photo d'ambiance. */
  box?: string;
  /** Conditionnement, ex. « Boîte de 30 gélules ». */
  pack?: string;
  /** Actifs imprimés sur la boîte. */
  actifs?: string;
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
    slug: 'cumax', name: 'Cumax', gamme: 'Anti-inflammatoire', desc: 'Confort articulaire et confort musculaire, à base de curcumine.',
    image: 'anti-inflammatoire.jpg', box: 'boite-cumax.webp', pack: 'Boîte de 30 gélules · voie orale', actifs: 'Curcumine · actifs naturels',
    color: '#E8891C', ink: '#A04A0C', icon: 'joint', audience: 'adulte',
    keys: 'anti inflammatoire douleur articulation genou inflammation curcumine curcuma muscle',
    summary: 'Complément alimentaire à base de curcumine et d’actifs naturels, pour le confort articulaire et le confort musculaire.',
    tabs: tabs('Confort articulaire et confort musculaire.'),
  },
  {
    slug: 'deconat', name: 'Deconat', gamme: 'Myorelaxant · Décontractant', desc: 'Soulage efficacement les tensions musculaires.',
    image: 'decontractant.jpg', box: 'boite-deconat.webp', pack: 'Boîte de 30 gélules', actifs: 'Actifs naturels',
    color: '#2D8BD0', ink: '#1A66A3', icon: 'muscle', audience: 'adulte',
    keys: 'myorelaxant decontractant muscle dos contracture crampe tension',
    summary: 'Complément alimentaire aux actifs naturels qui aide à détendre les muscles et à soulager les tensions musculaires.',
    tabs: tabs('Soulage efficacement les tensions musculaires.'),
  },
  {
    slug: 'nobal', name: 'Nobal', gamme: 'Anti-ballonnement', desc: 'Élimine les gaz intestinaux et facilite la digestion.',
    image: 'anti-ballonnement.jpg', box: 'boite-nobal.webp', pack: 'Boîte de 30 gélules · poids net ≈ 12,5 g', actifs: 'Charbon végétal + E.S. de fenouil + E.S. de carvi',
    color: '#2F8F45', ink: '#1E6B34', icon: 'stomach', audience: 'famille',
    keys: 'anti ballonnement digestion ventre estomac gaz charbon fenouil carvi',
    summary: 'Complément alimentaire au charbon végétal, à l’extrait sec de fenouil et à l’extrait sec de carvi, pour un ventre plus léger.',
    tabs: { ...tabs('Élimine les gaz intestinaux et facilite la digestion.'), composition: 'Charbon végétal, extrait sec de fenouil, extrait sec de carvi. Composition détaillée : à compléter avec l’étiquetage.' },
  },
  {
    slug: 'ociamag', name: 'Ociamag 375 mg', gamme: 'Magnésium', desc: 'Magnésium et vitamine B6 : détente et équilibre, physique et intellectuel.',
    image: 'magnesium.jpg', box: 'boite-ociamag.webp', pack: 'Boîte de 30 gélules', actifs: 'Magnésium 375 mg · vitamine B6',
    color: '#7A4FA0', ink: '#5F3A85', icon: 'mg', audience: 'adulte', isNew: true,
    keys: 'magnesium mg vitamine b6 fatigue stress detente equilibre sommeil',
    summary: 'Complément alimentaire associant 375 mg de magnésium et de la vitamine B6, pour la détente et l’équilibre, physique et intellectuel.',
    tabs: {
      ...tabs('Détente et équilibre, physique et intellectuel. Le magnésium contribue à réduire la fatigue, au fonctionnement normal du système nerveux et au fonctionnement normal des muscles.'),
      composition: 'Magnésium 375 mg, vitamine B6. Composition détaillée : à compléter avec l’étiquetage.',
    },
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

/** Anciennes adresses (avant les noms commerciaux), gardées pour les liens déjà partagés. */
const OLD_SLUGS: Record<string, string> = {
  'anti-inflammatoire': 'cumax', decontractant: 'deconat', 'anti-ballonnement': 'nobal', magnesium: 'ociamag',
};
export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === (OLD_SLUGS[slug] ?? slug));

/** Lien WhatsApp vers le délégué avec un message pré-rempli. */
export const waLink = (text: string) => `https://wa.me/${CONTACT.phoneIntl}?text=${encodeURIComponent(text)}`;
export const telLink = `tel:+${CONTACT.phoneIntl}`;

/** Recherche insensible aux accents sur nom, description et mots-clés. */
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
export function matches(p: Product, q: string) {
  if (!q.trim()) return true;
  const hay = norm([p.name, p.gamme ?? '', p.desc, p.actifs ?? '', p.keys].join(' '));
  return norm(q).split(/\s+/).every((w) => hay.includes(w));
}
