import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Shield, UserCheck, Users, Lock, HardHat, FileCheck, PiggyBank } from "lucide-react";
import { corporateProducts } from "@/data/products";
import corporateHero from "@/images/1.jpeg";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Corporate Insurance",
  description: "Insurance solutions for businesses — Keyman, D&O, Employer-Employee, Cyber, and Project insurance.",
};

const icons = { Shield, UserCheck, Users, Lock, HardHat, FileCheck, PiggyBank };
const iconBySlug: Record<string, keyof typeof icons> = {
  "keyman-insurance": "Shield",
  "directors-liability-insurance": "UserCheck",
  "employer-employee-insurance": "Users",
  "cybersecurity-insurance": "Lock",
  "project-insurance": "HardHat",
  "surety-bonds": "FileCheck",
  "gratuity-investments": "PiggyBank",
};

export default function CorporatePage() {
  return (
    <div>
      <PageHero
        eyebrow="For Businesses"
        title="Corporate Insurance Solutions"
        image={corporateHero}
        imageAlt="Corporate insurance solutions"
        description={
          <>
            Protect your people, leadership, and operations with insurance built for how modern businesses run.
          </>
        }
      />

      <section className="section-padding">
        <Reveal className="container-page flex flex-wrap justify-center gap-5">
          {corporateProducts.map((product) => {
            const Icon = icons[iconBySlug[product.slug]];
            return (
              <Link
                key={product.slug}
                href={`/corporate/${product.slug}`}
                className="group flex w-full items-start gap-4 rounded-2xl border border-border bg-white p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <h2 className="text-lg font-semibold leading-snug text-foreground">{product.name}</h2>
                {product.tagline ? <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{product.tagline}</p> : null}
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Learn more{" "}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </Reveal>
      </section>
    </div>
  );
}
