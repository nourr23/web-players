"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Status = "pending" | "success" | "error" | "neutral";
type Lang = "en" | "fr" | "es";

const COPY = {
  en: {
    successTitle: "Your email is confirmed 🎾",
    successBody:
      "Welcome to Padel Galaxio! Your account is ready. Open the app and sign in to finish setting up your profile.",
    errorTitle: "This link can't be used",
    errorBody:
      "This link has expired or was already used. If you already confirmed, just sign in in the app. Otherwise, sign up again to get a new email.",
    neutralTitle: "Welcome to Padel Galaxio",
    neutralBody: "Book courts, find partners and track your matches. Open the app to get started.",
  },
  fr: {
    successTitle: "Votre e-mail est confirmé 🎾",
    successBody:
      "Bienvenue sur Padel Galaxio ! Votre compte est prêt. Ouvrez l'application et connectez-vous pour terminer la configuration de votre profil.",
    errorTitle: "Ce lien n'est plus valide",
    errorBody:
      "Ce lien a expiré ou a déjà été utilisé. Si vous avez déjà confirmé, connectez-vous simplement dans l'application. Sinon, inscrivez-vous à nouveau pour recevoir un nouvel e-mail.",
    neutralTitle: "Bienvenue sur Padel Galaxio",
    neutralBody:
      "Réservez des terrains, trouvez des partenaires et suivez vos matchs. Ouvrez l'application pour commencer.",
  },
  es: {
    successTitle: "Tu correo está confirmado 🎾",
    successBody:
      "¡Bienvenido a Padel Galaxio! Tu cuenta está lista. Abre la app e inicia sesión para terminar de configurar tu perfil.",
    errorTitle: "Este enlace no es válido",
    errorBody:
      "Este enlace ha caducado o ya se ha utilizado. Si ya confirmaste, simplemente inicia sesión en la app. Si no, regístrate de nuevo para recibir un correo nuevo.",
    neutralTitle: "Bienvenido a Padel Galaxio",
    neutralBody:
      "Reserva pistas, encuentra compañeros y sigue tus partidos. Abre la app para empezar.",
  },
} satisfies Record<Lang, Record<string, string>>;

function detectLang(): Lang {
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().split("-")[0];
    if (base === "en" || base === "fr" || base === "es") return base;
  }
  return "en";
}

/**
 * Reads the Supabase redirect params (hash for implicit flow / errors, query for PKCE / errors).
 * Tokens and codes are only checked for presence — never used, stored or logged.
 */
function readStatus(): Status {
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const query = new URLSearchParams(window.location.search);
  const has = (key: string) => hash.has(key) || query.has(key);

  if (has("error") || has("error_code") || has("error_description")) return "error";
  if (has("access_token") || has("code")) return "success";
  return "neutral";
}

export function WelcomeCard() {
  const [status, setStatus] = useState<Status>("pending");
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const detected = detectLang();
    const result = readStatus();
    // Strip tokens / codes / errors so they don't stay in the address bar or history.
    if (window.location.hash || window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    // URL and navigator are browser-only, so this has to run after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLang(detected);
    setStatus(result);
    document.documentElement.lang = detected;
  }, []);

  const t = COPY[lang];
  const title =
    status === "success" ? t.successTitle : status === "error" ? t.errorTitle : t.neutralTitle;
  const body =
    status === "success" ? t.successBody : status === "error" ? t.errorBody : t.neutralBody;

  return (
    <section
      aria-live="polite"
      className={`w-full rounded-3xl border border-line bg-card p-6 text-center shadow-[0_12px_40px_rgba(15,36,31,0.06)] transition-opacity duration-300 sm:p-10 ${
        status === "pending" ? "opacity-0" : "opacity-100"
      }`}
    >
      <StatusIcon status={status} />

      <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {title}
      </h1>
      <p className="mx-auto mt-3 max-w-md text-base leading-7 text-muted">{body}</p>
    </section>
  );
}

function StatusIcon({ status }: { status: Status }) {
  if (status === "success") {
    return (
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-mint-soft text-mint shadow-[0_10px_30px_rgba(30,201,167,0.25)]">
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" aria-hidden>
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#fff1e8] text-[#ef7a2f]">
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  return (
    <Image
      src="/main-app-logo.png"
      alt="Padel Galaxio"
      width={80}
      height={80}
      className="mx-auto h-20 w-20 object-contain"
    />
  );
}
