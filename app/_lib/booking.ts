import { getSupabase } from "./supabase";

/**
 * Court booking — mirrors the mobile app (`players-coachs-app/src/features/book-game`).
 * A booking is a `games` row with status "open"; the DB exclusion constraint prevents double booking.
 */

/** Must match DB exclusion predicate: open, full, completed block the court. */
export const BLOCKING_GAME_STATUSES = ["open", "full", "completed"] as const;

export const MAX_OPEN_HOSTED_GAMES = 4;

const DEFAULT_SLOT_DURATION_MIN = 90;
const DEFAULT_FIRST_SLOT = "09:00";
const DEFAULT_LAST_END = "21:00";

export type Environment = "indoor" | "outdoor";

export type Club = {
  id: string;
  name: string;
  city: string | null;
  slotDurationMinutes: number | null;
  firstSlotStart: string | null;
  lastSessionEnd: string | null;
  courtCount: number;
  environments: Environment[];
};

export type Court = {
  id: string;
  name: string;
  environment: Environment | null;
};

export type Game = {
  court_id: string;
  starts_at: string;
  ends_at: string;
  status: string;
};

export type Slot = { label: string; start: string; end: string };

export type GenderCategory = "mixed" | "men" | "women";

function parseEnvironment(value: string | null | undefined): Environment | null {
  return value === "indoor" || value === "outdoor" ? value : null;
}

export async function fetchClubs(): Promise<Club[]> {
  const supabase = getSupabase();
  const { data: clubRows, error } = await supabase
    .from("clubs")
    .select("id, name, city, slot_duration_minutes, first_slot_start, last_session_end")
    .order("name", { ascending: true });
  if (error) throw error;

  const rows = (clubRows ?? []) as {
    id: string;
    name: string;
    city: string | null;
    slot_duration_minutes: number | null;
    first_slot_start: string | null;
    last_session_end: string | null;
  }[];
  if (!rows.length) return [];

  const courtCount: Record<string, number> = {};
  const envs: Record<string, Set<Environment>> = {};
  const { data: courtRows } = await supabase
    .from("courts")
    .select("club_id, environment")
    .in(
      "club_id",
      rows.map((r) => r.id),
    )
    .eq("is_active", true);
  for (const row of (courtRows ?? []) as { club_id: string; environment: string | null }[]) {
    courtCount[row.club_id] = (courtCount[row.club_id] ?? 0) + 1;
    const env = parseEnvironment(row.environment);
    if (env) (envs[row.club_id] ??= new Set()).add(env);
  }

  return rows.map((c) => ({
    id: c.id,
    name: c.name,
    city: c.city,
    slotDurationMinutes: c.slot_duration_minutes,
    firstSlotStart: c.first_slot_start,
    lastSessionEnd: c.last_session_end,
    courtCount: courtCount[c.id] ?? 0,
    environments: [...(envs[c.id] ?? [])],
  }));
}

/** Active courts of a club and the blocking games on the given local day. */
export async function fetchDayAvailability(clubId: string, ymd: string) {
  const supabase = getSupabase();
  const { data: courtRows, error } = await supabase
    .from("courts")
    .select("id, name, sort_order, environment")
    .eq("club_id", clubId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });
  if (error) throw error;

  const courts: Court[] = ((courtRows ?? []) as { id: string; name: string; environment: string | null }[]).map(
    (c) => ({ id: c.id, name: c.name, environment: parseEnvironment(c.environment) }),
  );
  if (!courts.length) return { courts, games: [] as Game[] };

  const dayStart = new Date(`${ymd}T00:00:00`);
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + 1);

  const { data: gameRows, error: gErr } = await supabase
    .from("games")
    .select("court_id, starts_at, ends_at, status")
    .in(
      "court_id",
      courts.map((c) => c.id),
    )
    .in("status", [...BLOCKING_GAME_STATUSES])
    .gt("ends_at", dayStart.toISOString())
    .lt("starts_at", dayEnd.toISOString());
  if (gErr) throw gErr;

  return { courts, games: (gameRows ?? []) as Game[] };
}

export async function createBooking(args: {
  userId: string;
  courtId: string;
  startsAt: Date;
  endsAt: Date;
  levelMin: number;
  levelMax: number;
  genderCategory: GenderCategory;
  notes: string | null;
}) {
  const supabase = getSupabase();

  const { count, error: countError } = await supabase
    .from("games")
    .select("id", { count: "exact", head: true })
    .eq("created_by_user_id", args.userId)
    .gt("starts_at", new Date().toISOString())
    .eq("status", "open");
  if (countError) throw countError;
  if ((count ?? 0) >= MAX_OPEN_HOSTED_GAMES) {
    throw new Error(`You can only have ${MAX_OPEN_HOSTED_GAMES} open games at a time.`);
  }

  const { error } = await supabase.from("games").insert({
    created_by_user_id: args.userId,
    court_id: args.courtId,
    starts_at: args.startsAt.toISOString(),
    ends_at: args.endsAt.toISOString(),
    level_min: args.levelMin,
    level_max: args.levelMax,
    gender_category: args.genderCategory,
    notes: args.notes,
    status: "open",
  });
  if (error) {
    // 23P01 = exclusion violation: someone booked the court in the meantime.
    if (error.code === "23P01") throw new Error("This court was just booked by someone else. Pick another one.");
    throw new Error(error.message);
  }
  // +1 club booking point is awarded by the games insert trigger (club_booking_points.sql).
}

// ── Date & slot helpers (local time, like the mobile app) ──────────────────

export function pad2(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

export function toYmd(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function isValidYmd(ymd: string | null | undefined): ymd is string {
  if (!ymd || !/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return false;
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

/** Today + the next `count - 1` days. */
export function upcomingDays(count: number, now: Date = new Date()) {
  const out: { ymd: string; weekday: string; day: number; month: string }[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    out.push({
      ymd: toYmd(d),
      weekday: d.toLocaleDateString(undefined, { weekday: "short" }),
      day: d.getDate(),
      month: d.toLocaleDateString(undefined, { month: "short" }),
    });
  }
  return out;
}

function parseTime(t: string | null | undefined, fallback: string): number {
  const [h, m] = (t?.trim() || fallback).split(":").map((p) => parseInt(p, 10));
  return Number.isFinite(h) && Number.isFinite(m) ? h * 60 + m : parseTime(fallback, "00:00");
}

export function formatTime(t: string | null | undefined, fallback = DEFAULT_LAST_END) {
  const minutes = parseTime(t, fallback);
  return `${pad2(Math.floor(minutes / 60))}:${pad2(minutes % 60)}`;
}

export function clubSlots(club: Club): Slot[] {
  const duration = club.slotDurationMinutes || DEFAULT_SLOT_DURATION_MIN;
  const first = parseTime(club.firstSlotStart, DEFAULT_FIRST_SLOT);
  const lastEnd = parseTime(club.lastSessionEnd, DEFAULT_LAST_END);
  const slots: Slot[] = [];
  for (let start = first; start + duration <= lastEnd; start += duration) {
    const end = start + duration;
    const s = `${pad2(Math.floor(start / 60))}:${pad2(start % 60)}`;
    const e = `${pad2(Math.floor(end / 60))}:${pad2(end % 60)}`;
    slots.push({ label: `${s} – ${e}`, start: s, end: e });
  }
  return slots;
}

export function slotRange(ymd: string, slot: Slot) {
  return { startsAt: new Date(`${ymd}T${slot.start}:00`), endsAt: new Date(`${ymd}T${slot.end}:00`) };
}

/** Courts with no blocking game overlapping the range. */
export function freeCourts(startsAt: Date, endsAt: Date, courts: Court[], games: Game[]): Court[] {
  return courts.filter(
    (court) =>
      !games.some(
        (g) =>
          g.court_id === court.id &&
          BLOCKING_GAME_STATUSES.includes(g.status as (typeof BLOCKING_GAME_STATUSES)[number]) &&
          new Date(g.starts_at) < endsAt &&
          startsAt < new Date(g.ends_at),
      ),
  );
}

export function environmentLabel(envs: Environment[]) {
  if (envs.includes("indoor") && envs.includes("outdoor")) return "Indoor & Outdoor";
  if (envs.includes("indoor")) return "Indoor";
  if (envs.includes("outdoor")) return "Outdoor";
  return null;
}
