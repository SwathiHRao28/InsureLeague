"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, ArrowRight, Home, LockKeyhole } from "lucide-react";
import { Logo } from "@/components/Logo";
import {
  corporateNav,
  individualNav,
  primaryNavLinks,
  secondaryNavLinks,
  type NavGroup,
} from "@/data/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const rowClass =
  "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-semibold text-foreground transition-colors hover:bg-muted";

// Slide-in side panel for phones and tablets.
// Rendered into <body> through a portal: the sticky header uses backdrop-blur, which would otherwise
// trap this fixed-position panel inside the header's 64px height.
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<"corporate" | "individual" | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // Close when the page changes.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Stop the page behind from scrolling, and close on Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const group = (key: "corporate" | "individual", nav: NavGroup) => (
    <div>
      <button
        type="button"
        className={cn(rowClass, expanded === key && "text-primary")}
        onClick={() => setExpanded(expanded === key ? null : key)}
        aria-expanded={expanded === key}
      >
        {nav.label}
        <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", expanded === key && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {expanded === key && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-3 overflow-hidden border-l-2 border-primary/20 pl-3"
          >
            {nav.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-lg px-3 py-2.5 text-[15px] text-foreground/80 hover:bg-muted hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={nav.seeAllHref}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-[15px] font-semibold text-primary"
              >
                See all <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 z-[70] flex h-[100dvh] w-[86%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
              <Link href="/" onClick={onClose} aria-label="InsureLeague home">
                <Logo size="sm" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full p-2 text-foreground hover:bg-muted"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
              <Link href="/" onClick={onClose} className={rowClass}>
                <span className="inline-flex items-center gap-2.5">
                  <Home className="h-5 w-5 text-primary" />
                  Home
                </span>
              </Link>
              {group("corporate", corporateNav)}
              {group("individual", individualNav)}
              {[...secondaryNavLinks, ...primaryNavLinks].map((link) => (
                <Link key={link.href} href={link.href} onClick={onClose} className={rowClass}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="shrink-0 space-y-3 border-t border-border bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Link
                href="/consultation"
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Request a callback
              </Link>
              <Link
                href="/admin/login"
                onClick={onClose}
                className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <LockKeyhole className="h-4 w-4" />
                Admin login
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
