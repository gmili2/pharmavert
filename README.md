# Pharmavert : site vitrine

Catalogue de produits de santé avec fiches détaillées et contact direct avec le délégué médical
(El Amrani El Hassan, 06 61 70 67 39). React + Vite, site 100 % statique.

## Pages

- `/` : accueil (carrousel, qui sommes-nous, produits avec recherche, engagements, contact)
- `/catalogue` : recherche et filtre « pour qui » (adultes, enfants, toute la famille)
- `/produit/:slug` : fiche (onglets bienfaits → conservation, autres produits)
- `/a-propos` : notre entreprise, démarche, engagements
- `/contact` : appel, WhatsApp, formulaire envoyé via WhatsApp

## Modifier le contenu

Tout est dans `src/data/catalog.ts` :

- `CONTACT` : nom, téléphone, horaires du délégué
- `PRODUCTS` : compléments alimentaires (nom, couleur, pictogramme, photo dans `public/img/`).
  **Les textes « À compléter » (conseils d'utilisation, composition…)** sont à remplacer par ceux de l'étiquetage.

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

### Hébergement Namecheap

Le site est aussi servi par le cPanel Namecheap sur https://pharmavert.mygympro.club :

```bash
./deploy-namecheap.sh   # build avec VITE_BASE=/ puis rsync vers ~/pharmavert.mygympro.club
```

`public/.htaccess` renvoie toutes les routes vers `index.html` et force le HTTPS.
