import type { Metadata } from "next";
import { CallbackForm } from "@/components/forms/CallbackForm";
import { Clock, ShieldCheck, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "Request a Consultation",
  description: "Request a callback from an InsureLeague advisor — no obligation, no jargon.",
};

const reassurances = [
  { icon: PhoneCall, text: "A dedicated advisor calls you back — no call centre queues." },
  { icon: Clock, text: "Choose a time slot that works for you." },
  { icon: ShieldCheck, text: "No obligation. We only recommend what fits your situation." },
];

export default function ConsultationPage() {
  return (
    <div className="section-padding">
      <div className="container-page grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Get started</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">Request a consultation</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Tell us a little about what you need, and one of our advisors will call you back at a
            time that works for you.
          </p>
          <ul className="mt-8 space-y-4">
            {reassurances.map((r) => (
              <li key={r.text} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <r.icon className="h-4 w-4" />
                </span>
                {r.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8">
            <CallbackForm />
          </div>
        </div>
      </div>
    </div>
  );
}
