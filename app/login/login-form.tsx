"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { getSupabase, safeNextPath } from "../_lib/supabase";

/** Roles that belong to the clubs / admin portals — same rule as the mobile players app. */
const BLOCKED_ROLES = ["club", "admin"];

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNextPath(params.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const supabase = getSupabase();
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) throw signInError;

      const { data: roleRow } = await supabase
        .from("roles")
        .select("role")
        .eq("user_id", data.user.id)
        .maybeSingle();
      if (roleRow && BLOCKED_ROLES.includes(roleRow.role)) {
        // Same UX as wrong credentials — don't reveal portal eligibility.
        await supabase.auth.signOut();
        throw new Error("Invalid login credentials");
      }

      router.replace(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <section className="w-full rounded-3xl border border-line bg-card p-6 shadow-[0_12px_40px_rgba(15,36,31,0.06)] sm:p-10">
      <Image src="/main-app-logo.png" alt="Padel Galaxio" width={56} height={56} className="mx-auto h-14 w-14 object-contain" />
      <h1 className="mt-5 text-center font-display text-2xl font-bold tracking-tight text-ink">Sign in to book</h1>
      <p className="mt-2 text-center text-sm leading-6 text-muted">
        Use the same email and password as in the Padel Galaxio app.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-ink">Email</span>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm text-ink outline-none transition focus:border-mint focus:ring-2 focus:ring-mint/20"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm text-ink outline-none transition focus:border-mint focus:ring-2 focus:ring-mint/20"
          />
        </label>

        {error ? (
          <p role="alert" className="rounded-2xl bg-[#fff6f0] px-4 py-3 text-sm text-[#b4531a]">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-mint px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(30,201,167,0.35)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        No account yet?{" "}
        <Link href="/#download" className="font-semibold text-[#0f9f84] underline underline-offset-2">
          Get the app
        </Link>{" "}
        to sign up.
      </p>
      <p className="mt-2 text-center text-sm">
        <Link href={next} className="text-muted transition hover:text-ink">
          ← Back to booking
        </Link>
      </p>
    </section>
  );
}
