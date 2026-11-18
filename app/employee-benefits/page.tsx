import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, HeartPulse, ShieldPlus, Ambulance } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import benefitsImg from "@/images/7.jpeg";

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
      <PageHero
        eyebrow="For Employers"
        title="Employee Benefits that help you retain talent"
        image={benefitsImg}
        imageAlt="Employer and employee shaking hands"
        description={
          <>
            Competitive employee benefits are one of the strongest levers for retention. We design
            group insurance programs that fit your headcount, budget, and growth plans.
          </>
        }
      >
        <Link
          href="/consultation"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
        >
          Talk to an advisor <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="section-padding">
        <Reveal className="container-page grid gap-6 sm:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary">
                <b.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-xl font-semibold text-foreground">{b.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
            </div>
          ))}
        </Reveal>
      </section>
    </div>
  );
}
