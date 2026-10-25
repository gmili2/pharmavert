// Contenu du site : tout ce qui change souvent (produits, catégories, contact) est ici.
// Les produits ci-dessous sont des EXEMPLES repris de la maquette : à remplacer par la gamme réelle
// du client, avec des textes validés par un pharmacien.

export const CONTACT = {
  name: 'El Amrani El Hassan',
  role: 'Délégué médical',
  phone: '06 61 70 67 39',
  phoneIntl: '212661706739',
  city: 'Maroc',
  hours: 'Du lundi au samedi, 9h – 18h',
};

export type Delivery = 'sans' | 'sur';
export type Shape = 'boite' | 'flacon' | 'tube' | 'effervescent' | 'unidoses';

export type Category = {
  slug: string;
  name: string;
  color: string;
  blurb: string;
};

export const CATEGORIES: Category[] = [
  { slug: 'douleur-fievre', name: 'Douleur & fièvre', color: '#E07B39', blurb: 'Antalgiques et antipyrétiques pour les douleurs du quotidien.' },
  { slug: 'antibiotiques', name: 'Antibiotiques', color: '#7A4FA0', blurb: 'Traitements anti-infectieux délivrés sur prescription.' },
  { slug: 'vitamines', name: 'Vitamines & énergie', color: '#F2A93B', blurb: 'Vitamines et minéraux pour la vitalité et l’immunité.' },
  { slug: 'digestion', name: 'Digestion', color: '#2C8C99', blurb: 'Confort digestif, acidité et transit.' },
  { slug: 'rhume-toux', name: 'Rhume & toux', color: '#A85A1C', blurb: 'Sirops, sérums et soins de la sphère ORL.' },
  { slug: 'dermatologie', name: 'Dermatologie', color: '#2F7A3B', blurb: 'Crèmes et soins pour réparer et protéger la peau.' },
];

export type Product = {
  slug: string;
  name: string;
  category: string;
  delivery: Delivery;
  shape: Shape;
  form: string;
  pack: string;
  molecule: string;
  dosage: string;
  route: string;
  reference: string;
  summary: string;
  warning?: string;
  noticeUrl?: string;
  tabs: { indications: string; posologie: string; contreIndications: string; composition: string; conservation: string };
};

const CONSERVATION = 'À conserver à une température inférieure à 25 °C, à l’abri de l’humidité et hors de la portée des enfants.';

export const PRODUCTS: Product[] = [
  {
    slug: 'paracetamol-500', name: 'Paracétamol 500 mg', category: 'douleur-fievre', delivery: 'sans', shape: 'boite',
    form: 'Comprimés', pack: 'boîte de 16', molecule: 'Paracétamol', dosage: '500 mg', route: 'Orale', reference: 'PV-0101',
    summary: 'Antalgique et antipyrétique utilisé pour soulager les douleurs légères à modérées et faire baisser la fièvre.',
    warning: 'Ne pas associer à d’autres médicaments contenant du paracétamol. Demandez conseil à votre pharmacien en cas de doute.',
    tabs: {
      indications: 'Traitement symptomatique des douleurs d’intensité légère à modérée (maux de tête, douleurs dentaires, courbatures, règles douloureuses) et des états fébriles.',
      posologie: 'Adulte et enfant de plus de 50 kg : 1 à 2 comprimés par prise, à renouveler si besoin après 4 heures minimum, sans dépasser la dose indiquée sur la notice.',
      contreIndications: 'Allergie au paracétamol, insuffisance hépatique sévère.',
      composition: 'Paracétamol 500 mg. Excipients : voir la notice.',
      conservation: CONSERVATION,
    },
  },
  {
    slug: 'ibuprofene-400', name: 'Ibuprofène 400 mg', category: 'douleur-fievre', delivery: 'sans', shape: 'boite',
    form: 'Comprimés pelliculés', pack: 'boîte de 20', molecule: 'Ibuprofène', dosage: '400 mg', route: 'Orale', reference: 'PV-0102',
    summary: 'Anti-inflammatoire non stéroïdien utilisé contre la douleur, la fièvre et l’inflammation.',
    warning: 'Déconseillé en cas d’ulcère gastrique et pendant la grossesse. Demandez l’avis de votre pharmacien.',
    tabs: {
      indications: 'Traitement de courte durée des douleurs et de la fièvre, notamment d’origine inflammatoire.',
      posologie: 'Adulte : 1 comprimé par prise, au cours d’un repas, en respectant un intervalle de 6 heures. Suivre la notice.',
      contreIndications: 'Ulcère gastroduodénal, insuffisance rénale ou hépatique sévère, grossesse à partir du 6e mois, allergie aux AINS.',
      composition: 'Ibuprofène 400 mg. Excipients : voir la notice.',
      conservation: CONSERVATION,
    },
  },
  {
    slug: 'amoxicilline-1g', name: 'Amoxicilline 1 g', category: 'antibiotiques', delivery: 'sur', shape: 'boite',
    form: 'Comprimés dispersibles', pack: 'boîte de 14', molecule: 'Amoxicilline', dosage: '1 g', route: 'Orale', reference: 'PV-0201',
    summary: 'Antibiotique de la famille des pénicillines, prescrit dans le traitement de certaines infections bactériennes.',
    warning: 'Médicament délivré uniquement sur ordonnance. Respectez la durée de traitement prescrite par votre médecin.',
    tabs: {
      indications: 'Infections bactériennes à germes sensibles, selon la prescription médicale.',
      posologie: 'Selon la prescription de votre médecin.',
      contreIndications: 'Allergie aux pénicillines ou aux céphalosporines.',
      composition: 'Amoxicilline trihydratée, équivalent à 1 g d’amoxicilline. Excipients : voir la notice.',
      conservation: CONSERVATION,
    },
  },
  {
    slug: 'vitamine-c-1000', name: 'Vitamine C 1000 mg', category: 'vitamines', delivery: 'sans', shape: 'effervescent',
    form: 'Comprimés effervescents', pack: 'tube de 20', molecule: 'Acide ascorbique', dosage: '1000 mg', route: 'Orale', reference: 'PV-0301',
    summary: 'Apport en vitamine C pour aider à réduire la fatigue et contribuer au fonctionnement normal du système immunitaire.',
    tabs: {
      indications: 'États de fatigue passagère, besoins accrus en vitamine C.',
      posologie: '1 comprimé par jour, à dissoudre dans un grand verre d’eau, de préférence le matin.',
      contreIndications: 'Antécédents de calculs rénaux, régime pauvre en sel (présence de sodium).',
      composition: 'Acide ascorbique 1000 mg. Excipients : voir la notice.',
      conservation: 'Refermer soigneusement le tube après usage. À conserver à l’abri de l’humidité.',
    },
  },
  {
    slug: 'omeprazole-20', name: 'Oméprazole 20 mg', category: 'digestion', delivery: 'sur', shape: 'boite',
    form: 'Gélules gastro-résistantes', pack: 'boîte de 14', molecule: 'Oméprazole', dosage: '20 mg', route: 'Orale', reference: 'PV-0401',
    summary: 'Inhibiteur de la pompe à protons qui réduit la sécrétion d’acide de l’estomac.',
    warning: 'Médicament délivré sur ordonnance. Ne pas prolonger le traitement sans avis médical.',
    tabs: {
      indications: 'Reflux gastro-œsophagien et autres affections liées à l’acidité gastrique, selon prescription.',
      posologie: 'Selon la prescription médicale, généralement 1 gélule le matin à jeun.',
      contreIndications: 'Allergie à l’oméprazole ou aux benzimidazoles.',
      composition: 'Oméprazole 20 mg. Excipients : voir la notice.',
      conservation: CONSERVATION,
    },
  },
  {
    slug: 'sirop-toux-seche', name: 'Sirop contre la toux sèche', category: 'rhume-toux', delivery: 'sans', shape: 'flacon',
    form: 'Sirop', pack: 'flacon de 125 ml', molecule: 'À compléter', dosage: 'À compléter', route: 'Orale', reference: 'PV-0501',
    summary: 'Sirop destiné à calmer les toux sèches et irritatives.',
    tabs: {
      indications: 'Traitement de courte durée des toux sèches et des toux d’irritation.',
      posologie: 'Selon l’âge, à l’aide du gobelet doseur fourni. Suivre la notice.',
      contreIndications: 'Toux grasse, insuffisance respiratoire, enfant de moins de 6 ans sauf avis médical.',
      composition: 'À compléter avec la composition validée du produit.',
      conservation: 'Après ouverture, à conserver 1 mois maximum.',
    },
  },
  {
    slug: 'serum-physiologique', name: 'Sérum physiologique', category: 'rhume-toux', delivery: 'sans', shape: 'unidoses',
    form: 'Unidoses 5 ml', pack: 'boîte de 30', molecule: 'Chlorure de sodium', dosage: '0,9 %', route: 'Nasale, oculaire', reference: 'PV-0502',
    summary: 'Solution isotonique pour le lavage du nez et des yeux, adaptée à toute la famille.',
    tabs: {
      indications: 'Hygiène nasale quotidienne, lavage oculaire.',
      posologie: '1 unidose par narine ou par œil, plusieurs fois par jour si nécessaire.',
      contreIndications: 'Aucune connue.',
      composition: 'Chlorure de sodium 0,9 %, eau purifiée.',
      conservation: 'Unidose à usage unique : jeter après utilisation.',
    },
  },
  {
    slug: 'creme-reparatrice', name: 'Crème hydratante réparatrice', category: 'dermatologie', delivery: 'sans', shape: 'tube',
    form: 'Crème', pack: 'tube de 50 ml', molecule: 'Complexe émollient', dosage: '—', route: 'Cutanée', reference: 'PV-0601',
    summary: 'Crème qui nourrit, apaise et aide à réparer les peaux sèches et irritées.',
    tabs: {
      indications: 'Peaux sèches, rugueuses ou irritées du visage et du corps.',
      posologie: 'Appliquer 1 à 2 fois par jour sur une peau propre et sèche.',
      contreIndications: 'Allergie à l’un des composants.',
      composition: 'Voir la liste des ingrédients sur l’emballage.',
      conservation: 'À conserver à température ambiante. Après ouverture, à utiliser dans les 6 mois.',
    },
  },
];

export const categoryOf = (slug: string) => CATEGORIES.find((c) => c.slug === slug)!;
export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

/** Lien WhatsApp vers le délégué avec un message pré-rempli. */
export const waLink = (text: string) => `https://wa.me/${CONTACT.phoneIntl}?text=${encodeURIComponent(text)}`;
export const telLink = `tel:+${CONTACT.phoneIntl}`;

/** Recherche insensible aux accents sur nom, molécule, forme et catégorie. */
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
export function matches(p: Product, q: string) {
  if (!q.trim()) return true;
  const hay = norm([p.name, p.molecule, p.form, categoryOf(p.category).name, p.tabs.indications].join(' '));
  return norm(q).split(/\s+/).every((w) => hay.includes(w));
}
