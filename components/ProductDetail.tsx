"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type Product } from "@/lib/data";
import { Qty } from "./CartDrawer";
import { BoltIcon, HeartIcon, PinIcon, ReturnIcon, ShieldIcon, TruckIcon } from "./Icons";
import { Price } from "./Price";
import { Rating } from "./Rating";
import { unitPriceFor, useStore } from "./store";

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { add, toggleWish, isWished } = useStore();
  const defaultVariant = product.variants?.find((v) => v.priceDelta === 0)?.name ?? product.variants?.[0]?.name;
  const [variant, setVariant] = useState(defaultVariant);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const wished = isWished(product.slug);

  const price = unitPriceFor(product, variant);
  const delta = price - product.price;
  const mrp = product.mrp + delta;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
      {/* Gallery */}
      <div className="flex flex-col-reverse gap-3 md:flex-row">
        <div className="flex gap-3 md:flex-col">
          {product.images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={`relative size-20 overflow-hidden rounded-md border-2 transition ${i === active ? "border-clay" : "border-transparent opacity-70 hover:opacity-100"}`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
        <div className="group relative aspect-[4/5] flex-1 overflow-hidden rounded-xl bg-sand">
          <Image src={product.images[active]} alt={product.name} fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-110" />
          {product.badge && <span className="absolute left-3 top-3 rounded-full bg-cream px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-clay-dark">{product.badge}</span>}
        </div>
      </div>

      {/* Buy box */}
      <div className="lg:sticky lg:top-36 lg:self-start">
        <p className="text-xs uppercase tracking-widest text-muted">{product.material} · {product.color}</p>
        <h1 className="mt-2 font-display text-3xl leading-tight md:text-4xl">{product.name}</h1>
        <a href="#reviews" className="mt-3 inline-block"><Rating value={product.rating} count={product.reviews} size={14} /></a>
        <div className="mt-5">
          <Price price={price} mrp={mrp} size="lg" />
          <p className="mt-1 text-xs text-muted">Inclusive of all taxes</p>
        </div>
        <p className="mt-5 leading-relaxed text-muted">{product.blurb}</p>

        {product.variants && (
          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold">{product.variantLabel}: <span className="font-normal text-muted">{variant}</span></p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.name}
                  onClick={() => setVariant(v.name)}
                  aria-pressed={variant === v.name}
                  className={`rounded-md border px-4 py-2 text-sm transition ${variant === v.name ? "border-ink bg-ink text-cream" : "border-linen bg-white hover:border-ink"}`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm font-semibold">Quantity</span>
          <Qty value={qty} onChange={setQty} min={1} />
        </div>

        <div className="mt-6 grid grid-cols-[1fr_1fr_auto] gap-2">
          <button onClick={() => add(product, { variant, qty })} className="rounded-md border border-ink py-3.5 text-sm font-semibold uppercase tracking-wider hover:bg-ink hover:text-cream">Add to cart</button>
          <button
            onClick={() => { add(product, { variant, qty, openDrawer: false }); router.push("/checkout"); }}
            className="rounded-md bg-clay py-3.5 text-sm font-semibold uppercase tracking-wider text-white hover:bg-clay-dark"
          >
            Buy now
          </button>
          <button
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            onClick={() => toggleWish(product.slug)}
            className={`grid w-12 place-items-center rounded-md border border-linen bg-white ${wished ? "text-clay" : ""}`}
          >
            <HeartIcon filled={wished} />
          </button>
        </div>

        <PincodeCheck fast={!!product.fastDelivery} />

        <ul className="mt-6 grid grid-cols-3 gap-2 text-center text-xs">
          <li className="rounded-lg bg-sand px-2 py-3"><TruckIcon className="mx-auto mb-1 text-clay" />Free shipping over ₹999</li>
          <li className="rounded-lg bg-sand px-2 py-3"><ReturnIcon className="mx-auto mb-1 text-clay" />7-day easy returns</li>
          <li className="rounded-lg bg-sand px-2 py-3"><ShieldIcon className="mx-auto mb-1 text-clay" />Quality checked</li>
        </ul>
      </div>
    </div>
  );
}

function PincodeCheck({ fast }: { fast: boolean }) {
  const [pin, setPin] = useState("");
  const [result, setResult] = useState<null | { ok: boolean; msg: string }>(null);

  const check = () => {
    if (!/^[1-9]\d{5}$/.test(pin)) return setResult({ ok: false, msg: "Enter a valid 6-digit pincode" });
    const metro = /^(11|40|56|60|70|50|41|12|20)/.test(pin);
    const days = fast && metro ? 1 : metro ? 3 : 5;
    const date = new Date(Date.now() + days * 86400000).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
    setResult({ ok: true, msg: `Delivery by ${date}${days === 1 ? " (express)" : ""} · COD available` });
  };

  return (
    <div className="mt-6 rounded-lg border border-linen bg-white p-4">
      <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold"><PinIcon width={16} height={16} /> Check delivery</p>
      <div className="flex gap-2">
        <input
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) => { setPin(e.target.value.replace(/\D/g, "")); setResult(null); }}
          onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder="Enter pincode"
          aria-label="Pincode"
          className="min-w-0 flex-1 rounded-md border border-linen px-3 py-2 text-sm outline-none focus:border-clay"
        />
        <button onClick={check} className="rounded-md px-4 text-sm font-semibold text-clay hover:bg-sand">Check</button>
      </div>
      {result && (
        <p className={`mt-2 flex items-center gap-1 text-xs ${result.ok ? "text-sage" : "text-clay"}`}>
          {result.ok && fast && <BoltIcon width={12} height={12} />} {result.msg}
        </p>
      )}
    </div>
  );
}
