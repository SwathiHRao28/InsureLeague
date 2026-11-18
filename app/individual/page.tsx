import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FileText, PersonStanding, HeartPulse } from "lucide-react";
import { individualProducts } from "@/data/products";
import individualHero from "@/images/10.jpeg";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Individual Insurance",
  description: "Term, retirement, and health insurance plans for individuals and families.",
};

const icons = { FileText, PersonStanding, HeartPulse };
const iconBySlug: Record<string, keyof typeof icons> = {
  "term-plans": "FileText",
  "retirement-plans": "PersonStanding",
  "health-insurance": "HeartPulse",
};

export default function IndividualPage() {
  return (
    <div>
      <PageHero
        eyebrow="For Individuals"
        title="Insurance for you and your family"
        image={individualHero}
        imageAlt="Individual insurance solutions"
        description={
          <>
            Plans built around your life stage — protection, retirement, and health, in one place.
          </>
        }
      />

      <section className="section-padding">
        <Reveal className="container-page flex flex-wrap justify-center gap-5">
          {individualProducts.map((product) => {
            const Icon = icons[iconBySlug[product.slug]];
            return (
              <Link
                key={product.slug}
                href={`/individual/${product.slug}`}
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
