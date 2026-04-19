"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import HeaderSearchActions from "@/app/components/HeaderSearchActions";

type SearchEntry = {
  title: string;
  href: string;
  description: string;
  keywords: string;
};

const topMenus = [
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

const SEARCH_ENTRIES: SearchEntry[] = [
  {
    title: "Startseite",
    href: "/",
    description: "Überblick über Leistungen, Kontakt und Unternehmen.",
    keywords: "home startseite haustechnik kontakt",
  },
  {
    title: "Leistungen - Bäder",
    href: "/leistungen/baeder",
    description: "Badplanung, Sanierung und Modernisierung.",
    keywords: "baeder bad badplanung sanierung",
  },
  {
    title: "Leistungen - Heizungen",
    href: "/leistungen/heizungen",
    description: "Heizungsinstallation, Wartung und Optimierung.",
    keywords: "heizung heizungen waermepumpe wartung",
  },
  {
    title: "Leistungen - Sanitär",
    href: "/leistungen/sanitaer",
    description: "Sanitärinstallationen, Reparatur und Service.",
    keywords: "sanitaer sanitär installation bad",
  },
  {
    title: "Leistungen - Wassertechnik",
    href: "/leistungen/wassertechnik",
    description: "Wasseraufbereitung und Trinkwasserhygiene.",
    keywords: "wassertechnik wasser entkalkung trinkwasser",
  },
  {
    title: "Referenzen - Badumbau",
    href: "/referenzen/badumbau",
    description: "Abgeschlossene Badprojekte und Modernisierung.",
    keywords: "referenzen badumbau projekte",
  },
  {
    title: "Referenzen - Heizungsprojekte",
    href: "/referenzen/heizungsprojekte",
    description: "Erfolgreiche Heizungsinstallationen.",
    keywords: "referenzen heizung heizungsprojekte",
  },
  {
    title: "Referenzen - Wassertechnik",
    href: "/referenzen/wassertechnik",
    description: "Praxisbeispiele zur Wassertechnik.",
    keywords: "referenzen wassertechnik",
  },
  {
    title: "Unternehmen",
    href: "/unternehmen",
    description: "Profil und Fachbereiche von Bachmann Haustechnik.",
    keywords: "unternehmen team profil",
  },
  {
    title: "Über uns",
    href: "/unternehmen/ueber-uns",
    description: "Geschichte und Werte des Betriebs.",
    keywords: "ueber uns über uns geschichte",
  },
  {
    title: "Partner",
    href: "/unternehmen/partner",
    description: "Partnerunternehmen und Zusammenarbeit.",
    keywords: "partner kooperation",
  },
  {
    title: "Kontakt",
    href: "/kontakt",
    description: "Kontaktformular, Telefon und E-Mail.",
    keywords: "kontakt formular telefon email",
  },
  {
    title: "Impressum",
    href: "/impressum",
    description: "Rechtliche Anbieterkennzeichnung.",
    keywords: "impressum rechtliches",
  },
  {
    title: "Datenschutz",
    href: "/datenschutz",
    description: "Informationen zur Datenverarbeitung.",
    keywords: "datenschutz privacy daten",
  },
];

export default function SuchePage() {
  const searchParams = useSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const query = (searchParams.get("q") ?? "").trim();
  const normalizedQuery = query.toLowerCase();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return SEARCH_ENTRIES.filter((entry) => {
      const haystack = `${entry.title} ${entry.description} ${entry.keywords}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 px-6 pb-12 pt-40 text-zinc-900 md:px-10">
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
                  <button
                    type="button"
                    className="header-menu-trigger"
                  >
                    {menu.title} <span className="header-menu-trigger-chevron">v</span>
                  </button>
                  {index < topMenus.length - 1 && (
                    <span className="header-menu-divider" />
                  )}
                  <div className="header-menu-dropdown">
                    {(menu.links ?? []).map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="header-menu-dropdown-link text-sm"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>

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
                </div>
              ))}
            </div>
          </details>

          <HeaderSearchActions />
        </div>
      </header>

      <section className="anim-soft-enter mx-auto w-full max-w-4xl rounded-3xl border border-white/70 bg-white/85 p-8 shadow-2xl backdrop-blur-md md:p-10">
        <p className="anim-text-enter text-xs font-semibold tracking-[0.2em] text-blue-700 uppercase">Suche</p>
        <h1 className="anim-text-enter anim-delay-2 mt-3 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
          Ergebnisse
        </h1>

        <form action="/suche" method="get" className="anim-text-enter anim-delay-3 mt-6 flex flex-wrap gap-2">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Begriff eingeben"
            className="h-11 min-w-[220px] flex-1 rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-blue-400"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Suchen
          </button>
        </form>

        {!query && <p className="anim-text-enter anim-delay-4 mt-6 text-sm text-zinc-600">Bitte einen Suchbegriff eingeben.</p>}

        {query && results.length === 0 && (
          <p className="anim-soft-enter anim-delay-4 mt-6 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
            Keine Treffer für "{query}" gefunden.
          </p>
        )}

        {results.length > 0 && (
          <div className="mt-6 grid gap-3">
            {results.map((entry, index) => (
              <Link
                key={entry.href}
                href={entry.href}
                className="anim-soft-enter rounded-2xl border border-zinc-200 bg-white px-4 py-4 transition hover:border-blue-300 hover:bg-blue-50/50"
                style={{ animationDelay: `${220 + index * 70}ms` }}
              >
                <p className="text-base font-bold text-zinc-900">{entry.title}</p>
                <p className="mt-1 text-sm text-zinc-700">{entry.description}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

