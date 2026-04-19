"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import HeaderSearchActions from "@/app/components/HeaderSearchActions";

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

export default function DatenschutzPage() {
  const updatedAt = "19.04.2026";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

          <HeaderSearchActions />
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl pt-40">
        <section className="rounded-3xl border border-white/70 bg-white/85 p-8 shadow-2xl backdrop-blur-md md:p-10">
          <p className="text-xs font-semibold tracking-[0.2em] text-blue-700 uppercase">
            Rechtliches
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
            Datenschutzerklärung
          </h1>

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-zinc-700">
          <section>
            <h2 className="text-base font-black text-zinc-900">1. Verantwortlicher</h2>
            <p className="mt-2">
              Gerhard Bachmann
              <br />
              Heizung &amp; Sanitär
              <br />
              Zugspitzstr. 4
              <br />
              82407 Wielenbach
            </p>
            <p className="mt-2">
              Telefon: 0881 / 92707810
              <br />
              E-Mail: info@bachmann-haustechnik.de
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">2. Allgemeine Hinweise zur Datenverarbeitung</h2>
            <p className="mt-2">
              Wir verarbeiten personenbezogene Daten ausschließlich im Rahmen der geltenden Datenschutzgesetze,
              insbesondere der Datenschutz-Grundverordnung (DSGVO) und des Bundesdatenschutzgesetzes (BDSG).
              Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare
              natürliche Person beziehen.
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">3. Hosting und Server-Logfiles</h2>
            <p className="mt-2">
              Diese Website wird über die Hosting- und Infrastrukturplattform Vercel Inc. bereitgestellt.
            </p>
            <p className="mt-2">
              Beim Aufruf dieser Website werden technisch notwendige Verbindungsdaten verarbeitet (z. B. IP-Adresse,
              Datum/Uhrzeit, aufgerufene URL, Browser/Version, Betriebssystem, Referrer). Die Verarbeitung erfolgt zur
              sicheren Bereitstellung der Website, zur Fehleranalyse sowie zur Abwehr von Missbrauch.
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem und stabilem Betrieb der Website).
            </p>
            <p className="mt-2">
              Soweit hierbei eine Verarbeitung in Drittländern (insbesondere den USA) stattfindet, erfolgt diese auf
              Grundlage geeigneter Garantien gemäß Art. 44 ff. DSGVO (z. B. Standardvertragsklauseln), soweit erforderlich.
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">4. Kontaktaufnahme (Kontaktformular, E-Mail, Telefon)</h2>
            <p className="mt-2">
              Wenn Sie uns kontaktieren, verarbeiten wir die von Ihnen übermittelten Daten (z. B. Name, E-Mail,
              Telefonnummer, Nachricht), um Ihre Anfrage zu bearbeiten und zu beantworten.
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen / Vertragserfüllung) sowie
              Art. 6 Abs. 1 lit. f DSGVO (effiziente Bearbeitung von Anfragen).
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">5. Kontaktformular-Dienst (Formspree)</h2>
            <p className="mt-2">
              Für das Kontaktformular nutzen wir den Dienst Formspree. Die im Formular eingegebenen Inhalte werden an
              Formspree übermittelt und von dort zur Bearbeitung an uns weitergeleitet.
            </p>
            <p className="mt-2">
              Dabei kann eine Verarbeitung in Drittländern (z. B. USA) nicht ausgeschlossen werden. Soweit erforderlich,
              erfolgt die Übermittlung auf Grundlage geeigneter Garantien (z. B. Standardvertragsklauseln).
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO und Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">6. Login-/Adminbereich und Supabase</h2>
            <p className="mt-2">
              Für Login, Registrierung (mit Token), Benutzerverwaltung sowie interne Website-Funktionen nutzen wir Supabase
              als technische Plattform (Authentifizierung und Datenbank).
            </p>
            <p className="mt-2">
              Im Rahmen dieser Funktionen können insbesondere folgende Daten verarbeitet werden: E-Mail-Adresse,
              Passwort-Hash (nicht im Klartext), Rolleninformationen, Zeitstempel und technisch erforderliche
              Sicherheits-/Sitzungsdaten.
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Bereitstellung geschützter Bereiche) sowie Art. 6 Abs. 1 lit. f DSGVO
              (IT-Sicherheit, Missbrauchsvermeidung, Systemintegrität).
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">7. Cookies und vergleichbare Technologien</h2>
            <p className="mt-2">
              Auf dieser Website wird ein technisch notwendiges Präferenz-Cookie verwendet, um Ihre ausgewählte
              Darstellung (Light/Dark Mode) zu speichern (`theme`). Ohne dieses Cookie kann die gewünschte
              Darstellungseinstellung nicht dauerhaft beibehalten werden.
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an nutzerfreundlicher Darstellung)
              bzw. § 25 Abs. 2 TTDSG für technisch notwendige Speicherungen.
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">8. Speicherdauer</h2>
            <p className="mt-2">
              Wir speichern personenbezogene Daten nur so lange, wie dies für den jeweiligen Zweck erforderlich ist oder
              gesetzliche Aufbewahrungspflichten bestehen. Anschließend werden Daten gelöscht oder datenschutzkonform
              anonymisiert.
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">9. Empfänger von Daten</h2>
            <p className="mt-2">
              Daten können an technische Dienstleister übermittelt werden, die wir zur Bereitstellung der Website und
              unserer Funktionen einsetzen (z. B. Vercel als Hosting-Anbieter, Formspree, Supabase). Diese Dienstleister werden als
              Auftragsverarbeiter gemäß Art. 28 DSGVO eingebunden, soweit erforderlich.
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">10. Ihre Rechte</h2>
            <p className="mt-2">
              Sie haben nach Maßgabe der gesetzlichen Voraussetzungen insbesondere folgende Rechte: Auskunft (Art. 15 DSGVO),
              Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO),
              Datenübertragbarkeit (Art. 20 DSGVO), Widerspruch (Art. 21 DSGVO) sowie Widerruf erteilter Einwilligungen
              mit Wirkung für die Zukunft.
            </p>
            <p className="mt-2">
              Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">11. Datensicherheit</h2>
            <p className="mt-2">
              Wir setzen angemessene technische und organisatorische Maßnahmen ein, um Ihre Daten gegen Verlust,
              Manipulation und unbefugten Zugriff zu schützen. Dazu gehört insbesondere die verschlüsselte Übertragung
              der Websiteinhalte (HTTPS/TLS).
            </p>
          </section>

          <section>
            <h2 className="text-base font-black text-zinc-900">12. Aktualität und Änderung dieser Erklärung</h2>
            <p className="mt-2">
              Diese Datenschutzerklärung hat den Stand vom {updatedAt}. Wir behalten uns vor, sie bei rechtlichen,
              technischen oder organisatorischen Änderungen anzupassen.
            </p>
          </section>
          </div>
        </section>
      </div>
    </main>
  );
}

