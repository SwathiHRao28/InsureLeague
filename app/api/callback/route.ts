import { NextRequest, NextResponse } from "next/server";
import { callbackFormSchema } from "@/lib/validations/callback";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { sendCallbackNotification } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // --- Rate limiting: prevent rapid duplicate submissions per IP ---
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateLimit = checkRateLimit(`callback:${ip}`, { limit: 3, windowMs: 60_000 });
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = callbackFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Honeypot tripped — silently pretend success so bots don't learn to adapt.
    if (parsed.data.website) {
      return NextResponse.json({ success: true });
    }

    const { website: _honeypot, ...formData } = parsed.data;

    const supabase = createServiceRoleClient();

    // --- Duplicate rapid submission guard: same phone number within 5 minutes ---
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: recentSubmissions } = await supabase
      .from("callback_requests")
      .select("id")
      .eq("phone", formData.phone)
      .gte("created_at", fiveMinutesAgo)
      .limit(1);

    if (recentSubmissions && recentSubmissions.length > 0) {
      return NextResponse.json(
        { error: "We've already received a request from this number recently. We'll be in touch soon." },
        { status: 429 }
      );
    }

    const { error: insertError } = await supabase.from("callback_requests").insert({
      full_name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      customer_type: formData.customerType,
      insurance_category: formData.insuranceCategory,
      insurance_product: formData.insuranceProduct,
      callback_time: formData.callbackTime,
      message: formData.message || null,
      status: "New",
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Something went wrong on our end. Please try again shortly." },
        { status: 500 }
      );
    }

    // Fire-and-forget style, but awaited so failures are logged — never blocks the
    // success response since sendCallbackNotification never throws.
    await sendCallbackNotification({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      customerType: formData.customerType,
      insuranceCategory: formData.insuranceCategory,
      insuranceProduct: formData.insuranceProduct,
      callbackTime: formData.callbackTime,
      message: formData.message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Callback submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
