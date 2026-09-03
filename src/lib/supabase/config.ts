/**
 * Public Supabase configuration.
 *
 * The URL and the **publishable** anon key are safe to ship to the browser
 * (that is what a publishable key is for) and Row Level Security is what
 * actually protects the data. They are committed here as defaults so the
 * deployment works out of the box; set the matching environment variables to
 * point the site at a different Supabase project.
 *
 * The secret `service_role` key is never used by this app and must never be
 * committed or sent to the client.
 *
 * Nothing here throws at import time, so a misconfiguration cannot break the
 * production build — read queries degrade to empty results and admin actions
 * surface a clear error.
 */

const DEFAULT_SUPABASE_URL = "https://mxhizzppbxfgcxytrzrj.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_DKnjUSbNBGYDkyPPYkiZ8w_YveObPDD";

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export function assertSupabaseConfigured(): void {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.");
  }
}
