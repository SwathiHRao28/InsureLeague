// Single source of truth for the public site URL and business details used in SEO.
// Set NEXT_PUBLIC_SITE_URL to the live domain (e.g. https://insureleague.com) in Vercel.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const BUSINESS = {
  name: "InsureLeague",
  legalName: "Infinite Basket Insurance Marketing P Ltd",
  slogan: "Securing Lives",
  // Client-provided wording (same as the site's meta description) — do not rewrite.
  description:
    "InsureLeague is an IRDAI-approved insurance marketing firm offering corporate and individual insurance advisory, risk management, and strategic protection solutions.",
  email: "info@insureleague.com",
  phones: ["+91-98452-31663", "+91-99006-00661", "+91-80-2356-0205"],
  address: {
    streetAddress: "10/106, 10th Main, 11th A Cross Rd, Malleshwaram",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560003",
    addressCountry: "IN",
  },
  mapsUrl: "https://maps.app.goo.gl/wL4PTLL2TmEDZHPf6",
};
