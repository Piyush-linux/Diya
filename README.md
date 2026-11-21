# Diya: home décor storefront

An e-commerce demo for an Indian home-décor brand, built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS 4** and TypeScript. It has no backend: the catalogue is static data and the cart and wishlist live in `localStorage`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
npm run typecheck
```

## What's included

| Area | Route | Notes |
|---|---|---|
| Home | `/` | Hero carousel, USP strip, category circles, deals with a midnight countdown, bestseller / festive / new rails, shop-by-room, budget tiles, story, testimonials, newsletter |
| Collections | `/collections/[slug]` | Categories (`bedding`, `decor`…), rooms (`bedroom`, `dining`…) and edits (`all`, `bestsellers`, `festive`, `under-499`, `under-999`, `fast-delivery`, `new-arrivals`). Filters for category, price, colour, material and fast delivery; 6 sort orders; mobile filter drawer |
| Product | `/products/[slug]` | Gallery, variant picker (size/pack), quantity, add to cart / buy now, wishlist, pincode delivery estimate, accordions, ratings & reviews, related products |
| Cart | slide-out drawer + `/cart` | Free-shipping progress bar, quantity, move to wishlist, coupons `DIYA10` and `FESTIVE15` (min ₹2,999) |
| Checkout | `/checkout` → `/order-confirmed` | Address form with Indian phone/pincode validation, UPI / card / COD (simulated) |
| Other | `/search?q=`, `/wishlist`, `/account` (OTP login mock), `/pages/*` (policies) | Live search suggestions in the header |

## Project layout

```
app/            routes (App Router)
components/     UI; store.tsx holds cart, wishlist and coupon state
lib/data.ts     catalogue: products, categories, rooms, collections, search
lib/image-loader.ts  next/image loader that sizes Unsplash images
```

To add a product, append it to `seeds` in `lib/data.ts`. Its collection, search and product pages are generated automatically.

Product photos are from [Unsplash](https://unsplash.com) and are hot-linked for demo purposes; replace them with your own before going live.
