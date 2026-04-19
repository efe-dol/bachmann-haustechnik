import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import ThemeModeToggle from "@/app/components/ThemeModeToggle";
import PageTitleSync from "@/app/components/PageTitleSync";
import CookieBanner from "@/app/components/CookieBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bachmann Haustechnik - Startseite",
  description: "Bachmann Haustechnik Website",
  icons: {
    icon: "/bachmann-logo.png",
    shortcut: "/bachmann-logo.png",
    apple: "/bachmann-logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const initialTheme = themeCookie === "dark" ? "dark" : "light";
  const year = new Date().getFullYear();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme={initialTheme}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <PageTitleSync />
        <main className="flex-1">{children}</main>
        <CookieBanner />

        <footer className="footer-reveal footer-delay-1 border-t border-zinc-200 bg-white px-6 py-10 text-zinc-700 md:px-10">
          <div className="footer-sheen mx-auto w-full max-w-7xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
              <div className="footer-reveal footer-delay-2">
                <Link href="/" className="inline-flex items-center">
                  <Image
                    src="/bachmann-logo.png"
                    alt="Bachmann Haustechnik"
                    width={180}
                    height={68}
                    className="h-auto w-[120px] md:w-[150px]"
                  />
                </Link>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-600">
                  Zuverlässige Sanitär-, Heizungs- und Wassertechnik aus Wielenbach.
                  Von der Planung bis zur Wartung erhalten Sie bei uns alles aus einer Hand.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href="/kontakt"
                    className="footer-chip-motion inline-flex items-center rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-700"
                  >
                    Projekt anfragen
                  </Link>
                  <Link
                    href="tel:+4988192707810"
                    className="footer-chip-motion inline-flex items-center rounded-lg border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold text-zinc-800 transition hover:border-blue-200"
                  >
                    0881 / 927 07 810
                  </Link>
                </div>
                <div className="mt-5 grid gap-2 text-xs text-zinc-600">
                  <p className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    30+ Jahre Branchenerfahrung
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                    Saubere Montage und klare Kommunikation
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                    Persönlicher Service in der Region
                  </p>
                </div>
              </div>

              <div className="footer-reveal footer-delay-3">
                <p className="text-xs font-semibold tracking-[0.14em] text-zinc-500 uppercase">
                  Leistungen
                </p>
                <div className="mt-3 grid gap-2 text-sm font-semibold text-zinc-800">
                  <Link href="/leistungen/baeder" className="footer-link-motion transition hover:text-blue-700">
                    Bäder
                  </Link>
                  <Link href="/leistungen/heizungen" className="footer-link-motion transition hover:text-blue-700">
                    Heizungen
                  </Link>
                  <Link href="/leistungen/sanitaer" className="footer-link-motion transition hover:text-blue-700">
                    Sanitär
                  </Link>
                  <Link href="/leistungen/wassertechnik" className="footer-link-motion transition hover:text-blue-700">
                    Wassertechnik
                  </Link>
                </div>
              </div>

              <div className="footer-reveal footer-delay-4">
                <p className="text-xs font-semibold tracking-[0.14em] text-zinc-500 uppercase">
                  Unternehmen
                </p>
                <div className="mt-3 grid gap-2 text-sm font-semibold text-zinc-800">
                  <Link href="/unternehmen" className="footer-link-motion transition hover:text-blue-700">
                    Unternehmen
                  </Link>
                  <Link href="/unternehmen/ueber-uns" className="footer-link-motion transition hover:text-blue-700">
                    Über uns
                  </Link>
                  <Link href="/unternehmen/partner" className="footer-link-motion transition hover:text-blue-700">
                    Partner
                  </Link>
                  <Link href="/referenzen/badumbau" className="footer-link-motion transition hover:text-blue-700">
                    Referenzen
                  </Link>
                </div>
              </div>

              <div className="footer-reveal footer-delay-5">
                <p className="text-xs font-semibold tracking-[0.14em] text-zinc-500 uppercase">
                  Kontakt & Standort
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                  Bachmann Haustechnik
                  <br />
                  Zugspitzstr. 4
                  <br />
                  82407 Wielenbach
                </p>
                <div className="mt-3 grid gap-2 text-sm font-semibold text-zinc-800">
                  <Link href="mailto:info@bachmann-haustechnik.de" className="footer-link-motion transition hover:text-blue-700">
                    info@bachmann-haustechnik.de
                  </Link>
                  <Link href="tel:+4988192707810" className="footer-link-motion transition hover:text-blue-700">
                    0881 / 927 07 810
                  </Link>
                  <Link href="/kontakt" className="footer-link-motion transition hover:text-blue-700">
                    Zum Kontaktformular
                  </Link>
                </div>
                <p className="mt-3 text-xs text-zinc-500">
                  Termine nach Vereinbarung
                </p>
              </div>
            </div>

            <div className="mt-7 flex w-full flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-4 text-xs font-medium text-zinc-500">
              <div className="inline-flex flex-wrap items-center gap-3">
                <Link href="/impressum" className="footer-link-motion transition hover:text-blue-700">
                  Impressum
                </Link>
                <span className="h-1 w-1 rounded-full bg-zinc-300" />
                <Link href="/datenschutz" className="footer-link-motion transition hover:text-blue-700">
                  Datenschutzerklärung
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <ThemeModeToggle initialTheme={initialTheme} />
                <p>© {year} Bachmann Haustechnik</p>
              </div>
            </div>
          </div>

          <div className="footer-reveal footer-delay-5 mx-auto mt-4 flex w-full max-w-7xl flex-col gap-2 text-xs text-zinc-500 md:flex-row md:items-center md:justify-end">
            <p className="inline-flex items-center gap-1.5">
              <span>Made with</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-rose-500" fill="currentColor" aria-hidden="true">
                <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.02 6.02 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
              </svg>
              <span>by Efe Dolaman</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}


