export interface ProductFeature {
  title: string;
  description?: string;
}

export interface Product {
  slug: string;
  category: "corporate" | "individual";
  name: string;
  tagline?: string;
  summary: string;
  features: ProductFeature[];
  featuresHeading?: string;
  whoItsFor: string[];
  whoItsForHeading?: string;
  faqs: { question: string; answer: string }[];
}

export const corporateProducts: Product[] = [
  {
    slug: "keyman-insurance",
    category: "corporate",
    name: "Key Man Insurance",
    tagline: "Protect your business against the loss of critical talent.",
    summary:
      "Key Man Insurance Safeguard's corporate revenue and stability against the loss of key personnel, founders, or directors with Keyman Insurance.",
    featuresHeading: "Benefits to the Business",
    features: [{ title: "Financial security" }, { title: "Business continuity" }, { title: "Helps in talent retention" }],
    whoItsForHeading: "Who is a Key Man",
    whoItsFor: ["Director", "Promoter", "Business Owner", "Any person critical to business operations and growth"],
    faqs: [
      {
        question: "Who owns a Keyman Insurance policy?",
        answer: "The company is typically both the proposer and beneficiary, since the financial loss is borne by the business.",
      },
      {
        question: "Is the premium tax-deductible?",
        answer: "Premium payments are treated as allowable business expenses pursuant to Section 34, Income Tax Act 2025",
      },
    ],
  },
  {
    slug: "directors-liability-insurance",
    category: "corporate",
    name: "Director's Liability Insurance",
    summary:
      "Directors & Officers (D&O) Liability policies are designed to respond to claims arising from alleged or actual wrongful acts in a managerial capacity.",
    featuresHeading: "What it will cover",
    features: [
      { title: "Legal Defence Costs" },
      { title: "Settlements / Damages, Subject to policy terms" },
      { title: "Personal Liability of Directors & Officers" },
    ],
    whoItsForHeading: "Who it Protects",
    whoItsFor: ["Directors, Promoters", "Key Managerial Personnel, CXO's", "Senior Officers"],
    faqs: [
      {
        question: "Does D&O cover fraud?",
        answer: "D&O insurance can defend a director against an allegation of fraud, but it cannot be used to insure the consequences of fraud that is proven.",
      },
    ],
  },
  {
    slug: "employer-employee-insurance",
    category: "corporate",
    name: "Employer Employee Insurance",
    summary:
      "A life insurance policy where the employer pays premiums on behalf of an employee, used as a retention and reward tool with tax advantages for the employer.",
    featuresHeading: "How it helps",
    features: [
      { title: "Companies rewarding senior leadership" },
      { title: "Benefits Employer by retaining the senior leadership" },
      { title: "Senior Leadership are benefitted from the returns of the policy" },
    ],
    whoItsForHeading: "Who can be given",
    whoItsFor: ["Senior Executives", "Business - Critical Personnel", "Promoters / Directors where eligible"],
    faqs: [{ question: "Who pays the premium?", answer: "The employer pays the premium on behalf of the employee as part of their compensation structure." }],
  },
  {
    slug: "cybersecurity-insurance",
    category: "corporate",
    name: "Cybersecurity Insurance",
    tagline: "Financial protection against data breaches and cyberattacks.",
    summary: "Cyber insurance protects a business against financial losses arising from cyber incidents, subject to the policy terms.",
    featuresHeading: "What it covers",
    features: [
      { title: "Incident response & forensic investigation" },
      { title: "Ransomware" },
      { title: "Business interruption etc" },
    ],
    whoItsForHeading: "Who needs it",
    whoItsFor: ["IT & Software Companies", "Manufacturers", "MSME's, Mid Sized & Large Corporates"],
    faqs: [
      {
        question: "Does this cover ransomware payments?",
        answer: "Ransomware can be insured, but only when Cyber Extortion/Ransomware cover is specifically included in the policy.",
      },
    ],
  },
  {
    slug: "project-insurance",
    category: "corporate",
    name: "Project Insurance",
    tagline: "Comprehensive cover for construction and infrastructure projects.",
    summary:
      "A financial safety net for projects against unexpected physical loss, damage and certain liabilities during the project period.",
    featuresHeading: "What it will cover",
    features: [{ title: "Protect the Project." }, { title: "Protect the Investment." }, { title: "Protect the Completion." }],
    whoItsForHeading: "Who needs it",
    whoItsFor: ["Infrastructure projects", "Construction companies", "Engineering & installation contractors etc"],
    faqs: [{ question: "Can cover be arranged for a single project?", answer: "Yes — project-specific policies are common and are tailored to project duration and value." }],
  },
  {
    slug: "surety-bonds",
    category: "corporate",
    name: "Surety Bonds",
    summary: "Releases your working capital. No need to invest in properties. No need to have Bank guarantees.",
    featuresHeading: "What it will cover",
    features: [],
    whoItsForHeading: "Who needs it",
    whoItsFor: [
      "Infrastructure companies",
      "Companies bidding for NHAI, Railway, BBMP and other government projects",
      "Companies with BBB+ rating",
    ],
    faqs: [],
  },
  {
    slug: "gratuity-investments",
    category: "corporate",
    name: "Gratuity Investments",
    summary: "Reduces liquidity problem in case of gratuity settlement. Generates a nominal interest income between 6 - 7 % *. * Conditions apply.",
    featuresHeading: "What it will cover",
    features: [{ title: "Investment of gratuity liability" }, { title: "Partial or full investment" }],
    whoItsForHeading: "Who needs it",
    whoItsFor: ["Any company with more than 10 employees"],
    faqs: [],
  },
];

export const individualProducts: Product[] = [
  {
    slug: "retirement-plans",
    category: "individual",
    name: "Retirement Plans",
    tagline: "Build a reliable income stream for your golden years.",
    summary:
      "Retirement and pension plans help you accumulate a corpus during your working years and convert it into a steady income after retirement.",
    featuresHeading: "Benefits",
    features: [
      { title: "Monthly / Quarterly / Half Yearly / Yearly Returns" },
      { title: "Non Taxable upto 5 Lakhs investment" },
      { title: "Fixed Guaranteed Returns - Protection from market linked volatility" },
    ],
    whoItsForHeading: "Who requires it",
    whoItsFor: ["Earning member above 35+ Years", "Self employed above 35+ Years", "Retired Individuals"],
    faqs: [
      {
        question: "When should I start a retirement plan?",
        answer: "Starting by 35+ Years age allows your money more time to grow, helping you build your desired retirement corpus with lower contributions.",
      },
    ],
  },
  {
    slug: "term-plans",
    category: "individual",
    name: "Term Plans",
    tagline: "Pure protection for your family's financial future.",
    summary:
      "A term plan provides a large life cover at an affordable premium, ensuring your family stays financially secure in your absence.",
    featuresHeading: "Benefits",
    features: [
      { title: "Death cover" },
      { title: "Critical illness, Waiver of Premium, Return of Premium, Accidental Death etc" },
      { title: "Death Benefit received by nominee is tax free" },
    ],
    whoItsForHeading: "Who needs it",
    whoItsFor: ["Salaried Individuals", "Business Owners & Self employed professionals", "Primary income earners"],
    faqs: [
      {
        question: "How much cover do I need?",
        answer: "A common benchmark is 15–25× annual income, tailored to your age, liabilities, dependants, and future financial goals. We help you determine the right level of cover.",
      },
    ],
  },
  {
    slug: "health-insurance",
    category: "individual",
    name: "Health Insurance",
    tagline: "Comprehensive protection against rising medical costs.",
    summary:
      "Health insurance covers hospitalisation, treatment, and related medical expenses, protecting your savings from unexpected healthcare costs.",
    features: [
      { title: "Cashless hospitalisation", description: "Wide network of hospitals for cashless treatment across India." },
      { title: "Family floater options", description: "A single sum insured shared across the family for cost efficiency." },
      { title: "No-claim bonus", description: "Sum insured increases for every claim-free year." },
    ],
    whoItsFor: ["Families without adequate employer cover", "Self-employed individuals", "Senior citizens needing dedicated cover"],
    faqs: [
      { question: "Are pre-existing diseases covered?", answer: "Yes, after a waiting period that typically ranges from 2–4 years depending on the policy and condition." },
    ],
  },
];

export const allProducts = [...corporateProducts, ...individualProducts];

export function getProductBySlug(category: "corporate" | "individual", slug: string) {
  const list = category === "corporate" ? corporateProducts : individualProducts;
  return list.find((p) => p.slug === slug);
}
