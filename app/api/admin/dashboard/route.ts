import { NextResponse } from "next/server";
import { getAuthContext, isInternalRole } from "@/lib/auth/serverAuth";
import { createAdminClient } from "@/lib/auth/supabaseAdmin";

type SiteSettingRow = {
  value_json?: {
    active?: boolean;
  } | null;
};

export async function GET() {
  try {
    const auth = await getAuthContext();

    if (!auth) {
      return NextResponse.json(
        { error: "Bitte zuerst anmelden.", code: "not_authenticated" },
        { status: 401 },
      );
    }

    if (!isInternalRole(auth.role)) {
      return NextResponse.json(
        {
          error: "Kein internes Profil gefunden. Bitte Rolle in user_profiles setzen.",
          code: "missing_role_profile",
        },
        { status: 403 },
      );
    }

    const adminClient = createAdminClient();

    const [
      usersCountResult,
      maintenanceResult,
      announcementsResult,
      usersResult,
      databaseStatusResult,
    ] = await Promise.all([
      adminClient.from("user_profiles").select("id", { count: "exact", head: true }),
      adminClient
        .from("site_settings")
        .select("value_json")
        .eq("key", "maintenance_mode")
        .maybeSingle(),
      adminClient
        .from("announcements")
        .select("id, title, message, active, created_at, expires_at")
        .order("created_at", { ascending: false })
        .limit(8),
      adminClient
        .from("user_profiles")
        .select("id, full_name, role, created_at")
        .order("created_at", { ascending: false })
        .limit(100),
      adminClient.from("site_settings").select("key").limit(1),
    ]);

    const dbConnected = !databaseStatusResult.error;

    if (usersCountResult.error) {
      return NextResponse.json({ error: "Dashboarddaten konnten nicht geladen werden." }, { status: 500 });
    }

    const setting = maintenanceResult.data as SiteSettingRow | null;
    const maintenanceActive = Boolean(setting?.value_json?.active);

    return NextResponse.json({
      auth,
      metrics: {
        registeredUsers: usersCountResult.count ?? 0,
        maintenanceActive,
      },
      systemStatus: {
        database: dbConnected ? "verbunden" : "nicht verbunden",
        websiteStability: dbConnected ? "stabil" : "eingeschraenkt",
      },
      announcements: announcementsResult.data ?? [],
      users: usersResult.data ?? [],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unerwarteter Serverfehler.";

    if (message.includes("SUPABASE_SERVICE_ROLE_KEY")) {
      return NextResponse.json(
        {
          error:
            "Server-Konfiguration unvollstaendig: SUPABASE_SERVICE_ROLE_KEY fehlt. Bitte in .env.local setzen und Dev-Server neu starten.",
          code: "missing_service_role_key",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ error: "Unerwarteter Serverfehler." }, { status: 500 });
  }
}
