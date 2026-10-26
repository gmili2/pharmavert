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
    slug: 'cumax', name: 'Cumax', gamme: 'Anti-inflammatoire', desc: 'Souplesse articulaire et confort musculaire, à base de curcumine.',
    image: 'anti-inflammatoire.jpg', box: 'boite-cumax.webp', pack: 'Boîte de 30 gélules · voie orale', actifs: 'Curcumine · actifs naturels',
    color: '#E8891C', ink: '#A04A0C', icon: 'joint', audience: 'adulte',
    keys: 'anti inflammatoire douleur articulation genou inflammation curcumine curcuma muscle souplesse',
    summary: 'Cumax associe curcumine et actifs naturels pour aider à maintenir la souplesse articulaire et favoriser le confort musculaire. 1 gélule 2 fois par jour, boîte de 30 gélules, en vente en pharmacies.',
    tabs: { ...tabs('Aide à maintenir la souplesse articulaire et favorise le confort musculaire, grâce à l’association de curcumine et d’actifs naturels.'), utilisation: '1 gélule 2 fois par jour.' },
  },
  {
    slug: 'deconat', name: 'Deconat', gamme: 'Myorelaxant · Décontractant', desc: 'Aide à relâcher les tensions musculaires du cou, du dos et des épaules.',
    image: 'decontractant.jpg', box: 'boite-deconat.webp', pack: 'Boîte de 30 gélules', actifs: 'Valériane · extraits naturels',
    color: '#2D8BD0', ink: '#1A66A3', icon: 'muscle', audience: 'adulte',
    keys: 'myorelaxant decontractant muscle dos cou epaules contracture crampe tension courbatures valeriane stress sport',
    summary: 'Deconat est un complément alimentaire à base de valériane et d’extraits naturels, conçu pour aider à relâcher les tensions musculaires du cou, du dos et des épaules. Il accompagne aussi les courbatures et favorise la détente et le bien-être en période de stress ou de fatigue. Il s’adresse aux adultes et aux adolescents de plus de 12 ans, y compris aux sportifs et aux personnes actives, sans effet de somnolence. Boîte de 30 gélules, en vente en pharmacies.',
    tabs: {
      ...tabs('Aide à relâcher les tensions musculaires du cou, du dos et des épaules. Accompagne les courbatures et favorise la détente et le bien-être en période de stress ou de fatigue, sans effet de somnolence.'),
      utilisation: '2 gélules 2 fois par jour, après les repas, en cure de 2 à 4 semaines. Pour les adultes et les adolescents de plus de 12 ans, y compris les sportifs et les personnes actives.',
      precautions: 'Réservé aux adultes et aux adolescents de plus de 12 ans. ' + PRECAUTIONS,
      composition: 'Valériane et extraits naturels. Composition détaillée : à compléter avec l’étiquetage.',
    },
  },
  {
    slug: 'nobal', name: 'Nobal', gamme: 'Anti-ballonnement', desc: 'Aide à réduire les ballonnements et les gaz, pour une digestion légère.',
    image: 'anti-ballonnement.jpg', box: 'boite-nobal.webp', pack: 'Boîte de 30 gélules · poids net ≈ 12,5 g', actifs: 'Charbon végétal activé + E.S. de fenouil + E.S. de carvi',
    color: '#2F8F45', ink: '#1E6B34', icon: 'stomach', audience: 'famille',
    keys: 'anti ballonnement digestion ventre estomac gaz charbon fenouil carvi',
    summary: 'Nobal associe le charbon végétal activé aux extraits naturels de fenouil et de carvi. Il aide à réduire les ballonnements et les gaz intestinaux, et favorise une digestion légère et confortable. Boîte de 30 gélules, en vente en pharmacies.',
    tabs: { ...tabs('Aide à réduire les ballonnements et les gaz intestinaux, et favorise une digestion légère et confortable.'), composition: 'Charbon végétal activé, extrait sec de fenouil, extrait sec de carvi. Composition détaillée : à compléter avec l’étiquetage.' },
  },
  {
    slug: 'ociamag', name: 'Ociamag 375 mg', gamme: 'Magnésium', desc: 'Magnésium 375 mg et vitamine B6 pour soutenir votre équilibre au quotidien.',
    image: 'magnesium.jpg', box: 'boite-ociamag.webp', pack: 'Boîte de 30 gélules', actifs: 'Magnésium 375 mg · vitamine B6',
    color: '#7A4FA0', ink: '#5F3A85', icon: 'mg', audience: 'adulte', isNew: true,
    keys: 'magnesium mg vitamine b6 fatigue stress detente equilibre sommeil nerveux',
    summary: 'Ociamag associe magnésium (375 mg) et vitamine B6 pour soutenir votre équilibre au quotidien. Le magnésium contribue à réduire la fatigue et participe au bon fonctionnement du système nerveux, avec le soutien de la vitamine B6. Un complément alimentaire Pharma Vert, en vente en pharmacies.',
    tabs: {
      ...tabs('Soutient votre équilibre au quotidien. Le magnésium contribue à réduire la fatigue et participe au bon fonctionnement du système nerveux, avec le soutien de la vitamine B6.'),
      composition: 'Magnésium 375 mg, vitamine B6. Composition détaillée : à compléter avec l’étiquetage.',
    },
  },
  {
    slug: 'grofen', name: 'Grofen', gamme: 'Stimulant d’appétit', desc: 'Fenugrec et 11 vitamines pour le bien-être général et la vitalité.',
    image: 'stimulant-appetit.jpg', actifs: 'Fenugrec · 11 vitamines', color: '#D23A7E', ink: '#AD2263', icon: 'fork', audience: 'enfant',
    keys: 'appetit enfant manger croissance fenugrec vitamines vitalite fatigue',
    summary: 'Grofen associe le fenugrec à 11 vitamines pour accompagner votre quotidien. Cette formule complète contribue à votre bien-être général et à votre vitalité. Un complément alimentaire Pharma Vert, en vente en pharmacies.',
    tabs: { ...tabs('Formule complète associant le fenugrec à 11 vitamines, qui contribue au bien-être général et à la vitalité.'), composition: 'Fenugrec, 11 vitamines. Composition détaillée : à compléter avec l’étiquetage.' },
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
  'anti-inflammatoire': 'cumax', decontractant: 'deconat', 'anti-ballonnement': 'nobal', magnesium: 'ociamag', 'stimulant-appetit': 'grofen',
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
