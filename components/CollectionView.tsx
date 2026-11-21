"use client";

import { useMemo, useState } from "react";
import { categories, type Product } from "@/lib/data";
import { ProductCard } from "./ProductCard";
import { CloseIcon, FilterIcon } from "./Icons";

const sorts = {
  featured: { label: "Featured", fn: () => 0 },
  popular: { label: "Most popular", fn: (a: Product, b: Product) => b.reviews - a.reviews },
  "price-asc": { label: "Price: low to high", fn: (a: Product, b: Product) => a.price - b.price },
  "price-desc": { label: "Price: high to low", fn: (a: Product, b: Product) => b.price - a.price },
  discount: { label: "Biggest discount", fn: (a: Product, b: Product) => b.mrp - b.price - (a.mrp - a.price) },
  rating: { label: "Top rated", fn: (a: Product, b: Product) => b.rating - a.rating },
} as const;
type SortKey = keyof typeof sorts;

const priceBands = [
  { id: "u500", label: "Under ₹500", test: (p: number) => p < 500 },
  { id: "500-1000", label: "₹500 – ₹1,000", test: (p: number) => p >= 500 && p < 1000 },
  { id: "1000-2500", label: "₹1,000 – ₹2,500", test: (p: number) => p >= 1000 && p < 2500 },
  { id: "2500-5000", label: "₹2,500 – ₹5,000", test: (p: number) => p >= 2500 && p < 5000 },
  { id: "5000+", label: "₹5,000 & above", test: (p: number) => p >= 5000 },
];

const swatch: Record<string, string> = {
  White: "#f6f3ee", Grey: "#9a9a96", Beige: "#d9c6a5", Brown: "#8a5a3b", Orange: "#d0703a", Blue: "#4b6e94",
  Green: "#3f6b4f", Black: "#1f1f1f", Gold: "#c8a24a", Red: "#b8322b", Pink: "#e48ab0",
};

type Filters = { category: string[]; material: string[]; color: string[]; price: string[]; fast: boolean };
const empty: Filters = { category: [], material: [], color: [], price: [], fast: false };

export function CollectionView({ items }: { items: Product[] }) {
  const [filters, setFilters] = useState<Filters>(empty);
  const [sort, setSort] = useState<SortKey>("featured");
  const [mobileOpen, setMobileOpen] = useState(false);

  const facets = useMemo(() => {
    const uniq = (xs: string[]) => [...new Set(xs)].sort();
    return {
      category: uniq(items.map((p) => p.category)),
      material: uniq(items.map((p) => p.material)),
      color: uniq(items.map((p) => p.color)),
    };
  }, [items]);

  const shown = useMemo(() => {
    const out = items.filter(
      (p) =>
        (!filters.category.length || filters.category.includes(p.category)) &&
        (!filters.material.length || filters.material.includes(p.material)) &&
        (!filters.color.length || filters.color.includes(p.color)) &&
        (!filters.price.length || priceBands.some((b) => filters.price.includes(b.id) && b.test(p.price))) &&
        (!filters.fast || p.fastDelivery),
    );
    return [...out].sort(sorts[sort].fn);
  }, [items, filters, sort]);

  const toggle = (key: Exclude<keyof Filters, "fast">, value: string) =>
    setFilters((f) => ({ ...f, [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value] }));
  const activeCount = filters.category.length + filters.material.length + filters.color.length + filters.price.length + (filters.fast ? 1 : 0);
  const catName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;

  const panel = (
    <div className="space-y-7">
      <label className="flex cursor-pointer items-center justify-between rounded-lg border border-linen bg-white px-3 py-2.5 text-sm font-medium">
        Fast delivery only
        <input type="checkbox" className="size-4 accent-clay" checked={filters.fast} onChange={(e) => setFilters((f) => ({ ...f, fast: e.target.checked }))} />
      </label>
      {facets.category.length > 1 && (
        <FacetGroup title="Category">
          {facets.category.map((c) => <Check key={c} label={catName(c)} checked={filters.category.includes(c)} onChange={() => toggle("category", c)} />)}
        </FacetGroup>
      )}
      <FacetGroup title="Price">
        {priceBands.map((b) => <Check key={b.id} label={b.label} checked={filters.price.includes(b.id)} onChange={() => toggle("price", b.id)} />)}
      </FacetGroup>
      <FacetGroup title="Colour">
        <div className="flex flex-wrap gap-2">
          {facets.color.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => toggle("color", c)}
              aria-pressed={filters.color.includes(c)}
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition ${filters.color.includes(c) ? "border-ink bg-ink text-cream" : "border-linen bg-white hover:border-ink"}`}
            >
              <span className="size-3 rounded-full border border-black/10" style={{ background: swatch[c] ?? "#ccc" }} />
              {c}
            </button>
          ))}
        </div>
      </FacetGroup>
      <FacetGroup title="Material">
        {facets.material.map((m) => <Check key={m} label={m} checked={filters.material.includes(m)} onChange={() => toggle("material", m)} />)}
      </FacetGroup>
      {activeCount > 0 && (
        <button onClick={() => setFilters(empty)} className="text-sm font-semibold text-clay underline underline-offset-4">Clear all filters</button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-36">{panel}</div>
      </aside>

      <div>
        <div className="mb-5 flex items-center justify-between gap-3 border-b border-linen pb-4">
          <p className="text-sm text-muted"><b className="text-ink">{shown.length}</b> products</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setMobileOpen(true)} className="flex items-center gap-1.5 rounded-md border border-linen bg-white px-3 py-2 text-sm lg:hidden">
              <FilterIcon width={16} height={16} /> Filter {activeCount > 0 && `(${activeCount})`}
            </button>
            <label className="flex items-center gap-2 text-sm">
              <span className="hidden text-muted sm:inline">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="rounded-md border border-linen bg-white px-3 py-2 text-sm outline-none focus:border-clay">
                {Object.entries(sorts).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
              </select>
            </label>
          </div>
        </div>

        {shown.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
            {shown.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 4} />)}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-linen py-20 text-center">
            <p className="font-display text-xl">Nothing matches those filters</p>
            <button onClick={() => setFilters(empty)} className="mt-4 text-sm font-semibold text-clay underline underline-offset-4">Clear filters</button>
          </div>
        )}
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="animate-fade absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} />
          <div className="animate-drawer absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-cream">
            <div className="flex items-center justify-between border-b border-linen p-4">
              <p className="font-display text-xl">Filters</p>
              <button aria-label="Close filters" onClick={() => setMobileOpen(false)}><CloseIcon /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{panel}</div>
            <div className="border-t border-linen p-4">
              <button onClick={() => setMobileOpen(false)} className="w-full rounded-md bg-ink py-3 text-sm font-semibold text-cream">Show {shown.length} products</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FacetGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">{title}</legend>
      <div className="space-y-2">{children}</div>
    </fieldset>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 accent-clay" />
      {label}
    </label>
  );
}
