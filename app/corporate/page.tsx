import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Shield, UserCheck, Users, Lock, HardHat } from "lucide-react";
import { corporateProducts } from "@/data/products";
import corporateHero from "@/images/1.jpeg";

export const metadata: Metadata = {
  title: "Corporate Insurance",
  description: "Insurance solutions for businesses — Keyman, D&O, Employer-Employee, Cyber, and Project insurance.",
};

const icons = { Shield, UserCheck, Users, Lock, HardHat };
const iconBySlug: Record<string, keyof typeof icons> = {
  "keyman-insurance": "Shield",
  "directors-liability-insurance": "UserCheck",
  "employer-employee-insurance": "Users",
  "cybersecurity-insurance": "Lock",
  "project-insurance": "HardHat",
};

export default function CorporatePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="grid items-stretch lg:grid-cols-[0.85fr_1fr]">
          <div className="container-page py-16 lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">For Businesses</p>
            <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">Corporate Insurance Solutions</h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Protect your people, leadership, and operations with insurance built for how modern
              businesses run.
            </p>
          </div>
          <div className="relative min-h-[280px] w-full lg:min-h-[420px]">
            <Image src={corporateHero} alt="Corporate insurance solutions" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/5 to-transparent" />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {corporateProducts.map((product) => {
            const Icon = icons[iconBySlug[product.slug]];
            return (
              <Link
                key={product.slug}
                href={`/corporate/${product.slug}`}
                className="group rounded-2xl border border-border p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-foreground">{product.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Learn more{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
