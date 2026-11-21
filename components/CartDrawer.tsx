"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { formatINR } from "@/lib/data";
import { FREE_SHIPPING_AT, useStore } from "./store";
import { BagIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon } from "./Icons";

export function CartDrawer() {
  const { lines, subtotal, mrpTotal, count, drawerOpen, setDrawerOpen, setQty, remove } = useStore();

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [drawerOpen, setDrawerOpen]);

  if (!drawerOpen) return null;
  const remaining = FREE_SHIPPING_AT - subtotal;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="animate-fade absolute inset-0 bg-ink/40" onClick={() => setDrawerOpen(false)} />
      <aside className="animate-drawer absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-linen px-5 py-4">
          <h2 className="font-display text-xl">Your cart <span className="text-sm text-muted">({count})</span></h2>
          <button aria-label="Close cart" onClick={() => setDrawerOpen(false)}><CloseIcon /></button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <BagIcon width={48} height={48} className="text-linen" />
            <p className="font-display text-lg">Your cart is empty</p>
            <Link href="/collections/bestsellers" onClick={() => setDrawerOpen(false)} className="rounded-md bg-ink px-6 py-3 text-sm font-semibold text-cream">Shop bestsellers</Link>
          </div>
        ) : (
          <>
            <div className="border-b border-linen px-5 py-3">
              <p className="mb-2 text-xs">
                {remaining > 0 ? <>Add <b>{formatINR(remaining)}</b> more for <b>free shipping</b></> : <>🎉 You’ve unlocked <b>free shipping</b></>}
              </p>
              <div className="h-1.5 overflow-hidden rounded-full bg-linen"><div className="h-full rounded-full bg-sage transition-all" style={{ width: `${progress}%` }} /></div>
            </div>
            <ul className="flex-1 divide-y divide-linen overflow-y-auto px-5">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-3 py-4">
                  <Link href={`/products/${l.slug}`} onClick={() => setDrawerOpen(false)} className="relative size-20 shrink-0 overflow-hidden rounded-md bg-sand">
                    <Image src={l.product.images[0]} alt="" fill sizes="80px" className="object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <Link href={`/products/${l.slug}`} onClick={() => setDrawerOpen(false)} className="text-sm leading-snug hover:text-clay">{l.product.name}</Link>
                    {l.variant && <span className="text-xs text-muted">{l.product.variantLabel}: {l.variant}</span>}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <Qty value={l.qty} onChange={(q) => setQty(l.key, q)} />
                      <span className="text-sm font-semibold">{formatINR(l.unitPrice * l.qty)}</span>
                    </div>
                  </div>
                  <button aria-label={`Remove ${l.product.name}`} onClick={() => remove(l.key)} className="self-start text-muted hover:text-clay"><TrashIcon width={16} height={16} /></button>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t border-linen bg-sand/60 px-5 py-4">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-semibold">{formatINR(subtotal)}</span></div>
              {mrpTotal > subtotal && <p className="text-xs font-semibold text-sage">You’re saving {formatINR(mrpTotal - subtotal)} on this order</p>}
              <div className="grid grid-cols-2 gap-2">
                <Link href="/cart" onClick={() => setDrawerOpen(false)} className="rounded-md border border-ink py-3 text-center text-sm font-semibold">View cart</Link>
                <Link href="/checkout" onClick={() => setDrawerOpen(false)} className="rounded-md bg-clay py-3 text-center text-sm font-semibold text-white hover:bg-clay-dark">Checkout</Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export function Qty({ value, onChange, min = 0 }: { value: number; onChange: (n: number) => void; min?: number }) {
  return (
    <div className="inline-flex items-center rounded-md border border-linen bg-white">
      <button aria-label="Decrease quantity" onClick={() => onChange(Math.max(min, value - 1))} className="p-1.5 hover:text-clay"><MinusIcon width={14} height={14} /></button>
      <span className="w-7 text-center text-sm tabular-nums">{value}</span>
      <button aria-label="Increase quantity" onClick={() => onChange(Math.min(10, value + 1))} className="p-1.5 hover:text-clay"><PlusIcon width={14} height={14} /></button>
    </div>
  );
}
