"use client";

import Link from "next/link";
import { HeartIcon } from "@/components/Icons";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/components/store";
import { getProduct, type Product } from "@/lib/data";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = wishlist.map(getProduct).filter((p): p is Product => !!p);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 font-display text-3xl">Wishlist {items.length > 0 && <span className="text-lg text-muted">({items.length})</span>}</h1>
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-linen py-20 text-center">
          <HeartIcon width={52} height={52} className="text-linen" />
          <p className="font-display text-2xl">No saved items yet</p>
          <p className="text-sm text-muted">Tap the heart on anything you love to save it here.</p>
          <Link href="/collections/bestsellers" className="rounded-md bg-ink px-6 py-3 text-sm font-semibold text-cream">Discover bestsellers</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {items.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      )}
    </div>
  );
}
