import { NextResponse } from "next/server";
import { buildTokenPreview, generateRegistrationToken, hashRegistrationToken } from "@/lib/auth/security";
import { getAuthContext } from "@/lib/auth/serverAuth";
import { createAdminClient } from "@/lib/auth/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const auth = await getAuthContext();

    if (!auth || auth.role !== "administrator") {
      return NextResponse.json({ error: "Nur Administratoren duerfen Tokens erstellen." }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const requestedRole = body?.role === "administrator" ? "administrator" : "intern";
    const requestedDays = Number(body?.expiresInDays ?? 7);
    const expiresInDays = Number.isFinite(requestedDays)
      ? Math.min(90, Math.max(1, Math.trunc(requestedDays)))
      : 7;

    const token = generateRegistrationToken();
    const tokenHash = hashRegistrationToken(token);
    const tokenPreview = buildTokenPreview(token);
    const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString();

    const adminClient = createAdminClient();

    const { error } = await adminClient.from("registration_tokens").insert({
      token_hash: tokenHash,
      token_preview: tokenPreview,
      role: requestedRole,
      expires_at: expiresAt,
      created_by: auth.userId,
    });

    if (error) {
      return NextResponse.json({ error: "Token konnte nicht gespeichert werden." }, { status: 500 });
    }

    return NextResponse.json({
      token,
      role: requestedRole,
      expiresAt,
    });
  } catch {
    return NextResponse.json({ error: "Unerwarteter Serverfehler." }, { status: 500 });
  }
}
