export type NavIconName =
  | "Shield"
  | "UserCheck"
  | "Users"
  | "Lock"
  | "HardHat"
  | "FileText"
  | "PersonStanding"
  | "HeartPulse";

export interface NavItem {
  label: string;
  href: string;
  icon: NavIconName;
}

export interface NavGroup {
  label: string;
  seeAllHref: string;
  items: NavItem[];
}

export const corporateNav: NavGroup = {
  label: "Corporate",
  seeAllHref: "/corporate",
  items: [
    { label: "Keyman Insurance", href: "/corporate/keyman-insurance", icon: "Shield" },
    {
      label: "Director's Liability Insurance",
      href: "/corporate/directors-liability-insurance",
      icon: "UserCheck",
    },
    {
      label: "Employer Employee Insurance",
      href: "/corporate/employer-employee-insurance",
      icon: "Users",
    },
    {
      label: "Cybersecurity Insurance",
      href: "/corporate/cybersecurity-insurance",
      icon: "Lock",
    },
    { label: "Project Insurance", href: "/corporate/project-insurance", icon: "HardHat" },
  ],
};

export const individualNav: NavGroup = {
  label: "Individuals",
  seeAllHref: "/individual",
  items: [
    { label: "Term Plans", href: "/individual/term-plans", icon: "FileText" },
    {
      label: "Retirement Plans",
      href: "/individual/retirement-plans",
      icon: "PersonStanding",
    },
    { label: "Health Insurance", href: "/individual/health-insurance", icon: "HeartPulse" },
  ],
};

export const primaryNavLinks = [
  { label: "About us", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Contact us", href: "/contact" },
];

export const secondaryNavLinks = [
  { label: "Employee Benefits", href: "/employee-benefits" },
  { label: "Our partners", href: "/partners" },
];

// Insurance category -> product dependent-dropdown mapping used by the callback form.
export const insuranceCategoryOptions = [
  { value: "corporate", label: "Corporate" },
  { value: "individual", label: "Individual" },
  { value: "employee-benefits", label: "Employee Benefits" },
] as const;

export const insuranceProductOptions: Record<string, { value: string; label: string }[]> = {
  corporate: [
    { value: "keyman-insurance", label: "Keyman Insurance" },
    { value: "directors-liability-insurance", label: "Director's Liability Insurance" },
    { value: "employer-employee-insurance", label: "Employer Employee Insurance" },
    { value: "cybersecurity-insurance", label: "Cybersecurity Insurance" },
    { value: "project-insurance", label: "Project Insurance" },
  ],
  individual: [
    { value: "term-plans", label: "Term Plans" },
    { value: "retirement-plans", label: "Retirement Plans" },
    { value: "health-insurance", label: "Health Insurance" },
  ],
  "employee-benefits": [
    { value: "group-health", label: "Group Health Cover" },
    { value: "group-term-life", label: "Group Term Life" },
    { value: "group-personal-accident", label: "Group Personal Accident" },
  ],
};

export const callbackTimeOptions = [
  { value: "morning", label: "Morning (9 AM – 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM – 4 PM)" },
  { value: "evening", label: "Evening (4 PM – 7 PM)" },
] as const;
