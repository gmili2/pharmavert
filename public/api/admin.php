<?php
// Back-office : connexion, enregistrement des produits, envoi des photos.
require __DIR__ . '/_commun.php';
@include __DIR__ . '/_config.php';

session_name('pv_admin');
session_set_cookie_params(['lifetime' => 0, 'path' => '/', 'secure' => !empty($_SERVER['HTTPS']), 'httponly' => true, 'samesite' => 'Strict']);
session_start();

$action = $_GET['action'] ?? '';
$fichierAdmin = dossier_donnees() . '/admin.json';
$admin = lire_json($fichierAdmin);
$connecte = !empty($_SESSION['admin']) && $admin && ($_SESSION['admin'] === $admin['depuis']);

if ($action === 'etat') {
    repondre(['installe' => (bool) $admin, 'connecte' => $connecte]);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST' || ($_SERVER['HTTP_X_PHARMAVERT'] ?? '') !== '1') {
    repondre(['erreur' => 'Requête refusée.'], 400);
}
$corps = $action === 'image' ? [] : (json_decode((string) file_get_contents('php://input'), true) ?: []);

/** Limite les essais de mot de passe : 10 échecs par quart d'heure et par adresse IP. */
function essais(bool $echec = false): void
{
    $fichier = dossier_donnees() . '/essais.json';
    $tous = lire_json($fichier) ?? [];
    $ip = $_SERVER['REMOTE_ADDR'] ?? '?';
    $maintenant = time();
    $tous = array_filter($tous, function ($e) use ($maintenant) { return $e['depuis'] > $maintenant - 900; });
    if ($echec) {
        $tous[$ip] = ['n' => ($tous[$ip]['n'] ?? 0) + 1, 'depuis' => $tous[$ip]['depuis'] ?? $maintenant];
        ecrire_json($fichier, $tous);
        sleep(1);
    } elseif (($tous[$ip]['n'] ?? 0) >= 10) {
        repondre(['erreur' => 'Trop d’essais. Réessayez dans 15 minutes.'], 429);
    }
}

function mot_de_passe_valide($mdp): string
{
    if (!is_string($mdp) || mb_strlen($mdp) < 8) repondre(['erreur' => 'Le mot de passe doit faire au moins 8 caractères.'], 422);
    return $mdp;
}

function ouvrir_session(array $admin): void
{
    session_regenerate_id(true);
    $_SESSION['admin'] = $admin['depuis'];
}

switch ($action) {
    case 'installer':
        if ($admin) repondre(['erreur' => 'Le mot de passe existe déjà.'], 409);
        essais();
        if (!defined('CODE_INSTALLATION_SHA256') || !hash_equals(CODE_INSTALLATION_SHA256, hash('sha256', (string) ($corps['code'] ?? '')))) {
            essais(true);
            repondre(['erreur' => 'Code d’installation incorrect.'], 403);
        }
        $admin = ['hash' => password_hash(mot_de_passe_valide($corps['motDePasse'] ?? ''), PASSWORD_DEFAULT), 'depuis' => bin2hex(random_bytes(8))];
        ecrire_json($fichierAdmin, $admin);
        ouvrir_session($admin);
        repondre(['ok' => true]);

    case 'connexion':
        essais();
        if (!$admin || !password_verify((string) ($corps['motDePasse'] ?? ''), $admin['hash'])) {
            essais(true);
            repondre(['erreur' => 'Mot de passe incorrect.'], 403);
        }
        ouvrir_session($admin);
        repondre(['ok' => true]);

    case 'deconnexion':
        $_SESSION = [];
        session_destroy();
        repondre(['ok' => true]);
}

if (!$connecte) repondre(['erreur' => 'Session expirée : reconnectez-vous.'], 401);

switch ($action) {
    case 'enregistrer':
        try {
            $produits = valider_produits($corps['produits'] ?? null);
        } catch (InvalidArgumentException $e) {
            repondre(['erreur' => $e->getMessage()], 422);
        }
        // Sauvegarde de la version précédente (les 30 dernières sont gardées).
        $dir = dossier_donnees();
        $sauvegardes = $dir . '/sauvegardes';
        if (!is_dir($sauvegardes)) @mkdir($sauvegardes, 0750, true);
        if (is_file($dir . '/produits.json')) @copy($dir . '/produits.json', $sauvegardes . '/produits-' . date('Ymd-His') . '.json');
        $anciennes = glob($sauvegardes . '/produits-*.json') ?: [];
        sort($anciennes);
        foreach (array_slice($anciennes, 0, max(0, count($anciennes) - NB_SAUVEGARDES)) as $f) @unlink($f);
        ecrire_json($dir . '/produits.json', $produits);
        repondre(['ok' => true, 'produits' => $produits]);

    case 'image':
        $f = $_FILES['image'] ?? null;
        if (!$f || ($f['error'] ?? 1) !== UPLOAD_ERR_OK) repondre(['erreur' => 'Envoi de la photo échoué (8 Mo maximum).'], 422);
        if ($f['size'] > 8 * 1024 * 1024) repondre(['erreur' => 'Photo trop lourde (8 Mo maximum).'], 422);
        $info = @getimagesize($f['tmp_name']);
        $ext = [IMAGETYPE_JPEG => 'jpg', IMAGETYPE_PNG => 'png', IMAGETYPE_WEBP => 'webp'][$info[2] ?? 0] ?? null;
        if (!$ext) repondre(['erreur' => 'Format accepté : JPG, PNG ou WebP.'], 422);
        $dir = racine_site() . '/uploads/produits';
        if (!is_dir($dir) && !@mkdir($dir, 0755, true)) repondre(['erreur' => 'Dossier uploads impossible à créer.'], 500);
        $nom = bin2hex(random_bytes(8)) . '.' . $ext;
        if (!move_uploaded_file($f['tmp_name'], "$dir/$nom")) repondre(['erreur' => 'Enregistrement de la photo impossible.'], 500);
        @chmod("$dir/$nom", 0644);
        repondre(['chemin' => "/uploads/produits/$nom"]);

    case 'mot-de-passe':
        if (!password_verify((string) ($corps['actuel'] ?? ''), $admin['hash'])) repondre(['erreur' => 'Mot de passe actuel incorrect.'], 403);
        $admin = ['hash' => password_hash(mot_de_passe_valide($corps['nouveau'] ?? ''), PASSWORD_DEFAULT), 'depuis' => bin2hex(random_bytes(8))];
        ecrire_json($fichierAdmin, $admin);
        ouvrir_session($admin);
        repondre(['ok' => true]);
}

repondre(['erreur' => 'Action inconnue.'], 404);
