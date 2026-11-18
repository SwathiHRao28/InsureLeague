import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ShieldCheck, Users2, TrendingUp, HeartHandshake, FileCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import servicesImg from "@/images/6.jpeg";

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
      <PageHero
        eyebrow="What we do"
        title="Insurance advisory, end to end"
        image={servicesImg}
        imageAlt="InsureLeague office"
        description={
          <>
            From the first risk assessment to claims support, InsureLeague stays with you through
            the full lifecycle of your insurance needs.
          </>
        }
      />

      <section className="section-padding">
        <Reveal className="container-page flex flex-wrap justify-center gap-6">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group flex w-full flex-col rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <s.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-xl font-semibold text-foreground">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary">
                Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </Reveal>
      </section>
    </div>
  );
}
