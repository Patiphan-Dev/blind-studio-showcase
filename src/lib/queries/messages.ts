import { createClient } from "@/lib/supabase/server";
import type { ContactMessageRow } from "@/types/database";

export async function getMessages(): Promise<ContactMessageRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ContactMessageRow[];
}

export async function getUnhandledCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("contact_messages")
    .select("*", { count: "exact", head: true })
    .eq("is_handled", false);
  if (error) throw error;
  return count ?? 0;
}
