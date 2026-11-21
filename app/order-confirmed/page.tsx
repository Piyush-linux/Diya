"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatINR } from "@/lib/data";

type Order = { id: string; name: string; city: string; pincode: string; payment?: string; total: number; items: { name: string; qty: number; image: string }[] };

export default function OrderConfirmed() {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  useEffect(() => {
    try { setOrder(JSON.parse(sessionStorage.getItem("diya.lastOrder") ?? "null")); } catch { setOrder(null); }
  }, []);

  if (order === undefined) return <div className="py-32" />;
  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">No recent order found</h1>
        <Link href="/" className="mt-6 inline-block rounded-md bg-ink px-6 py-3 text-sm font-semibold text-cream">Back to home</Link>
      </div>
    );
  }

  const eta = new Date(Date.now() + 4 * 86400000).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 text-center">
      <div className="mx-auto grid size-16 place-items-center rounded-full bg-sage text-3xl text-cream">✓</div>
      <h1 className="mt-5 font-display text-4xl">Thank you, {order.name.split(" ")[0]}!</h1>
      <p className="mt-2 text-muted">Order <b className="text-ink">#{order.id}</b> is confirmed. We’ll text you tracking details.</p>
      <div className="mt-8 rounded-xl border border-linen bg-white p-6 text-left">
        <div className="grid gap-4 text-sm sm:grid-cols-3">
          <div><p className="text-xs text-muted">Arriving by</p><p className="font-semibold">{eta}</p></div>
          <div><p className="text-xs text-muted">Shipping to</p><p className="font-semibold">{order.city} {order.pincode}</p></div>
          <div><p className="text-xs text-muted">Paid via</p><p className="font-semibold">{order.payment} · {formatINR(order.total)}</p></div>
        </div>
        <ul className="mt-6 space-y-3 border-t border-linen pt-5">
          {order.items.map((it) => (
            <li key={it.name} className="flex items-center gap-3 text-sm">
              <span className="relative size-12 overflow-hidden rounded-md bg-sand"><Image src={it.image} alt="" fill sizes="48px" className="object-cover" /></span>
              <span className="flex-1">{it.name}</span><span className="text-muted">× {it.qty}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link href="/" className="mt-8 inline-block rounded-md bg-ink px-8 py-3 text-sm font-semibold text-cream hover:bg-clay">Continue shopping</Link>
    </div>
  );
}
