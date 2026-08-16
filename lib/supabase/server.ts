import { createServerClient, type CookieOptionsWithName } from "@supabase/ssr";
import { cookies } from "next/headers";

type CookieToSet = { name: string; value: string; options?: CookieOptionsWithName };

// Use the anon key + user session cookies for anything running as the logged-in admin.
// RLS policies enforce least-privilege access — this client never bypasses RLS.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component without a mutable cookie store — safe to ignore
            // because middleware refreshes the session on every request.
          }
        },
      },
    }
  );
}

// Service-role client — ONLY used server-side for the public callback form insert,
// where there is no authenticated user but we still need to write to a protected table.
// Never import this in any client component or expose the key to the browser.
import { createClient as createServiceClient } from "@supabase/supabase-js";

export function createServiceRoleClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
