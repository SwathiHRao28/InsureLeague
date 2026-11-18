import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// Called once a day by Vercel Cron (see vercel.json). Supabase pauses free-tier
// projects after ~7 days without database activity; this tiny read prevents that.
export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 503 });
  }

  try {
    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("reviews").select("id", { head: true, count: "exact" });
    if (error) throw error;
    return NextResponse.json({ ok: true, at: new Date().toISOString() });
  } catch (error) {
    console.error("Keep-alive error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
