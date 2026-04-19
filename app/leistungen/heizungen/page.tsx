"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderSearchActions from "@/app/components/HeaderSearchActions";

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

const serviceHighlights = [
  {
    title: "Installation",
    text: "Planung und Installation von Heizungsanlagen, Auswahl geeigneter Heizsysteme (Gas, Öl, Wärmepumpe, Solarthermie), Fußbodenheizung, Heizkörper",
  },
  {
    title: "Wartung und Service",
    text: "Regelmäßige Wartung zur Sicherstellung eines optimalen Betriebs, Störungsbehebung",
  },
  {
    title: "Modernisierung",
    text: "Austausch alter Heizkessel, Optimierung bestehender Heizsysteme, Einbau intelligenter Regelungssysteme",
  },
  {
    title: "Reparatur",
    text: "Schnell und zuverlässig bei Rohrbrüchen, Heizungsausfällen und anderen Störungen",
  },
];

const modernSystems = [
  {
    title: "Wärmepumpe",
    text: "Nutzt die Wärme aus der Umgebung (Luft, Erde oder Wasser), Sehr energieeffizient und umweltfreundlich.",
  },
  {
    title: "Pelletheizung",
    text: "Funktioniert mit Holzpellets, Erneuerbare Energiequelle, hohe Effizienz und geringe Emissionen.",
  },
  {
    title: "Holzheizung",
    text: "In modernen Stückholzkesseln findet eine sogenannte Vergasung statt. Dabei wird das Holz nicht nur verbrannt, sondern es entstehen auch brennbare Gase, die ebenfalls genutzt werden. Wird mit Holzscheitel betrieben, pro Tag 1x befüllen und den ganzen Tag Wärme genießen.",
  },
  {
    title: "Hackschnitzelanlagen",
    text: "Hackschnitzel sind ein nachwachsender Rohstoff. Geringere CO2-Emissionen im Vergleich zu fossilen Brennstoffen. Erreichen hohe Wirkungsgrade.",
  },
  {
    title: "Solarthermie",
    text: "Nutzt Sonnenenergie zur Warmwasserbereitung und Heizungsunterstützung. Umweltfreundlich und langfristig kostensparend.",
  },
];

const traditionalSystems = [
  {
    title: "Gasheizung",
    text: "Funktioniert mit Erdgas oder Flüssiggas. Bietet hohe Effizienz und schnelle Wärmeabgabe.",
  },
  {
    title: "Ölheizung",
    text: "Funktioniert mit Heizöl. Bietet hohe Leistung.",
  },
];

export default function HeizungenPage() {
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
                          <a
                            key={item.label}
                            href={item.href}
                            className={`header-menu-dropdown-link text-sm ${
                              item.label === "Heizungen"
                                ? "bg-zinc-900/10 text-zinc-900"
                                : "text-zinc-900"
                            }`}
                          >
                            {item.label}
                          </a>
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

          <HeaderSearchActions />
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl pt-40">
        <section className="anim-soft-enter anim-delay-1 rounded-3xl border border-white/70 bg-white/85 p-8 shadow-2xl backdrop-blur-md md:p-10">
          <p className="leistungen-badge-animated text-xs font-semibold tracking-[0.2em] uppercase">
            Leistungen
          </p>
          <h1 className="anim-text-enter anim-delay-3 mt-3 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
            Von der Planung bis zur Heizung - mit unseren maßgeschneiderten Lösungen
          </h1>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {serviceHighlights.map((item, index) => (
              <article
                key={item.title}
                className={`${index % 2 === 0 ? "anim-soft-enter anim-delay-2" : "anim-soft-enter anim-delay-3"} rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm`}
              >
                <p className="text-sm font-bold text-zinc-900">{item.title}:</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <h2 className="anim-text-enter anim-delay-4 mt-10 text-2xl font-black tracking-tight text-zinc-900 md:text-3xl">
            Moderne und umweltfreundliche Heizsysteme
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {modernSystems.map((item, index) => (
              <article
                key={item.title}
                className={`${index < 3 ? "anim-soft-enter anim-delay-3" : "anim-soft-enter anim-delay-4"} rounded-2xl border border-zinc-200 bg-zinc-50 p-5`}
              >
                <p className="text-sm font-bold text-zinc-900">{item.title}:</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <h2 className="anim-text-enter anim-delay-5 mt-10 text-2xl font-black tracking-tight text-zinc-900 md:text-3xl">
            Traditionelle Heizsysteme
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {traditionalSystems.map((item, index) => (
              <article
                key={item.title}
                className={`${index === 0 ? "anim-soft-enter anim-delay-4" : "anim-soft-enter anim-delay-5"} rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm`}
              >
                <p className="text-sm font-bold text-zinc-900">{item.title}:</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}



