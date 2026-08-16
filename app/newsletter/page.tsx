import type { Metadata } from "next";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe to InsureLeague's newsletter for insurance insights and updates.",
};

export default function NewsletterPage() {
  return (
    <div className="section-padding">
      <div className="container-page max-w-2xl text-center">
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
  );
}
