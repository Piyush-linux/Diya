import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown, StarIcon } from "@/components/Icons";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductRail } from "@/components/ProductRail";
import { SectionHeading } from "@/components/SectionHeading";
import { getCategory, getProduct, products, reviewsFor } from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: p.name, description: p.blurb } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const related = products.filter((p) => p.slug !== product.slug && (p.category === product.category || p.rooms.some((r) => product.rooms.includes(r)))).slice(0, 10);
  const reviews = reviewsFor(product);
  const dist = [0.72, 0.18, 0.06, 0.02, 0.02];

  return (
    <div className="mx-auto max-w-7xl px-4">
      <nav className="py-4 text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-clay">Home</Link> <span className="mx-1">/</span>
        {category && <><Link href={`/collections/${category.slug}`} className="hover:text-clay">{category.name}</Link> <span className="mx-1">/</span></>}
        <span className="text-ink">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      <section className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div className="divide-y divide-linen border-y border-linen">
          <Accordion title="Product details" open>
            <p className="mb-4">{product.blurb}</p>
            <ul className="list-disc space-y-1 pl-5">{product.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          </Accordion>
          <Accordion title="Specifications">
            <dl className="grid grid-cols-[140px_1fr] gap-y-2">
              {[["Material", product.material], ["Colour", product.color], ["Category", category?.name ?? "—"], ["Dimensions", product.dimensions], ["Country of origin", "India"]].map(([k, v]) => (
                <div key={k} className="contents"><dt className="text-muted">{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </Accordion>
          <Accordion title="Care instructions">
            <p>Handle with care. Wipe with a soft, dry cloth; for textiles, machine wash cold with like colours and dry in shade. Natural materials may vary slightly in tone and texture, which is part of their charm.</p>
          </Accordion>
          <Accordion title="Shipping & returns">
            <p>Ships in 1–3 business days. Free shipping on orders above ₹999; a ₹99 fee applies otherwise. Not happy? Request a free pickup within 7 days of delivery for a full refund to your original payment method.</p>
          </Accordion>
          <Accordion title="Bulk & corporate orders">
            <p>Need more than 10 pieces for gifting or a project? <Link href="/pages/bulk-orders" className="font-semibold text-clay underline">Enquire for bulk pricing</Link>.</p>
          </Accordion>
        </div>

        <div id="reviews" className="scroll-mt-40">
          <h2 className="font-display text-2xl">Ratings & reviews</h2>
          <div className="mt-4 flex items-center gap-6 rounded-xl bg-sand p-5">
            <div className="text-center">
              <p className="font-display text-5xl">{product.rating.toFixed(1)}</p>
              <p className="text-xs text-muted">{product.reviews.toLocaleString("en-IN")} reviews</p>
            </div>
            <div className="flex-1 space-y-1">
              {dist.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="w-3">{5 - i}</span><StarIcon width={11} height={11} className="text-marigold" />
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-linen"><span className="block h-full rounded-full bg-sage" style={{ width: `${d * 100}%` }} /></span>
                </div>
              ))}
            </div>
          </div>
          <ul className="mt-4 divide-y divide-linen">
            {reviews.map((r) => (
              <li key={r.name} className="py-4">
                <div className="flex items-center gap-1 text-marigold">{Array.from({ length: 5 }, (_, i) => <StarIcon key={i} width={13} height={13} className={i < r.rating ? "" : "text-linen"} />)}</div>
                <p className="mt-1 font-semibold">{r.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{r.body}</p>
                <p className="mt-2 text-xs text-muted">{r.name}, {r.city} · Verified buyer</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeading title="You may also like" href={category ? `/collections/${category.slug}` : undefined} />
          <ProductRail products={related} />
        </section>
      )}
    </div>
  );
}

function Accordion({ title, children, open }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group py-1">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-semibold [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown width={18} height={18} className="transition group-open:rotate-180" />
      </summary>
      <div className="pb-5 text-sm leading-relaxed text-ink/85">{children}</div>
    </details>
  );
}
