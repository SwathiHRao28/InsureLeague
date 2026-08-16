import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Mail, Phone, Clock, Tag, MessageSquare } from "lucide-react";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { NotesForm } from "@/components/admin/NotesForm";
import { DeleteRequestButton } from "@/components/admin/DeleteRequestButton";
import type { CallbackStatus } from "@/lib/validations/callback";

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { id } = await params;
  const service = createServiceRoleClient();
  const { data: request } = await service.from("callback_requests").select("*").eq("id", id).single();

  if (!request) notFound();

  return (
    <div>
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl">{request.full_name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Received {formatDate(request.created_at)}</p>
        </div>
        <DeleteRequestButton id={request.id} redirectOnDelete="/admin" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Contact details
            </h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <DetailRow icon={Phone} label="Phone" value={request.phone} />
              <DetailRow icon={Mail} label="Email" value={request.email} />
              <DetailRow icon={Tag} label="Customer type" value={request.customer_type} />
              <DetailRow icon={Clock} label="Preferred time" value={request.callback_time} />
              <DetailRow icon={Tag} label="Insurance category" value={request.insurance_category} />
              <DetailRow icon={Tag} label="Insurance product" value={request.insurance_product} />
            </dl>
          </div>

          {request.message && (
            <div className="rounded-2xl border border-border bg-white p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                Customer message
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{request.message}</p>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Internal notes
            </h2>
            <div className="mt-4">
              <NotesForm id={request.id} initialNote={request.admin_notes} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Status</h2>
            <div className="mt-4">
              <StatusSelect id={request.id} initialStatus={request.status as CallbackStatus} />
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 text-xs text-muted-foreground">
            <p>Request ID: {request.id}</p>
            <p className="mt-1">Last updated: {formatDate(request.updated_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium capitalize text-foreground">{value}</p>
      </div>
    </div>
  );
}
