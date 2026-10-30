import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "./_components/site-header";

const APP_STORE_URL = "#";
const GOOGLE_PLAY_URL = "#";

const features = [
  {
    title: "Real-Time Booking",
    description: "Reserve courts instantly with live availability across clubs near you.",
    accent: "bg-[#e8faf5] text-[#0f9f84]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Matchmaking & Players",
    description: "Find partners at your level and build your local padel network.",
    accent: "bg-[#eef0ff] text-[#5b6cff]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.5" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M4.5 18.5c.8-2.6 2.8-4 4.5-4s3.7 1.4 4.5 4M13.5 17.8c.5-1.5 1.7-2.5 3-2.5 1.1 0 2.1.7 2.7 1.8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Tournaments & Leagues",
    description: "Join competitive brackets, climb rankings, and track your season.",
    accent: "bg-[#fff1e8] text-[#ef7a2f]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path
          d="M8 5h8v3.5a4 4 0 0 1-8 0V5Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="M8 6.5H5.5A2.5 2.5 0 0 0 8 9M16 6.5h2.5A2.5 2.5 0 0 1 16 9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 12.5V16M9.5 19h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Live Match Stats",
    description: "Follow scores, streaks, and performance insights after every game.",
    accent: "bg-[#e9f9ee] text-[#1f9d57]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path d="M5 18V11M10 18V7M15 18v-5M20 18V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

const steps = [
  {
    number: "01",
    title: "Download the App",
    description: "Get Padel Galaxio on iOS or Android in seconds.",
  },
  {
    number: "02",
    title: "Book & Invite",
    description: "Pick a court, choose a time, and invite your partners.",
  },
  {
    number: "03",
    title: "Play & Rank Up",
    description: "Compete, track results, and rise through the ranks.",
  },
];

function StoreButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={APP_STORE_URL}
        className="inline-flex items-center gap-2.5 rounded-full bg-mint px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(30,201,167,0.35)] transition hover:-translate-y-0.5 hover:brightness-105"
      >
        <AppleIcon />
        App Store
      </a>
      <a
        href={GOOGLE_PLAY_URL}
        className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-mint-soft/60"
      >
        <PlayIcon />
        Google Play
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <div className="relative overflow-hidden bg-background text-ink">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-glow absolute -left-24 top-0 h-112 w-md rounded-full bg-[radial-gradient(circle,var(--mint-glow),transparent_65%)]" />
          <div className="animate-glow absolute -right-32 top-40 h-128 w-lg rounded-full bg-[radial-gradient(circle,rgba(30,201,167,0.16),transparent_68%)]" />
          <div className="absolute bottom-40 left-1/3 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(30,201,167,0.12),transparent_70%)]" />
        </div>

        <main>
          {/* Hero */}
          <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-16 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-10 md:px-8 md:pb-28 md:pt-24">
            <div>
              <div className="animate-rise mb-8 flex items-center gap-3">
                <Image
                  src="/main-app-logo.png"
                  alt="Padel Galaxio"
                  width={56}
                  height={56}
                  className="h-14 w-14 object-contain"
                  priority
                />
                <div>
                  <p className="font-display text-lg font-bold tracking-tight text-ink">
                    Padel Galaxio
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">
                    Official Mobile App
                  </p>
                </div>
              </div>

              <h1 className="animate-rise-delay-1 font-display max-w-xl text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-[3.4rem]">
                Download Padel Galaxio & Play Anytime.
              </h1>

              <p className="animate-rise-delay-1 mt-5 max-w-lg text-base leading-7 text-muted sm:text-lg">
                Instant court bookings, connect with players, and track your
                statistics — all in one sleek mobile experience.
              </p>

              <div id="download" className="animate-rise-delay-2 mt-8 scroll-mt-28">
                <StoreButtons />
              </div>

              <Link
                href="/book"
                className="animate-rise-delay-2 mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0f9f84] transition hover:text-ink"
              >
                Or book a court on the web →
              </Link>

              <div className="animate-rise-delay-2 mt-8 flex flex-wrap items-center gap-6 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-mint-soft text-mint">
                    ★
                  </span>
                  <div>
                    <p className="font-semibold text-ink">4.9</p>
                    <p>App Rating</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-line" />
                <div>
                  <p className="font-semibold text-ink">100k+</p>
                  <p>Downloads</p>
                </div>
              </div>
            </div>

            <div className="animate-rise-delay-2 relative flex justify-center md:justify-end">
              <div className="absolute inset-8 rounded-4xl bg-[radial-gradient(circle,rgba(30,201,167,0.28),transparent_70%)] blur-2xl" />
              <div className="animate-float relative w-full max-w-sm rounded-[1.75rem] border border-white/70 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,36,31,0.12)] backdrop-blur">
                <div className="mx-auto flex aspect-square w-full max-w-60 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#f4fffb_0%,#e8faf5_100%)] p-5">
                  <QrPlaceholder />
                </div>
                <p className="mt-6 text-center font-display text-lg font-semibold text-ink">
                  Scan to Download
                </p>
                <p className="mt-1 text-center text-sm text-muted">
                  Open your camera and jump straight to the store.
                </p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
            <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-mint">
              Built for Performance
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Everything you need to play better padel
            </h2>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-line bg-card p-6 shadow-[0_12px_40px_rgba(15,36,31,0.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,36,31,0.08)]"
                >
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${feature.accent}`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Steps */}
          <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
            <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-mint">
              Simple 3-Step Flow
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              From download to match day
            </h2>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-3xl border border-line bg-card p-7 shadow-[0_12px_40px_rgba(15,36,31,0.04)]"
                >
                  <p className="font-display text-4xl font-bold text-mint/80">
                    {step.number}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="mx-auto max-w-6xl px-6 pb-20 md:px-8">
            <div className="relative overflow-hidden rounded-4xl border border-line bg-white px-8 py-12 text-center shadow-[0_20px_60px_rgba(15,36,31,0.06)] md:px-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,201,167,0.18),transparent_55%)]" />
              <span className="relative inline-flex rounded-full bg-mint-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-mint">
                Start Playing Today
              </span>
              <h2 className="relative mx-auto mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Ready to Elevate Your Padel Experience?
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-muted">
                Join players booking courts, finding partners, and climbing the
                ranks with Padel Galaxio.
              </p>
              <div className="relative mt-8 flex justify-center">
                <StoreButtons />
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-line bg-white/70">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-start md:justify-between md:px-8">
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <Image
                  src="/main-app-logo.png"
                  alt="Padel Galaxio"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <p className="font-display text-lg font-bold text-ink">
                  Padel Galaxio
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">
                The ultimate padel player experience and court booking platform.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              <a href={APP_STORE_URL} className="transition hover:text-ink">
                App Store
              </a>
              <a href={GOOGLE_PLAY_URL} className="transition hover:text-ink">
                Google Play
              </a>
              <Link href="/privacy" className="transition hover:text-ink">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition hover:text-ink">
                Terms of Service
              </Link>
              <Link href="/delete-account" className="transition hover:text-ink">
                Delete account
              </Link>
              <Link href="/support" className="transition hover:text-ink">
                Support
              </Link>
            </div>
          </div>
          <div className="border-t border-line">
            <p className="mx-auto max-w-6xl px-6 py-5 text-sm text-muted md:px-8">
              © {new Date().getFullYear()} Padel Galaxio. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M16.7 12.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.2 1.1-2.3 1.1-2.4-.1 0-2.2-.8-2.2-3.7ZM14.4 6.5c.6-.7 1-1.7.9-2.7-0.9.1-1.9.6-2.5 1.3-.6.6-1.1 1.6-1 2.6 1 .1 1.9-.5 2.6-1.2Z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M4.5 3.8c-.3.2-.5.6-.5 1.1v14.2c0 .5.2.9.5 1.1l8.8-8.2L4.5 3.8Zm1.5 15.6 7.1-4.1-1.8-1.7-5.3 5.8Zm7.7-7.1 1.9-1.1-1.9-1.1-1.7 1.6 1.7 1.6Zm-.6-5.6L5.9 4.6l5.4 5.1 1.8-1.6Zm2.5 1.4 2.5 1.4c.9.5.9 1.4 0 1.9l-2.5 1.4-2.1-2 2.1-1.9Z" />
    </svg>
  );
}

function QrPlaceholder() {
  const cells = [
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
  ];

  return (
    <div
      className="grid aspect-square w-full gap-0.5 rounded-lg bg-white p-2"
      style={{ gridTemplateColumns: `repeat(${cells[0].length}, minmax(0, 1fr))` }}
      aria-hidden
    >
      {cells.flatMap((row, y) =>
        row.map((cell, x) => (
          <span
            key={`${y}-${x}`}
            className={cell ? "rounded-[1px] bg-ink" : "bg-transparent"}
          />
        )),
      )}
    </div>
  );
}
