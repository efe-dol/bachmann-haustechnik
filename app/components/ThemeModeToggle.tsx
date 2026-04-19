"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

type ThemeModeToggleProps = {
  initialTheme: ThemeMode;
};

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export default function ThemeModeToggle({ initialTheme }: ThemeModeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.cookie = `theme=${theme}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }, [theme]);

  const switchTheme = (nextTheme: ThemeMode) => {
    if (nextTheme === theme) {
      return;
    }

    const root = document.documentElement;
    root.classList.add("theme-switching");
    root.setAttribute("data-theme", nextTheme);
    setTheme(nextTheme);

    window.setTimeout(() => {
      root.classList.remove("theme-switching");
    }, 360);
  };

  const buttonBaseClass =
    "inline-flex h-8 items-center rounded-md px-3 text-xs font-semibold transition";

  return (
    <div className="theme-toggle-shell inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white p-1 text-zinc-700">
      <button
        type="button"
        onClick={() => switchTheme("light")}
        className={`${buttonBaseClass} ${
          theme === "light"
            ? "bg-zinc-900 text-white shadow-sm"
            : "text-zinc-700 hover:bg-zinc-100"
        }`}
        aria-pressed={theme === "light"}
      >
        Light
      </button>
      <button
        type="button"
        onClick={() => switchTheme("dark")}
        className={`${buttonBaseClass} ${
          theme === "dark"
            ? "bg-zinc-900 text-white shadow-sm"
            : "text-zinc-700 hover:bg-zinc-100"
        }`}
        aria-pressed={theme === "dark"}
      >
        Dark
      </button>
    </div>
  );
}
