"use client";

import { useState } from "react";

export function Newsletter({ dark }: { dark?: boolean }) {
  const [done, setDone] = useState(false);
  if (done) return <p className={`text-sm font-semibold ${dark ? "text-marigold" : "text-sage"}`}>Thank you! Your 10% code DIYA10 is on its way.</p>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="flex w-full max-w-md gap-2">
      <input
        type="email"
        required
        placeholder="Your email address"
        aria-label="Email address"
        className={`min-w-0 flex-1 rounded-md border px-4 py-3 text-sm outline-none ${dark ? "border-cream/20 bg-transparent text-cream placeholder:text-cream/50 focus:border-marigold" : "border-linen bg-white focus:border-clay"}`}
      />
      <button className={`rounded-md px-5 text-sm font-semibold ${dark ? "bg-marigold text-ink" : "bg-ink text-cream"}`}>Subscribe</button>
    </form>
  );
}
