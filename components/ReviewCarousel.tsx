"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Loader2, PenLine, Star, X } from "lucide-react";
import { featuredReviews, type Review } from "@/data/reviews";

export function ReviewCarousel() {
  const [reviews, setReviews] = useState<Review[]>(featuredReviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [paused, setPaused] = useState(false);

  // Load customer-submitted reviews and show them before the featured ones.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews")
      .then((res) => (res.ok ? res.json() : { reviews: [] }))
      .then((data: { reviews?: Review[] }) => {
        if (cancelled || !data.reviews?.length) return;
        setReviews([...data.reviews, ...featuredReviews]);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (paused || formOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [reviews.length, paused, formOpen]);

  const handlePrev = () => setCurrentIndex((c) => (c - 1 + reviews.length) % reviews.length);
  const handleNext = () => setCurrentIndex((c) => (c + 1) % reviews.length);

  const handleSubmitted = (review: Review) => {
    setReviews((current) => [review, ...current]);
    setCurrentIndex(0);
    setFormOpen(false);
  };

  const review = reviews[currentIndex] ?? reviews[0];

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
              onClick={() => setFormOpen(true)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <PenLine className="h-4 w-4" /> Write a review
            </button>
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

        <div
          className="mt-8 rounded-3xl border border-border bg-muted p-8 shadow-sm sm:p-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Stars rating={review.rating} />
          <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-foreground">“{review.text}”</p>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-6">
            <div>
              <p className="text-base font-semibold text-foreground">{review.name}</p>
              {review.role && <p className="mt-1 text-sm text-muted-foreground">{review.role}</p>}
            </div>
            <p className="text-xs text-muted-foreground">
              {currentIndex + 1} / {reviews.length}
            </p>
          </div>
        </div>
      </div>

      {formOpen && <ReviewForm onClose={() => setFormOpen(false)} onSubmitted={handleSubmitted} />}
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-primary" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-4 w-4" fill={index < rating ? "currentColor" : "none"} />
      ))}
    </div>
  );
}

function ReviewForm({
  onClose,
  onSubmitted,
}: {
  onClose: () => void;
  onSubmitted: (review: Review) => void;
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, rating, text }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Something went wrong.");
        return;
      }
      toast.success("Thank you! Your review has been added.");
      onSubmitted(data.review);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-form-title"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 id="review-form-title" className="text-2xl font-semibold">
            Write a review
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Your rating</p>
            <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHover(value)}
                  className="text-primary"
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                >
                  <Star className="h-7 w-7" fill={value <= (hover || rating) ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Name *</span>
            <input
              required
              minLength={2}
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Role / Company (optional)</span>
            <input
              maxLength={80}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. HR Lead, BrightCorp"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Your review *</span>
            <textarea
              required
              minLength={10}
              maxLength={1000}
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Submit review
        </button>
      </form>
    </div>
  );
}
