import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import { Reveal } from "@/components/Reveal";
import retirement8 from "@/images/8.jpeg";
import healthImage from "@/images/9.jpeg";
import termImage from "@/images/10.jpeg";
import keymanImage from "@/images/4.jpeg";
import directorsLiabilityImage from "@/images/5.jpeg";
import employerEmployeeImage from "@/images/7.jpeg";
import cybersecurityImage from "@/images/6.jpeg"; // placeholder, no dedicated asset yet
import projectInsuranceImage from "@/images/11.jpeg";

const productBackgrounds: Record<string, StaticImageData[]> = {
  "retirement-plans": [retirement8],
  "term-plans": [termImage],
  "health-insurance": [healthImage],
  "keyman-insurance": [keymanImage],
  "directors-liability-insurance": [directorsLiabilityImage],
  "employer-employee-insurance": [employerEmployeeImage],
  "cybersecurity-insurance": [cybersecurityImage],
  "project-insurance": [projectInsuranceImage],
};

export function PolicyPageTemplate({ product }: { product: Product }) {
  const whoItsForHeading = product.whoItsForHeading ?? "Who it protects";
  const featuresHeading = product.featuresHeading ?? "What it can cover";
  // Features with descriptions get their own detailed section; otherwise their titles
  // are shown once, in the summary card — so nothing on the page is repeated.
  const featuresHaveDetail = product.features.some((feature) => feature.description);
  const heroImage = productBackgrounds[product.slug]?.[0];

  const cards: { heading: string; body: React.ReactNode }[] = [
    { heading: "Why it matters", body: <p>{product.summary}</p> },
  ];
  if (product.whoItsFor.length > 0) {
    cards.push({ heading: whoItsForHeading, body: <BulletList items={product.whoItsFor} /> });
  }
  if (product.features.length > 0 && !featuresHaveDetail) {
    cards.push({ heading: featuresHeading, body: <BulletList items={product.features.map((f) => f.title)} /> });
  }
  const cardCols = cards.length === 3 ? "lg:grid-cols-3" : cards.length === 2 ? "lg:grid-cols-2" : "";

  return (
    <div>
      <section className="section-tint">
        <div className="container-page grid items-center gap-8 py-10 sm:py-12 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div>
            <p className="eyebrow">
              {product.category === "corporate" ? "Corporate Insurance" : "Individual Insurance"}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>
            {product.tagline ? (
              <p className="mt-4 text-lg leading-relaxed text-slate-600">{product.tagline}</p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary/95"
              >
                Request a callback <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={product.category === "corporate" ? "/corporate" : "/individual"}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-primary hover:text-primary"
              >
                View all {product.category} plans
              </Link>
            </div>
          </div>

          {heroImage ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-[0_24px_60px_rgba(15,23,42,0.12)] lg:aspect-[4/3]">
              <Image
                src={heroImage}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page space-y-10">
          <Reveal className={`grid gap-5 ${cardCols}`}>
            {cards.map((card, index) => (
              <div
                key={card.heading}
                className="rounded-3xl border border-border bg-white p-6 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="mb-4 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  <span className="inline-flex h-2.5 w-8 rounded-full bg-primary" />
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h2 className="text-xl font-semibold text-slate-950">{card.heading}</h2>
                <div className="mt-4 text-sm leading-relaxed text-slate-600">{card.body}</div>
              </div>
            ))}
          </Reveal>

          {featuresHaveDetail ? (
            <Reveal>
              <h2 className="text-2xl sm:text-3xl">{featuresHeading}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {product.features.map((feature) => (
                  <div key={feature.title} className="rounded-2xl border border-border bg-white p-5">
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    {feature.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </Reveal>
          ) : null}

          {product.faqs.length > 0 ? (
            <Reveal className="max-w-4xl">
              <h2 className="text-2xl sm:text-3xl">Frequently asked questions</h2>
              <div className="mt-6 space-y-4">
                {product.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-2xl border border-border bg-white p-5">
                    <h3 className="text-base font-semibold text-foreground">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : null}

          <Reveal className="rounded-3xl bg-gradient-to-br from-primary to-[#0B6E66] p-6 text-white shadow-[0_20px_50px_rgba(13,148,136,0.22)] sm:p-8">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  Not sure if this plan is right for you?
                </p>
                <p className="mt-2 text-lg font-semibold sm:text-xl">
                  Book a free consultation with our {product.name.toLowerCase()} experts.
                </p>
              </div>
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
              >
                Book a free consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}
