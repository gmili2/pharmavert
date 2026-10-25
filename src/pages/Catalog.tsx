import { useSearchParams } from 'react-router-dom';
import { AUDIENCES, PRODUCTS, matches } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';
import { Kicker, NoResults, SearchBar } from '../components/Sections';
import { useTitle } from '../seo';

export default function Catalog() {
  useTitle('Nos produits · Pharma Vert');
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const pour = params.get('pour') ?? '';

  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v); else next.delete(k);
    setParams(next, { replace: true });
  };

  // « Toute la famille » convient aussi aux adultes et aux enfants.
  const list = PRODUCTS.filter((p) => matches(p, q) && (!pour || p.audience === pour || p.audience === 'famille'));

  return (
    <section className="sec sec-soft page-top">
      <div className="wrap stack">
        <div className="sec-head">
          <Kicker>Nos produits</Kicker>
          <h1>Une gamme complète pour toute la famille</h1>
          <p className="sec-lead">Des compléments alimentaires adaptés aux besoins de chacun, pour un quotidien plus sain et plus équilibré.</p>
        </div>
        <SearchBar value={q} onChange={(v) => set('q', v)} />
        <div className="chips" role="group" aria-label="Pour qui">
          {AUDIENCES.map((a) => (
            <button key={a.slug} type="button" className={`chip${pour === a.slug ? ' active' : ''}`} aria-pressed={pour === a.slug} onClick={() => set('pour', a.slug)}>
              {a.name}
            </button>
          ))}
        </div>
        <p className="count muted">{list.length} produit{list.length > 1 ? 's' : ''}</p>
        {list.length
          ? <div className="grid">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
          : <NoResults onReset={() => setParams({}, { replace: true })} />}
      </div>
    </section>
  );
}
