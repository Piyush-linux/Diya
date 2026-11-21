"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, formatINR, rooms, searchProducts } from "@/lib/data";
import { useStore } from "./store";
import { BagIcon, ChevronDown, CloseIcon, DiyaMark, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "./Icons";

const announcements = [
  "Free shipping on orders above ₹999",
  "Festive Edit is live: up to 50% off candles & gifting",
  "Use code DIYA10 for 10% off your first order",
  "Easy 7-day returns · Cash on delivery available",
];

function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % announcements.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-clay-dark text-cream">
      <p key={i} className="animate-fade mx-auto max-w-7xl px-4 py-2 text-center text-xs font-medium tracking-wide">
        {announcements[i]}
      </p>
    </div>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1.5" aria-label="Diya home">
      <DiyaMark />
      <span className="font-display text-[26px] font-semibold leading-none tracking-tight text-ink">diya</span>
    </Link>
  );
}

function SearchBox({ onDone }: { onDone?: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const results = useMemo(() => (q.trim().length > 1 ? searchProducts(q).slice(0, 5) : []), [q]);
  const wrap = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <form
      ref={wrap}
      role="search"
      className="relative w-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (!q.trim()) return;
        setOpen(false);
        onDone?.();
        router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      }}
    >
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" width={18} height={18} />
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="Search for bedsheets, vases, candles…"
        aria-label="Search products"
        className="w-full rounded-full border border-linen bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-muted/70 focus:border-clay"
      />
      {open && results.length > 0 && (
        <div className="animate-fade absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-linen bg-white shadow-xl">
          {results.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              onClick={() => { setOpen(false); setQ(""); onDone?.(); }}
              className="flex items-center gap-3 px-3 py-2 hover:bg-sand"
            >
              <span className="relative size-11 shrink-0 overflow-hidden rounded bg-sand">
                <Image src={p.images[0]} alt="" fill sizes="44px" className="object-cover" />
              </span>
              <span className="flex-1 text-sm">{p.name}</span>
              <span className="text-sm font-semibold">{formatINR(p.price)}</span>
            </Link>
          ))}
          <button type="submit" className="w-full border-t border-linen px-3 py-2.5 text-left text-sm font-semibold text-clay hover:bg-sand">
            See all results for “{q}”
          </button>
        </div>
      )}
    </form>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [openCat, setOpenCat] = useState<string | null>(null);
  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div className="animate-fade absolute inset-0 bg-ink/40" onClick={onClose} />
      <nav className="animate-drawer-left absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-cream">
        <div className="flex items-center justify-between border-b border-linen p-4">
          <Logo />
          <button aria-label="Close menu" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="p-4"><SearchBox onDone={onClose} /></div>
        <ul className="px-2">
          {categories.map((c) => (
            <li key={c.slug} className="border-b border-linen/70">
              <div className="flex items-center">
                <Link href={`/collections/${c.slug}`} onClick={onClose} className="flex-1 px-2 py-3 text-[15px] font-medium">{c.name}</Link>
                <button aria-label={`Expand ${c.name}`} className="p-3" onClick={() => setOpenCat(openCat === c.slug ? null : c.slug)}>
                  <ChevronDown width={16} height={16} className={`transition ${openCat === c.slug ? "rotate-180" : ""}`} />
                </button>
              </div>
              {openCat === c.slug && (
                <ul className="pb-3 pl-4">
                  {c.subs.map((s) => (
                    <li key={s}><Link href={`/collections/${c.slug}`} onClick={onClose} className="block py-1.5 text-sm text-muted">{s}</Link></li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <p className="px-4 pb-2 pt-6 text-xs font-bold uppercase tracking-widest text-muted">Shop by room</p>
        <div className="grid grid-cols-3 gap-3 px-4 pb-8">
          {rooms.map((r) => (
            <Link key={r.slug} href={`/collections/${r.slug}`} onClick={onClose} className="text-center text-xs">
              <span className="relative mb-1 block aspect-square overflow-hidden rounded-lg">
                <Image src={r.image} alt="" fill sizes="100px" className="object-cover" />
              </span>
              {r.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export function Header() {
  const { count, wishlist, setDrawerOpen } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const pathname = usePathname();
  useEffect(() => setMega(null), [pathname]);

  const navItems = [...categories.slice(0, 8), { slug: "rooms", name: "Shop by Room" }];
  const activeCat = categories.find((c) => c.slug === mega);

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 border-b border-linen bg-cream/95 backdrop-blur" onMouseLeave={() => setMega(null)}>
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-6">
          <button aria-label="Open menu" className="lg:hidden" onClick={() => setMenuOpen(true)}><MenuIcon /></button>
          <Logo />
          <div className="hidden flex-1 md:block md:max-w-xl lg:mx-auto"><SearchBox /></div>
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <Link href="/account" aria-label="Account" className="hidden rounded-full p-2 hover:bg-sand sm:block"><UserIcon /></Link>
            <Link href="/wishlist" aria-label="Wishlist" className="relative rounded-full p-2 hover:bg-sand">
              <HeartIcon />
              {wishlist.length > 0 && <Badge n={wishlist.length} />}
            </Link>
            <button aria-label="Open cart" onClick={() => setDrawerOpen(true)} className="relative rounded-full p-2 hover:bg-sand">
              <BagIcon />
              {count > 0 && <Badge n={count} />}
            </button>
          </div>
        </div>
        <div className="px-4 pb-3 md:hidden"><SearchBox /></div>

        <nav className="hidden border-t border-linen/70 lg:block" aria-label="Categories">
          <ul className="mx-auto flex max-w-7xl justify-between px-4">
            {navItems.map((c) => (
              <li key={c.slug} onMouseEnter={() => setMega(c.slug)}>
                <Link
                  href={c.slug === "rooms" ? "/collections/living-room" : `/collections/${c.slug}`}
                  className={`block border-b-2 py-3 text-[13px] font-medium tracking-wide transition ${mega === c.slug ? "border-clay text-clay" : "border-transparent hover:text-clay"}`}
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li onMouseEnter={() => setMega(null)}>
              <Link href="/collections/festive" className="block py-3 text-[13px] font-bold tracking-wide text-clay">Festive Sale</Link>
            </li>
          </ul>
        </nav>

        {mega && (
          <div className="animate-fade absolute inset-x-0 top-full hidden border-b border-linen bg-cream shadow-lg lg:block">
            <div className="mx-auto max-w-7xl px-4 py-8">
              {mega === "rooms" ? (
                <div className="grid grid-cols-6 gap-4">
                  {rooms.map((r) => (
                    <Link key={r.slug} href={`/collections/${r.slug}`} className="group text-sm font-medium">
                      <span className="relative mb-2 block aspect-[4/3] overflow-hidden rounded-lg">
                        <Image src={r.image} alt="" fill sizes="200px" className="object-cover transition group-hover:scale-105" />
                      </span>
                      {r.name}
                    </Link>
                  ))}
                </div>
              ) : activeCat ? (
                <div className="grid grid-cols-[1fr_1fr_1.3fr] gap-10">
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">{activeCat.name}</p>
                    <ul className="space-y-2">
                      {activeCat.subs.map((s) => (
                        <li key={s}><Link href={`/collections/${activeCat.slug}`} className="text-sm hover:text-clay">{s}</Link></li>
                      ))}
                      <li><Link href={`/collections/${activeCat.slug}`} className="text-sm font-semibold text-clay">View all →</Link></li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Popular edits</p>
                    <ul className="space-y-2 text-sm">
                      <li><Link href="/collections/bestsellers" className="hover:text-clay">Bestsellers</Link></li>
                      <li><Link href="/collections/new-arrivals" className="hover:text-clay">New & handmade</Link></li>
                      <li><Link href="/collections/under-999" className="hover:text-clay">Under ₹999</Link></li>
                      <li><Link href="/collections/fast-delivery" className="hover:text-clay">Fast delivery</Link></li>
                    </ul>
                  </div>
                  <Link href={`/collections/${activeCat.slug}`} className="group relative block h-48 overflow-hidden rounded-xl">
                    <Image src={activeCat.image} alt="" fill sizes="400px" className="object-cover transition duration-500 group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                    <span className="absolute bottom-4 left-4 right-4 text-cream">
                      <span className="block font-display text-xl">{activeCat.name}</span>
                      <span className="text-xs opacity-90">{activeCat.blurb}</span>
                    </span>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </header>
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid min-w-[18px] place-items-center rounded-full bg-clay px-1 text-[10px] font-bold leading-[18px] text-white">
      {n > 99 ? "99+" : n}
    </span>
  );
}
