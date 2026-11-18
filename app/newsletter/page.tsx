import type { Metadata } from "next";
import Image from "next/image";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Mail } from "lucide-react";
import newsletterImg from "@/images/5.jpeg";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe to InsureLeague's newsletter for insurance insights and updates.",
};

export default function NewsletterPage() {
  return (
    <section className="relative overflow-hidden">
      <Image src={newsletterImg} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B4A45]/90 via-[#0B6E66]/80 to-primary/70" />
      <div className="container-page relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white/95 p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur sm:p-12">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
            <Mail className="h-6 w-6" />
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl">Stay informed</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Get periodic insights on insurance planning, regulatory updates, and product launches —
            no spam, unsubscribe anytime.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
