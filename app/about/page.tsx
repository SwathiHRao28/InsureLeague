import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import { ShieldCheck, Target, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import aboutImg from "@/images/3.jpeg";
import induImg from "@/images/team/indu-ramanujam.jpeg";
import jaisimhaImg from "@/images/team/jaisimha-nuggehally-srinath.jpeg";

export const metadata: Metadata = {
  title: "About Us",
  description: "InsureLeague is an IRDAI-approved insurance marketing firm advising businesses and individuals since inception.",
};

const values = [
  { icon: ShieldCheck, title: "Independence", description: "We have partnered with 12 top insurance companies in India" },
  { icon: Target, title: "Precision", description: "Tailor made solution for every client" },
  { icon: Users, title: "Long-term relationships", description: "We provide dedicated support through every renewal, claim, and major milestone, ensuring value far beyond the initial sale." },
];

type Leader = { name: string; role: string; photo: StaticImageData; bio: string[] };

const leaders: Leader[] = [
  {
    name: "Indu Ramanujam",
    role: "Director",
    photo: induImg,
    bio: [
      "Indu Ramanujam is a Qualified Personal Finance Professional with over 10 years of experience in the finance industry, including 7 years as an individual insurance advisor. She is the Director of InsureLeague, an IRDAI-approved Insurance Marketing Firm, and has worked extensively with individuals, families and businesses in the areas of insurance and financial planning.",
      "Over the years, she has helped 500+ families, individuals and businesses assess their financial risks and choose suitable protection solutions. Her experience includes life and health insurance, term plans, MSME risk management, business continuity and income protection.",
      "She is also an experienced trainer and speaker, conducting sessions for professionals, entrepreneurs and business owners on insurance awareness, financial planning, women’s financial empowerment and business mindset.",
    ],
  },
  {
    name: "Jaisimha Nuggehally Srinath",
    role: "Director & Principal Officer",
    photo: jaisimhaImg,
    bio: [
      "Jaisimha Nuggehally Srinath is a seasoned banking and finance professional with 25 years of experience across leading financial institutions. A postgraduate from Symbiosis, Pune, he has held senior leadership positions with Development Bank of Singapore (Lakshmi Vilas Bank), Axis Bank and Sundaram Finance, gaining extensive experience across banking, financial services and business management.",
      "His expertise spans business development, strategic leadership, financial services and business growth, with a strong track record of building and scaling business verticals, establishing new lines of business and driving them towards sustainable profitability. He has been instrumental in identifying business opportunities, developing new markets and translating strategies into profitable business outcomes.",
      "As Promoter & Principal Officer of InsureLeague, he brings his extensive experience in financial services, business strategy and risk management to serve individuals, business owners and MSMEs with structured and customer-focused financial solutions.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About InsureLeague"
        title="Independent insurance advisory, built on trust."
        image={aboutImg}
        imageAlt="InsureLeague advisors in conversation"
        description={
          <>
            InsureLeague is an IRDAI-approved insurance marketing firm helping businesses and
            individuals across India make informed insurance decisions — free from bias toward
            any single insurer.
          </>
        }
      />

      <section className="section-padding">
        <Reveal className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl">Our approach</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We start with a risk assessment, not a product pitch. Whether you are protecting key
              business personnel or planning for your family&apos;s future, our advisors analyze options
              across a premium panel of insurers to find your exact fit. Our partnership does not end
              at checkout—we provide dedicated, ongoing support through every renewal and claim.
            </p>
          </div>
          <div className="grid gap-4">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4 rounded-2xl border border-border bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <v.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-padding section-tint">
        <div className="container-page">
          <Reveal className="text-center">
            <p className="eyebrow">Leadership</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Meet our directors</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {leaders.map((leader) => (
              <Reveal
                key={leader.name}
                className="flex flex-col rounded-3xl border border-border bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-8"
              >
                <div className="flex items-center gap-5">
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-accent sm:h-36 sm:w-32">
                    <Image
                      src={leader.photo}
                      alt={leader.name}
                      fill
                      sizes="128px"
                      placeholder="blur"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground sm:text-2xl">{leader.name}</h3>
                    <p className="eyebrow mt-2">{leader.role}</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4 border-t border-border pt-6">
                  {leader.bio.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
