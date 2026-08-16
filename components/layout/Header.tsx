"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Home, LockKeyhole, Menu } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  corporateNav,
  individualNav,
  primaryNavLinks,
  secondaryNavLinks,
} from "@/data/navigation";
import { NavDropdown } from "./NavDropdown";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<"corporate" | "individual" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpenDropdown(null)}>
          <Image
            src="/images/logo/insureleague-logo.png"
            alt="InsureLeague — Securing Lives"
            width={240}
            height={80}
            priority
            className="h-16 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
          </Link>
          <Link
            href="/admin/login"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            aria-label="Admin login"
          >
            <LockKeyhole className="h-4 w-4" />
          </Link>
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Request a callback
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-foreground lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="hidden border-t border-border lg:block">
        <div
          className="mx-auto flex h-14 max-w-7xl items-center gap-10 px-4 sm:px-6 lg:px-8"
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <div className="relative">
            <button
              type="button"              onClick={() => setOpenDropdown(openDropdown === "corporate" ? null : "corporate")}              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors",
                openDropdown === "corporate" ? "text-primary" : "text-foreground/80 hover:text-primary"
              )}
              aria-expanded={openDropdown === "corporate"}
            >
              Corporate
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  openDropdown === "corporate" && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence>
              {openDropdown === "corporate" && <NavDropdown group={corporateNav} />}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              type="button"              onClick={() => setOpenDropdown(openDropdown === "individual" ? null : "individual")}              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors",
                openDropdown === "individual" ? "text-primary" : "text-foreground/80 hover:text-primary"
              )}
              aria-expanded={openDropdown === "individual"}
            >
              Individuals
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  openDropdown === "individual" && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence>
              {openDropdown === "individual" && <NavDropdown group={individualNav} />}
            </AnimatePresence>
          </div>

          {secondaryNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
