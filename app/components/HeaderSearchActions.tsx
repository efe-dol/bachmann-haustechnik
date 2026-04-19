"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type HeaderSearchActionsProps = {
  className?: string;
};

export default function HeaderSearchActions({ className = "" }: HeaderSearchActionsProps) {
  const router = useRouter();

  return (
    <div className={`flex items-center justify-end gap-1.5 sm:gap-2 ${className}`.trim()}>
      <button
        type="button"
        onClick={() => router.push("/suche")}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/70 bg-white/75 text-zinc-700 transition hover:border-blue-200 hover:text-blue-600 sm:h-9 sm:w-9"
        aria-label="Zur Suche"
        title="Suche"
      >
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M15.2 15.2 19 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <Link
        href="/kontakt"
        className="inline-flex h-8 items-center justify-center rounded-lg bg-zinc-900 px-2.5 text-xs font-semibold text-white transition hover:bg-zinc-700 sm:h-9 sm:px-4"
        aria-label="Zur Kontaktseite"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 sm:hidden" fill="none" aria-hidden="true">
          <path d="M6 8.5a2.5 2.5 0 0 1 2.5-2.5h7A2.5 2.5 0 0 1 18 8.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 6 15.5v-7Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="m8 9 4 3 4-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="hidden sm:inline">Kontakt</span>
      </Link>
    </div>
  );
}
