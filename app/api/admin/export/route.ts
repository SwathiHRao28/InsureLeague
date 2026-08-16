import { NextResponse } from "next/server";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { logAdminAction } from "@/lib/audit-log";

const COLUMNS = [
  "id",
  "full_name",
  "phone",
  "email",
  "customer_type",
  "insurance_category",
  "insurance_product",
  "callback_time",
  "message",
  "status",
  "admin_notes",
  "created_at",
  "updated_at",
] as const;

function csvEscape(value: unknown): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const service = createServiceRoleClient();
  const { data, error } = await service
    .from("callback_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 });
  }

  const header = COLUMNS.join(",");
  const rows = (data || []).map((row) => COLUMNS.map((col) => csvEscape(row[col])).join(","));
  const csv = [header, ...rows].join("\n");

  await logAdminAction({
    action: "export_csv",
    adminEmail: user.email ?? null,
    details: { rowCount: data?.length ?? 0 },
  });

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="callback-requests-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
