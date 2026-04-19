import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/serverAuth";
import { createAdminClient } from "@/lib/auth/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const auth = await getAuthContext();

    if (!auth || auth.role !== "administrator") {
      return NextResponse.json({ error: "Nur Administratoren duerfen den Wartungsmodus aendern." }, { status: 403 });
    }

    const body = await request.json();
    const active = body?.active === true;

    const adminClient = createAdminClient();

    const { error } = await adminClient.from("site_settings").upsert({
      key: "maintenance_mode",
      value_json: { active },
      updated_by: auth.userId,
    });

    if (error) {
      return NextResponse.json({ error: "Wartungsmodus konnte nicht aktualisiert werden." }, { status: 500 });
    }

    return NextResponse.json({ success: true, active });
  } catch {
    return NextResponse.json({ error: "Unerwarteter Serverfehler." }, { status: 500 });
  }
}
