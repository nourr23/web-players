import type { Metadata } from "next";
import { Suspense } from "react";

import { LegalFooter } from "../_components/legal-page";
import { SiteHeader } from "../_components/site-header";
import { BookingView } from "./booking-view";

export const metadata: Metadata = {
  title: "Book a court — Padel Galaxio",
  description: "Browse padel clubs, see live court availability and book your slot.",
};

/** Public booking page: anyone can browse clubs and slots; booking asks to sign in. */
export default function BookPage() {
  return (
    <>
      <SiteHeader />
      <div className="relative flex flex-1 flex-col overflow-hidden bg-background text-ink">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-glow absolute -left-24 top-0 h-112 w-md rounded-full bg-[radial-gradient(circle,var(--mint-glow),transparent_65%)]" />
          <div className="absolute -right-32 top-64 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(30,201,167,0.12),transparent_68%)]" />
        </div>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-20 pt-10 sm:px-6 md:px-8 md:pt-14">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-mint">Real-time booking</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Book a padel court
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Pick a club, choose a day and grab a free slot. You only need to sign in when you book.
          </p>

          <Suspense fallback={<p className="mt-10 text-sm text-muted">Loading clubs…</p>}>
            <BookingView />
          </Suspense>
        </main>

        <LegalFooter />
      </div>
    </>
  );
}
