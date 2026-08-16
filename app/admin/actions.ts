"use server";

import { revalidatePath } from "next/cache";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { logAdminAction } from "@/lib/audit-log";
import { callbackStatusValues, type CallbackStatus } from "@/lib/validations/callback";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return user;
}

export async function updateRequestStatus(id: string, status: CallbackStatus) {
  const user = await requireAdmin();
  if (!callbackStatusValues.includes(status)) throw new Error("Invalid status");

  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("callback_requests")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error("Failed to update status");

  await logAdminAction({
    action: "status_update",
    adminEmail: user.email ?? null,
    targetId: id,
    details: { status },
  });

  revalidatePath("/admin");
  revalidatePath(`/admin/requests/${id}`);
}

export async function addRequestNote(id: string, note: string) {
  const user = await requireAdmin();
  if (!note.trim()) throw new Error("Note cannot be empty");

  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("callback_requests")
    .update({ admin_notes: note.trim(), updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error("Failed to save note");

  await logAdminAction({
    action: "note_added",
    adminEmail: user.email ?? null,
    targetId: id,
  });

  revalidatePath(`/admin/requests/${id}`);
}

export async function deleteRequest(id: string) {
  const user = await requireAdmin();

  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("callback_requests").delete().eq("id", id);

  if (error) throw new Error("Failed to delete request");

  await logAdminAction({
    action: "request_deleted",
    adminEmail: user.email ?? null,
    targetId: id,
  });

  revalidatePath("/admin");
}
