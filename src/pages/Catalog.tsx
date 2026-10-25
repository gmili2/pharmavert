import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, PRODUCTS, categoryOf, matches } from '../data/catalog';
import { Icon } from '../components/Art';
import { ProductCard } from '../components/ProductCard';
import { useTitle } from '../seo';

const FORMS = [...new Set(PRODUCTS.map((p) => p.form))].sort();

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const cat = params.get('cat') ?? '';
  const delivery = params.get('del') ?? '';
  const form = params.get('forme') ?? '';
  const sort = params.get('tri') ?? 'pertinence';
  useTitle(cat ? `${categoryOf(cat)?.name ?? 'Catalogue'} · Pharmavert` : 'Catalogue · Pharmavert');

  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v); else next.delete(k);
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    const r = PRODUCTS.filter((p) =>
      matches(p, q) && (!cat || p.category === cat) && (!delivery || p.delivery === delivery) && (!form || p.form === form));
    if (sort === 'nom') r.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    return r;
  }, [q, cat, delivery, form, sort]);

  const title = cat ? categoryOf(cat)?.name : q ? `Résultats pour « ${q} »` : 'Tous les médicaments';

  return (
    <>
      <section className="hero hero-compact">
        <div className="wrap">
          <h1>Catalogue</h1>
          <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
            <Icon name="search" />
            <input value={q} onChange={(e) => set('q', e.target.value)} placeholder="Ex. : paracétamol, vitamine C, toux…" aria-label="Rechercher un médicament" />
          </form>
          <div className="chips">
            <button className={`chip${!cat ? ' active' : ''}`} onClick={() => set('cat', '')}>Tout</button>
            {CATEGORIES.map((c) => (
              <button key={c.slug} className={`chip${cat === c.slug ? ' active' : ''}`} onClick={() => set('cat', c.slug)}>{c.name}</button>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap catalog">
        <aside className="filters">
          <h2>Filtres</h2>
          <span className="label">Délivrance</span>
          {[['', 'Tous'], ['sans', 'Sans ordonnance'], ['sur', 'Sur ordonnance']].map(([v, l]) => (
            <label key={v} className={`radio${delivery === v ? ' checked' : ''}`}>
              <input type="radio" name="del" checked={delivery === v} onChange={() => set('del', v)} /> {l}
            </label>
          ))}
          <span className="label">Forme</span>
          <select value={form} onChange={(e) => set('forme', e.target.value)} aria-label="Forme">
            <option value="">Toutes les formes</option>
            {FORMS.map((f) => <option key={f}>{f}</option>)}
          </select>
          <div className="note">
            <Icon name="info" />
            <span>Les médicaments sur ordonnance sont délivrés uniquement sur présentation d’une prescription valide.</span>
          </div>
        </aside>

        <section className="results">
          <div className="results-head">
            <div>
              <h2>{title}</h2>
              <span className="muted">{list.length} produit{list.length > 1 ? 's' : ''} trouvé{list.length > 1 ? 's' : ''}</span>
            </div>
            <label className="sort">Trier par
              <select value={sort} onChange={(e) => set('tri', e.target.value === 'pertinence' ? '' : e.target.value)}>
                <option value="pertinence">Pertinence</option>
                <option value="nom">Nom (A → Z)</option>
              </select>
            </label>
          </div>
          {list.length ? (
            <div className="grid">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
          ) : (
            <div className="empty">
              <h3>Aucun produit ne correspond à votre recherche</h3>
              <p className="muted">Essayez un autre mot-clé ou retirez un filtre.</p>
              <button className="btn" onClick={() => setParams({}, { replace: true })}>Réinitialiser</button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
