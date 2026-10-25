# Pharmavert : site vitrine

Catalogue de produits de santé avec fiches détaillées et contact direct avec le délégué médical
(El Amrani El Hassan, 06 61 70 67 39). React + Vite, site 100 % statique.

## Pages

- `/` : accueil (recherche, gammes, points forts, produits phares, délégué)
- `/catalogue` : recherche, gammes, filtres délivrance / forme, tri
- `/produit/:slug` : fiche (molécule, dosage, voie, onglets indications → conservation, produits similaires)
- `/a-propos` : mission, valeurs, engagement qualité
- `/contact` : appel, WhatsApp, formulaire envoyé via WhatsApp

## Modifier le contenu

Tout est dans `src/data/catalog.ts` :

- `CONTACT` : nom, téléphone, horaires du délégué
- `CATEGORIES` : gammes et couleurs
- `PRODUCTS` : produits. **Les produits actuels sont des exemples repris de la maquette** : à remplacer
  par la gamme réelle avec des textes validés (notice officielle).
- `noticeUrl` : lien vers la notice PDF (placer le fichier dans `public/notices/` puis `noticeUrl: 'notices/xxx.pdf'`).

## Développement

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
```

## Mise en ligne

Chaque push sur `main` déploie automatiquement sur GitHub Pages
(Settings → Pages → Source : « GitHub Actions »).
Avec un domaine personnalisé, définir la variable de dépôt `VITE_BASE` à `/`.
