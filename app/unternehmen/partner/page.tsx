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

const partners = [
  { id: 1, name: "Partner 1", logo: "/partner-1.png" },
  { id: 2, name: "Partner 2", logo: "/partner-2.png" },
  {
    id: 3,
    name: "Partner 3",
    logo: "/partner-3.png",
    textLines: [
      "Wasserenthartung fur seidenweiches Wasser,",
      "Kalkschutz fur die Leitungen",
    ],
  },
  { id: 4, name: "Partner 4", logo: "/partner-4.png" },
  { id: 5, name: "Partner 5", logo: "/partner-5.png" },
  { id: 6, name: "Partner 6", logo: "/partner-6.png" },
  {
    id: 7,
    name: "Partner 7",
    logo: "/partner-7.png",
    textLines: [
      "Warmepumpen,",
      "Holz- und Biomasseheizungen,",
      "Hybridheizungen, etwa mit Solarthermie,",
      "Elektro- und Infrarotheizungen,",
      "Gas- und Olbrennwertheizungen,",
    ],
  },
];

export default function UnternehmenPartnerPage() {
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
                          <Link
                            key={item.label}
                            href={item.href}
                            className={`header-menu-dropdown-link text-sm ${
                              item.href === "/unternehmen/partner"
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
            Unternehmen
          </p>
          <h1 className="anim-text-enter anim-delay-3 mt-3 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
            Partner
          </h1>

          <div className="mt-8 grid gap-5">
            <article className="anim-soft-enter anim-delay-2 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
                  >
                    <div className="flex h-28 items-center justify-center">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} Logo`}
                        width={180}
                        height={90}
                        className="h-auto max-h-20 w-auto max-w-full object-contain"
                      />
                    </div>
                    {partner.textLines && (
                      <p className="mt-3 text-sm font-medium text-zinc-700">
                        {partner.textLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}



