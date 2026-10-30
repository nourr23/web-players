"use client";

import { useEffect, useState } from "react";

import { createBooking, slotRange, type Club, type Court, type GenderCategory, type Slot } from "../_lib/booking";

const LEVELS = [1, 2, 3, 4, 5, 6, 7];
const GENDERS: { value: GenderCategory; label: string }[] = [
  { value: "mixed", label: "Mixed" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
];

type BookingDialogProps = {
  club: Club;
  ymd: string;
  slot: Slot;
  /** Courts still free for this slot. */
  courts: Court[];
  userId: string;
  onClose: () => void;
  onBooked: () => void;
};

/** Confirm step: pick a court and the game details, then create the `games` row. */
export function BookingDialog({ club, ymd, slot, courts, userId, onClose, onBooked }: BookingDialogProps) {
  const [courtId, setCourtId] = useState(courts[0]?.id ?? "");
  const [gender, setGender] = useState<GenderCategory>("mixed");
  const [levelMin, setLevelMin] = useState(1);
  const [levelMax, setLevelMax] = useState(7);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !submitting && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, submitting]);

  const { startsAt, endsAt } = slotRange(ymd, slot);
  const dateLabel = startsAt.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
  const court = courts.find((c) => c.id === courtId);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!courtId) return;
    if (levelMin > levelMax) {
      setError("Level min cannot be greater than level max.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await createBooking({
        userId,
        courtId,
        startsAt,
        endsAt,
        levelMin,
        levelMax,
        genderCategory: gender,
        notes: notes.trim() || null,
      });
      setDone(true);
      onBooked();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={() => !submitting && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-line bg-card p-6 shadow-[0_30px_80px_rgba(15,36,31,0.2)] sm:rounded-3xl sm:p-8"
      >
        {done ? (
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint-soft text-mint">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
                <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 id="booking-title" className="mt-5 font-display text-2xl font-bold text-ink">
              Court booked 🎾
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              {court?.name} at {club.name}
              <br />
              {dateLabel}, {slot.label}
            </p>
            <p className="mt-4 text-sm leading-6 text-muted">
              Your game is open — invite players and chat with them in the Padel Galaxio app.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-mint px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(30,201,167,0.35)] transition hover:brightness-105"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-mint">Confirm booking</p>
                <h2 id="booking-title" className="mt-2 font-display text-2xl font-bold text-ink">
                  {club.name}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {dateLabel} · {slot.label}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 text-muted transition hover:bg-mint-soft/60 hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {courts.length === 0 ? (
              <p className="mt-6 rounded-2xl bg-[#fff6f0] px-4 py-3 text-sm text-[#b4531a]">
                All courts were just taken for this slot. Please pick another one.
              </p>
            ) : (
              <>
                <fieldset className="mt-6">
                  <legend className="text-sm font-semibold text-ink">Court</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {courts.map((c) => (
                      <label
                        key={c.id}
                        className={`cursor-pointer rounded-2xl border px-3 py-2.5 text-sm transition ${
                          c.id === courtId ? "border-mint bg-mint-soft/50" : "border-line hover:border-mint/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="court"
                          value={c.id}
                          checked={c.id === courtId}
                          onChange={() => setCourtId(c.id)}
                          className="sr-only"
                        />
                        <span className="block font-semibold text-ink">{c.name}</span>
                        {c.environment ? (
                          <span className="block text-xs capitalize text-muted">{c.environment}</span>
                        ) : null}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="mt-5">
                  <legend className="text-sm font-semibold text-ink">Category</legend>
                  <div className="mt-2 flex gap-2">
                    {GENDERS.map((g) => (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => setGender(g.value)}
                        aria-pressed={gender === g.value}
                        className={`flex-1 rounded-full border px-3 py-2 text-sm font-semibold transition ${
                          gender === g.value ? "border-mint bg-mint text-white" : "border-line text-ink hover:border-mint/50"
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <LevelSelect label="Level min" value={levelMin} onChange={setLevelMin} />
                  <LevelSelect label="Level max" value={levelMax} onChange={setLevelMax} />
                </div>

                <label className="mt-5 block">
                  <span className="text-sm font-semibold text-ink">
                    Notes <span className="font-normal text-muted">(optional)</span>
                  </span>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    maxLength={300}
                    rows={3}
                    placeholder="e.g. Friendly game, bring balls"
                    className="mt-2 w-full resize-none rounded-2xl border border-line bg-background px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-mint focus:ring-2 focus:ring-mint/20"
                  />
                </label>
              </>
            )}

            {error ? (
              <p role="alert" className="mt-4 rounded-2xl bg-[#fff6f0] px-4 py-3 text-sm text-[#b4531a]">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting || !courtId}
              className="mt-6 w-full rounded-full bg-mint px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(30,201,167,0.35)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Booking…" : "Confirm booking"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function LevelSelect({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full rounded-2xl border border-line bg-background px-4 py-2.5 text-sm text-ink outline-none focus:border-mint focus:ring-2 focus:ring-mint/20"
      >
        {LEVELS.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}
