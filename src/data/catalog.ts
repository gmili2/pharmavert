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

/** Composition intégrale imprimée sur les boîtes Respinat (adultes et enfants). */
const RESPINAT_COMPO = 'Carbomère 980, glycérine, fructose, eau purifiée, extraits hydroglycérinés de mauve (Malva sylvestris), de camomille sauvage (Cladanthus mixtus), de sureau noir (Sambucus nigra), d’échinacée (Echinacea purpurea), de propolis, de guimauve (Althaea officinalis L.), de bouillon-blanc (Verbascum thapsus) et de myrte (Myrtus communis L.), gomme xanthane, menthol, acide ascorbique (vitamine C), huile essentielle d’eucalyptus, arôme orange.';

const tabs = (bienfaits = A_COMPLETER, conservation = CONSERVATION) =>
  ({ bienfaits, utilisation: A_COMPLETER, precautions: PRECAUTIONS, composition: A_COMPLETER, conservation });

export const PRODUCTS: Product[] = [
  {
    slug: 'cumax', name: 'Cumax', gamme: 'Anti-inflammatoire', desc: 'Souplesse articulaire et confort musculaire, à base de curcumine.',
    image: 'anti-inflammatoire.jpg', box: 'boite-cumax.webp', pack: 'Boîte de 30 gélules · voie orale', actifs: 'Curcumine · actifs naturels',
    color: '#E8891C', ink: '#A04A0C', icon: 'joint', audience: 'adulte',
    keys: 'anti inflammatoire douleur articulation genou inflammation curcumine curcuma muscle souplesse',
    summary: 'Cumax associe curcumine et actifs naturels pour aider à maintenir la souplesse articulaire et favoriser le confort musculaire. En traitement d’attaque, 1 gélule 2 fois par jour pendant 15 jours, puis 1 gélule par jour en entretien. Boîte de 30 gélules, en vente en pharmacies.',
    tabs: { ...tabs('Aide à maintenir la souplesse articulaire et favorise le confort musculaire, grâce à l’association de curcumine et d’actifs naturels.'), utilisation: 'Traitement d’attaque : 1 gélule 2 fois par jour pendant 15 jours.\nTraitement d’entretien : 1 gélule par jour.' },
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
    tabs: { ...tabs('Aide à réduire les ballonnements et les gaz intestinaux, et favorise une digestion légère et confortable.'), utilisation: '1 gélule 3 fois par jour.', composition: 'Charbon végétal activé, extrait sec de fenouil, extrait sec de carvi. Composition détaillée : à compléter avec l’étiquetage.' },
  },
  {
    slug: 'ociamag', name: 'Ociamag 375 mg', gamme: 'Magnésium', desc: 'Magnésium 375 mg et vitamine B6 pour soutenir votre équilibre au quotidien.',
    image: 'magnesium.jpg', box: 'boite-ociamag.webp', pack: 'Boîte de 30 gélules', actifs: 'Magnésium 375 mg · vitamine B6',
    color: '#7A4FA0', ink: '#5F3A85', icon: 'mg', audience: 'adulte', isNew: true,
    keys: 'magnesium mg vitamine b6 fatigue stress detente equilibre sommeil nerveux',
    summary: 'Ociamag associe magnésium (375 mg) et vitamine B6 pour soutenir votre équilibre au quotidien. Le magnésium contribue à réduire la fatigue et participe au bon fonctionnement du système nerveux, avec le soutien de la vitamine B6. Un complément alimentaire Pharma Vert, en vente en pharmacies.',
    tabs: {
      ...tabs('Soutient votre équilibre au quotidien. Le magnésium contribue à réduire la fatigue et participe au bon fonctionnement du système nerveux, avec le soutien de la vitamine B6.'),
      utilisation: '1 gélule par jour.',
      composition: 'Magnésium 375 mg, vitamine B6. Composition détaillée : à compléter avec l’étiquetage.',
    },
  },
  {
    slug: 'grofen', name: 'Grofen gélules', gamme: 'Stimulant d’appétit', desc: 'Fenugrec et 11 vitamines : stimule l’appétit naturellement et relance l’énergie.',
    image: 'stimulant-appetit.jpg', box: 'boite-grofen.webp', pack: 'Boîte de 30 gélules', actifs: 'Fenugrec · 11 vitamines',
    color: '#E8891C', ink: '#1E6B34', icon: 'fork', audience: 'adulte',
    keys: 'appetit manger fenugrec vitamines vitalite fatigue energie gelules',
    summary: 'Grofen associe le fenugrec à 11 vitamines pour stimuler l’appétit naturellement et relancer l’énergie. Cette formule complète contribue au bien-être général et à la vitalité. 1 à 2 gélules par jour, boîte de 30 gélules, en vente en pharmacies.',
    tabs: {
      ...tabs('Stimule l’appétit naturellement et relance l’énergie. Formule complète associant le fenugrec à 11 vitamines, qui contribue au bien-être général et à la vitalité.'),
      utilisation: '1 à 2 gélules par jour.',
      composition: 'Fenugrec, 11 vitamines. Composition détaillée : à compléter avec l’étiquetage.',
    },
  },
  {
    slug: 'grofen-sirop', name: 'Grofen sirop', gamme: 'Stimulant d’appétit · Solution buvable', desc: 'Fenugrec, gentiane et 11 vitamines, pour toute la famille dès le plus jeune âge.',
    image: 'stimulant-appetit.jpg', box: 'boite-grofen-sirop.webp', pack: 'Flacon de 200 mL · solution buvable', actifs: 'Fenugrec · gentiane · 11 vitamines',
    color: '#E8891C', ink: '#1E6B34', icon: 'fork', audience: 'famille', isNew: true,
    keys: 'appetit enfant manger croissance fenugrec gentiane vitamines vitalite fatigue energie sirop solution buvable',
    summary: 'Grofen sirop est un complexe de fenugrec, de gentiane et de vitamines, conçu pour soutenir la vitalité et stimuler l’appétit. Il convient aux enfants comme aux adultes, avec une posologie adaptée à l’âge. Flacon de 200 mL, en vente en pharmacies.',
    tabs: {
      ...tabs('Stimule l’appétit naturellement et relance l’énergie. Complexe de fenugrec, de gentiane et de vitamines, conçu pour soutenir la vitalité.', 'Bien refermer le flacon après usage. ' + CONSERVATION),
      utilisation: '• Avant 5 ans : ½ cuillère à café par jour.\n• De 5 à 12 ans : 1 cuillère à café par jour.\n• Adulte : 2 cuillères à café par jour.\nDurée d’utilisation : prendre l’avis d’un professionnel de santé.',
      composition: 'Fenugrec, gentiane, 11 vitamines. Composition détaillée : à compléter avec l’étiquetage.',
    },
  },
  {
    slug: 'respinat-adulte', name: 'Respinat Adultes', gamme: 'Confort respiratoire · Sans sucre', desc: 'Miel, propolis, vitamine C et plantes, à la fraîcheur du menthol.',
    image: 'sirop-toux.jpg', box: 'boite-respinat-adulte.webp', pack: 'Flacon de 200 mL · arôme orange', actifs: 'Miel · propolis · vitamine C · plantes · menthol',
    color: '#1F9A4E', ink: '#157038', icon: 'cough', audience: 'adulte', isNew: true,
    keys: 'toux gorge rhume respiration respiratoire sirop miel propolis vitamine c echinacee eucalyptus thym mauve camomille sureau guimauve menthol sans sucre adulte',
    summary: 'Respinat Adultes est une formule naturelle sans sucre, riche en actifs naturels. Elle associe miel, propolis, vitamine C et plantes sélectionnées (échinacée, eucalyptus, thym, mauve, camomille, sureau, guimauve) à la fraîcheur du menthol. Pensé pour votre bien-être respiratoire, il se présente en flacon de 200 mL. Une référence Pharma Vert.',
    tabs: {
      ...tabs('Formule naturelle sans sucre pensée pour le bien-être et le confort respiratoire : miel, propolis, vitamine C et plantes sélectionnées (échinacée, eucalyptus, thym, mauve, camomille, sureau, guimauve), à la fraîcheur du menthol.', 'Bien refermer le flacon après usage. ' + CONSERVATION),
      composition: RESPINAT_COMPO,
    },
  },
  {
    slug: 'respinat-enfant', name: 'Respinat Enfants', gamme: 'Confort respiratoire · Sans sucre', desc: 'Miel, propolis, vitamine C et plantes douces pour le bien-être respiratoire des petits.',
    image: 'sirop-toux.jpg', box: 'boite-respinat-enfant.webp', pack: 'Flacon de 125 mL · arôme orange', actifs: 'Miel · propolis · vitamine C · plantes douces',
    color: '#1BA3D6', ink: '#0F76A0', icon: 'cough', audience: 'enfant', isNew: true,
    keys: 'toux gorge rhume respiration respiratoire sirop enfant bebe miel propolis vitamine c echinacee eucalyptus mauve camomille sureau guimauve menthol sans sucre',
    summary: 'Pour accompagner les petits au quotidien, Respinat Enfants réunit miel, propolis, vitamine C et des plantes douces dans une formule naturelle sans sucre. Mauve, camomille sauvage, sureau noir, échinacée, guimauve, eucalyptus et menthol prennent soin de leur bien-être respiratoire. Flacon de 125 mL, de la gamme Pharma Vert.',
    tabs: {
      ...tabs('Formule naturelle sans sucre qui accompagne le bien-être respiratoire des petits au quotidien : miel, propolis, vitamine C et plantes douces (mauve, camomille sauvage, sureau noir, échinacée, guimauve, eucalyptus), avec du menthol.', 'Bien refermer le flacon après usage. ' + CONSERVATION),
      composition: RESPINAT_COMPO,
    },
  },
];

/** Anciennes adresses (avant les noms commerciaux), gardées pour les liens déjà partagés. */
const OLD_SLUGS: Record<string, string> = {
  'anti-inflammatoire': 'cumax', decontractant: 'deconat', 'anti-ballonnement': 'nobal', magnesium: 'ociamag', 'stimulant-appetit': 'grofen', 'sirop-toux': 'respinat-enfant',
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
