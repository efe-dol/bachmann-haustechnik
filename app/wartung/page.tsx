import Image from "next/image";

type Announcement = {
  id: string;
  title: string;
  message: string;
};

async function getActiveAnnouncement(): Promise<Announcement | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    return null;
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/announcements?select=id,title,message&active=eq.true&or=(expires_at.is.null,expires_at.gt.now())&order=created_at.desc&limit=1`,
      {
        headers: {
          apikey: supabasePublishableKey,
          Authorization: `Bearer ${supabasePublishableKey}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return null;
    }

    const rows = (await response.json()) as Announcement[];
    return rows?.[0] ?? null;
  } catch {
    return null;
  }
}

export default async function WartungPage() {
  const announcement = await getActiveAnnouncement();

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 px-6 py-16 text-zinc-900 md:px-10">
      <div className="maintenance-bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center">
        <section className="maintenance-gate-shell w-full max-w-lg rounded-3xl border border-white/70 bg-white/85 p-8 text-center shadow-2xl backdrop-blur-md md:p-10">
          <p className="maintenance-badge mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-blue-700 uppercase">
            <span className="maintenance-badge-dot" />
            Systempflege
          </p>
          <div className="maintenance-gate-topline mx-auto mb-4 h-1.5 w-24 rounded-full" />
          <Image
            src="/bachmann-logo.png"
            alt="Bachmann Haustechnik Logo"
            width={180}
            height={69}
            className="maintenance-logo-intro mx-auto h-auto w-[140px]"
            priority
          />

          <h1 className="maintenance-title-reveal mt-7 text-3xl font-black tracking-tight text-zinc-900">Wartungsmodus</h1>

          {announcement && (
            <div className="maintenance-note-reveal mt-4 rounded-2xl border border-blue-200/80 bg-gradient-to-r from-white via-blue-50 to-sky-50 px-4 py-4 text-left shadow-[0_10px_24px_rgba(37,99,235,0.12)]">
              <p className="text-[11px] font-bold tracking-[0.16em] text-blue-700 uppercase">Aktive Meldung</p>
              <p className="mt-1 text-base font-black tracking-tight text-zinc-900 break-words [overflow-wrap:anywhere]">{announcement.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-700 break-words [overflow-wrap:anywhere] whitespace-pre-wrap">{announcement.message}</p>
            </div>
          )}

          <p className="maintenance-copy-reveal mt-3 text-sm leading-relaxed text-zinc-700">
            Wir führen aktuell technische Arbeiten durch, um Leistung, Stabilität und Sicherheit weiter zu verbessern.
          </p>
          <p className="maintenance-copy-reveal mt-2 text-sm text-zinc-600">
            Der öffentliche Bereich ist vorübergehend nicht erreichbar. Bitte versuchen Sie es in Kürze erneut.
          </p>

          <div className="maintenance-progress mt-6 rounded-xl border border-zinc-200/80 bg-white/70 p-3 text-left">
            <p className="text-xs font-semibold tracking-[0.12em] text-zinc-500 uppercase">Live-Status</p>
            <p className="mt-1 text-sm font-semibold text-zinc-800">Wartungsarbeiten laufen</p>
            <div className="maintenance-progress-track mt-3">
              <span className="maintenance-progress-fill" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
