import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Navigation } from "lucide-react";
import { CallbackForm } from "@/components/forms/CallbackForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with InsureLeague for corporate or individual insurance advisory.",
};

const OFFICE_ADDRESS = "10/106, 10th Main, 11th A Cross Rd, Malleshwaram, Bengaluru, Karnataka 560003";
const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=" + encodeURIComponent(OFFICE_ADDRESS) + "&output=embed";
const MAPS_LINK = "https://maps.app.goo.gl/wL4PTLL2TmEDZHPf6";

const details = [
  { icon: Phone, label: "Phone", value: "+91 12345 67890", href: "tel:+911234567890" },
  { icon: Mail, label: "Email", value: "hello@insureleague.com", href: "mailto:hello@insureleague.com" },
  { icon: MapPin, label: "Office", value: OFFICE_ADDRESS },
  { icon: Clock, label: "Hours", value: "Mon – Sat, 9 AM – 7 PM" },
];


export default function ContactPage() {
  return (
    <div className="pb-16 pt-10 sm:pb-20 lg:pb-24">
      <div className="container-page grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Contact</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">We&apos;d love to hear from you</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Reach out directly, or fill in the form and we&apos;ll call you back.
          </p>

          <div className="relative mt-8 overflow-hidden rounded-3xl border border-border">
            <iframe
              src={MAPS_EMBED_URL}
              className="h-72 w-full grayscale-[15%]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="InsureLeague office location"
            />
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-4 top-4 max-w-[75%] rounded-2xl bg-white p-4 shadow-lg"
            >
              <p className="text-sm font-semibold text-foreground">InsureLeague</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{OFFICE_ADDRESS}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                <Navigation className="h-3 w-3" /> Get directions
              </span>
            </a>
          </div>

          <ul className="mt-8 space-y-5">
            {details.map((d) => (
              <li key={d.label} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <d.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{d.label}</p>
                  {d.href ? (
                    <a href={d.href} className="text-sm font-medium text-foreground hover:text-primary">
                      {d.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium leading-relaxed text-foreground">{d.value}</p>
                  )}
                </div>
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
