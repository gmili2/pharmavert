import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AUDIENCES, CONSERVATION, PRECAUTIONS, api, productPhoto, setProducts, type IconKey, type Product } from '../data/catalog';
import { Logo, ProductBadge } from '../components/Art';
import { useSeo } from '../seo';

type Tabs = Product['tabs'];

const ICONS: { key: IconKey; name: string }[] = [
  { key: 'joint', name: 'Articulation' },
  { key: 'muscle', name: 'Muscle' },
  { key: 'stomach', name: 'Digestion' },
  { key: 'mg', name: 'Magnésium (Mg)' },
  { key: 'fork', name: 'Appétit' },
  { key: 'cough', name: 'Respiration' },
];

const TAB_FIELDS: { key: keyof Tabs; name: string }[] = [
  { key: 'bienfaits', name: 'Bienfaits' },
  { key: 'utilisation', name: 'Conseils d’utilisation' },
  { key: 'precautions', name: 'Précautions' },
  { key: 'composition', name: 'Composition' },
  { key: 'conservation', name: 'Conservation' },
];

const newProduct = (): Product => ({
  slug: '', name: '', gamme: '', desc: '', image: '', box: '', pack: '', actifs: '',
  color: '#2F8F45', ink: '#1E6B34', icon: 'joint', audience: 'adulte', isNew: true, keys: '', summary: '',
  tabs: { bienfaits: '', utilisation: '', precautions: PRECAUTIONS, composition: '', conservation: CONSERVATION },
});

/** Adresse de la fiche déduite du nom : « Grofen sirop » → grofen-sirop. */
const slugify = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

class ApiError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

async function call<T>(action: string, body?: unknown): Promise<T> {
  const init: RequestInit = body instanceof FormData
    ? { method: 'POST', body, headers: { 'X-Pharmavert': '1' } }
    : { method: 'POST', body: JSON.stringify(body ?? {}), headers: { 'X-Pharmavert': '1', 'Content-Type': 'application/json' } };
  const r = await fetch(api(`admin.php?action=${action}`), { ...init, credentials: 'same-origin' }).catch(() => null);
  const data = r ? await r.json().catch(() => null) : null;
  if (!r || !r.ok) throw new ApiError(data?.erreur ?? 'Serveur injoignable. Vérifiez votre connexion.', r?.status ?? 0);
  return data as T;
}

/** Réduit les grandes photos (téléphone) avant l'envoi : 1400 px maximum, en WebP si le navigateur sait le faire. */
async function shrink(file: File): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1400 / Math.max(bmp.width, bmp.height));
    if (scale === 1 && file.size < 600_000) return file;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/webp', 0.86));
    return blob && blob.type === 'image/webp' && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

export default function Admin() {
  useSeo({ title: 'Back-office | Pharma Vert', description: 'Gestion des produits Pharma Vert.', path: '/admin', noindex: true });
  const [state, setState] = useState<{ installe: boolean; connecte: boolean } | null>(null);
  const [error, setError] = useState('');

  const refresh = () =>
    fetch(api('admin.php?action=etat'), { cache: 'no-store', credentials: 'same-origin' })
      .then((r) => r.json())
      .then(setState)
      .catch(() => setError('Le back-office est injoignable : vérifiez que le dossier « api » est bien en ligne.'));
  useEffect(() => { refresh(); }, []);

  return (
    <div className="adm">
      <header className="adm-top">
        <Link to="/" aria-label="Voir le site"><Logo height={44} /></Link>
        <span className="adm-title">Back-office</span>
        {state?.connecte && <AccountMenu onLogout={refresh} />}
      </header>
      {error && <p className="adm-alert adm-wrap">{error}</p>}
      {state && !state.installe && <Login install onDone={refresh} />}
      {state && state.installe && !state.connecte && <Login onDone={refresh} />}
      {state?.connecte && <Editor onExpired={refresh} />}
    </div>
  );
}

function Login({ install = false, onDone }: { install?: boolean; onDone: () => void }) {
  const [code, setCode] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (install && pwd !== pwd2) return setError('Les deux mots de passe sont différents.');
    setBusy(true);
    setError('');
    try {
      await call(install ? 'installer' : 'connexion', install ? { code, motDePasse: pwd } : { motDePasse: pwd });
      onDone();
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  };

  return (
    <form className="adm-card adm-login" onSubmit={submit}>
      <h1>{install ? 'Créer le mot de passe' : 'Connexion'}</h1>
      {install && <p className="muted">Première connexion : saisissez le code d’installation reçu, puis choisissez votre mot de passe (8 caractères minimum).</p>}
      {install && <Field label="Code d’installation"><input value={code} onChange={(e) => setCode(e.target.value)} required autoComplete="off" /></Field>}
      <Field label={install ? 'Nouveau mot de passe' : 'Mot de passe'}>
        <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} required minLength={install ? 8 : undefined} autoComplete={install ? 'new-password' : 'current-password'} autoFocus={!install} />
      </Field>
      {install && <Field label="Confirmer le mot de passe"><input type="password" value={pwd2} onChange={(e) => setPwd2(e.target.value)} required autoComplete="new-password" /></Field>}
      {error && <p className="adm-alert">{error}</p>}
      <button className="btn btn-pill btn-lg" disabled={busy}>{busy ? 'Patientez…' : install ? 'Créer et entrer' : 'Se connecter'}</button>
    </form>
  );
}

function AccountMenu({ onLogout }: { onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const changePassword = async () => {
    const actuel = prompt('Mot de passe actuel :');
    if (actuel == null) return;
    const nouveau = prompt('Nouveau mot de passe (8 caractères minimum) :');
    if (nouveau == null) return;
    try {
      await call('mot-de-passe', { actuel, nouveau });
      setMsg('Mot de passe modifié.');
    } catch (e) {
      setMsg((e as Error).message);
    }
  };
  return (
    <div className="adm-account">
      <a className="btn btn-outline btn-pill" href="/" target="_blank" rel="noreferrer">Voir le site</a>
      <button type="button" className="btn btn-outline btn-pill" onClick={() => setOpen(!open)} aria-expanded={open}>Compte</button>
      {open && (
        <div className="adm-menu">
          <button type="button" onClick={changePassword}>Changer le mot de passe</button>
          <button type="button" onClick={() => call('deconnexion').finally(onLogout)}>Se déconnecter</button>
          {msg && <p>{msg}</p>}
        </div>
      )}
    </div>
  );
}

function Editor({ onExpired }: { onExpired: () => void }) {
  const [list, setList] = useState<Product[] | null>(null);
  const [saved, setSaved] = useState('');
  const [sel, setSel] = useState(-1);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const dirty = list != null && JSON.stringify(list) !== saved;

  useEffect(() => {
    fetch(api('produits.php'), { cache: 'no-store' })
      .then((r) => r.json())
      .then((l: Product[]) => { setList(l); setSaved(JSON.stringify(l)); if (l.length) setSel(0); })
      .catch(() => setMsg({ ok: false, text: 'Impossible de charger les produits.' }));
  }, []);

  // Prévenir avant de quitter la page avec des modifications non enregistrées.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  if (!list) return <p className="adm-wrap muted">{msg?.text ?? 'Chargement…'}</p>;

  const select = (i: number) => {
    setSel(i);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };
  const update = (i: number, p: Product) => setList(list.map((x, j) => (j === i ? p : x)));
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    setList(next);
    if (sel === i) setSel(j);
    else if (sel === j) setSel(i);
  };
  const remove = (i: number) => {
    if (!confirm(`Supprimer « ${list[i].name || 'nouveau produit'} » ?\nLa suppression sera publiée quand vous cliquerez sur « Enregistrer ».`)) return;
    setList(list.filter((_, j) => j !== i));
    setSel(-1);
  };
  const add = () => {
    setList([...list, newProduct()]);
    select(list.length);
  };
  const save = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const r = await call<{ produits: Product[] }>('enregistrer', { produits: list });
      setList(r.produits);
      setSaved(JSON.stringify(r.produits));
      setProducts(r.produits);
      setMsg({ ok: true, text: 'Enregistré : le site est à jour.' });
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) onExpired();
      setMsg({ ok: false, text: (e as Error).message });
    }
    setBusy(false);
  };

  return (
    <>
      <div className="adm-wrap adm-layout">
        <section className="adm-list" aria-label="Produits">
          <div className="adm-list-head">
            <h1>Produits <span className="muted">({list.length})</span></h1>
            <button type="button" className="btn btn-pill" onClick={add}>+ Ajouter</button>
          </div>
          <ol>
            {list.map((p, i) => (
              <li key={i} className={i === sel ? 'on' : ''}>
                <button type="button" className="adm-item" onClick={() => select(i)}>
                  {p.box || p.image ? <img src={productPhoto(p)} alt="" /> : <span className="adm-noimg" />}
                  <span>
                    <b style={{ color: p.ink }}>{p.name || 'Nouveau produit'}</b>
                    <small>{p.gamme || '—'}{p.isNew ? ' · Nouveau' : ''}</small>
                  </span>
                </button>
                <span className="adm-item-tools">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Monter">▲</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === list.length - 1} aria-label="Descendre">▼</button>
                </span>
              </li>
            ))}
          </ol>
          <p className="muted adm-hint">L’ordre de cette liste est celui du site. Utilisez ▲ ▼ pour le changer.</p>
        </section>

        <div ref={formRef} className="adm-form-col">
          {sel >= 0 && list[sel]
            ? <ProductForm key={sel} p={list[sel]} all={list} onChange={(p) => update(sel, p)} onDelete={() => remove(sel)} onExpired={onExpired} />
            : <div className="adm-card adm-empty">Choisissez un produit à modifier, ou ajoutez-en un.</div>}
        </div>
      </div>

      <div className={`adm-savebar${dirty ? ' dirty' : ''}`}>
        <span>{msg ? <span className={msg.ok ? 'ok' : 'ko'}>{msg.text}</span> : dirty ? 'Modifications non enregistrées' : 'Tout est enregistré'}</span>
        <span className="adm-savebar-btns">
          {dirty && <button type="button" className="btn btn-outline btn-pill" onClick={() => { setList(JSON.parse(saved)); setSel(-1); setMsg(null); }} disabled={busy}>Annuler</button>}
          <button type="button" className="btn btn-pill" onClick={save} disabled={!dirty || busy}>{busy ? 'Enregistrement…' : 'Enregistrer'}</button>
        </span>
      </div>
    </>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="adm-field">
      <span>{label}</span>
      {children}
      {hint && <small className="muted">{hint}</small>}
    </label>
  );
}

function ProductForm({ p, all, onChange, onDelete, onExpired }: { p: Product; all: Product[]; onChange: (p: Product) => void; onDelete: () => void; onExpired: () => void }) {
  // Pour un nouveau produit, l'adresse suit le nom tant qu'on ne la modifie pas à la main.
  const [autoSlug, setAutoSlug] = useState(!p.slug);
  const set = <K extends keyof Product>(k: K, v: Product[K]) => onChange({ ...p, [k]: v });
  const setTab = (k: keyof Tabs, v: string) => onChange({ ...p, tabs: { ...p.tabs, [k]: v } });
  const duplicate = p.slug && all.filter((x) => x.slug === p.slug).length > 1;

  return (
    <div className="adm-card adm-form">
      <div className="adm-form-head">
        <ProductBadge p={p} size={48} />
        <h2 style={{ color: p.ink }}>{p.name || 'Nouveau produit'}</h2>
        <button type="button" className="adm-delete" onClick={onDelete}>Supprimer</button>
      </div>

      <fieldset>
        <legend>Fiche</legend>
        <Field label="Nom du produit *">
          <input value={p.name} onChange={(e) => onChange({ ...p, name: e.target.value, ...(autoSlug ? { slug: slugify(e.target.value) } : {}) })} placeholder="Ex. Grofen sirop" />
        </Field>
        <Field label="Adresse de la fiche *" hint={`pharmavert.ma/produit/${p.slug || '…'}${duplicate ? ' — déjà utilisée par un autre produit !' : ''}`}>
          <input value={p.slug} onChange={(e) => { setAutoSlug(false); set('slug', slugify(e.target.value)); }} />
        </Field>
        <Field label="Gamme" hint="Affichée au-dessus du nom. Ex. Stimulant d’appétit · Solution buvable">
          <input value={p.gamme ?? ''} onChange={(e) => set('gamme', e.target.value)} />
        </Field>
        <Field label="Catégorie">
          <select value={p.audience} onChange={(e) => set('audience', e.target.value as Product['audience'])}>
            {AUDIENCES.filter((a) => a.slug).map((a) => <option key={a.slug} value={a.slug}>{a.name}</option>)}
          </select>
        </Field>
        <label className="adm-check"><input type="checkbox" checked={!!p.isNew} onChange={(e) => set('isNew', e.target.checked)} /> Afficher le badge « Nouveau »</label>
        <Field label="Phrase d’accroche *" hint="Une phrase courte, affichée sur la carte du produit.">
          <textarea rows={2} value={p.desc} onChange={(e) => set('desc', e.target.value)} />
        </Field>
        <Field label="Description *" hint="Paragraphe affiché sur la fiche du produit.">
          <textarea rows={5} value={p.summary} onChange={(e) => set('summary', e.target.value)} />
        </Field>
        <Field label="Actifs" hint="Ex. Fenugrec · gentiane · 11 vitamines">
          <input value={p.actifs ?? ''} onChange={(e) => set('actifs', e.target.value)} />
        </Field>
        <Field label="Présentation" hint="Ex. Flacon de 200 mL · arôme orange">
          <input value={p.pack ?? ''} onChange={(e) => set('pack', e.target.value)} />
        </Field>
      </fieldset>

      <fieldset>
        <legend>Photos</legend>
        <div className="adm-photos">
          <PhotoField label="Photo de la boîte" hint="Idéalement sur fond transparent ou blanc." value={p.box ?? ''} onChange={(v) => set('box', v)} onExpired={onExpired} />
          <PhotoField label="Photo d’ambiance" hint="Utilisée seulement s’il n’y a pas de photo de boîte." value={p.image} onChange={(v) => set('image', v)} onExpired={onExpired} />
        </div>
      </fieldset>

      <fieldset>
        <legend>Apparence</legend>
        <div className="adm-row">
          <Field label="Pictogramme">
            <select value={p.icon} onChange={(e) => set('icon', e.target.value as IconKey)}>
              {ICONS.map((i) => <option key={i.key} value={i.key}>{i.name}</option>)}
            </select>
          </Field>
          <Field label="Couleur de la pastille"><input type="color" value={p.color} onChange={(e) => set('color', e.target.value)} /></Field>
          <Field label="Couleur du titre"><input type="color" value={p.ink} onChange={(e) => set('ink', e.target.value)} /></Field>
        </div>
      </fieldset>

      <fieldset>
        <legend>Onglets de la fiche</legend>
        {TAB_FIELDS.map((t) => (
          <Field key={t.key} label={t.name}>
            <textarea rows={t.key === 'composition' ? 4 : 3} value={p.tabs[t.key]} onChange={(e) => setTab(t.key, e.target.value)} />
          </Field>
        ))}
      </fieldset>

      <fieldset>
        <legend>Recherche</legend>
        <Field label="Mots-clés" hint="Mots que les visiteurs peuvent taper pour trouver le produit (symptômes, synonymes), séparés par des espaces.">
          <textarea rows={2} value={p.keys} onChange={(e) => set('keys', e.target.value)} />
        </Field>
      </fieldset>
    </div>
  );
}

function PhotoField({ label, hint, value, onChange, onExpired }: { label: string; hint: string; value: string; onChange: (v: string) => void; onExpired: () => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const upload = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const blob = await shrink(file);
      const form = new FormData();
      form.append('image', blob, blob === file ? file.name : 'photo.webp');
      const r = await call<{ chemin: string }>('image', form);
      onChange(r.chemin);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) onExpired();
      setError((e as Error).message);
    }
    setBusy(false);
  };
  const preview = value ? productPhoto({ box: value, image: value } as Product) : '';
  return (
    <div className="adm-photo">
      <span className="adm-photo-label">{label}</span>
      <div className="adm-photo-box">{preview ? <img src={preview} alt="" /> : <span className="muted">Aucune photo</span>}</div>
      <span className="adm-photo-btns">
        <label className="btn btn-outline btn-pill">
          {busy ? 'Envoi…' : value ? 'Remplacer' : 'Choisir une photo'}
          <input type="file" accept="image/jpeg,image/png,image/webp" hidden disabled={busy} onChange={(e) => { upload(e.target.files?.[0]); e.target.value = ''; }} />
        </label>
        {value && <button type="button" className="adm-delete" onClick={() => onChange('')}>Retirer</button>}
      </span>
      <small className="muted">{hint}</small>
      {error && <p className="adm-alert">{error}</p>}
    </div>
  );
}
