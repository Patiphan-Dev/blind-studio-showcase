import { createClient } from "@/lib/supabase/server";

export interface AdminIdentity {
  id: string;
  email: string;
}

/**
 * Returns the current user only if they are in the `admins` allowlist.
 * Used by the dashboard layout and every admin Server Action as a
 * defense-in-depth check on top of the middleware redirect.
 */
export async function getAdmin(): Promise<AdminIdentity | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) return null;
  return { id: user.id, email: user.email ?? "" };
}

export async function requireAdmin(): Promise<AdminIdentity> {
  const admin = await getAdmin();
  if (!admin) throw new Error("ไม่ได้รับสิทธิ์ให้เข้าถึงส่วนนี้");
  return admin;
}
