import Link from "next/link";

export function SectionHeading({ title, eyebrow, href, linkLabel = "View all" }: { title: string; eyebrow?: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-clay">{eyebrow}</p>}
        <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
      </div>
      {href && <Link href={href} className="shrink-0 border-b border-ink pb-0.5 text-sm font-semibold hover:border-clay hover:text-clay">{linkLabel} →</Link>}
    </div>
  );
}
