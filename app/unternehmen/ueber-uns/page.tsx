"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const focusPoints = [
  {
    title: "Erneuerbare Energien",
    text: "Wärmepumpen, Solaranlagen, etc.",
  },
  {
    title: "Heizungstechnik",
    text: "Installation, Wartung, Modernisierung",
  },
  {
    title: "Badgestaltung und -planung",
    text: "Individuelle Lösungen für Ihr Traumbad",
  },
  {
    title: "Entkalkung",
    text: "Schutz Ihrer Anlagen und Verbesserung der Wasserqualität",
  },
  {
    title: "Kundendienst und Störungsbeseitigung",
    text: "Schnelle und zuverlässige Hilfe bei Problemen",
  },
  {
    title: "Förderungen",
    text: "Unterstützung bei der Beantragung von Fördermitteln",
  },
  {
    title: "Energieoptimierung",
    text: "Senkung Ihrer Heizkosten",
  },
];

export default function UnternehmenUeberUnsPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
            <div className="inline-flex overflow-visible rounded-lg border border-zinc-900/20 bg-transparent shadow-[0_6px_20px_rgba(0,0,0,0.10)] backdrop-blur-sm">
              {topMenus.map((menu, index) => (
                <div key={menu.title} className="group relative">
                  {menu.href ? (
                    <Link
                      href={menu.href}
                      className="inline-flex px-6 py-2.5 text-xs font-medium tracking-wide text-zinc-900 transition hover:bg-zinc-900/5"
                    >
                      {menu.title}
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="inline-flex cursor-pointer px-6 py-2.5 text-xs font-medium tracking-wide text-zinc-900 transition hover:bg-zinc-900/5"
                      >
                        {menu.title} <span className="ml-1 text-[10px] text-zinc-600">v</span>
                      </button>
                      <div className="pointer-events-none absolute left-1/2 top-[calc(100%-1px)] z-50 w-56 -translate-x-1/2 translate-y-1 rounded-lg border border-zinc-900/15 bg-white/92 p-2 opacity-0 shadow-2xl shadow-zinc-900/10 backdrop-blur-md transition-all duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                        {(menu.links ?? []).map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className={`block rounded-md px-4 py-2.5 text-sm transition hover:bg-zinc-900/5 ${
                              item.href === "/unternehmen/ueber-uns"
                                ? "bg-zinc-900/10 text-zinc-900"
                                : "text-zinc-900"
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                  {index < topMenus.length - 1 && (
                    <span className="pointer-events-none absolute top-2 right-0 h-5 w-px bg-zinc-900/20" />
                  )}
                </div>
              ))}
            </div>
          </nav>

          <details className="relative lg:hidden">
            <summary className="list-none cursor-pointer rounded-lg border border-white/70 bg-white/75 px-3 py-2 text-xs font-semibold tracking-wide text-zinc-800 transition hover:border-blue-200 hover:text-blue-600 [&::-webkit-details-marker]:hidden">
              Men�
            </summary>
            <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-zinc-900/15 bg-white/95 p-3 shadow-2xl shadow-zinc-900/10 backdrop-blur-md">
              {topMenus.map((menu) => (
                <div key={menu.title} className="border-b border-zinc-200 py-2 last:border-b-0">
                  {menu.href ? (
                    <Link
                      href={menu.href}
                      className="block rounded-md px-3 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-900/5"
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
                            className="block rounded-md px-3 py-2 text-sm text-zinc-800 transition hover:bg-zinc-900/5"
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
            <button
              type="button"
              aria-label="Suche"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/70 bg-white/75 text-zinc-700 transition hover:border-blue-200 hover:text-blue-600"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="E-Mail"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/70 bg-white/75 text-zinc-700 transition hover:border-blue-200 hover:text-blue-600"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
            </button>
            <Link
              href="/login"
              aria-label="Login"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/70 bg-white/75 text-zinc-700 transition hover:border-blue-200 hover:text-blue-600"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 17 15 12 10 7" />
                <path d="M15 12H3" />
                <path d="M21 4v16" />
              </svg>
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex h-9 items-center rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white transition hover:bg-zinc-700"
            >
              Angebot anfragen
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl pt-40">
        <section className="anim-soft-enter anim-delay-1 rounded-3xl border border-white/70 bg-white/85 p-8 shadow-2xl backdrop-blur-md md:p-10">
          <p className="leistungen-badge-animated text-xs font-semibold tracking-[0.2em] uppercase">
            Unternehmen
          </p>
          <h1 className="anim-text-enter anim-delay-3 mt-3 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
            Über uns
          </h1>

          <div className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="anim-soft-enter anim-delay-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-3xl font-black tracking-tight text-zinc-900">30+ Jahre Erfahrung</h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                Ich begleite Projekte vom ersten Gespräch bis zur finalen Inbetriebnahme. Meine Frau Anette Bachmann unterstützt Sie bei allen organisatorischen Fragen.
              </p>
              <Image
                src="/image-1.jpg"
                alt="Bachmann Haustechnik Servicefahrzeug"
                width={900}
                height={560}
                className="mt-5 h-auto w-full rounded-xl border border-zinc-200 object-cover shadow-sm"
              />
            </article>

            <article className="anim-soft-enter anim-delay-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-black tracking-tight text-zinc-900">Schwerpunkte</h3>
              <ul className="mt-4 grid gap-3 text-sm text-zinc-700 sm:grid-cols-2">
                {focusPoints.map((point) => (
                  <li
                    key={point.title}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-3"
                  >
                    <strong className="block text-zinc-900">{point.title}:</strong>
                    <p className="mt-1 text-zinc-700">{point.text}</p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
