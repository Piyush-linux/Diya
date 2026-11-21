"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/lib/data";

export type CartLine = { key: string; slug: string; variant?: string; qty: number; unitPrice: number };
export type ResolvedLine = CartLine & { product: Product };

type StoreValue = {
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  mrpTotal: number;
  wishlist: string[];
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  add: (product: Product, opts?: { variant?: string; qty?: number; openDrawer?: boolean }) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  toggleWish: (slug: string) => void;
  isWished: (slug: string) => boolean;
  coupon: string | null;
  applyCoupon: (code: string) => string | null;
  removeCoupon: () => void;
  totals: { discount: number; shipping: number; total: number };
};

const StoreContext = createContext<StoreValue | null>(null);
const CART_KEY = "diya.cart.v1";
const WISH_KEY = "diya.wishlist.v1";

export function unitPriceFor(product: Product, variant?: string) {
  const delta = product.variants?.find((v) => v.name === variant)?.priceDelta ?? 0;
  return product.price + delta;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [coupon, setCoupon] = useState<string | null>(null);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem(CART_KEY) ?? "[]"));
      setWishlist(JSON.parse(localStorage.getItem(WISH_KEY) ?? "[]"));
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, loaded]);
  useEffect(() => {
    if (loaded) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, loaded]);

  const add = useCallback<StoreValue["add"]>((product, opts = {}) => {
    const variant = opts.variant ?? product.variants?.find((v) => v.priceDelta === 0)?.name ?? product.variants?.[0]?.name;
    const key = variant ? `${product.slug}::${variant}` : product.slug;
    const qty = opts.qty ?? 1;
    setCart((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(10, l.qty + qty) } : l));
      return [...prev, { key, slug: product.slug, variant, qty, unitPrice: unitPriceFor(product, variant) }];
    });
    if (opts.openDrawer !== false) setDrawerOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) => (qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(10, qty) } : l))));
  }, []);
  const remove = useCallback((key: string) => setCart((prev) => prev.filter((l) => l.key !== key)), []);
  const clear = useCallback(() => setCart([]), []);
  const toggleWish = useCallback(
    (slug: string) => setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
    [],
  );

  const value = useMemo<StoreValue>(() => {
    const subtotalNow = cart.reduce((n, l) => n + l.unitPrice * l.qty, 0);
    const couponValid = (code: string) => {
      const c = COUPONS[code];
      if (!c) return "That code isn’t valid";
      if (c.minSubtotal && subtotalNow < c.minSubtotal) return `Add items worth ₹${c.minSubtotal - subtotalNow} more to use ${code}`;
      return null;
    };
    const activeCoupon = coupon && !couponValid(coupon) ? coupon : null;
    const discountAmt = activeCoupon ? Math.round((subtotalNow * COUPONS[activeCoupon].pct) / 100) : 0;
    const shipping = subtotalNow === 0 || subtotalNow >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;
    const lines = cart.flatMap((l) => {
      const product = getProduct(l.slug);
      return product ? [{ ...l, product }] : [];
    });
    const deltaFor = (l: ResolvedLine) => l.unitPrice - l.product.price;
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.unitPrice * l.qty, 0),
      mrpTotal: lines.reduce((n, l) => n + (l.product.mrp + Math.max(0, deltaFor(l))) * l.qty, 0),
      wishlist,
      drawerOpen,
      setDrawerOpen,
      add,
      setQty,
      remove,
      clear,
      toggleWish,
      isWished: (slug) => wishlist.includes(slug),
      coupon: activeCoupon,
      applyCoupon: (raw) => {
        const code = raw.trim().toUpperCase();
        const err = couponValid(code);
        if (!err) setCoupon(code);
        return err;
      },
      removeCoupon: () => setCoupon(null),
      totals: { discount: discountAmt, shipping, total: subtotalNow - discountAmt + shipping },
    };
  }, [cart, wishlist, drawerOpen, coupon, add, setQty, remove, clear, toggleWish]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

export const FREE_SHIPPING_AT = 999;
export const SHIPPING_FEE = 99;
export const COUPONS: Record<string, { pct: number; label: string; minSubtotal?: number }> = {
  DIYA10: { pct: 10, label: "10% off your order" },
  FESTIVE15: { pct: 15, label: "15% off orders above ₹2,999", minSubtotal: 2999 },
};
