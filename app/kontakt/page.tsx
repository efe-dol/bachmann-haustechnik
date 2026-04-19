"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderSearchActions from "@/app/components/HeaderSearchActions";

import { FormEvent, useEffect, useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrerqygb";

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

type SubmitState = "idle" | "sending" | "success" | "error";

export default function KontaktPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
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
                            className={`header-menu-dropdown-link text-sm ${
                              item.href === "/kontakt"
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

      <div className="mx-auto w-full max-w-5xl pt-40">
        <section className="anim-soft-enter anim-delay-1 rounded-3xl border border-white/70 bg-white/85 p-8 shadow-2xl backdrop-blur-md md:p-10">
          <p className="leistungen-badge-animated text-xs font-semibold tracking-[0.2em] uppercase">
            Kontakt
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <article className="anim-soft-enter anim-delay-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold tracking-[0.15em] text-zinc-500 uppercase">E-Mail</p>
              <p className="mt-2 text-2xl font-black tracking-tight text-zinc-900 md:text-3xl">
                info@bachmann-haustechnik.de
              </p>
            </article>
            <article className="anim-soft-enter anim-delay-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold tracking-[0.15em] text-zinc-500 uppercase">Telefon</p>
              <p className="mt-2 text-2xl font-black tracking-tight text-zinc-900 md:text-3xl">
                0881 / 927 07 810
              </p>
            </article>
          </div>

          <h2 className="anim-text-enter anim-delay-4 mt-10 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
            Kontaktformular
          </h2>

          <form onSubmit={handleSubmit} className="anim-soft-enter anim-delay-5 mt-6 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-zinc-800">
                Name
                <input
                  required
                  name="name"
                  type="text"
                  className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-zinc-800">
                E-Mail
                <input
                  required
                  name="email"
                  type="email"
                  className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-semibold text-zinc-800">
              Telefonnummer
              <input
                name="phone"
                type="tel"
                className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-zinc-800">
              Nachricht
              <textarea
                required
                name="message"
                rows={6}
                className="resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400"
              />
            </label>

            <button
              type="submit"
              disabled={submitState === "sending"}
              className="inline-flex w-fit items-center rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitState === "sending" ? "Wird gesendet..." : "Nachricht senden"}
            </button>

            {submitState === "success" && (
              <p className="text-sm font-medium text-emerald-700">
                Danke! Deine Nachricht wurde erfolgreich übermittelt.
              </p>
            )}
            {submitState === "error" && (
              <p className="text-sm font-medium text-rose-700">
                Leider gab es ein Problem beim Senden. Bitte versuche es erneut.
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}




