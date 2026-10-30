import type { Metadata } from "next";
import { Suspense } from "react";

import { LegalFooter } from "../_components/legal-page";
import { SiteHeader } from "../_components/site-header";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign in — Padel Galaxio",
  description: "Sign in with your Padel Galaxio account to book a court.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <div className="relative flex flex-1 flex-col overflow-hidden bg-background text-ink">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-glow absolute -left-24 top-0 h-112 w-md rounded-full bg-[radial-gradient(circle,var(--mint-glow),transparent_65%)]" />
        </div>

        <main className="mx-auto flex w-full max-w-md flex-1 items-start px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </main>

        <LegalFooter />
      </div>
    </>
  );
}
