import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionView } from "@/components/CollectionView";
import { collectionSlugs, getCollection } from "@/lib/data";

export function generateStaticParams() {
  return collectionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCollection((await params).slug);
  return c ? { title: c.title, description: c.blurb } : {};
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const collection = getCollection((await params).slug);
  if (!collection) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4">
      <nav className="py-4 text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-clay">Home</Link> <span className="mx-1">/</span> <span className="text-ink">{collection.title}</span>
      </nav>
      <header className="relative mb-8 flex h-44 items-end overflow-hidden rounded-2xl md:h-56">
        <Image src={collection.image} alt="" fill priority sizes="(min-width:1280px) 1250px, 100vw" className="object-cover" />
        <span className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-transparent" />
        <div className="relative p-6 text-cream md:p-10">
          <h1 className="font-display text-3xl md:text-5xl">{collection.title}</h1>
          <p className="mt-2 max-w-lg text-sm text-cream/90">{collection.blurb}</p>
        </div>
      </header>
      <CollectionView items={collection.items} />
    </div>
  );
}
