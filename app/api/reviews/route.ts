import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  role: z
    .string()
    .trim()
    .max(80)
    .optional()
    .transform((v) => (v ? v : null)),
  rating: z.coerce.number().int().min(1).max(5),
  text: z.string().trim().min(10, "Review must be at least 10 characters.").max(1000),
});

function supabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function GET() {
  if (!supabaseConfigured()) return NextResponse.json({ reviews: [] });

  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, role, rating, text, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Reviews fetch error:", error);
      return NextResponse.json({ reviews: [] });
    }
    return NextResponse.json({ reviews: data ?? [] });
  } catch (error) {
    console.error("Reviews GET error:", error);
    return NextResponse.json({ reviews: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateLimit = checkRateLimit(`reviews:${ip}`, { limit: 3, windowMs: 10 * 60_000 });
    if (!rateLimit.success) {
      return NextResponse.json({ error: "Too many reviews submitted. Try again later." }, { status: 429 });
    }

    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message || "Please check your review and try again.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    if (!supabaseConfigured()) {
      return NextResponse.json({ error: "Reviews are temporarily unavailable." }, { status: 503 });
    }

    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("reviews")
      .insert(parsed.data)
      .select("id, name, role, rating, text, created_at")
      .single();

    if (error) {
      console.error("Review insert error:", error);
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ review: data });
  } catch (error) {
    console.error("Reviews POST error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
