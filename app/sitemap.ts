import type { MetadataRoute } from "next";
import { corporateProducts, individualProducts } from "@/data/products";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/corporate", priority: 0.9 },
    { path: "/individual", priority: 0.9 },
    { path: "/employee-benefits", priority: 0.9 },
    { path: "/services", priority: 0.8 },
    { path: "/consultation", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/partners", priority: 0.6 },
    { path: "/newsletter", priority: 0.4 },
    ...corporateProducts.map((p) => ({ path: `/corporate/${p.slug}`, priority: 0.7 })),
    ...individualProducts.map((p) => ({ path: `/individual/${p.slug}`, priority: 0.7 })),
  ];

  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
