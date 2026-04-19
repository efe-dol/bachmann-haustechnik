import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { AppRole, AuthContext } from "@/lib/auth/types";

const isRole = (value: string): value is AppRole => {
  return value === "administrator" || value === "intern";
};

export const getAuthContext = async (): Promise<AuthContext | null> => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  const fullName =
    (typeof profile?.full_name === "string" && profile.full_name.trim()) ||
    (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name.trim()) ||
    user.email ||
    "Nutzer";

  const role = isRole(profile?.role) ? profile.role : null;

  return {
    userId: user.id,
    email: user.email ?? null,
    fullName,
    role,
  };
};

export const isInternalRole = (role: string | null | undefined): role is AppRole => {
  return role === "administrator" || role === "intern";
};
