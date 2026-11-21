import Image from "next/image";
import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HandIcon, ReturnIcon, ShieldIcon, StarIcon, TruckIcon } from "@/components/Icons";
import { Newsletter } from "@/components/Newsletter";
import { ProductCard } from "@/components/ProductCard";
import { ProductRail } from "@/components/ProductRail";
import { SectionHeading } from "@/components/SectionHeading";
import { bestsellers, categories, dealOfTheDay, festive, newArrivals, photos, rooms } from "@/lib/data";

const usps = [
  { icon: TruckIcon, title: "Free shipping", body: "On orders above ₹999" },
  { icon: ReturnIcon, title: "7-day returns", body: "No-questions-asked pickup" },
  { icon: ShieldIcon, title: "Secure checkout", body: "UPI, cards & COD" },
  { icon: HandIcon, title: "Artisan made", body: "From 120+ craft clusters" },
];

const priceTiles = [
  { label: "Under ₹499", href: "/collections/under-499", tone: "bg-[#efd9c5]" },
  { label: "Under ₹999", href: "/collections/under-999", tone: "bg-[#e3e6d6]" },
  { label: "Fast delivery", href: "/collections/fast-delivery", tone: "bg-[#f4e2b8]" },
  { label: "New & handmade", href: "/collections/new-arrivals", tone: "bg-[#e6d8e0]" },
];

const testimonials = [
  { quote: "The mulmul dohar is the softest thing I own. I ordered three more for my parents.", name: "Ritika M.", city: "Gurugram" },
  { quote: "Packaging was gorgeous and the vase was even prettier in person. Diya is my go-to gifting site now.", name: "Arjun P.", city: "Bengaluru" },
  { quote: "The dinner set survived my toddler and the dishwasher. 10/10, would host again.", name: "Sana Q.", city: "Hyderabad" },
];

export default function Home() {
  return (
    <>
      <HeroCarousel />

      {/* USP strip */}
      <section className="mx-auto max-w-7xl px-4">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-linen bg-linen md:grid-cols-4 mt-4">
          {usps.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex items-center gap-3 bg-cream px-4 py-4">
              <Icon className="shrink-0 text-clay" />
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Category circles */}
      <section className="mx-auto mt-14 max-w-7xl px-4">
        <SectionHeading eyebrow="Explore" title="Shop by category" href="/collections/all" />
        <div className="no-scrollbar -mx-4 flex gap-5 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-5 md:gap-6 md:px-0 lg:grid-cols-10">
          {categories.map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`} className="group flex w-24 shrink-0 flex-col items-center gap-2 text-center md:w-auto">
              <span className="relative block aspect-square w-full overflow-hidden rounded-full border-2 border-transparent bg-sand transition group-hover:border-clay">
                <Image src={c.image} alt="" fill sizes="120px" className="object-cover transition duration-500 group-hover:scale-110" />
              </span>
              <span className="text-xs font-medium leading-tight">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Deal of the day */}
      <section className="mx-auto mt-16 max-w-7xl px-4">
        <div className="rounded-2xl bg-clay p-5 md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-marigold">Today only</p>
              <h2 className="font-display text-3xl text-cream">Deals of the day</h2>
            </div>
            <Countdown />
          </div>
          <div className="grid grid-cols-2 gap-4 rounded-xl bg-cream p-4 md:grid-cols-4 md:gap-6 md:p-6">
            {dealOfTheDay().map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto mt-16 max-w-7xl px-4">
        <SectionHeading eyebrow="Loved by 2 lakh+ homes" title="Bestsellers" href="/collections/bestsellers" />
        <ProductRail products={bestsellers()} />
      </section>

      {/* Promo duo */}
      <section className="mx-auto mt-16 grid max-w-7xl gap-4 px-4 md:grid-cols-2">
        <PromoTile image={photos.bedLinen} eyebrow="Up to 45% off" title="Linen & percale bedding" href="/collections/bedding" />
        <PromoTile image={photos.candleDuo} eyebrow="Hand-poured in Goa" title="Candles for slow evenings" href="/collections/candles" />
      </section>

      {/* Shop by room */}
      <section className="mx-auto mt-16 max-w-7xl px-4">
        <SectionHeading eyebrow="Get the look" title="Shop by room" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {rooms.map((r) => (
            <Link key={r.slug} href={`/collections/${r.slug}`} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image src={r.image} alt="" fill sizes="(min-width:768px) 33vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 font-display text-xl text-cream md:text-2xl">{r.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Festive edit */}
      <section className="mt-16 bg-sand py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Diwali to Christmas" title="The Festive Edit" href="/collections/festive" />
          <ProductRail products={festive()} />
        </div>
      </section>

      {/* Price tiles */}
      <section className="mx-auto mt-16 max-w-7xl px-4">
        <SectionHeading title="Shop by budget & speed" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {priceTiles.map((t) => (
            <Link key={t.label} href={t.href} className={`${t.tone} group flex aspect-[5/3] flex-col justify-between rounded-xl p-5 transition hover:-translate-y-0.5`}>
              <span className="text-xs font-bold uppercase tracking-widest text-ink/60">Shop</span>
              <span className="font-display text-2xl leading-tight md:text-3xl">{t.label} <span className="inline-block transition group-hover:translate-x-1">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      {/* New & handmade */}
      <section className="mx-auto mt-16 max-w-7xl px-4">
        <SectionHeading eyebrow="Just landed" title="New & handmade" href="/collections/new-arrivals" />
        <ProductRail products={newArrivals()} />
      </section>

      {/* Story band */}
      <section className="mx-auto mt-16 grid max-w-7xl items-center gap-8 px-4 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image src={photos.bellyVases} alt="Terracotta vases with leaves" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-clay">Our story</p>
          <h2 className="font-display text-3xl leading-tight md:text-4xl">What makes a house feel like home?</h2>
          <p className="mt-4 leading-relaxed text-muted">
            We think it’s objects with a story: a dohar block-printed by hand, a vase that came off a potter’s wheel, a candle poured in small batches.
            Diya works directly with artisan clusters across India so you get honest prices and makers get fair pay.
          </p>
          <Link href="/collections/new-arrivals" className="mt-6 inline-block rounded-md bg-ink px-6 py-3 text-sm font-semibold text-cream hover:bg-clay">Meet the makers</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto mt-16 max-w-7xl px-4">
        <SectionHeading eyebrow="4.7 average from 38,000+ reviews" title="Homes we’ve helped style" />
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-xl border border-linen bg-white p-6">
              <div className="mb-3 flex text-marigold">{Array.from({ length: 5 }, (_, i) => <StarIcon key={i} width={16} height={16} />)}</div>
              <blockquote className="font-display text-lg leading-snug">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-muted">{t.name} · {t.city}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto mt-16 max-w-7xl px-4">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-sage px-6 py-12 text-center text-cream">
          <h2 className="font-display text-3xl">Get 10% off your first order</h2>
          <p className="max-w-md text-sm text-cream/85">Join for new drops, styling notes and members-only sales. No spam, ever.</p>
          <div className="w-full max-w-md rounded-lg bg-cream p-1.5"><Newsletter /></div>
        </div>
      </section>
    </>
  );
}

function PromoTile({ image, eyebrow, title, href }: { image: string; eyebrow: string; title: string; href: string }) {
  return (
    <Link href={href} className="group relative block aspect-[16/9] overflow-hidden rounded-2xl">
      <Image src={image} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
      <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
      <span className="absolute bottom-6 left-6 text-cream">
        <span className="block text-xs font-bold uppercase tracking-[0.2em] text-marigold">{eyebrow}</span>
        <span className="mt-1 block font-display text-2xl md:text-3xl">{title}</span>
        <span className="mt-3 inline-block border-b border-cream pb-0.5 text-sm font-semibold">Shop now →</span>
      </span>
    </Link>
  );
}
