import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, ShieldCheck } from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-muted/50">
      <div className="border-b border-border bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-primary">
              <ShieldCheck className="h-4 w-4" />
            </span>
            InsureLeague Admin
          </Link>
          <LogoutButton />
        </div>
      </div>
      <div className="container-page py-8">
        <nav className="mb-6 flex items-center gap-1 text-sm font-medium">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-foreground/80 hover:bg-white hover:text-primary"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </nav>
        {children}
      </div>
    </div>
  );
}
