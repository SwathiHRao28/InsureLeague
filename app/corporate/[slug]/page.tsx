import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { corporateProducts, getProductBySlug } from "@/data/products";
import { PolicyPageTemplate } from "@/components/PolicyPageTemplate";

export function generateStaticParams() {
  return corporateProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug("corporate", slug);
  if (!product) return {};
  return { title: product.name, description: product.summary };
}

export default async function CorporateProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug("corporate", slug);
  if (!product) notFound();
  return <PolicyPageTemplate product={product} />;
}
