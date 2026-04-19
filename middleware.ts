import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

type SiteSettingRow = {
  value_json?: {
    active?: boolean;
  } | null;
};

async function isMaintenanceActive() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    return false;
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/site_settings?key=eq.maintenance_mode&select=value_json&limit=1`,
      {
        headers: {
          apikey: supabasePublishableKey,
          Authorization: `Bearer ${supabasePublishableKey}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return false;
    }

    const rows = (await response.json()) as SiteSettingRow[];
    return Boolean(rows?.[0]?.value_json?.active);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const response = createClient(request);
  const pathname = request.nextUrl.pathname;
  const maintenanceActive = await isMaintenanceActive();
  const isAllowedDuringMaintenance =
    pathname === "/login" ||
    pathname === "/wartung" ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/api/auth");

  if (!maintenanceActive) {
    return response;
  }

  if (isAllowedDuringMaintenance) {
    return response;
  }

  const maintenanceUrl = request.nextUrl.clone();
  maintenanceUrl.pathname = "/wartung";
  maintenanceUrl.search = "";
  return NextResponse.rewrite(maintenanceUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
