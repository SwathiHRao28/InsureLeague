import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, HeartPulse, ShieldPlus, Ambulance } from "lucide-react";

export const metadata: Metadata = {
  title: "Employee Benefits",
  description: "Group health, life, and accident cover designed to attract and retain talent.",
};

const benefits = [
  { icon: HeartPulse, title: "Group Health Cover", description: "Cashless hospitalisation cover for employees and their families." },
  { icon: ShieldPlus, title: "Group Term Life", description: "Affordable life cover for your entire workforce at group rates." },
  { icon: Ambulance, title: "Group Personal Accident", description: "Financial protection against accidental death or disability." },
];

export default function EmployeeBenefitsPage() {
  return (
    <div>
      <section className="bg-accent/50 section-padding">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">For Employers</p>
          <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">Employee Benefits that help you retain talent</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Competitive employee benefits are one of the strongest levers for retention. We design
            group insurance programs that fit your headcount, budget, and growth plans.
          </p>
          <Link
            href="/consultation"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Talk to an advisor <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page grid gap-6 sm:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary">
                <b.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-foreground">{b.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
