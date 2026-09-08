import type { Metadata } from "next";
import { ShieldCheck, Target, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "InsureLeague is an IRDAI-approved insurance marketing firm advising businesses and individuals since inception.",
};

const values = [
  { icon: ShieldCheck, title: "Independence", description: "We have partnered with 12 top insurance companies in India" },
  { icon: Target, title: "Precision", description: "Tailor made solution for every client" },
  { icon: Users, title: "Long-term relationships", description: "We provide dedicated support through every renewal, claim, and major milestone, ensuring value far beyond the initial sale." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-accent/50 section-padding">
        <div className="container-page">
          <p className="text-sm font-semibold tracking-wide text-primary">About InsureLeague</p>
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
              We start with a risk assessment, not a product pitch. Whether you are protecting key
              business personnel or planning for your family&apos;s future, our advisors analyze options
              across a premium panel of insurers to find your exact fit. Our partnership does not end
              at checkout—we provide dedicated, ongoing support through every renewal and claim.
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
