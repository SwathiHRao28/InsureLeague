import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { individualProducts, getProductBySlug } from "@/data/products";
import { PolicyPageTemplate } from "@/components/PolicyPageTemplate";

export function generateStaticParams() {
  return individualProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug("individual", slug);
  if (!product) return {};
  return { title: product.name, description: product.summary };
}

export default async function IndividualProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug("individual", slug);
  if (!product) notFound();
  return <PolicyPageTemplate product={product} />;
}
