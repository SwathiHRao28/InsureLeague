import type { Metadata } from "next";
import { ShieldCheck, Target, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "InsureLeague is an IRDAI-approved insurance marketing firm advising businesses and individuals since inception.",
};

const values = [
  { icon: ShieldCheck, title: "Independence", description: "We are not tied to a single insurer — recommendations are based on your needs, not commissions." },
  { icon: Target, title: "Precision", description: "Every recommendation is backed by a risk assessment specific to your situation." },
  { icon: Users, title: "Long-term relationships", description: "We stay with clients through renewals, claims, and life changes — not just the first sale." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-accent/50 section-padding">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">About InsureLeague</p>
          <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">Independent insurance advisory, built on trust.</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            InsureLeague is an IRDAI-approved insurance marketing firm helping businesses and
            individuals across India make informed insurance decisions — free from bias toward
            any single insurer.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl">Our approach</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We start every engagement with a risk assessment, not a product pitch. Whether
              you&apos;re a business protecting key personnel or a family planning for the future,
              our advisors compare offerings across our panel of insurers to find the plan that
              actually fits — and we stay involved through renewals and claims.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-1">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4 rounded-2xl border border-border p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <v.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
