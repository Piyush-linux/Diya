"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldIcon } from "@/components/Icons";
import { OrderSummary } from "@/components/OrderSummary";
import { useStore } from "@/components/store";
import { formatINR } from "@/lib/data";

const payments = [
  { id: "upi", label: "UPI", note: "GPay, PhonePe, Paytm & more" },
  { id: "card", label: "Credit / debit card", note: "Visa, Mastercard, RuPay" },
  { id: "cod", label: "Cash on delivery", note: "Pay when it arrives" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, totals, clear } = useStore();
  const [payment, setPayment] = useState("upi");
  const [placing, setPlacing] = useState(false);

  if (lines.length === 0 && !placing) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Nothing to check out yet</h1>
        <Link href="/collections/all" className="mt-6 inline-block rounded-md bg-ink px-6 py-3 text-sm font-semibold text-cream">Browse products</Link>
      </div>
    );
  }

  const placeOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setPlacing(true);
    const order = {
      id: `DY${Date.now().toString().slice(-8)}`,
      name: String(data.name),
      city: String(data.city),
      pincode: String(data.pincode),
      payment: payments.find((p) => p.id === payment)?.label,
      total: totals.total,
      items: lines.map((l) => ({ name: l.product.name, qty: l.qty, image: l.product.images[0] })),
    };
    sessionStorage.setItem("diya.lastOrder", JSON.stringify(order));
    clear();
    router.push("/order-confirmed");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 font-display text-3xl">Checkout</h1>
      <form onSubmit={placeOrder} className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <fieldset className="rounded-xl border border-linen bg-white p-5">
            <legend className="px-1 font-display text-xl">Contact</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <Field name="email" label="Email" type="email" autoComplete="email" />
              <Field name="phone" label="Mobile number" type="tel" pattern="[6-9][0-9]{9}" title="10-digit Indian mobile number" autoComplete="tel" />
            </div>
          </fieldset>
          <fieldset className="rounded-xl border border-linen bg-white p-5">
            <legend className="px-1 font-display text-xl">Delivery address</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <Field name="name" label="Full name" autoComplete="name" className="sm:col-span-2" />
              <Field name="address" label="Flat, house no., street" autoComplete="street-address" className="sm:col-span-2" />
              <Field name="landmark" label="Landmark (optional)" required={false} className="sm:col-span-2" />
              <Field name="city" label="City" autoComplete="address-level2" />
              <Field name="state" label="State" autoComplete="address-level1" />
              <Field name="pincode" label="Pincode" inputMode="numeric" pattern="[1-9][0-9]{5}" title="6-digit pincode" autoComplete="postal-code" />
            </div>
          </fieldset>
          <fieldset className="rounded-xl border border-linen bg-white p-5">
            <legend className="px-1 font-display text-xl">Payment</legend>
            <div className="mt-2 space-y-2">
              {payments.map((p) => (
                <label key={p.id} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${payment === p.id ? "border-clay bg-clay/5" : "border-linen"}`}>
                  <input type="radio" name="payment" value={p.id} checked={payment === p.id} onChange={() => setPayment(p.id)} className="accent-clay" />
                  <span className="flex-1"><span className="block text-sm font-semibold">{p.label}</span><span className="text-xs text-muted">{p.note}</span></span>
                </label>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted"><ShieldIcon width={14} height={14} /> This is a demo store: no payment is taken.</p>
          </fieldset>
        </div>

        <div className="space-y-4 lg:sticky lg:top-36 lg:self-start">
          <ul className="space-y-3 rounded-xl border border-linen bg-white p-5">
            {lines.map((l) => (
              <li key={l.key} className="flex items-center gap-3 text-sm">
                <span className="relative size-14 shrink-0 overflow-hidden rounded-md bg-sand">
                  <Image src={l.product.images[0]} alt="" fill sizes="56px" className="object-cover" />
                  <span className="absolute right-0.5 top-0.5 grid size-5 place-items-center rounded-full bg-ink text-[10px] font-bold text-cream">{l.qty}</span>
                </span>
                <span className="flex-1 leading-snug">{l.product.name}{l.variant && <span className="block text-xs text-muted">{l.variant}</span>}</span>
                <span className="font-medium">{formatINR(l.unitPrice * l.qty)}</span>
              </li>
            ))}
          </ul>
          <OrderSummary>
            <button disabled={placing} className="w-full rounded-md bg-clay py-3.5 text-sm font-semibold uppercase tracking-wider text-white hover:bg-clay-dark disabled:opacity-60">
              {payment === "cod" ? "Place order" : `Pay ${formatINR(totals.total)}`}
            </button>
          </OrderSummary>
        </div>
      </form>
    </div>
  );
}

function Field({ label, className = "", required = true, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1 block text-xs font-semibold text-muted">{label}</span>
      <input required={required} {...rest} className="w-full rounded-md border border-linen px-3 py-2.5 outline-none focus:border-clay" />
    </label>
  );
}
