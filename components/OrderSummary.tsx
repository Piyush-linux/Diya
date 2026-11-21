"use client";

import { useState } from "react";
import { formatINR } from "@/lib/data";
import { COUPONS, useStore } from "./store";

export function OrderSummary({ children }: { children?: React.ReactNode }) {
  const { subtotal, mrpTotal, coupon, applyCoupon, removeCoupon, totals } = useStore();
  const [code, setCode] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const apply = () => code.trim() && setErr(applyCoupon(code));

  return (
    <div className="space-y-4 rounded-xl border border-linen bg-white p-5">
      <h2 className="font-display text-xl">Order summary</h2>

      {coupon ? (
        <div className="flex items-center justify-between rounded-md bg-sage/10 px-3 py-2 text-sm">
          <span><b className="text-sage">{coupon}</b> applied: {COUPONS[coupon].label}</span>
          <button onClick={removeCoupon} className="text-xs font-semibold text-clay underline">Remove</button>
        </div>
      ) : (
        // Not a <form>: this summary is also rendered inside the checkout form, and forms can't nest.
        <div className="space-y-1">
          <div className="flex gap-2">
            <input
              value={code}
              onChange={(e) => { setCode(e.target.value); setErr(null); }}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); apply(); } }}
              placeholder="Coupon code"
              aria-label="Coupon code"
              className="min-w-0 flex-1 rounded-md border border-linen px-3 py-2 text-sm uppercase outline-none focus:border-clay"
            />
            <button type="button" onClick={apply} className="rounded-md border border-ink px-4 text-sm font-semibold hover:bg-ink hover:text-cream">Apply</button>
          </div>
          {err ? <p className="text-xs text-clay">{err}</p> : <p className="text-xs text-muted">Try DIYA10 or FESTIVE15</p>}
        </div>
      )}

      <dl className="space-y-2 border-t border-linen pt-4 text-sm">
        <Row k="Total MRP" v={formatINR(mrpTotal)} />
        {mrpTotal > subtotal && <Row k="Discount on MRP" v={`− ${formatINR(mrpTotal - subtotal)}`} green />}
        {totals.discount > 0 && <Row k="Coupon discount" v={`− ${formatINR(totals.discount)}`} green />}
        <Row k="Shipping" v={totals.shipping ? formatINR(totals.shipping) : "Free"} green={!totals.shipping} />
        <div className="flex justify-between border-t border-linen pt-3 text-base font-semibold"><dt>Total</dt><dd>{formatINR(totals.total)}</dd></div>
      </dl>
      {mrpTotal - totals.total > 0 && (
        <p className="rounded-md bg-sage/10 px-3 py-2 text-center text-xs font-semibold text-sage">You save {formatINR(mrpTotal - subtotal + totals.discount)} on this order</p>
      )}
      {children}
    </div>
  );
}

function Row({ k, v, green }: { k: string; v: string; green?: boolean }) {
  return <div className="flex justify-between"><dt className="text-muted">{k}</dt><dd className={green ? "font-medium text-sage" : ""}>{v}</dd></div>;
}
