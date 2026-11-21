import type { Metadata } from "next";
import { notFound } from "next/navigation";

const pages: Record<string, { title: string; body: string[] }> = {
  shipping: { title: "Shipping policy", body: ["Orders ship within 1–3 business days from our Delhi and Bengaluru warehouses.", "Shipping is free on orders above ₹999. Below that, a flat ₹99 fee applies.", "Products marked Fast Delivery reach most metro pincodes within 24–48 hours.", "Large furniture is delivered by our white-glove partners within 7–10 days and includes installation."] },
  returns: { title: "Returns & exchanges", body: ["Changed your mind? Request a free pickup within 7 days of delivery.", "Items must be unused and in their original packaging. Candles and opened bedding cannot be returned for hygiene reasons unless defective.", "Refunds go to your original payment method within 5–7 business days of pickup. COD orders are refunded to a bank account or UPI ID of your choice.", "Received something damaged? Write to us within 48 hours with photos and we’ll send a replacement right away."] },
  "bulk-orders": { title: "Bulk & corporate gifting", body: ["Gifting for Diwali, weddings or your team? We offer tiered pricing from 10 units, custom packaging and personalised notes.", "Write to bulk@diya.example with the products, quantities and delivery date, and our team will reply within one business day."] },
  contact: { title: "Contact us", body: ["Email: care@diya.example", "Phone/WhatsApp: +91 90000 00000 (Mon–Sat, 10am–7pm IST)", "Diya Home, demo address, India."] },
  terms: { title: "Terms of service", body: ["This is a demonstration storefront. No real orders are placed, no payments are taken and no personal data leaves your browser."] },
  privacy: { title: "Privacy policy", body: ["Your cart and wishlist are stored only in your browser’s local storage. This demo has no backend and does not collect personal information."] },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = pages[(await params).slug];
  return p ? { title: p.title } : {};
}

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = pages[(await params).slug];
  if (!page) notFound();
  return (
    <article className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="font-display text-4xl">{page.title}</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-ink/85">{page.body.map((b) => <p key={b}>{b}</p>)}</div>
    </article>
  );
}
