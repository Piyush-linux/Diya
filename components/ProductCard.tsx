"use client";

import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/lib/data";
import { useStore } from "./store";
import { BoltIcon, HeartIcon } from "./Icons";
import { Price } from "./Price";
import { Rating } from "./Rating";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { add, toggleWish, isWished } = useStore();
  const wished = isWished(product.slug);
  const hasCheaperVariant = product.variants?.some((v) => v.priceDelta < 0);
  const fromPrice = product.price + Math.min(0, ...(product.variants?.map((v) => v.priceDelta) ?? [0]));

  return (
    <div className="group relative flex flex-col">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-lg bg-sand">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width:1280px) 20vw, (min-width:768px) 30vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt=""
            fill
            sizes="(min-width:1280px) 20vw, (min-width:768px) 30vw, 50vw"
            className="object-cover opacity-0 transition duration-500 group-hover:opacity-100"
          />
        )}
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
          {product.badge && (
            <span className="rounded-full bg-cream/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-clay-dark">{product.badge}</span>
          )}
          {product.fastDelivery && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-ink/80 px-2 py-0.5 text-[10px] font-semibold text-white">
              <BoltIcon width={10} height={10} /> Fast delivery
            </span>
          )}
        </div>
      </Link>
      <button
        type="button"
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wished}
        onClick={() => toggleWish(product.slug)}
        className={`absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-cream/90 transition hover:scale-110 ${wished ? "text-clay" : "text-ink"}`}
      >
        <HeartIcon width={18} height={18} filled={wished} />
      </button>

      <div className="mt-3 flex flex-1 flex-col gap-1">
        <p className="text-[11px] uppercase tracking-wider text-muted">{product.material}</p>
        <Link href={`/products/${product.slug}`} className="line-clamp-2 text-sm leading-snug text-ink hover:text-clay">
          {product.name}
        </Link>
        <Rating value={product.rating} count={product.reviews} />
        <div className="mt-1">
          <Price price={hasCheaperVariant ? fromPrice : product.price} mrp={product.mrp} from={hasCheaperVariant} />
        </div>
        <div className="mt-auto pt-2.5">
          <button
            type="button"
            onClick={() => add(product)}
            className="w-full rounded-md border border-ink/80 py-2 text-xs font-semibold uppercase tracking-wider text-ink transition hover:bg-ink hover:text-cream"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
