"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

// One-tap call button, shown on phones and tablets only.
export function FloatingCall() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <a
      href="tel:+919845231663"
      aria-label="Call InsureLeague on 98452 31663"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_12px_30px_rgba(13,148,136,0.45)] transition-transform hover:scale-105 active:scale-95 lg:hidden"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-primary/40 [animation-duration:2.5s]" aria-hidden="true" />
      <Phone className="relative h-6 w-6" />
    </a>
  );
}
