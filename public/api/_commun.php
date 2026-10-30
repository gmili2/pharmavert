<?php
// Fonctions partagées par l'API du back-office.
// Les données vivent HORS de public_html (dossier pharmavert-donnees à côté) :
// envoyer un nouveau zip du site ne les écrase jamais.
declare(strict_types=1);

const ICONES = ['joint', 'muscle', 'stomach', 'mg', 'fork', 'cough'];
const PUBLICS = ['adulte', 'enfant', 'famille'];
const ONGLETS = ['bienfaits', 'utilisation', 'precautions', 'composition', 'conservation'];
const NB_SAUVEGARDES = 30;

function racine_site(): string
{
    $doc = $_SERVER['DOCUMENT_ROOT'] ?? '';
    return $doc !== '' ? rtrim($doc, '/') : dirname(__DIR__);
}

function dossier_donnees(): string
{
    $dir = dirname(racine_site()) . '/pharmavert-donnees';
    if (!is_dir($dir) && !@mkdir($dir, 0750, true)) {
        repondre(['erreur' => 'Dossier de données impossible à créer : ' . $dir], 500);
    }
    return $dir;
}

function repondre($data, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function lire_json(string $fichier)
{
    if (!is_file($fichier)) return null;
    $data = json_decode((string) file_get_contents($fichier), true);
    return is_array($data) ? $data : null;
}

/** Écriture atomique : fichier temporaire puis renommage. */
function ecrire_json(string $fichier, $data): void
{
    $tmp = $fichier . '.' . bin2hex(random_bytes(4)) . '.tmp';
    $json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    if ($json === false || file_put_contents($tmp, $json, LOCK_EX) === false || !rename($tmp, $fichier)) {
        @unlink($tmp);
        repondre(['erreur' => 'Écriture impossible sur le serveur.'], 500);
    }
}

function lire_produits(): array
{
    return lire_json(dossier_donnees() . '/produits.json')
        ?? lire_json(__DIR__ . '/produits-initiaux.json')
        ?? [];
}

function texte($v, int $max, bool $obligatoire, string $champ, string $produit): string
{
    if ($v === null) $v = '';
    if (!is_string($v)) throw new InvalidArgumentException("« $champ » invalide ($produit).");
    $v = trim($v);
    if ($obligatoire && $v === '') throw new InvalidArgumentException("« $champ » est obligatoire ($produit).");
    if (mb_strlen($v) > $max) throw new InvalidArgumentException("« $champ » est trop long ($produit, $max caractères maximum).");
    return $v;
}

function chemin_image(string $v, string $champ, string $produit): string
{
    if ($v === '' || preg_match('~^[a-z0-9][a-z0-9._-]*\.(jpe?g|png|webp)$~i', $v) || preg_match('~^/uploads/produits/[a-f0-9]{16}\.(jpg|png|webp)$~', $v)) return $v;
    throw new InvalidArgumentException("« $champ » : image invalide ($produit).");
}

/** Vérifie et nettoie la liste envoyée par le back-office. */
function valider_produits($liste): array
{
    if (!is_array($liste) || array_values($liste) !== $liste) throw new InvalidArgumentException('Liste de produits invalide.');
    if (count($liste) > 200) throw new InvalidArgumentException('Trop de produits.');
    $propres = [];
    $slugs = [];
    foreach ($liste as $i => $p) {
        if (!is_array($p)) throw new InvalidArgumentException('Produit invalide.');
        $nom = texte($p['name'] ?? '', 80, true, 'Nom', 'produit n° ' . ($i + 1));
        $slug = texte($p['slug'] ?? '', 60, true, 'Adresse', $nom);
        if (!preg_match('/^[a-z0-9]+(-[a-z0-9]+)*$/', $slug)) throw new InvalidArgumentException("Adresse « $slug » invalide ($nom) : lettres minuscules, chiffres et tirets.");
        if (isset($slugs[$slug])) throw new InvalidArgumentException("Deux produits ont la même adresse « $slug ».");
        $slugs[$slug] = true;
        $couleur = function ($v, $champ) use ($nom) {
            if (!is_string($v) || !preg_match('/^#[0-9a-fA-F]{6}$/', $v)) throw new InvalidArgumentException("« $champ » : couleur invalide ($nom).");
            return $v;
        };
        $icone = $p['icon'] ?? '';
        if (!in_array($icone, ICONES, true)) throw new InvalidArgumentException("Pictogramme invalide ($nom).");
        $public = $p['audience'] ?? '';
        if (!in_array($public, PUBLICS, true)) throw new InvalidArgumentException("Catégorie invalide ($nom).");
        $box = chemin_image(texte($p['box'] ?? '', 200, false, 'Photo de la boîte', $nom), 'Photo de la boîte', $nom);
        $image = chemin_image(texte($p['image'] ?? '', 200, false, 'Photo d’ambiance', $nom), 'Photo d’ambiance', $nom);
        if ($box === '' && $image === '') throw new InvalidArgumentException("Ajoutez au moins une photo ($nom).");
        $onglets = [];
        foreach (ONGLETS as $o) $onglets[$o] = texte($p['tabs'][$o] ?? '', 5000, false, 'Onglet ' . $o, $nom);
        $propre = [
            'slug' => $slug,
            'name' => $nom,
            'gamme' => texte($p['gamme'] ?? '', 120, false, 'Gamme', $nom),
            'desc' => texte($p['desc'] ?? '', 400, true, 'Phrase d’accroche', $nom),
            'image' => $image,
            'box' => $box,
            'pack' => texte($p['pack'] ?? '', 200, false, 'Présentation', $nom),
            'actifs' => texte($p['actifs'] ?? '', 300, false, 'Actifs', $nom),
            'color' => $couleur($p['color'] ?? '', 'Couleur de la pastille'),
            'ink' => $couleur($p['ink'] ?? '', 'Couleur du titre'),
            'icon' => $icone,
            'audience' => $public,
            'isNew' => !empty($p['isNew']),
            'keys' => texte($p['keys'] ?? '', 1000, false, 'Mots-clés', $nom),
            'summary' => texte($p['summary'] ?? '', 3000, true, 'Description', $nom),
            'tabs' => $onglets,
        ];
        foreach (['gamme', 'box', 'pack', 'actifs'] as $facultatif) {
            if ($propre[$facultatif] === '') unset($propre[$facultatif]);
        }
        $propres[] = $propre;
    }
    return $propres;
}
