"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { photos } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "./Icons";

const slides = [
  { image: photos.livingBright, eyebrow: "The Festive Edit", title: "Light up every corner", body: "Hand-poured candles, brass lamps and gift-ready hampers at up to 50% off.", cta: "Shop the edit", href: "/collections/festive" },
  { image: photos.bedroomRust, eyebrow: "Bedding Week", title: "Sleep, softly", body: "Percale, linen and mulmul from ₹999. Washed, tested and slept-in by us first.", cta: "Shop bedding", href: "/collections/bedding" },
  { image: photos.diningEmerald, eyebrow: "Set the table", title: "Stoneware for long dinners", body: "Speckled, glazed and microwave-safe. Made for everyday thalis.", cta: "Shop dining", href: "/collections/kitchen-dining" },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);
  const go = (d: number) => setI((n) => (n + d + slides.length) % slides.length);

  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-4" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carousel">
      <div className="relative h-[460px] overflow-hidden rounded-2xl md:h-[520px]">
        {slides.map((s, idx) => (
          <div key={s.title} className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={idx !== i}>
            <Image src={s.image} alt="" fill priority={idx === 0} sizes="(min-width:1280px) 1250px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/35 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-center gap-4 p-8 text-cream md:p-14">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-marigold">{s.eyebrow}</span>
              <h1 className="font-display text-4xl leading-[1.05] md:text-6xl">{s.title}</h1>
              <p className="max-w-md text-sm leading-relaxed text-cream/90 md:text-base">{s.body}</p>
              <Link href={s.href} tabIndex={idx === i ? 0 : -1} className="mt-2 w-fit rounded-md bg-cream px-6 py-3 text-sm font-semibold text-ink transition hover:bg-marigold">{s.cta}</Link>
            </div>
          </div>
        ))}
        <div className="absolute bottom-5 left-8 flex gap-2 md:left-14">
          {slides.map((s, idx) => (
            <button key={s.title} aria-label={`Go to slide ${idx + 1}`} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-cream" : "w-3 bg-cream/50"}`} />
          ))}
        </div>
        <div className="absolute bottom-4 right-4 hidden gap-2 md:flex">
          <button aria-label="Previous slide" onClick={() => go(-1)} className="grid size-10 place-items-center rounded-full bg-cream/90 hover:bg-cream"><ChevronLeft width={18} height={18} /></button>
          <button aria-label="Next slide" onClick={() => go(1)} className="grid size-10 place-items-center rounded-full bg-cream/90 hover:bg-cream"><ChevronRight width={18} height={18} /></button>
        </div>
      </div>
    </section>
  );
}
