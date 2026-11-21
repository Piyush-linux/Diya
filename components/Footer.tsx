import Link from "next/link";
import { categories, rooms } from "@/lib/data";
import { Logo } from "./Header";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="mt-20 bg-ink text-cream/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 inline-block rounded-md bg-cream px-3 py-2"><Logo /></div>
          <p className="max-w-sm text-sm leading-relaxed">
            Diya brings together handmade and thoughtfully sourced home décor from artisans across India: block prints from Jaipur, pottery from Khurja and weaves from Bhadohi.
          </p>
          <div className="mt-6"><Newsletter dark /></div>
        </div>
        <FooterCol title="Shop" links={categories.map((c) => ({ href: `/collections/${c.slug}`, label: c.name }))} />
        <FooterCol title="Rooms" links={[...rooms.map((r) => ({ href: `/collections/${r.slug}`, label: r.name })), { href: "/collections/under-999", label: "Under ₹999" }, { href: "/collections/fast-delivery", label: "Fast delivery" }]} />
        <FooterCol
          title="Help"
          links={[
            { href: "/account", label: "Track order" },
            { href: "/pages/shipping", label: "Shipping policy" },
            { href: "/pages/returns", label: "Returns & exchanges" },
            { href: "/pages/bulk-orders", label: "Bulk & corporate gifting" },
            { href: "/pages/contact", label: "Contact us" },
            { href: "/pages/terms", label: "Terms of service" },
            { href: "/pages/privacy", label: "Privacy policy" },
          ]}
        />
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs md:flex-row">
          <p>© {new Date().getFullYear()} Diya Home. Demo storefront.</p>
          <p className="flex gap-3 opacity-80"><span>UPI</span>·<span>Visa</span>·<span>Mastercard</span>·<span>RuPay</span>·<span>Cash on delivery</span></p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-cream">{title}</p>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}><Link href={l.href} className="hover:text-marigold">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
