import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/book", label: "Book a court" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/delete-account", label: "Delete account" },
];

/** Site-wide header: logo + legal links + download CTA (links wrap to their own row on phones). */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/main-app-logo.png"
            alt="Padel Galaxio"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            Padel Galaxio
          </span>
        </Link>

        <Link
          href="/#download"
          className="inline-flex items-center rounded-full bg-mint px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(30,201,167,0.3)] transition hover:brightness-105 md:order-last"
        >
          Download
        </Link>

        <nav className="-mx-1 flex w-full gap-1 overflow-x-auto text-sm font-semibold text-muted md:ml-auto md:w-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full px-3 py-1.5 transition hover:bg-mint-soft/60 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
