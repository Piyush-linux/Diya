import { discount, formatINR } from "@/lib/data";

export function Price({ price, mrp, size = "sm", from }: { price: number; mrp: number; size?: "sm" | "lg"; from?: boolean }) {
  const off = discount({ price, mrp });
  return (
    <div className={`flex flex-wrap items-baseline gap-x-2 ${size === "lg" ? "text-2xl" : "text-[15px]"}`}>
      <span className="font-semibold text-ink">{from && <span className="font-normal text-muted text-[0.8em]">From </span>}{formatINR(price)}</span>
      {off > 0 && (
        <>
          <span className={`text-muted line-through ${size === "lg" ? "text-base" : "text-xs"}`}>{formatINR(mrp)}</span>
          <span className={`font-semibold text-sage ${size === "lg" ? "text-base" : "text-xs"}`}>{off}% off</span>
        </>
      )}
    </div>
  );
}
