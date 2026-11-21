import { StarIcon } from "./Icons";

export function Rating({ value, count, size = 12 }: { value: number; count?: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted">
      <span className="inline-flex items-center gap-0.5 rounded bg-sage px-1.5 py-0.5 font-semibold text-white">
        {value.toFixed(1)} <StarIcon width={size - 2} height={size - 2} />
      </span>
      {count !== undefined && <span>({count.toLocaleString("en-IN")})</span>}
    </span>
  );
}
