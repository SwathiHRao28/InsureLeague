import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { corporateNav, individualNav } from "@/data/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/logo/insureleague-logo.png"
            alt="InsureLeague"
            width={160}
            height={50}
            className="h-10 w-auto object-contain"
          />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            IRDAI-approved insurance marketing firm offering corporate and individual insurance
            advisory, risk management, and strategic protection solutions.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Corporate</h3>
          <ul className="mt-4 space-y-2.5">
            {corporateNav.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Individuals</h3>
          <ul className="mt-4 space-y-2.5">
            {individualNav.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/employee-benefits"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Employee Benefits
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Get in touch</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href="tel:+911234567890" className="hover:text-primary">
                +91 12345 67890
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href="mailto:hello@insureleague.com" className="hover:text-primary">
                hello@insureleague.com
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a
                href="https://maps.app.goo.gl/wL4PTLL2TmEDZHPf6"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                10/106, 10th Main, 11th A Cross Rd, Malleshwaram, Bengaluru, Karnataka 560003
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} InsureLeague. All rights reserved. IRDAI Registration No. XXXXXXX.
          </p>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
