"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const reviews = [
  {
    name: "Amit Sharma",
    role: "CFO, TechWorks",
    text: "InsureLeague guided us through the right corporate insurance options and made the entire process clear and efficient.",
  },
  {
    name: "Priya Reddy",
    role: "HR Lead, BrightCorp",
    text: "The team helped us choose employee benefit coverage that our staff truly values. The advisory was practical and responsive.",
  },
  {
    name: "Rohan Gupta",
    role: "Small Business Owner",
    text: "As a first-time buyer, I appreciated their patient explanations and the tailored health and retirement plan recommendations.",
  },
  {
    name: "Neha Singh",
    role: "Operations Head, GreenGrid",
    text: "Their corporate insurance solutions covered the gaps we didn’t even know existed. Highly professional and dependable.",
  },
  {
    name: "Kavita Joshi",
    role: "Marketing Director",
    text: "Fast response, easy claims guidance, and a team that genuinely cared about my family’s protection.",
  },
];

export function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((current) => (current - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((current) => (current + 1) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % reviews.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const review = reviews[currentIndex];

  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Client reviews</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">What our customers say</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Real feedback from businesses and individuals who chose InsureLeague for insurance advisory and protection.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Previous review"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Next review"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-border bg-muted p-8 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-center gap-2 text-primary">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-4 w-4" />
            ))}
          </div>
          <p className="mt-6 text-lg leading-relaxed text-foreground">“{review.text}”</p>
          <div className="mt-6 border-t border-border pt-6">
            <p className="text-base font-semibold text-foreground">{review.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{review.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
