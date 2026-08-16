"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  UserCheck,
  Users,
  Lock,
  HardHat,
  FileText,
  PersonStanding,
  HeartPulse,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { NavGroup, NavIconName } from "@/data/navigation";

const iconMap: Record<NavIconName, LucideIcon> = {
  Shield,
  UserCheck,
  Users,
  Lock,
  HardHat,
  FileText,
  PersonStanding,
  HeartPulse,
};

export function NavDropdown({ group }: { group: NavGroup }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute left-0 top-full z-50 w-80 overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-lg"
    >
      <ul className="flex flex-col">
        {group.items.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-1 border-t border-border px-3 pt-2">
        <Link
          href={group.seeAllHref}
          className="inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-primary hover:underline"
        >
          See all
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
