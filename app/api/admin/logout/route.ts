import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { logAdminAction } from "@/lib/audit-log";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase.auth.signOut();
  await logAdminAction({ action: "logout", adminEmail: user?.email ?? null });

  return NextResponse.json({ success: true });
}
