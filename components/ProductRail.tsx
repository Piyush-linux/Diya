"use client";

import { useRef } from "react";
import { type Product } from "@/lib/data";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "./Icons";

export function ProductRail({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div className="relative">
      <div ref={ref} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
        {products.map((p) => (
          <div key={p.slug} className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[23%] xl:w-[18.5%]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <button aria-label="Scroll left" onClick={() => scroll(-1)} className="absolute -left-4 top-[35%] hidden size-10 place-items-center rounded-full border border-linen bg-cream shadow-sm hover:bg-sand md:grid">
        <ChevronLeft width={18} height={18} />
      </button>
      <button aria-label="Scroll right" onClick={() => scroll(1)} className="absolute -right-4 top-[35%] hidden size-10 place-items-center rounded-full border border-linen bg-cream shadow-sm hover:bg-sand md:grid">
        <ChevronRight width={18} height={18} />
      </button>
    </div>
  );
}
