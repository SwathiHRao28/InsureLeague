export interface ProductFeature {
  title: string;
  description: string;
}

export interface Product {
  slug: string;
  category: "corporate" | "individual";
  name: string;
  tagline: string;
  summary: string;
  heroPoints: string[];
  features: ProductFeature[];
  whoItsFor: string[];
  faqs: { question: string; answer: string }[];
}

export const corporateProducts: Product[] = [
  {
    slug: "keyman-insurance",
    category: "corporate",
    name: "Keyman Insurance",
    tagline: "Protect your business against the loss of critical talent.",
    summary:
      "Keyman Insurance safeguards your company's financial stability if a key employee, founder, or director is unable to work due to death or critical illness.",
    heroPoints: [
      "Covers financial loss from losing key personnel",
      "Premiums may be tax-deductible as a business expense",
      "Flexible sum assured based on the individual's contribution to revenue",
    ],
    features: [
      {
        title: "Business continuity",
        description: "Provides funds to cover revenue loss, recruitment, and training of a replacement.",
      },
      {
        title: "Creditor confidence",
        description: "Reassures lenders and investors that the business can withstand key-person risk.",
      },
      {
        title: "Flexible structuring",
        description: "Can be structured as term or whole-of-life cover depending on business needs.",
      },
    ],
    whoItsFor: ["Founders and promoters", "Companies reliant on a specific technical expert", "Family businesses with a single key decision-maker"],
    faqs: [
      {
        question: "Who owns a Keyman Insurance policy?",
        answer: "The company is typically both the proposer and beneficiary, since the financial loss is borne by the business.",
      },
      {
        question: "Is the premium tax-deductible?",
        answer: "In many cases yes, subject to conditions under the Income Tax Act — we'll help you confirm eligibility with your CA.",
      },
    ],
  },
  {
    slug: "directors-liability-insurance",
    category: "corporate",
    name: "Director's Liability Insurance",
    tagline: "Shield your leadership from personal financial exposure.",
    summary:
      "Directors & Officers (D&O) Liability Insurance protects directors and senior officers from personal losses if sued for actual or alleged wrongful acts while managing the company.",
    heroPoints: [
      "Covers legal defence costs and settlements",
      "Protects personal assets of directors and officers",
      "Essential for companies raising external capital",
    ],
    features: [
      { title: "Legal defence cost cover", description: "Pays for legal representation in regulatory and shareholder actions." },
      { title: "Personal asset protection", description: "Shields directors' personal wealth from claims arising from company decisions." },
      { title: "Regulatory investigation cover", description: "Extends to costs incurred during SEBI, MCA or other regulatory inquiries." },
    ],
    whoItsFor: ["Listed and soon-to-be-listed companies", "Startups with institutional investors", "Non-profit and society board members"],
    faqs: [
      {
        question: "Does D&O cover fraud?",
        answer: "Deliberate fraud is typically excluded, but the policy covers legal costs until fraud is proven in a final adjudication.",
      },
    ],
  },
  {
    slug: "employer-employee-insurance",
    category: "corporate",
    name: "Employer Employee Insurance",
    tagline: "A tax-efficient way to reward and retain your best people.",
    summary:
      "A life insurance policy where the employer pays premiums on behalf of an employee, used as a retention and reward tool with tax advantages for both parties.",
    heroPoints: [
      "Boosts employee retention for key roles",
      "Structured for tax efficiency for employer and employee",
      "Ownership can be transferred to the employee after a vesting period",
    ],
    features: [
      { title: "Retention tool", description: "Long vesting periods encourage employees to stay with the company." },
      { title: "Tax efficiency", description: "Premiums may qualify as a business expense; payouts can be tax-advantaged for the employee." },
      { title: "Customisable vesting", description: "Design vesting schedules aligned to your retention strategy." },
    ],
    whoItsFor: ["Companies rewarding senior leadership", "Family businesses transitioning ownership", "High-growth companies competing for talent"],
    faqs: [
      { question: "Who pays the premium?", answer: "The employer pays the premium on behalf of the employee as part of their compensation structure." },
    ],
  },
  {
    slug: "cybersecurity-insurance",
    category: "corporate",
    name: "Cybersecurity Insurance",
    tagline: "Financial protection against data breaches and cyberattacks.",
    summary:
      "Covers the costs of responding to data breaches, ransomware, business interruption from cyberattacks, and third-party liability from data loss.",
    heroPoints: [
      "First-party costs: forensics, notification, PR",
      "Third-party liability from data breaches",
      "Business interruption from system downtime",
    ],
    features: [
      { title: "Incident response", description: "Covers forensic investigation, legal counsel, and customer notification costs." },
      { title: "Ransomware cover", description: "Financial support for ransom negotiation and system recovery." },
      { title: "Regulatory fines", description: "Cover for defence costs and, where insurable, fines under data protection laws." },
    ],
    whoItsFor: ["E-commerce and fintech companies", "Companies handling customer PII", "SaaS businesses with cloud infrastructure"],
    faqs: [
      { question: "Does this cover ransomware payments?", answer: "Many policies include ransomware cover as an add-on — we'll match you to a policy that fits your risk profile." },
    ],
  },
  {
    slug: "project-insurance",
    category: "corporate",
    name: "Project Insurance",
    tagline: "Comprehensive cover for construction and infrastructure projects.",
    summary:
      "Protects contractors, developers, and project owners against physical loss, damage, and third-party liability during the course of a construction or infrastructure project.",
    heroPoints: [
      "Covers physical damage during construction",
      "Third-party liability at the project site",
      "Delay-in-start-up cover available",
    ],
    features: [
      { title: "All-risk construction cover", description: "Protects against fire, flood, and accidental damage on site." },
      { title: "Third-party liability", description: "Covers injury or property damage claims from the public during construction." },
      { title: "Advance loss of profit", description: "Optional cover for delayed project completion and revenue impact." },
    ],
    whoItsFor: ["Real estate developers", "EPC and infrastructure contractors", "Project finance lenders requiring cover as a condition"],
    faqs: [
      { question: "Can cover be arranged for a single project?", answer: "Yes — project-specific policies are common and are tailored to project duration and value." },
    ],
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
    heroPoints: [
      "Disciplined, long-term wealth accumulation",
      "Guaranteed or market-linked annuity options",
      "Tax benefits on contributions",
    ],
    features: [
      { title: "Corpus accumulation", description: "Systematic contributions grow through the accumulation phase." },
      { title: "Annuity choices", description: "Choose immediate or deferred annuity, with options for spousal continuation." },
      { title: "Inflation-aware planning", description: "We help you model a corpus that accounts for inflation over your retirement horizon." },
    ],
    whoItsFor: ["Individuals 10+ years from retirement", "Self-employed professionals without EPF", "Anyone wanting a guaranteed post-retirement income"],
    faqs: [
      { question: "When should I start a retirement plan?", answer: "The earlier the better — starting in your 30s significantly reduces the monthly contribution needed for the same retirement corpus." },
    ],
  },
  {
    slug: "term-plans",
    category: "individual",
    name: "Term Plans",
    tagline: "Pure protection for your family's financial future.",
    summary:
      "A term plan provides a large life cover at an affordable premium, ensuring your family stays financially secure in your absence.",
    heroPoints: [
      "High cover at low premium",
      "Optional riders for critical illness and accidental death",
      "Flexible payout options — lump sum or monthly income",
    ],
    features: [
      { title: "Pure protection", description: "No maturity benefit — 100% of the premium goes toward protecting your family." },
      { title: "Rider flexibility", description: "Add critical illness, accidental death, or waiver of premium riders." },
      { title: "Tax benefits", description: "Premiums qualify for deduction under Section 80C; payouts are tax-free under Section 10(10D)." },
    ],
    whoItsFor: ["Primary earners with dependents", "Individuals with home or business loans", "Young professionals starting a family"],
    faqs: [
      { question: "How much cover do I need?", answer: "A common rule of thumb is 10–15x your annual income, adjusted for liabilities and future goals — we'll help you calculate the right number." },
    ],
  },
  {
    slug: "health-insurance",
    category: "individual",
    name: "Health Insurance",
    tagline: "Comprehensive protection against rising medical costs.",
    summary:
      "Health insurance covers hospitalisation, treatment, and related medical expenses, protecting your savings from unexpected healthcare costs.",
    heroPoints: [
      "Cashless treatment at a wide hospital network",
      "Family floater and individual plan options",
      "Cover for pre-existing conditions after waiting period",
    ],
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
