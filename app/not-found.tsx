import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center">
      <p className="font-display text-7xl text-clay">404</p>
      <h1 className="mt-4 font-display text-3xl">This page wandered off</h1>
      <p className="mt-2 text-muted">It might have been moved, or the link may be broken.</p>
      <Link href="/" className="mt-8 inline-block rounded-md bg-ink px-6 py-3 text-sm font-semibold text-cream">Back to home</Link>
    </div>
  );
}
