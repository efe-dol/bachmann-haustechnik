import { NextResponse } from "next/server";
import { getAuthContext, isInternalRole } from "@/lib/auth/serverAuth";
import { createAdminClient } from "@/lib/auth/supabaseAdmin";

export async function GET() {
  try {
    const auth = await getAuthContext();

    if (!auth || !isInternalRole(auth.role)) {
      return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
    }

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from("user_profiles")
      .select("id, full_name, role, created_at")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      return NextResponse.json({ error: "Benutzer konnten nicht geladen werden." }, { status: 500 });
    }

    return NextResponse.json({ users: data ?? [] });
  } catch {
    return NextResponse.json({ error: "Unerwarteter Serverfehler." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const auth = await getAuthContext();

    if (!auth || auth.role !== "administrator") {
      return NextResponse.json({ error: "Nur Administratoren duerfen Benutzer bearbeiten." }, { status: 403 });
    }

    const body = await request.json();
    const userId = typeof body?.userId === "string" ? body.userId : "";
    const nextRole = body?.role === "administrator" ? "administrator" : body?.role === "intern" ? "intern" : null;
    const nextFullName = typeof body?.fullName === "string" ? body.fullName.trim() : null;

    if (!userId || (!nextRole && nextFullName === null)) {
      return NextResponse.json({ error: "Ungueltige Anfrage." }, { status: 400 });
    }

    if (nextFullName !== null && !nextFullName) {
      return NextResponse.json({ error: "Name darf nicht leer sein." }, { status: 400 });
    }

    const adminClient = createAdminClient();

    const { data: targetUser, error: targetLookupError } = await adminClient
      .from("user_profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle();

    if (targetLookupError) {
      return NextResponse.json({ error: "Benutzer konnte nicht geladen werden." }, { status: 500 });
    }

    if (!targetUser) {
      return NextResponse.json({ error: "Benutzer nicht gefunden." }, { status: 404 });
    }

    if (targetUser.role === "administrator") {
      return NextResponse.json({ error: "Administrator-Konten können nicht bearbeitet werden." }, { status: 403 });
    }

    const updatePayload: { role?: "administrator" | "intern"; full_name?: string } = {};

    if (nextRole) {
      updatePayload.role = nextRole;
    }

    if (nextFullName !== null) {
      updatePayload.full_name = nextFullName;
    }

    const { error } = await adminClient
      .from("user_profiles")
      .update(updatePayload)
      .eq("id", userId);

    if (error) {
      return NextResponse.json({ error: "Benutzer konnte nicht aktualisiert werden." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unerwarteter Serverfehler." }, { status: 500 });
  }
}
