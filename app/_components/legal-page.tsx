import Link from "next/link";

import { LEGAL_LAST_UPDATED } from "../_lib/site";
import { SiteHeader } from "./site-header";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
};

/** Shared shell for Privacy, Terms and Delete account: logo header, content card, footer. */
export function LegalPage({ eyebrow, title, intro, children }: LegalPageProps) {
  return (
    <>
      <SiteHeader />
      <div className="relative min-h-full overflow-hidden bg-background text-ink">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-0 h-112 w-md rounded-full bg-[radial-gradient(circle,var(--mint-glow),transparent_65%)]" />
        </div>

        <main className="mx-auto max-w-3xl px-6 pb-20 pt-12 md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-mint">{eyebrow}</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted">Last updated: {LEGAL_LAST_UPDATED}</p>
          {intro ? <p className="mt-6 text-base leading-7 text-muted">{intro}</p> : null}

          <div className="legal-content mt-10 rounded-3xl border border-line bg-card p-6 shadow-[0_12px_40px_rgba(15,36,31,0.04)] sm:p-10">
            {children}
          </div>
        </main>

        <LegalFooter />
      </div>
    </>
  );
}

export function LegalFooter() {
  return (
    <footer className="border-t border-line bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <p>© {new Date().getFullYear()} Padel Galaxio. All rights reserved.</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacy" className="transition hover:text-ink">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition hover:text-ink">
            Terms of Service
          </Link>
          <Link href="/delete-account" className="transition hover:text-ink">
            Delete account
          </Link>
        </nav>
      </div>
    </footer>
  );
}
