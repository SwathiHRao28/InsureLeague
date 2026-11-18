import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

// Shared top section for inner pages: text on the left, photo on the right,
// both aligned to the same container as the header and the rest of the page.
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  image: StaticImageData;
  imageAlt: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("section-tint", className)}>
      <div className="container-page grid items-center gap-8 py-10 sm:py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-14">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">{title}</h1>
          {description ? (
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{description}</p>
          ) : null}
          {children}
        </div>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-[0_24px_60px_rgba(15,23,42,0.12)] lg:aspect-[4/3]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
