"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ConsentChoice = "all" | "necessary";

const CONSENT_COOKIE_NAME = "cookie_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const cookieEntry = document.cookie
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${name}=`));

  if (!cookieEntry) {
    return null;
  }

  return decodeURIComponent(cookieEntry.slice(name.length + 1));
}

function setConsentCookie(value: ConsentChoice) {
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax`;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const existingConsent = getCookieValue(CONSENT_COOKIE_NAME);
    setIsVisible(!existingConsent);
  }, []);

  const handleConsent = (choice: ConsentChoice) => {
    setConsentCookie(choice);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      id="cookie-banner"
      role="dialog"
      aria-label="Cookie-Banner"
      aria-live="polite"
      className="fixed right-4 bottom-4 left-4 z-[120] mx-auto w-auto max-w-2xl rounded-2xl border border-zinc-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md md:p-5"
      data-testid="cookie-banner"
      data-cookiebanner="true"
    >
      <p className="text-xs font-semibold tracking-[0.14em] text-zinc-500 uppercase">Cookies</p>
      <h2 className="mt-1 text-base font-black tracking-tight text-zinc-900">Cookie-Einstellungen</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-700">
        Wir verwenden technisch notwendige Cookies für den sicheren Betrieb der Website sowie optionale Präferenz-Cookies
        (z. B. Darstellungseinstellungen). Details finden Sie in unserer{" "}
        <Link href="/datenschutz" className="font-semibold text-blue-700 hover:underline">
          Datenschutzerklärung
        </Link>
        .
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleConsent("necessary")}
          className="inline-flex items-center rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-zinc-800 transition hover:border-blue-200"
          data-cookie-action="necessary"
        >
          Nur notwendige Cookies
        </button>
        <button
          type="button"
          onClick={() => handleConsent("all")}
          className="inline-flex items-center rounded-lg bg-zinc-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-zinc-700"
          data-cookie-action="accept-all"
        >
          Alle Cookies akzeptieren
        </button>
      </div>
    </aside>
  );
}
