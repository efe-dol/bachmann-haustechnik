import { NextResponse } from "next/server";
import { getAuthContext, isInternalRole } from "@/lib/auth/serverAuth";
import { createAdminClient } from "@/lib/auth/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const auth = await getAuthContext();

    if (!auth || !isInternalRole(auth.role)) {
      return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
    }

    const body = await request.json();
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!title || !message) {
      return NextResponse.json({ error: "Titel und Meldung sind erforderlich." }, { status: 400 });
    }

    if (title.length > 120 || message.length > 2000) {
      return NextResponse.json({ error: "Meldung ist zu lang." }, { status: 400 });
    }

    const adminClient = createAdminClient();

    const { error } = await adminClient.from("announcements").insert({
      title,
      message,
      active: true,
      created_by: auth.userId,
    });

    if (error) {
      return NextResponse.json({ error: "Meldung konnte nicht erstellt werden." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unerwarteter Serverfehler." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const auth = await getAuthContext();

    if (!auth || !isInternalRole(auth.role)) {
      return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
    }

    const body = await request.json();
    const id = typeof body?.id === "string" ? body.id.trim() : "";
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!id || !title || !message) {
      return NextResponse.json({ error: "ID, Titel und Meldung sind erforderlich." }, { status: 400 });
    }

    if (title.length > 120 || message.length > 2000) {
      return NextResponse.json({ error: "Meldung ist zu lang." }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { error } = await adminClient
      .from("announcements")
      .update({ title, message })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: "Meldung konnte nicht aktualisiert werden." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unerwarteter Serverfehler." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const auth = await getAuthContext();

    if (!auth || !isInternalRole(auth.role)) {
      return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
    }

    const body = await request.json();
    const id = typeof body?.id === "string" ? body.id.trim() : "";

    if (!id) {
      return NextResponse.json({ error: "ID ist erforderlich." }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { error } = await adminClient.from("announcements").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: "Meldung konnte nicht gelöscht werden." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unerwarteter Serverfehler." }, { status: 500 });
  }
}
