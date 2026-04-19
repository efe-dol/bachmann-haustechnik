"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Announcement = {
  id: string;
  title: string;
  message: string;
};

type SiteSettingRow = {
  value_json?: {
    active?: boolean;
  } | null;
};

type SiteMessageBannerProps = {
  className?: string;
};

export default function SiteMessageBanner({ className = "" }: SiteMessageBannerProps) {
  const supabase = useMemo(() => createClient(), []);
  const [maintenanceActive, setMaintenanceActive] = useState(false);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let active = true;

    const loadBanner = async () => {
      const [maintenanceResult, announcementResult] = await Promise.all([
        supabase.from("site_settings").select("value_json").eq("key", "maintenance_mode").maybeSingle(),
        supabase
          .from("announcements")
          .select("id, title, message")
          .eq("active", true)
          .or("expires_at.is.null,expires_at.gt.now()")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);

      if (!active) {
        return;
      }

      const maintenanceSetting = maintenanceResult.data as SiteSettingRow | null;
      setMaintenanceActive(Boolean(maintenanceSetting?.value_json?.active));
      setAnnouncement((announcementResult.data ?? null) as Announcement | null);
    };

    void loadBanner();

    return () => {
      active = false;
    };
  }, [supabase]);

  if (!maintenanceActive && !announcement) {
    return null;
  }

  return (
    <aside className={className}>
      <div className="site-message-shell w-full rounded-2xl border border-sky-200/80 bg-gradient-to-r from-white via-sky-50 to-cyan-50 p-4 shadow-[0_18px_40px_rgba(2,132,199,0.22)] backdrop-blur-md">
        <div className="site-message-accent mb-3 h-1.5 w-28 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400" />
        {maintenanceActive && (
          <div className="site-message-maintenance rounded-xl border border-amber-300/70 bg-amber-50/90 px-3 py-2">
            <div className="maintenance-logo-wrap pb-2">
              <Image
                src="/bachmann-logo.png"
                alt="Bachmann Haustechnik"
                width={140}
                height={53}
                className="maintenance-logo-intro mx-auto h-auto w-[110px] md:w-[120px]"
              />
              <p className="site-message-maintenance-label maintenance-subtitle-reveal mt-2 text-center text-xs font-semibold tracking-[0.14em] text-amber-800 uppercase">
                Wartungsmodus aktiv
              </p>
            </div>
            <p className="site-message-maintenance-copy text-sm font-semibold text-amber-800">
              Wartungsmodus ist aktiv. Externe Zugriffe können eingeschränkt sein.
            </p>
          </div>
        )}

        {announcement && (
          <div className={`site-message-announcement min-w-0 ${maintenanceActive ? "mt-3 border-t border-zinc-200 pt-3" : ""}`}>
            <p className="site-message-label text-[11px] font-bold tracking-[0.16em] text-blue-700 uppercase">Wichtige Meldung</p>
            <p className="site-message-title mt-1 text-base font-black tracking-tight text-zinc-900 break-words [overflow-wrap:anywhere]">{announcement.title}</p>
            <p className="site-message-copy mt-1 text-sm leading-relaxed text-zinc-700 break-words [overflow-wrap:anywhere] whitespace-pre-wrap">{announcement.message}</p>
          </div>
        )}
      </div>
    </aside>
  );
}

