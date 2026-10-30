"use client";

import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { getSupabase } from "./supabase";

/** Current signed-in user; `undefined` while the session is still loading. */
export function useSessionUser() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return user;
}
