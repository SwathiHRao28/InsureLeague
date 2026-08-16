import { createServiceRoleClient } from "@/lib/supabase/server";

type AuditAction =
  | "login"
  | "logout"
  | "login_failed"
  | "status_update"
  | "note_added"
  | "request_deleted"
  | "export_csv";

// Writes to admin_audit_log via the service-role client since the admin table
// itself is locked down to service-role only (RLS denies direct client writes).
export async function logAdminAction(params: {
  action: AuditAction;
  adminEmail: string | null;
  targetId?: string | null;
  details?: Record<string, unknown>;
  ip?: string | null;
}) {
  try {
    const supabase = createServiceRoleClient();
    await supabase.from("admin_audit_log").insert({
      action: params.action,
      admin_email: params.adminEmail,
      target_id: params.targetId ?? null,
      details: params.details ?? null,
      ip_address: params.ip ?? null,
    });
  } catch (error) {
    // Audit logging must never break the primary action.
    console.error("Failed to write audit log:", error);
  }
}
