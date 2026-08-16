import Link from "next/link";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { callbackStatusValues } from "@/lib/validations/callback";
import { formatDate } from "@/lib/utils";
import { Download, Search } from "lucide-react";
import { DeleteRequestButton } from "@/components/admin/DeleteRequestButton";

const PAGE_SIZE = 15;

interface SearchParams {
  q?: string;
  status?: string;
  sort?: string;
  page?: string;
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const params = await searchParams;
  const q = params.q?.trim() || "";
  const status = params.status || "";
  const sort = params.sort || "created_at.desc";
  const page = Math.max(1, parseInt(params.page || "1", 10) || 1);
  const [sortColumn, sortDirection] = sort.split(".");

  const service = createServiceRoleClient();

  // --- Stats ---
  const { data: allStatuses } = await service.from("callback_requests").select("status");
  const stats = {
    total: allStatuses?.length ?? 0,
    New: allStatuses?.filter((r) => r.status === "New").length ?? 0,
    Contacted: allStatuses?.filter((r) => r.status === "Contacted").length ?? 0,
    "In Progress": allStatuses?.filter((r) => r.status === "In Progress").length ?? 0,
    Completed: allStatuses?.filter((r) => r.status === "Completed").length ?? 0,
    Closed: allStatuses?.filter((r) => r.status === "Closed").length ?? 0,
  };

  // --- Query ---
  let query = service.from("callback_requests").select("*", { count: "exact" });

  if (q) {
    query = query.or(`full_name.ilike.%${q}%,phone.ilike.%${q}%,email.ilike.%${q}%`);
  }
  if (status) {
    query = query.eq("status", status);
  }
  query = query
    .order(sortColumn, { ascending: sortDirection === "asc" })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const { data: requests, count } = await query;
  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));

  function buildUrl(overrides: Partial<SearchParams>) {
    const merged = { q, status, sort, page: String(page), ...overrides };
    const usp = new URLSearchParams();
    if (merged.q) usp.set("q", merged.q);
    if (merged.status) usp.set("status", merged.status);
    if (merged.sort) usp.set("sort", merged.sort);
    if (merged.page && merged.page !== "1") usp.set("page", merged.page);
    const qs = usp.toString();
    return qs ? `/admin?${qs}` : "/admin";
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl">Callback requests</h1>
        <a
          href="/api/admin/export"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </a>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Total" value={stats.total} href={buildUrl({ status: "", page: "1" })} />
        {callbackStatusValues.map((s) => (
          <StatCard
            key={s}
            label={s}
            value={stats[s]}
            href={buildUrl({ status: s, page: "1" })}
            active={status === s}
          />
        ))}
      </div>

      <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center" action="/admin">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search by name, phone, or email"
            className="w-full rounded-xl border border-input bg-white py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          name="status"
          defaultValue={status}
          className="rounded-xl border border-input bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All statuses</option>
          {callbackStatusValues.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          name="sort"
          defaultValue={sort}
          className="rounded-xl border border-input bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="created_at.desc">Newest first</option>
          <option value="created_at.asc">Oldest first</option>
          <option value="full_name.asc">Name A–Z</option>
          <option value="status.asc">Status</option>
        </select>
        <button
          type="submit"
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Apply
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Category / Product</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests && requests.length > 0 ? (
              requests.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{r.full_name}</p>
                    <p className="text-xs text-muted-foreground">{r.email}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {r.insurance_category} / {r.insurance_product}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(r.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/requests/${r.id}`} className="font-semibold text-primary hover:underline">
                        View
                      </Link>
                      <DeleteRequestButton id={r.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                  No requests found for the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={buildUrl({ page: String(p) })}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                p === page ? "bg-primary text-primary-foreground" : "bg-white text-foreground/80 hover:bg-muted"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
  active,
}: {
  label: string;
  value: number;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-2xl border p-4 transition-colors ${
        active ? "border-primary bg-accent" : "border-border bg-white hover:bg-muted/50"
      }`}
    >
      <p className="text-2xl font-serif font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    New: "bg-accent text-primary",
    Contacted: "bg-warning/15 text-warning",
    "In Progress": "bg-warning/15 text-warning",
    Completed: "bg-success/15 text-success",
    Closed: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${colors[status] || "bg-muted"}`}>
      {status}
    </span>
  );
}
