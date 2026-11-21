import type { Metadata } from "next";
import Link from "next/link";
import { CollectionView } from "@/components/CollectionView";
import { categories, searchProducts } from "@/lib/data";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = ((await searchParams).q ?? "").trim();
  const results = searchProducts(q);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-display text-3xl">{q ? <>Results for “{q}”</> : "Search"}</h1>
      {results.length ? (
        <div className="mt-6"><CollectionView key={q} items={results} /></div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-linen px-6 py-16 text-center">
          <p className="font-display text-xl">{q ? "We couldn’t find a match" : "What are you looking for?"}</p>
          <p className="mt-2 text-sm text-muted">Try a broader word, or browse a category:</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <Link key={c.slug} href={`/collections/${c.slug}`} className="rounded-full border border-linen bg-white px-4 py-1.5 text-sm hover:border-clay hover:text-clay">{c.name}</Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
