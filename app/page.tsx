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
import corporateServicesImg from "@/images/6.jpeg";
import individualServicesImg from "@/images/2.jpeg";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { Reveal } from "@/components/Reveal";

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
      <section className="section-tint relative overflow-hidden">
        <div className="container-page grid items-center gap-8 pb-20 pt-10 sm:pt-14 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:pb-24 lg:pt-16">
          <div>
            <p className="eyebrow">IRDAI-Approved Insurance Advisory</p>
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
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Request a callback <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Learn about us
              </Link>
            </div>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-[0_30px_70px_rgba(15,23,42,0.18)] lg:aspect-[5/4]">
            <Image
              src={bgOne}
              alt="Insurance advisory"
              fill
              priority
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/25 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <div className="container-page">
        <div className="relative z-10 -mt-12 rounded-3xl bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:p-6 lg:-mt-14">
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-border">
            <Stat icon={Award} value="35+ Years" label="of Experience" />
            <Stat icon={Star} value="Top Rated" label="on Google Reviews" />
            <Stat icon={ShieldCheck} value="IRDAI" label="Registered" />
            <Stat icon={Users2} value="12 Partners" label="Insurer Network" />
          </div>
        </div>
      </div>

      <section id="services" className="section-padding">
        <div className="container-page">
          <Reveal>
            <h2 className="max-w-xl text-3xl sm:text-4xl">Our services</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              End-to-end insurance advisory for businesses, employees, and individuals.
            </p>
          </Reveal>
          <Reveal className="mt-8 grid gap-6 sm:grid-cols-2">
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
          </Reveal>
          <Reveal className="mt-6 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary to-[#0B6E66] py-12 sm:py-14">
        <div className="container-page">
          <Reveal>
            <h2 className="text-2xl text-white sm:text-3xl">Why choose us?</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Compass, title: "Needs-Based Advisory" },
                { icon: Star, title: "Experienced Leadership" },
                { icon: ShieldCheck, title: "End-to-End Insurance Solutions" },
                { icon: Handshake, title: "Client-Centric Approach" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-5 py-5 backdrop-blur-sm transition-colors hover:bg-white/15"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-base font-semibold text-white">{item.title}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <ReviewCarousel />

      <section className="section-padding">
        <div className="container-page">
          <Reveal className="rounded-3xl bg-gradient-to-br from-primary to-[#0B6E66] px-6 py-12 text-center text-primary-foreground shadow-[0_24px_60px_rgba(13,148,136,0.25)] sm:px-16">
            <h2 className="text-3xl text-primary-foreground sm:text-4xl">
              Not sure which plan is right for you?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/90">
              Talk to one of our advisors — no obligation, no jargon, just clear guidance.
            </p>
            <Link
              href="/consultation"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
            >
              Request a callback <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
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
    <div className="flex flex-col items-center gap-2 px-2 text-center sm:flex-row sm:gap-3 sm:px-4 sm:py-1 sm:text-left lg:justify-center">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary sm:h-12 sm:w-12">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-serif text-base font-semibold leading-tight text-foreground sm:text-lg">{value}</p>
        <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{label}</p>
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
    <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[16/12] lg:aspect-[16/10]">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="mt-4 text-2xl font-semibold">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/90">{description}</p>
        <Link
          href={href}
          className="mt-5 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
        >
          {cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
