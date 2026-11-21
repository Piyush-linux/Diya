"use client";

import { useEffect, useState } from "react";

/** Counts down to the next local midnight. */
export function Countdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => {
      const end = new Date();
      end.setHours(24, 0, 0, 0);
      setLeft(Math.max(0, end.getTime() - Date.now()));
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  const parts = left === null ? ["--", "--", "--"] : [3600000, 60000, 1000].map((d, i) => String(Math.floor((left / d) % (i === 0 ? 24 : 60))).padStart(2, "0"));
  return (
    <div className="flex items-center gap-1.5" aria-label="Time left for today's deals">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-cream/80">Ends in</span>
      {parts.map((p, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="min-w-[2.4rem] rounded-md bg-cream px-2 py-1.5 text-center font-display text-lg font-semibold tabular-nums text-clay-dark">{p}</span>
          {i < 2 && <span className="font-bold text-cream">:</span>}
        </span>
      ))}
    </div>
  );
}
