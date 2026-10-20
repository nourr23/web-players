import type { Metadata } from "next";

import { LegalFooter } from "../_components/legal-page";
import { SiteHeader } from "../_components/site-header";
import { WelcomeCard } from "./welcome-card";

export const metadata: Metadata = {
  title: "Welcome to Padel Galaxio",
  description: "Your Padel Galaxio email confirmation.",
  robots: { index: false, follow: false },
};

/** Landing page for the Supabase "Confirm your email" link sent by the mobile app. */
export default function WelcomePage() {
  return (
    <>
      <SiteHeader />
      <div className="relative flex flex-1 flex-col overflow-hidden bg-background text-ink">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-glow absolute -left-24 top-0 h-112 w-md rounded-full bg-[radial-gradient(circle,var(--mint-glow),transparent_65%)]" />
          <div className="absolute -right-32 top-48 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(30,201,167,0.14),transparent_68%)]" />
        </div>

        <main className="mx-auto flex w-full max-w-xl flex-1 items-start px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
          <WelcomeCard />
        </main>

        <LegalFooter />
      </div>
    </>
  );
}
