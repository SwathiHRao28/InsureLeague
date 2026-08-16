import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
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
  const overviewBullets = product.features.slice(0, 4).map((feature) => feature.title);

  return (
    <div>
      <section className="pt-10 pb-4">
        <div className="container-page">
          <div className="overflow-hidden rounded-[2rem] bg-white p-5 shadow-[0_40px_120px_rgba(15,23,42,0.08)]">
            <div className="grid gap-4 lg:grid-cols-[1.35fr_0.95fr] items-center">
              <div className="space-y-4 max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                  {product.category === "corporate" ? "Corporate Insurance" : "Individual Insurance"}
                </p>
                <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                  {product.name}
                </h1>
                <p className="text-lg leading-relaxed text-slate-600">{product.tagline}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/consultation"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/95"
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

              {productBackgrounds[product.slug]?.[0] ? (
  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-slate-100">
    <Image
      src={productBackgrounds[product.slug][0]}
      alt={product.name}
      fill
      className="object-cover"
      priority
    />
  </div>
) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0 pb-16 sm:pb-20 lg:pb-24">
        <div className="container-page">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-border bg-white p-6">
              <div className="mb-4 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                <span className="inline-flex h-2.5 w-8 rounded-full bg-primary" />01
              </div>
              <h3 className="text-xl font-semibold text-slate-950">Why it matters</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{product.summary}</p>
            </div>

            <div className="rounded-[2rem] border border-border bg-white p-6">
              <div className="mb-4 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                <span className="inline-flex h-2.5 w-8 rounded-full bg-primary" />02
              </div>
              <h3 className="text-xl font-semibold text-slate-950">Who it protects</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                {product.whoItsFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-border bg-white p-6">
              <div className="mb-4 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                <span className="inline-flex h-2.5 w-8 rounded-full bg-primary" />03
              </div>
              <h3 className="text-xl font-semibold text-slate-950">What it can cover</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                {overviewBullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container-page">
          <div className="rounded-[2rem] border border-border bg-white p-5 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">Not sure if this plan is right for you?</p>
                <p className="mt-3 text-lg font-semibold text-slate-950">
                  Book a free consultation with our {product.name.toLowerCase()} experts.
                </p>
              </div>
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center rounded-full border border-primary bg-primary px-8 py-4 text-sm font-semibold text-white transition hover:bg-primary/95"
              >
                Book a free consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl">Overview</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{product.summary}</p>

            <h2 className="mt-12 text-2xl">Key features</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {product.features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-border p-5">
                  <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-2xl">Frequently asked questions</h2>
            <div className="mt-6 space-y-4">
              {product.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl bg-muted p-5">
                  <h3 className="text-sm font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-10">
            <div className="rounded-2xl border border-border p-6">
              <h3 className="text-base font-semibold text-foreground">Highlights</h3>
              <ul className="mt-4 space-y-3">
                {product.heroPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border p-6">
              <h3 className="text-base font-semibold text-foreground">Who it&apos;s for</h3>
              <ul className="mt-4 space-y-2.5">
                {product.whoItsFor.map((who) => (
                  <li key={who} className="text-sm text-muted-foreground">
                    • {who}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
