import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/auth/supabaseAdmin";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ConsumeResult = {
  ok: boolean;
  assigned_role: "administrator" | "intern" | null;
  reason: string | null;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fullName = typeof body?.fullName === "string" ? body.fullName.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    const registrationToken = typeof body?.registrationToken === "string" ? body.registrationToken.trim() : "";
    const acceptedPrivacy = body?.acceptedPrivacy === true;

    if (!fullName || fullName.length < 2 || fullName.length > 120) {
      return NextResponse.json({ error: "Bitte einen gueltigen Namen angeben." }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Bitte eine gueltige E-Mail-Adresse angeben." }, { status: 400 });
    }

    if (password.length < 12) {
      return NextResponse.json(
        { error: "Das Passwort muss mindestens 12 Zeichen haben." },
        { status: 400 },
      );
    }

    if (!registrationToken) {
      return NextResponse.json({ error: "Anmelde-Token fehlt." }, { status: 400 });
    }

    if (!acceptedPrivacy) {
      return NextResponse.json({ error: "Bitte Datenschutzbedingungen bestaetigen." }, { status: 400 });
    }

    const adminClient = createAdminClient();

    const { data: tokenResultRaw, error: tokenError } = await adminClient.rpc(
      "consume_registration_token",
      {
        token_input: registrationToken,
      },
    );

    if (tokenError) {
      return NextResponse.json({ error: "Token konnte nicht geprueft werden." }, { status: 400 });
    }

    const tokenResult = tokenResultRaw as ConsumeResult | ConsumeResult[] | null;
    const tokenStatus = Array.isArray(tokenResult) ? tokenResult[0] : tokenResult;

    if (!tokenStatus?.ok || !tokenStatus.assigned_role) {
      return NextResponse.json({ error: "Token ist ungueltig, abgelaufen oder bereits verwendet." }, { status: 400 });
    }

    const { data: createUserData, error: createUserError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      },
    });

    if (createUserError || !createUserData.user) {
      return NextResponse.json(
        { error: createUserError?.message ?? "Benutzer konnte nicht erstellt werden." },
        { status: 400 },
      );
    }

    const userId = createUserData.user.id;

    const { error: profileError } = await adminClient.from("user_profiles").upsert({
      id: userId,
      full_name: fullName,
      role: tokenStatus.assigned_role,
      privacy_consent_at: new Date().toISOString(),
    });

    if (profileError) {
      await adminClient.auth.admin.deleteUser(userId);
      return NextResponse.json({ error: "Benutzerprofil konnte nicht erstellt werden." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unerwarteter Serverfehler." }, { status: 500 });
  }
}
