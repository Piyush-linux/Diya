"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Header";

export default function AccountPage() {
  const [step, setStep] = useState<"phone" | "otp" | "done">("phone");
  const [phone, setPhone] = useState("");

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-linen bg-white p-8">
        <div className="mb-6 flex justify-center"><Logo /></div>
        {step === "done" ? (
          <div className="text-center">
            <h1 className="font-display text-2xl">Welcome back!</h1>
            <p className="mt-2 text-sm text-muted">Signed in as +91 {phone}. (Accounts are simulated in this demo.)</p>
            <div className="mt-6 grid gap-2">
              <Link href="/wishlist" className="rounded-md border border-ink py-3 text-sm font-semibold">My wishlist</Link>
              <Link href="/cart" className="rounded-md bg-ink py-3 text-sm font-semibold text-cream">My cart</Link>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setStep(step === "phone" ? "otp" : "done"); }}>
            <h1 className="text-center font-display text-2xl">{step === "phone" ? "Login or sign up" : "Enter the OTP"}</h1>
            <p className="mt-1 text-center text-sm text-muted">{step === "phone" ? "Track orders, save addresses and earn Diya points." : `Sent to +91 ${phone}. Any 4 digits work in this demo.`}</p>
            {step === "phone" ? (
              <div className="mt-6 flex overflow-hidden rounded-md border border-linen focus-within:border-clay">
                <span className="bg-sand px-3 py-3 text-sm">+91</span>
                <input required value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} pattern="[6-9][0-9]{9}" title="10-digit mobile number" inputMode="numeric" placeholder="Mobile number" aria-label="Mobile number" className="flex-1 px-3 text-sm outline-none" />
              </div>
            ) : (
              <input required inputMode="numeric" pattern="[0-9]{4}" maxLength={4} placeholder="• • • •" aria-label="One-time password" className="mt-6 w-full rounded-md border border-linen py-3 text-center text-2xl tracking-[0.6em] outline-none focus:border-clay" />
            )}
            <button className="mt-4 w-full rounded-md bg-clay py-3 text-sm font-semibold text-white hover:bg-clay-dark">{step === "phone" ? "Send OTP" : "Verify & continue"}</button>
          </form>
        )}
      </div>
    </div>
  );
}
