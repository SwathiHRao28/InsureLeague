"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, ArrowRight, Home, LockKeyhole } from "lucide-react";
import {
  corporateNav,
  individualNav,
  primaryNavLinks,
  secondaryNavLinks,
} from "@/data/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<"corporate" | "individual" | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-foreground/40 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 z-[70] flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white shadow-xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-5">
              <span className="font-serif text-lg font-semibold text-foreground">Menu</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-lg p-2 text-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 px-5 py-4">
              <Link
                href="/"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="/admin/login"
                onClick={onClose}
                className="mt-2 inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <LockKeyhole className="h-4 w-4" />
                Admin login
              </Link>
              <div className="border-b border-border py-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-2 text-left text-sm font-semibold text-foreground"
                  onClick={() => setExpanded(expanded === "corporate" ? null : "corporate")}
                  aria-expanded={expanded === "corporate"}
                >
                  Corporate
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      expanded === "corporate" && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {expanded === "corporate" && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-2"
                    >
                      {corporateNav.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="block py-2 text-sm text-foreground/80 hover:text-primary"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={corporateNav.seeAllHref}
                          onClick={onClose}
                          className="inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-primary"
                        >
                          See all <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-b border-border py-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-2 text-left text-sm font-semibold text-foreground"
                  onClick={() => setExpanded(expanded === "individual" ? null : "individual")}
                  aria-expanded={expanded === "individual"}
                >
                  Individuals
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      expanded === "individual" && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {expanded === "individual" && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-2"
                    >
                      {individualNav.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="block py-2 text-sm text-foreground/80 hover:text-primary"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={individualNav.seeAllHref}
                          onClick={onClose}
                          className="inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-primary"
                        >
                          See all <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {secondaryNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="border-b border-border py-3 text-sm font-semibold text-foreground"
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-2 flex flex-col gap-1">
                {primaryNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="py-3 text-sm font-medium text-foreground/80"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Link
                href="/consultation"
                onClick={onClose}
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Request a callback
              </Link>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
