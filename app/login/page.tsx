"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const topMenus = [
  {
    title: "Startseite",
    href: "/",
  },
  {
    title: "Leistungen",
    links: [
      { label: "Bäder", href: "/leistungen/baeder" },
      { label: "Heizungen", href: "/leistungen/heizungen" },
      { label: "Sanitär", href: "/leistungen/sanitaer" },
      { label: "Wassertechnik", href: "/leistungen/wassertechnik" },
    ],
  },
  {
    title: "Referenzen",
    links: [
      { label: "Badmodernisierung", href: "/referenzen/badumbau" },
      { label: "Heizungsprojekte", href: "/referenzen/heizungsprojekte" },
      { label: "Wassertechnik", href: "/referenzen/wassertechnik" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Über uns", href: "/unternehmen/ueber-uns" },
      { label: "Partner", href: "/unternehmen/partner" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
];

type Announcement = {
  id: string;
  title: string;
  message: string;
};

export default function LoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const isSupabaseConfigured = Boolean(supabase);
  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [registrationToken, setRegistrationToken] = useState("");
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModeSwitching, setIsModeSwitching] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleModeSwitch = (nextMode: "login" | "register") => {
    if (nextMode === mode || isModeSwitching) {
      return;
    }

    setIsModeSwitching(true);
    window.setTimeout(() => {
      setMode(nextMode);
      setError("");
      setMessage("");
      setIsModeSwitching(false);
    }, 150);
  };

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!supabase) {
      setError("Supabase ist nicht konfiguriert. Bitte Deployment-Umgebungsvariablen setzen.");
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
      return;
    }

    setMessage("Login erfolgreich.");
    setIsRedirecting(true);

    window.setTimeout(() => {
      router.push("/admin");
    }, 850);
  };

  const handleRegisterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isSupabaseConfigured) {
      setError("Supabase ist nicht konfiguriert. Bitte Deployment-Umgebungsvariablen setzen.");
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
        registrationToken,
        acceptedPrivacy,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setError(payload?.error ?? "Registrierung fehlgeschlagen.");
      setIsLoading(false);
      return;
    }

    setMessage("Registrierung erfolgreich. Sie können sich jetzt anmelden.");
    setMode("login");
    setRegistrationToken("");
    setAcceptedPrivacy(false);
    setIsLoading(false);
  };

  if (isRedirecting) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 px-6 py-16 text-zinc-900 md:px-10">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center">
          <section className="anim-soft-enter w-full max-w-md rounded-3xl border border-white/70 bg-white/85 p-8 text-center shadow-2xl backdrop-blur-md md:p-10">
            <Image
              src="/bachmann-logo.png"
              alt="Bachmann Haustechnik Logo"
              width={180}
              height={69}
              className="mx-auto h-auto w-[140px]"
              priority
            />
            <h1 className="anim-text-enter mt-6 text-3xl font-black tracking-tight text-zinc-900">
              Dashboard wird geladen
            </h1>
            <p className="anim-text-enter anim-delay-2 mt-3 text-sm text-zinc-600">
              Einen Moment bitte, Sie werden weitergeleitet.
            </p>

            <div className="mt-8 flex items-center justify-center">
              <span className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900" />
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-zinc-200/80">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-zinc-900" />
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 px-6 pt-0 pb-12 text-zinc-900 md:px-10">
      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "border-b border-white/70 bg-white/70 backdrop-blur-lg"
            : "border-b border-transparent bg-transparent backdrop-blur-0"
        }`}
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-6 py-3 md:px-10 lg:grid-cols-[1fr_auto_1fr]">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/bachmann-logo.png"
              alt="Bachmann Haustechnik"
              width={200}
              height={76}
              priority
              className="h-auto w-[120px] md:w-[160px]"
            />
          </Link>

          <nav className="hidden lg:flex">
            <div className="header-menu-shell">
              {topMenus.map((menu, index) => (
                <div key={menu.title} className="group relative">
                  {menu.href ? (
                    <Link
                      href={menu.href}
                      className="header-menu-trigger"
                    >
                      {menu.title}
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="header-menu-trigger"
                      >
                        {menu.title} <span className="header-menu-trigger-chevron">v</span>
                      </button>
                      <div className="header-menu-dropdown">
                        {(menu.links ?? []).map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="header-menu-dropdown-link text-sm"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                  {index < topMenus.length - 1 && (
                    <span className="header-menu-divider" />
                  )}
                </div>
              ))}
            </div>
          </nav>

          <details className="relative lg:hidden">
            <summary className="header-menu-summary">
              Menü
            </summary>
            <div className="header-menu-panel">
              {topMenus.map((menu) => (
                <div key={menu.title} className="border-b border-zinc-200 py-2 last:border-b-0">
                  {menu.href ? (
                    <Link
                      href={menu.href}
                      className="header-menu-mobile-link font-semibold"
                    >
                      {menu.title}
                    </Link>
                  ) : (
                    <>
                      <p className="px-3 py-1 text-xs font-semibold tracking-[0.12em] text-zinc-500 uppercase">
                        {menu.title}
                      </p>
                      <div className="mt-1 grid gap-1">
                        {(menu.links ?? []).map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="header-menu-mobile-link"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </details>

          <div className="flex items-center justify-end gap-2">
            <Link
              href="/kontakt"
              className="inline-flex h-9 items-center rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white transition hover:bg-zinc-700"
            >
              Angebot anfragen
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-4xl justify-center pt-36 md:pt-40">
        <section className="anim-soft-enter anim-delay-1 w-full max-w-xl rounded-3xl border border-white/70 bg-white/85 p-8 shadow-2xl backdrop-blur-md md:p-10">
          <div className="flex items-center justify-between gap-4">
            <p className="leistungen-badge-animated text-xs font-semibold tracking-[0.2em] uppercase">Login</p>
            <Image
              src="/bachmann-logo.png"
              alt="Bachmann Haustechnik Logo"
              width={160}
              height={61}
              className="h-auto w-[110px] md:w-[130px]"
            />
          </div>

          <div className="mt-5 inline-flex rounded-lg border border-zinc-200 bg-white p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleModeSwitch("login")}
              className={`rounded-md px-3 py-1.5 transition ${
                mode === "login" ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch("register")}
              className={`rounded-md px-3 py-1.5 transition ${
                mode === "register" ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              Registrieren
            </button>
          </div>

          <div
            key={mode}
            className={`auth-mode-enter ${isModeSwitching ? "auth-mode-exit" : ""} mt-4`}
          >
            <h1 className="anim-text-enter anim-delay-2 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
              {mode === "login" ? "Willkommen zurück" : "Konto registrieren"}
            </h1>
            <p className="anim-text-enter anim-delay-3 mt-3 text-sm leading-relaxed text-zinc-600">
              {mode === "login"
                ? "Mit E-Mail und Passwort anmelden."
                : "Registrierung nur mit gültigem Anmelde-Token vom Administrator."}
            </p>

            <form
              className="anim-soft-enter anim-delay-4 mt-8 space-y-5"
              onSubmit={mode === "login" ? handleLoginSubmit : handleRegisterSubmit}
            >
            {mode === "register" && (
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-semibold text-zinc-800">
                  Vollständiger Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-blue-400"
                  placeholder="Max Mustermann"
                />
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-zinc-800">
                E-Mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-blue-400"
                placeholder="name@beispiel.de"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-zinc-800">
                Passwort {mode === "register" ? "(mindestens 12 Zeichen)" : ""}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-blue-400"
                placeholder="Ihr Passwort"
              />
            </div>

            {mode === "register" && (
              <>
                <div className="space-y-2">
                  <label htmlFor="registrationToken" className="text-sm font-semibold text-zinc-800">
                    Anmelde-Token
                  </label>
                  <input
                    id="registrationToken"
                    name="registrationToken"
                    type="text"
                    required
                    value={registrationToken}
                    onChange={(event) => setRegistrationToken(event.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-blue-400"
                    placeholder="Vom Administrator erhalten"
                  />
                </div>

                <label className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    checked={acceptedPrivacy}
                    onChange={(event) => setAcceptedPrivacy(event.target.checked)}
                    className="mt-0.5"
                  />
                  <span>
                    Ich stimme der Verarbeitung meiner Daten gemäß
                    <Link href="/datenschutz" className="mx-1 font-semibold text-blue-700 hover:underline">
                      Datenschutzerklärung
                    </Link>
                    und dem
                    <Link href="/impressum" className="ml-1 font-semibold text-blue-700 hover:underline">
                      Impressum
                    </Link>
                    {" "}
                    zu.
                  </span>
                </label>
              </>
            )}

              <button
                type="submit"
                disabled={isLoading || !isSupabaseConfigured}
                className="inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Bitte warten..." : mode === "login" ? "Anmelden" : "Registrieren"}
              </button>
            </form>
          </div>

          {!isSupabaseConfigured && (
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              Supabase-Keys fehlen. Setze NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in den Deployment-Variablen.
            </p>
          )}

          {error && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          {message && (
            <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {message}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}


