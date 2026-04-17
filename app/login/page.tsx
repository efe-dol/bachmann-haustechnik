"use client";

import { FormEvent, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const supabase = useMemo(() => createClient(), []);
  const isSupabaseConfigured = Boolean(supabase);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
    setIsLoading(false);
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-amber-100 to-rose-100 px-4 py-8">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-rose-300/60 blur-3xl" />
        <div className="absolute -right-20 bottom-4 h-64 w-64 rounded-full bg-orange-300/70 blur-3xl" />
      </div>

      <section className="relative z-10 w-full max-w-md rounded-3xl border border-white/50 bg-white/80 p-8 shadow-2xl backdrop-blur-md sm:p-10">
        <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-rose-700 uppercase">
          Bachmann Haustechnik
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Welcome back
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          Mit E-Mail und Passwort anmelden.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-700">
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
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-700"
            >
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              placeholder="Dein Passwort"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !isSupabaseConfigured}
            className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Anmelden..." : "Anmelden"}
          </button>
        </form>

        {!isSupabaseConfigured && (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Supabase-Keys fehlen. Setze NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in den Deployment-Variablen.
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {message && (
          <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {message}
          </p>
        )}
      </section>
    </main>
  );
}
