import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ShieldCheck, Users2, TrendingUp, HeartHandshake, Search, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Corporate insurance, individual plans, employee benefits, and claims support from InsureLeague.",
};

const services = [
  { icon: ShieldCheck, title: "Corporate Insurance", description: "Keyman, D&O, employer-employee, cyber, and project insurance for businesses.", href: "/corporate" },
  { icon: HeartHandshake, title: "Individual & Family Plans", description: "Term, health, and retirement plans tailored to your life stage.", href: "/individual" },
  { icon: TrendingUp, title: "Employee Benefits", description: "Group health, life, and accident cover to attract and retain talent.", href: "/employee-benefits" },
  { icon: Users2, title: "Ongoing Advisory", description: "Support through renewals, policy changes, and claims — not just the first purchase.", href: "/consultation" },
  { icon: FileCheck, title: "Claims Assistance", description: "We help you navigate the claims process end-to-end when it matters most.", href: "/consultation" },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-accent/50 section-padding">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">What we do</p>
          <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">Insurance advisory, end to end</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            From the first risk assessment to claims support, InsureLeague stays with you through
            the full lifecycle of your insurance needs.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group rounded-2xl border border-border p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary">
                <s.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-foreground">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
