import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { FloatingCall } from "@/components/FloatingCall";
import { BUSINESS, SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "InsureLeague | Corporate & Individual Insurance Advisory",
    template: "%s | InsureLeague",
  },
  description:
    "InsureLeague is an IRDAI-approved insurance marketing firm offering corporate and individual insurance advisory, risk management, and strategic protection solutions.",
  applicationName: "InsureLeague",
  openGraph: {
    type: "website",
    siteName: "InsureLeague",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

// Business details Google reads for local search ("insurance advisor Bengaluru", Maps, knowledge panel).
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  slogan: BUSINESS.slogan,
  description: BUSINESS.description,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo/insureleague-logo-original.png`,
  image: `${SITE_URL}/opengraph-image`,
  email: BUSINESS.email,
  telephone: BUSINESS.phones[0],
  contactPoint: BUSINESS.phones.map((telephone) => ({
    "@type": "ContactPoint",
    telephone,
    contactType: "customer service",
    areaServed: "IN",
  })),
  address: { "@type": "PostalAddress", ...BUSINESS.address },
  hasMap: BUSINESS.mapsUrl,
  areaServed: { "@type": "City", name: "Bengaluru" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd).replace(/</g, "\\u003c") }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCall />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
