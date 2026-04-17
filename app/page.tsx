"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

const serviceCards = [
  {
    title: "BÄDER",
    slug: "baeder",
    text: "Sie möchten ein neues Bad, denn ihr altes gefällt nicht mehr? Oder Sie bauen ein neues Zuhause und wünschen sich eine private Wohlfühloase? Wir helfen Ihnen gerne bei der Planung und Ausführung! Von preiswert bis luxuriös ist alles möglich!",
  },
  {
    title: "HEIZUNGEN",
    slug: "heizungen",
    text: "Das Herz unseres Zuhause ist eine gut funktionierende Heizung! Wir bieten Ihnen Installation und Wartung an!",
  },
  {
    title: "SANITÄR",
    slug: "sanitaer",
    text: "Wir übernehmen für Sie mit über 30 Jahren Erfahrung sämtliche Sanitärinstallationen. Egal ob Vorwand- oder Unterputzinstallation, bei uns bekommen Sie den gewünschten Service.",
  },
  {
    title: "WASSERTECHNIK",
    slug: "wassertechnik",
    text: "Für den Schutz Ihrer Leitungen und wasserführende Haushaltsgeräte bieten wir Ihnen Lösungen für eine perfekte Trinkwasserhygiene in Ihrem Zuhause an.",
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

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLeistungenInView, setIsLeistungenInView] = useState(false);
  const [isUeberUnsInView, setIsUeberUnsInView] = useState(false);
  const [isKontaktInView, setIsKontaktInView] = useState(false);
  const [introPhase, setIntroPhase] = useState<"center" | "fly" | "done">("center");
  const [introVisible, setIntroVisible] = useState(true);
  const [introTargetTransform, setIntroTargetTransform] = useState("translate(-50%, -50%) scale(1)");
  const leistungenRef = useRef<HTMLElement | null>(null);
  const ueberUnsRef = useRef<HTMLElement | null>(null);
  const kontaktRef = useRef<HTMLElement | null>(null);
  const headerLogoRef = useRef<HTMLImageElement | null>(null);
  const introDone = introPhase === "done";

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

  useEffect(() => {
    const introLogoWidth = 280;

    const computeTargetTransform = () => {
      if (!headerLogoRef.current) {
        return;
      }

      const rect = headerLogoRef.current.getBoundingClientRect();
      const targetCenterX = rect.left + rect.width / 2;
      const targetCenterY = rect.top + rect.height / 2;
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      const dx = targetCenterX - viewportCenterX;
      const dy = targetCenterY - viewportCenterY;
      const scale = rect.width / introLogoWidth;

      setIntroTargetTransform(
        `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale})`,
      );
    };

    computeTargetTransform();
    window.addEventListener("resize", computeTargetTransform);

    const flyTimer = window.setTimeout(() => {
      computeTargetTransform();
      setIntroPhase("fly");
    }, 980);

    const doneTimer = window.setTimeout(() => {
      setIntroPhase("done");
      window.setTimeout(() => {
        setIntroVisible(false);
      }, 560);
    }, 2520);

    return () => {
      window.removeEventListener("resize", computeTargetTransform);
      window.clearTimeout(flyTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  useEffect(() => {
    if (!introDone) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === leistungenRef.current && entry.isIntersecting) {
            setIsLeistungenInView(entry.isIntersecting);
          }

          if (entry.target === ueberUnsRef.current && entry.isIntersecting) {
            setIsUeberUnsInView(entry.isIntersecting);
          }

          if (entry.target === kontaktRef.current && entry.isIntersecting) {
            setIsKontaktInView(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.3 },
    );

    if (leistungenRef.current) {
      observer.observe(leistungenRef.current);
    }

    if (ueberUnsRef.current) {
      observer.observe(ueberUnsRef.current);
    }

    if (kontaktRef.current) {
      observer.observe(kontaktRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [introDone]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 text-zinc-900">
      {introVisible && (
        <div
          className={`fixed inset-0 z-[120] bg-gradient-to-br from-white via-blue-50 to-cyan-100 transition-opacity duration-500 ${
            introPhase === "done" ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.05) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
              maskImage: "radial-gradient(circle at 50% 45%, white 30%, transparent 100%)",
            }}
          />

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36vh] w-[36vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl animate-pulse" />

          <Image
            src="/bachmann-logo.png"
            alt="Bachmann Haustechnik Intro"
            width={280}
            height={106}
            priority
            className="absolute left-1/2 top-1/2 h-auto w-[280px] drop-shadow-[0_24px_55px_rgba(37,99,235,0.22)] transition-transform duration-[1350ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform:
                introPhase === "center"
                  ? "translate(-50%, -50%) scale(1)"
                  : introTargetTransform,
            }}
          />

          <div
            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
              introPhase === "center" ? "opacity-100" : "opacity-0"
            }`}
            style={{ top: "calc(50% + 112px)" }}
          >
            <div className="intro-bar-loader" />
          </div>
        </div>
      )}

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
              ref={headerLogoRef}
              priority
              className="h-auto w-[120px] md:w-[160px]"
            />
          </Link>

          <nav className="hidden lg:flex">
            <div className="inline-flex overflow-visible rounded-lg border border-zinc-900/20 bg-transparent shadow-[0_6px_20px_rgba(0,0,0,0.10)] backdrop-blur-sm">
              {topMenus.map((menu, index) => (
                <div key={menu.title} className="group relative">
                  <button
                    type="button"
                    className="inline-flex cursor-pointer px-6 py-2.5 text-xs font-medium tracking-wide text-zinc-900 transition hover:bg-zinc-900/5"
                  >
                    {menu.title} <span className="ml-1 text-[10px] text-zinc-600">v</span>
                  </button>
                  {index < topMenus.length - 1 && (
                    <span className="pointer-events-none absolute top-2 right-0 h-5 w-px bg-zinc-900/20" />
                  )}
                  <div className="pointer-events-none absolute left-1/2 top-[calc(100%-1px)] z-50 w-56 -translate-x-1/2 translate-y-1 rounded-lg border border-zinc-900/15 bg-white/92 p-2 opacity-0 shadow-2xl shadow-zinc-900/10 backdrop-blur-md transition-all duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                    {(menu.links ?? []).map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block rounded-md px-4 py-2.5 text-sm text-zinc-900 transition hover:bg-zinc-900/5"
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
            <summary className="list-none cursor-pointer rounded-lg border border-white/70 bg-white/75 px-3 py-2 text-xs font-semibold tracking-wide text-zinc-800 transition hover:border-blue-200 hover:text-blue-600 [&::-webkit-details-marker]:hidden">
              Menü
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
            <a
              href="/login"
              aria-label="Login"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/70 bg-white/75 text-zinc-700 transition hover:border-blue-200 hover:text-blue-600"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 17 15 12 10 7" />
                <path d="M15 12H3" />
                <path d="M21 4v16" />
              </svg>
            </a>
            <a
              href="/kontakt"
              className="inline-flex h-9 items-center rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white transition hover:bg-zinc-700"
            >
              Angebot anfragen
            </a>
          </div>
        </div>
      </header>

      <div
        className={`transition-all duration-700 ${
          introDone
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >

      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 pt-40 pb-10 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className={`${introDone ? "anim-soft-enter anim-delay-1" : "anim-prep"}`}>
          <p className={`${introDone ? "anim-text-enter anim-delay-2" : "anim-prep"} inline-flex rounded-full border border-white/60 bg-white/70 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-blue-700 uppercase`}>
            Sanitär und Heizung
          </p>
          <h1 className={`${introDone ? "anim-text-enter anim-delay-3" : "anim-prep"} mt-6 text-5xl leading-[1.02] font-black tracking-tight sm:text-6xl`}>
            Moderne
            <br />
            Haustechnik
            <br />
            <span className="animated-blue-heading">
              für Ihr Zuhause
            </span>
          </h1>
          <p className={`${introDone ? "anim-text-enter anim-delay-4" : "anim-prep"} mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg`}>
            Wir liefern schnelle Lösungen für Sanitär, Heizung und Wassertechnik.
            Präzise geplant, sauber ausgeführt und transparent kommuniziert.
          </p>
          <div className={`${introDone ? "anim-text-enter anim-delay-5" : "anim-prep"} mt-8 flex flex-wrap gap-3`}>
            <a
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/35 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            >
              Kontakt aufnehmen
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                -&gt;
              </span>
            </a>
            <a
              href="tel:+4988192707810"
              className="rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:border-blue-200"
            >
              <strong>Telefon:</strong> 0881/927 07 810
            </a>
          </div>
        </div>

        <div className={`${introDone ? "anim-soft-enter anim-delay-3" : "anim-prep"} rounded-3xl border border-white/60 bg-white/80 p-6 shadow-2xl backdrop-blur-md`}>
          <p className={`${introDone ? "anim-text-enter anim-delay-4" : "anim-prep"} text-xs font-semibold tracking-[0.18em] text-blue-700 uppercase`}>
            Ablaufübersicht
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className={`${introDone ? "anim-soft-enter anim-delay-4" : "anim-prep"} rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-zinc-800`}>
              Erstberatung und Bedarf
            </div>
            <div className={`${introDone ? "anim-soft-enter anim-delay-5" : "anim-prep"} rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700`}>
              Angebot und Fördercheck
            </div>
            <div className={`${introDone ? "anim-soft-enter anim-delay-5" : "anim-prep"} rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700`}>
              Montage und Koordination
            </div>
            <div className={`${introDone ? "anim-soft-enter anim-delay-6" : "anim-prep"} rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700`}>
              Wartung und Service
            </div>
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            Klare Schritte von Anfrage bis laufendem Service.
          </p>
        </div>
      </section>

      <section
        id="leistungen"
        ref={leistungenRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 md:px-10"
      >
        <div
          className={`${isLeistungenInView ? "anim-soft-enter" : "anim-prep"} rounded-3xl border border-white/60 bg-white/80 p-6 shadow-2xl backdrop-blur-md md:p-8`}
        >
          <p
            className={`${isLeistungenInView ? "animated-blue-heading" : "text-blue-700"} text-xs font-semibold tracking-[0.2em] uppercase`}
          >
            Leistungen
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((card, index) => (
              <article
                key={card.title}
                className={`${isLeistungenInView ? "anim-soft-enter" : "anim-prep"} ${index === 0 ? "anim-delay-1" : ""} ${index === 1 ? "anim-delay-2" : ""} ${index === 2 ? "anim-delay-3" : ""} ${index === 3 ? "anim-delay-4" : ""} flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm`}
              >
                <h2 className="text-lg font-black tracking-tight text-zinc-900">
                  {card.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{card.text}</p>
                <div className="mt-auto flex justify-center pt-6">
                  <Link
                    href={`/leistungen/${card.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-zinc-900 via-black to-zinc-800 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-zinc-900/25 ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:from-black hover:via-zinc-900 hover:to-black hover:shadow-lg hover:shadow-zinc-900/35"
                  >
                    Zur Seite
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                      -&gt;
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="ueber-uns"
        ref={ueberUnsRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 md:px-10"
      >
        <div
          className={`${isUeberUnsInView ? "anim-soft-enter" : "anim-prep"} rounded-3xl border border-white/60 bg-white/80 p-6 shadow-2xl backdrop-blur-md md:p-8`}
        >
          <p
            className={`${isUeberUnsInView ? "animated-blue-heading" : "text-blue-700"} text-xs font-semibold tracking-[0.2em] uppercase`}
          >
            Über uns
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <article
              className={`${isUeberUnsInView ? "anim-soft-enter anim-delay-2" : "anim-prep"} rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm`}
            >
              <h2 className="text-3xl font-black tracking-tight text-zinc-900">
                30+ Jahre Erfahrung
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                Ich begleite Projekte vom ersten Gespräch bis zur finalen
                Inbetriebnahme. Meine Frau Anette Bachmann unterstützt Sie bei allen
                organisatorischen Fragen.
              </p>
              <Image
                src="/image-1.jpg"
                alt="Bachmann Haustechnik Servicefahrzeug"
                width={900}
                height={560}
                className="mt-5 h-auto w-full rounded-xl border border-zinc-200 object-cover shadow-sm"
              />
            </article>

            <article
              className={`${isUeberUnsInView ? "anim-soft-enter anim-delay-3" : "anim-prep"} rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm`}
            >
              <h3 className="text-lg font-black tracking-tight text-zinc-900">
                Schwerpunkte
              </h3>
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
        </div>
      </section>

      <section
        id="kontakt"
        ref={kontaktRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:px-10"
      >
        <div
          className={`${isKontaktInView ? "anim-soft-enter anim-delay-2" : "anim-prep"} rounded-3xl border border-white/60 bg-white/80 p-8 shadow-2xl backdrop-blur-md md:p-10`}
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-blue-700 uppercase">
            Kontakt
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
            Bereit für Ihr nächstes Projekt?
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            Schreiben Sie uns kurz, was Sie planen. Wir melden uns mit einer
            klaren Einschätzung, einem Zeitfenster und einem transparenten Angebot.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="mailto:info@bachmann-haustechnik.de"
              className="rounded-lg bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
            >
              info@bachmann-haustechnik.de
            </a>
            <a
              href="tel:+4988192707810"
              className="rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:border-blue-200"
            >
              0881/927 07 810
            </a>
            <Link
              href="/kontakt"
              className="rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:border-blue-200"
            >
              Zur Kontaktseite
            </Link>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}
