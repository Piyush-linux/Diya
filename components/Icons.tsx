type P = React.SVGProps<SVGSVGElement>;
const base = (p: P) => ({ width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, ...p });

export const SearchIcon = (p: P) => (<svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>);
export const UserIcon = (p: P) => (<svg {...base(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>);
export const HeartIcon = ({ filled, ...p }: P & { filled?: boolean }) => (<svg {...base(p)} fill={filled ? "currentColor" : "none"}><path d="M12 20s-7.5-4.6-9.2-9.3C1.7 7.6 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.3 3.1 4.2 6.2C19.5 15.4 12 20 12 20Z" /></svg>);
export const BagIcon = (p: P) => (<svg {...base(p)}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>);
export const MenuIcon = (p: P) => (<svg {...base(p)}><path d="M3 6h18M3 12h18M3 18h18" /></svg>);
export const CloseIcon = (p: P) => (<svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const ChevronLeft = (p: P) => (<svg {...base(p)}><path d="m15 18-6-6 6-6" /></svg>);
export const ChevronRight = (p: P) => (<svg {...base(p)}><path d="m9 18 6-6-6-6" /></svg>);
export const ChevronDown = (p: P) => (<svg {...base(p)}><path d="m6 9 6 6 6-6" /></svg>);
export const StarIcon = (p: P) => (<svg {...base(p)} fill="currentColor" stroke="none"><path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8L12 3Z" /></svg>);
export const TruckIcon = (p: P) => (<svg {...base(p)}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>);
export const ReturnIcon = (p: P) => (<svg {...base(p)}><path d="M9 14 4 9l5-5" /><path d="M4 9h11a5 5 0 0 1 0 10h-3" /></svg>);
export const ShieldIcon = (p: P) => (<svg {...base(p)}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>);
export const HandIcon = (p: P) => (<svg {...base(p)}><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11m0-6.5a1.5 1.5 0 0 1 3 0V11m0-5a1.5 1.5 0 0 1 3 0v7a7 7 0 0 1-7 7h-.6a6 6 0 0 1-4.6-2.2L3 14.5a1.6 1.6 0 0 1 2.4-2l2.6 2.5" /></svg>);
export const PinIcon = (p: P) => (<svg {...base(p)}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const BoltIcon = (p: P) => (<svg {...base(p)}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>);
export const PlusIcon = (p: P) => (<svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>);
export const MinusIcon = (p: P) => (<svg {...base(p)}><path d="M5 12h14" /></svg>);
export const TrashIcon = (p: P) => (<svg {...base(p)}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></svg>);
export const FilterIcon = (p: P) => (<svg {...base(p)}><path d="M4 6h16M7 12h10M10 18h4" /></svg>);

export function DiyaMark(p: P) {
  // A small lamp-and-flame mark for the brand.
  return (
    <svg viewBox="0 0 32 32" width={28} height={28} {...p}>
      <path d="M16 3c2.8 3.2 4 5.7 4 7.8A4 4 0 0 1 16 15a4 4 0 0 1-4-4.2C12 8.7 13.2 6.2 16 3Z" fill="#e3a32b" />
      <path d="M16 7.5c1.1 1.5 1.6 2.6 1.6 3.4a1.6 1.6 0 0 1-3.2 0c0-.8.5-1.9 1.6-3.4Z" fill="#fbf7f1" />
      <path d="M3 18h26c0 5-5.8 9-13 9S3 23 3 18Z" fill="#b5532b" />
      <path d="M3 18h26" stroke="#8f3f1f" strokeWidth="1.5" />
    </svg>
  );
}
