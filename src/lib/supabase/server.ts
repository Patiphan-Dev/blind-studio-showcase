import { cookies } from "next/headers";

import { createServerClient } from "@supabase/ssr";

import {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  assertSupabaseConfigured,
} from "./config";

/**
 * Supabase client for Server Components, Server Actions and Route Handlers.
 * Cookie writes from Server Components are swallowed — session refresh is
 * handled by the proxy (middleware) instead.
 *
 * Throws if Supabase is not configured; every caller either wraps this in a
 * try/catch that degrades gracefully, or reports the error to the admin.
 */
export async function createClient() {
  assertSupabaseConfigured();
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component — safe to ignore, proxy refreshes.
        }
      },
    },
  });
}
