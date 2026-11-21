"use client";

import Image from "next/image";
import Link from "next/link";
import { Qty } from "@/components/CartDrawer";
import { BagIcon, TrashIcon } from "@/components/Icons";
import { OrderSummary } from "@/components/OrderSummary";
import { ProductRail } from "@/components/ProductRail";
import { SectionHeading } from "@/components/SectionHeading";
import { useStore } from "@/components/store";
import { bestsellers, formatINR } from "@/lib/data";

export default function CartPage() {
  const { lines, count, setQty, remove, toggleWish, isWished } = useStore();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 font-display text-3xl">Shopping cart {count > 0 && <span className="text-lg text-muted">({count} items)</span>}</h1>
      {lines.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-linen py-20 text-center">
          <BagIcon width={56} height={56} className="text-linen" />
          <p className="font-display text-2xl">Your cart is empty</p>
          <p className="text-sm text-muted">Find something you’ll love living with.</p>
          <Link href="/collections/all" className="rounded-md bg-ink px-6 py-3 text-sm font-semibold text-cream">Continue shopping</Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <ul className="divide-y divide-linen rounded-xl border border-linen bg-white px-5">
            {lines.map((l) => (
              <li key={l.key} className="flex gap-4 py-5">
                <Link href={`/products/${l.slug}`} className="relative size-28 shrink-0 overflow-hidden rounded-lg bg-sand">
                  <Image src={l.product.images[0]} alt="" fill sizes="112px" className="object-cover" />
                </Link>
                <div className="flex flex-1 flex-col gap-1">
                  <Link href={`/products/${l.slug}`} className="font-medium hover:text-clay">{l.product.name}</Link>
                  <p className="text-xs text-muted">{l.product.material}{l.variant && ` · ${l.product.variantLabel}: ${l.variant}`}</p>
                  <p className="text-sm"><b>{formatINR(l.unitPrice)}</b> <span className="text-xs text-muted line-through">{formatINR(l.product.mrp + (l.unitPrice - l.product.price))}</span></p>
                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
                    <Qty value={l.qty} onChange={(q) => setQty(l.key, q)} />
                    <button onClick={() => { if (!isWished(l.slug)) toggleWish(l.slug); remove(l.key); }} className="text-xs font-semibold text-muted hover:text-clay">Move to wishlist</button>
                    <button onClick={() => remove(l.key)} className="flex items-center gap-1 text-xs font-semibold text-muted hover:text-clay"><TrashIcon width={14} height={14} /> Remove</button>
                  </div>
                </div>
                <p className="hidden font-semibold sm:block">{formatINR(l.unitPrice * l.qty)}</p>
              </li>
            ))}
          </ul>
          <div className="lg:sticky lg:top-36 lg:self-start">
            <OrderSummary>
              <Link href="/checkout" className="block rounded-md bg-clay py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-white hover:bg-clay-dark">Proceed to checkout</Link>
            </OrderSummary>
          </div>
        </div>
      )}
      <section className="mt-16">
        <SectionHeading title="Customers also bought" href="/collections/bestsellers" />
        <ProductRail products={bestsellers()} />
      </section>
    </div>
  );
}
