"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  clubSlots,
  environmentLabel,
  fetchClubs,
  fetchDayAvailability,
  formatTime,
  freeCourts,
  isValidYmd,
  slotRange,
  toYmd,
  upcomingDays,
  type Club,
  type Court,
  type Game,
  type Slot,
} from "../_lib/booking";
import { getSupabase } from "../_lib/supabase";
import { useSessionUser } from "../_lib/use-session";
import { BookingDialog } from "./booking-dialog";

const DAYS_AHEAD = 14;

export function BookingView() {
  const router = useRouter();
  const params = useSearchParams();
  const user = useSessionUser();

  const [clubs, setClubs] = useState<Club[] | null>(null);
  const [clubsError, setClubsError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [clubId, setClubId] = useState<string | null>(params.get("club"));
  const [ymd, setYmd] = useState(() => {
    const date = params.get("date");
    return isValidYmd(date) && date >= toYmd(new Date()) ? date : toYmd(new Date());
  });
  // Slot the player picked before being sent to sign in — reopened once they are back.
  const [pendingSlot, setPendingSlot] = useState<string | null>(params.get("slot"));

  const [availability, setAvailability] = useState<{ courts: Court[]; games: Game[] } | null>(null);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [dialogSlot, setDialogSlot] = useState<Slot | null>(null);
  const [redirectingSlot, setRedirectingSlot] = useState<string | null>(null);

  // Signed-out players will be sent to sign in on their first click — load that page ahead of time.
  useEffect(() => {
    if (user === null) router.prefetch("/login");
  }, [user, router]);

  useEffect(() => {
    fetchClubs()
      .then((list) => {
        setClubs(list);
        setClubId((current) => (current && list.some((c) => c.id === current) ? current : list[0]?.id ?? null));
      })
      .catch((e: unknown) => setClubsError(e instanceof Error ? e.message : "Could not load clubs."));
  }, []);

  useEffect(() => {
    if (!clubId) return;
    let cancelled = false;
    // Clearing first shows the loading state while switching club / day.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAvailability(null);
    setAvailabilityError(null);
    fetchDayAvailability(clubId, ymd)
      .then((data) => !cancelled && setAvailability(data))
      .catch((e: unknown) => {
        if (!cancelled) setAvailabilityError(e instanceof Error ? e.message : "Could not load slots.");
      });
    return () => {
      cancelled = true;
    };
  }, [clubId, ymd, reloadKey]);

  // Keep the selection in the URL so it can be shared and survives the sign-in round trip.
  useEffect(() => {
    if (!clubId) return;
    router.replace(`/book?club=${clubId}&date=${ymd}`, { scroll: false });
  }, [clubId, ymd, router]);

  const club = clubs?.find((c) => c.id === clubId) ?? null;
  const slots = useMemo(() => (club ? clubSlots(club) : []), [club]);
  const days = useMemo(() => upcomingDays(DAYS_AHEAD), []);

  const filteredClubs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!clubs || !q) return clubs ?? [];
    return clubs.filter((c) => c.name.toLowerCase().includes(q) || c.city?.toLowerCase().includes(q));
  }, [clubs, query]);

  const openSlot = useCallback(
    (slot: Slot) => {
      if (user === undefined || !clubId) return;
      if (user === null) {
        const next = `/book?club=${clubId}&date=${ymd}&slot=${slot.start}`;
        setRedirectingSlot(slot.start);
        router.push(`/login?next=${encodeURIComponent(next)}`);
        return;
      }
      setDialogSlot(slot);
    },
    [user, clubId, ymd, router],
  );

  useEffect(() => {
    if (!pendingSlot || !user || !availability) return;
    const slot = slots.find((s) => s.start === pendingSlot);
    // One-shot hand-off from the URL after sign-in.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPendingSlot(null);
    if (slot && slotRange(ymd, slot).startsAt > new Date()) setDialogSlot(slot);
  }, [pendingSlot, user, availability, slots, ymd]);

  if (clubsError) {
    return <ErrorBox message={clubsError} />;
  }

  return (
    <>
      <AccountBar user={user} />

      <div className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr] lg:items-start">
        {/* Clubs */}
        <section className="min-w-0 rounded-3xl border border-line bg-card p-4 shadow-[0_12px_40px_rgba(15,36,31,0.04)] sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-ink">Clubs</h2>
            {clubs ? <span className="text-xs font-semibold text-muted">{clubs.length} clubs</span> : null}
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or city"
            className="mt-3 w-full rounded-2xl border border-line bg-background px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-mint focus:ring-2 focus:ring-mint/20"
          />

          <div className="-mx-1 mt-4 flex snap-x gap-3 overflow-x-auto px-1 pb-1 lg:max-h-[560px] lg:flex-col lg:overflow-y-auto lg:overflow-x-visible">
            {clubs === null ? (
              Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="h-20 min-w-60 animate-pulse rounded-2xl bg-mint-soft/40 lg:min-w-0" />
              ))
            ) : filteredClubs.length === 0 ? (
              <p className="py-6 text-sm text-muted">No club matches “{query}”.</p>
            ) : (
              filteredClubs.map((c) => (
                <ClubCard key={c.id} club={c} selected={c.id === clubId} onSelect={() => setClubId(c.id)} />
              ))
            )}
          </div>
        </section>

        {/* Days + slots */}
        <section className="min-w-0 rounded-3xl border border-line bg-card p-4 shadow-[0_12px_40px_rgba(15,36,31,0.04)] sm:p-6">
          {club ? (
            <>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="truncate font-display text-xl font-bold text-ink">{club.name}</h2>
                  <p className="mt-0.5 text-sm text-muted">{clubMeta(club)}</p>
                </div>
              </div>

              <div className="-mx-1 mt-5 flex snap-x gap-2 overflow-x-auto px-1 pb-2">
                {days.map((d) => {
                  const active = d.ymd === ymd;
                  return (
                    <button
                      key={d.ymd}
                      type="button"
                      onClick={() => setYmd(d.ymd)}
                      aria-pressed={active}
                      className={`flex w-16 shrink-0 snap-start flex-col items-center rounded-2xl border px-2 py-2.5 transition ${
                        active
                          ? "border-mint bg-mint text-white shadow-[0_8px_24px_rgba(30,201,167,0.3)]"
                          : "border-line bg-background text-ink hover:border-mint/50"
                      }`}
                    >
                      <span className={`text-[11px] font-semibold uppercase ${active ? "text-white/85" : "text-muted"}`}>
                        {d.weekday}
                      </span>
                      <span className="font-display text-xl font-bold leading-tight">{d.day}</span>
                      <span className={`text-[11px] ${active ? "text-white/85" : "text-muted"}`}>{d.month}</span>
                    </button>
                  );
                })}
              </div>

              <SlotGrid
                ymd={ymd}
                slots={slots}
                availability={availability}
                error={availabilityError}
                onRetry={() => setReloadKey((k) => k + 1)}
                onPick={openSlot}
                signedIn={Boolean(user)}
                redirectingSlot={redirectingSlot}
              />
            </>
          ) : clubs === null ? (
            <div className="h-64 animate-pulse rounded-2xl bg-mint-soft/30" />
          ) : (
            <p className="py-10 text-center text-sm text-muted">No clubs available yet.</p>
          )}
        </section>
      </div>

      {dialogSlot && club && availability && user ? (
        <BookingDialog
          club={club}
          ymd={ymd}
          slot={dialogSlot}
          courts={freeCourts(...rangeArgs(ymd, dialogSlot), availability.courts, availability.games)}
          userId={user.id}
          onClose={() => setDialogSlot(null)}
          onBooked={() => setReloadKey((k) => k + 1)}
        />
      ) : null}
    </>
  );
}

function rangeArgs(ymd: string, slot: Slot): [Date, Date] {
  const { startsAt, endsAt } = slotRange(ymd, slot);
  return [startsAt, endsAt];
}

function clubMeta(club: Club) {
  const parts = [
    club.city,
    `${club.courtCount} ${club.courtCount === 1 ? "court" : "courts"}`,
    environmentLabel(club.environments),
    `Open until ${formatTime(club.lastSessionEnd)}`,
  ];
  return parts.filter(Boolean).join(" · ");
}

function ClubCard({ club, selected, onSelect }: { club: Club; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex min-w-60 shrink-0 snap-start items-center gap-3 rounded-2xl border p-3 text-left transition lg:min-w-0 ${
        selected ? "border-mint bg-mint-soft/50" : "border-line bg-background hover:border-mint/50"
      }`}
    >
      <span
        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-base font-bold ${
          selected ? "bg-mint text-white" : "bg-mint-soft text-[#0f9f84]"
        }`}
        aria-hidden
      >
        {initials(club.name)}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-semibold text-ink">{club.name}</span>
        <span className="block truncate text-xs text-muted">
          {[club.city, `${club.courtCount} ${club.courtCount === 1 ? "court" : "courts"}`, environmentLabel(club.environments)]
            .filter(Boolean)
            .join(" · ")}
        </span>
      </span>
    </button>
  );
}

function SlotGrid({
  ymd,
  slots,
  availability,
  error,
  onRetry,
  onPick,
  signedIn,
  redirectingSlot,
}: {
  ymd: string;
  slots: Slot[];
  availability: { courts: Court[]; games: Game[] } | null;
  error: string | null;
  onRetry: () => void;
  onPick: (slot: Slot) => void;
  signedIn: boolean;
  redirectingSlot: string | null;
}) {
  if (error) return <ErrorBox message={error} onRetry={onRetry} />;

  if (!availability) {
    return (
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl bg-mint-soft/30" />
        ))}
      </div>
    );
  }

  if (!availability.courts.length) {
    return <p className="mt-6 text-sm text-muted">This club has no bookable courts yet.</p>;
  }

  const now = new Date();
  const rows = slots.map((slot) => {
    const { startsAt, endsAt } = slotRange(ymd, slot);
    const past = startsAt <= now;
    const free = past ? 0 : freeCourts(startsAt, endsAt, availability.courts, availability.games).length;
    return { slot, past, free };
  });
  const anyOpen = rows.some((r) => !r.past && r.free > 0);

  return (
    <>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
        <Legend className="bg-mint" label="Available" />
        <Legend className="bg-[#f3c6a8]" label="Fully booked" />
        <Legend className="bg-line" label="Past" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {rows.map(({ slot, past, free }) => {
          const disabled = past || free === 0;
          return (
            <button
              key={slot.start}
              type="button"
              disabled={disabled}
              onClick={() => onPick(slot)}
              className={`group rounded-2xl border p-3.5 text-left transition ${
                disabled
                  ? "cursor-not-allowed border-line bg-background/60 opacity-60"
                  : "border-mint/40 bg-white hover:-translate-y-0.5 hover:border-mint hover:shadow-[0_12px_30px_rgba(30,201,167,0.18)]"
              }`}
            >
              <span className="block font-display text-base font-bold text-ink">{slot.label}</span>
              <span
                className={`mt-1 block text-xs font-semibold ${
                  past ? "text-muted" : free === 0 ? "text-[#ef7a2f]" : "text-[#0f9f84]"
                }`}
              >
                {past ? "Past" : free === 0 ? "Fully booked" : `${free} of ${availability.courts.length} courts free`}
              </span>
              {!disabled ? (
                <span className="mt-2 block text-xs font-semibold text-mint opacity-80 transition group-hover:opacity-100">
                  {redirectingSlot === slot.start
                    ? "Redirecting to sign in…"
                    : signedIn
                      ? "Book →"
                      : "Sign in to book →"}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {!anyOpen ? (
        <p className="mt-5 rounded-2xl bg-mint-soft/40 px-4 py-3 text-sm text-muted">
          No free slots left on this day — try another date.
        </p>
      ) : null}
    </>
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-full ${className}`} aria-hidden />
      {label}
    </span>
  );
}

function AccountBar({ user }: { user: ReturnType<typeof useSessionUser> }) {
  if (user === undefined) return <div className="mt-6 h-10" />;
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-white/70 px-4 py-2.5 text-sm text-muted">
      {user ? (
        <>
          <span className="min-w-0 truncate">
            Signed in as <strong className="text-ink">{user.email}</strong>
          </span>
          <button
            type="button"
            onClick={() => getSupabase().auth.signOut()}
            className="ml-auto font-semibold text-[#0f9f84] transition hover:text-ink"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <span>Browse freely — you’ll be asked to sign in when you book.</span>
          <Link href="/login?next=/book" className="ml-auto font-semibold text-[#0f9f84] transition hover:text-ink">
            Sign in
          </Link>
        </>
      )}
    </div>
  );
}

function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="mt-6 rounded-2xl border border-[#f3c6a8] bg-[#fff6f0] px-4 py-3 text-sm text-[#b4531a]">
      {message}
      {onRetry ? (
        <button type="button" onClick={onRetry} className="ml-3 font-semibold underline underline-offset-2">
          Retry
        </button>
      ) : null}
    </div>
  );
}

function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "PG"
  );
}
