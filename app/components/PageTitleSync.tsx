"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TITLE_MAP: Record<string, string> = {
  "/": "Startseite",
  "/kontakt": "Kontakt",
  "/impressum": "Impressum",
  "/datenschutz": "Datenschutz",
  "/login": "Login",
  "/admin": "Admin",
  "/wartung": "Wartung",
  "/suche": "Suche",
  "/todos": "Todos",
  "/unternehmen": "Unternehmen",
  "/unternehmen/ueber-uns": "Über uns",
  "/unternehmen/partner": "Partner",
  "/leistungen/baeder": "Leistungen Bäder",
  "/leistungen/heizungen": "Leistungen Heizungen",
  "/leistungen/sanitaer": "Leistungen Sanitär",
  "/leistungen/wassertechnik": "Leistungen Wassertechnik",
  "/referenzen/badumbau": "Referenzen Badumbau",
  "/referenzen/heizungsprojekte": "Referenzen Heizungsprojekte",
  "/referenzen/wassertechnik": "Referenzen Wassertechnik",
};

function toTitleCase(input: string) {
  return input
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function fallbackTitle(pathname: string) {
  const lastSegment = pathname.split("/").filter(Boolean).pop() ?? "Startseite";
  const normalized = decodeURIComponent(lastSegment).replace(/[-_]+/g, " ");
  return toTitleCase(normalized);
}

export default function PageTitleSync() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    const pageTitle = TITLE_MAP[pathname] ?? fallbackTitle(pathname);
    document.title = `Bachmann Haustechnik - ${pageTitle}`;
  }, [pathname]);

  return null;
}
