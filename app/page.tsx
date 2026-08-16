import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Compass,
  Handshake,
  ShieldCheck,
  Star,
  Users2,
  TrendingUp,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import bgOne from "@/images/1.jpeg";
import founderStory from "@/images/3.jpeg";
import corporateServicesImg from "@/images/6.jpeg";
import individualServicesImg from "@/images/2.jpeg";
import { ReviewCarousel } from "@/components/ReviewCarousel";

const services = [
  {
    icon: Users2,
    title: "Corporate Insurance",
    description: "Keyman, D&O, employer-employee, cyber, and project insurance for businesses.",
    href: "/corporate",
  },
  {
    icon: HeartHandshake,
    title: "Individual & Family Plans",
    description: "Term, health, and retirement plans tailored to your life stage.",
    href: "/individual",
  },
  {
    icon: TrendingUp,
    title: "Employee Benefits",
    description: "Group health, life, and accident cover to attract and retain talent.",
    href: "/employee-benefits",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="grid items-stretch lg:grid-cols-[0.85fr_1fr]">
          <div className="container-page py-20 lg:py-28">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              IRDAI-Approved Insurance Advisory
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl">
              Insurance advice that puts your protection first.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              InsureLeague helps businesses and individuals navigate corporate and personal
              insurance with independent, unbiased advice — from Keyman insurance to health cover.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Request a callback <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Learn about us
              </Link>
            </div>
          </div>
          <div className="relative min-h-[420px] w-full lg:min-h-[640px]">
            <Image src={bgOne} alt="Insurance advisory" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/5 to-transparent" />
          </div>
        </div>

        <div className="container-page">
          <div className="relative z-10 -mt-16 rounded-3xl bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.15)] sm:p-8 lg:-mt-20">
            <div className="grid grid-cols-2 gap-6 divide-y divide-border sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-y-0">
              <Stat icon={Award} value="35+ Years" label="of Experience" />
              <Stat icon={Star} value="146 Reviews" label="with 5★ Rating" />
              <Stat icon={ShieldCheck} value="IRDAI" label="Registered" />
              <Stat icon={Users2} value="12 Partners" label="Insurer Network" />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-padding pt-20 bg-white">
        <div className="container-page">
          <h2 className="max-w-xl text-3xl sm:text-4xl">Our services</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            End-to-end insurance advisory for businesses, employees, and individuals.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <ServiceCard
              image={corporateServicesImg}
              title="Corporate Services"
              description="Keyman, D&O, employer-employee, cyber, and project insurance for businesses."
              href="/corporate"
              cta="Explore Corporate Services"
              icon={Users2}
            />
            <ServiceCard
              image={individualServicesImg}
              title="Individual Services"
              description="Term, health, and retirement plans tailored to your life stage."
              href="/individual"
              cta="Explore Individual Services"
              icon={HeartHandshake}
            />
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group h-full rounded-2xl border border-border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page grid gap-8 lg:grid-cols-[3fr_1fr]">
          <div className="overflow-hidden rounded-[2rem] bg-slate-950 shadow-xl">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image src={founderStory} alt="Our vision, our values" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-primary">Our story</p>
                  <h2 className="mt-3 max-w-xl text-3xl font-semibold">Our vision. Our values.</h2>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    className="inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Play video"
                  >
                    <span className="ml-1 text-3xl">▶</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-white p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.25em] text-primary">Why choose us?</p>
            <div className="mt-8 space-y-4">
              {[
                { icon: Compass, title: "Needs-Based Advisory" },
                { icon: Star, title: "Experienced Leadership" },
                { icon: ShieldCheck, title: "End-to-End Insurance Solutions" },
                { icon: Handshake, title: "Client-Centric Approach" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4 rounded-3xl border border-border bg-slate-50 px-5 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-base font-semibold text-foreground">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ReviewCarousel />

      <section className="section-padding">
        <div className="container-page rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground sm:px-16">
          <h2 className="text-3xl text-primary-foreground sm:text-4xl">
            Not sure which plan is right for you?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/90">
            Talk to one of our advisors — no obligation, no jargon, just clear guidance.
          </p>
          <Link
            href="/consultation"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary"
          >
            Request a callback <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-base font-serif font-semibold text-foreground sm:text-lg">{value}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function ServiceCard({
  image,
  title,
  description,
  href,
  cta,
  icon: Icon,
}: {
  image: StaticImageData;
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: LucideIcon;
}) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[3/4]">
      <Image src={image} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/10" />
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="mt-4 text-2xl font-semibold">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/85">{description}</p>
        <Link
          href={href}
          className="mt-6 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
        >
          {cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

