import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import partnersImg from "@/images/11.jpeg";

export const metadata: Metadata = {
  title: "Our Partners",
  description: "InsureLeague works with a panel of leading insurers to give you independent, unbiased recommendations.",
};

type Partner = { name: string; category: "life" | "general" };

const partners: Partner[] = [
  { name: "HDFC Life", category: "life" },
  { name: "ICICI Prudential", category: "life" },
  { name: "SBI Life", category: "life" },
  { name: "Max Life", category: "life" },
  { name: "Tata AIG", category: "general" },
  { name: "Bajaj Allianz", category: "general" },
  { name: "Star Health", category: "general" },
  { name: "Care Health", category: "general" },
  { name: "Niva Bupa", category: "general" },
  { name: "Reliance General", category: "general" },
];

const lifePartners = partners.filter((p) => p.category === "life");
const generalPartners = partners.filter((p) => p.category === "general");

export default function PartnersPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our Network"
        title="A panel of leading insurers"
        image={partnersImg}
        imageAlt="Bridge at sunrise"
        description={
          <>
            We work across a wide panel of insurers so our recommendations are based on fit, not
            affiliation.
          </>
        }
      />

      <section className="section-padding">
        <Reveal className="container-page space-y-12">
          <PartnerGroup title="Life & Corporate Insurance Partners" partners={lifePartners} />
          <PartnerGroup title="General Insurance Partners" partners={generalPartners} />

          <div className="flex items-start gap-3 rounded-2xl bg-muted p-6">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              The insurers featured on this page represent our partner network and do not
              constitute an endorsement or recommendation of any specific insurer or product. We do
              not promote or push a particular insurance solution; options are evaluated and
              compared based on your individual requirements, coverage needs, and suitability.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function PartnerGroup({ title, partners }: { title: string; partners: Partner[] }) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="flex-1 border-t border-border" />
        <h2 className="eyebrow text-center">{title}</h2>
        <span className="flex-1 border-t border-border" />
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-6">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="flex h-24 w-[calc(50%-0.5rem)] items-center justify-center gap-3 rounded-2xl border border-border bg-white px-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-primary">
              {partner.name.charAt(0)}
            </span>
            <span className="text-sm font-semibold text-foreground">{partner.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

