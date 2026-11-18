"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Loader2, PenLine, Star, X } from "lucide-react";
import { featuredReviews, type Review } from "@/data/reviews";
import { cn } from "@/lib/utils";

const AVATAR_COLORS = [
  "bg-primary",
  "bg-[#0B6E66]",
  "bg-[#7FA81E]",
  "bg-[#0F766E]",
  "bg-[#4D7C0F]",
];
const LONG_REVIEW = 260;

export function ReviewCarousel() {
  const [reviews, setReviews] = useState<Review[]>(featuredReviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

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
    if (paused || formOpen || expanded.size > 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [reviews.length, paused, formOpen, expanded.size]);

  const handlePrev = () =>
    setCurrentIndex((c) => (c - 1 + reviews.length) % reviews.length);
  const handleNext = () => setCurrentIndex((c) => (c + 1) % reviews.length);

  const handleSubmitted = (review: Review) => {
    setReviews((current) => [review, ...current]);
    setCurrentIndex(0);
    setFormOpen(false);
  };

  const toggleExpanded = (id: string) =>
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // One review on phones, two on tablets, three on desktop.
  const visible = [0, 1, 2]
    .slice(0, Math.min(3, reviews.length))
    .map((offset) => (currentIndex + offset) % reviews.length);

  return (
    <section className="section-padding section-tint">
      <div className="container-page">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Client reviews</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              What our customers say
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed">
              Real feedback from businesses and individuals who chose
              InsureLeague for insurance advisory and protection.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="bg-primary text-primary-foreground shadow-primary/25 hover:bg-primary/90 inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5"
            >
              <PenLine className="h-4 w-4" /> Write a review
            </button>
            <button
              type="button"
              onClick={handlePrev}
              className="border-border text-foreground hover:border-primary hover:text-primary inline-flex h-11 w-11 items-center justify-center rounded-full border bg-white transition-colors"
              aria-label="Previous review"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="border-border text-foreground hover:border-primary hover:text-primary inline-flex h-11 w-11 items-center justify-center rounded-full border bg-white transition-colors"
              aria-label="Next review"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          className="mt-8 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {visible.map((reviewIndex, position) => {
            const review = reviews[reviewIndex];
            const isLong = review.text.length > LONG_REVIEW;
            const isOpen = expanded.has(review.id);
            return (
              <article
                key={`${review.id}-${position}`}
                className={cn(
                  "border-border flex h-full flex-col rounded-3xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
                  position === 1 && "hidden md:flex",
                  position === 2 && "hidden lg:flex"
                )}
              >
                <Stars rating={review.rating} />
                <p
                  className={cn(
                    "text-foreground mt-4 text-[15px] leading-relaxed whitespace-pre-line",
                    isLong && !isOpen && "line-clamp-6"
                  )}
                >
                  “{review.text}”
                </p>
                {isLong ? (
                  <button
                    type="button"
                    onClick={() => toggleExpanded(review.id)}
                    className="text-primary mt-2 w-fit text-sm font-semibold hover:underline"
                  >
                    {isOpen ? "Show less" : "Read more"}
                  </button>
                ) : null}
                <div className="mt-auto pt-5">
                  <div className="border-border flex items-center gap-3 border-t pt-5">
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white",
                        AVATAR_COLORS[reviewIndex % AVATAR_COLORS.length]
                      )}
                      aria-hidden="true"
                    >
                      {review.name.trim().charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="text-foreground truncate text-base font-semibold">
                        {review.name}
                      </p>
                      {review.role && (
                        <p className="text-muted-foreground truncate text-sm">
                          {review.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-1.5">
          {reviews.map((review, index) => (
            <button
              key={review.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show review ${index + 1} of ${reviews.length}`}
              className={cn(
                "h-2 rounded-full transition-all",
                index === currentIndex
                  ? "bg-primary w-6"
                  : "bg-primary/25 hover:bg-primary/50 w-2"
              )}
            />
          ))}
        </div>
      </div>

      {formOpen && (
        <ReviewForm
          onClose={() => setFormOpen(false)}
          onSubmitted={handleSubmitted}
        />
      )}
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-1 text-[#F5B301]"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="h-4 w-4"
          fill={index < rating ? "currentColor" : "none"}
        />
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
            className="text-muted-foreground hover:text-foreground rounded-full p-1"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-foreground mb-2 text-sm font-medium">
              Your rating
            </p>
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
                  <Star
                    className="h-7 w-7"
                    fill={value <= (hover || rating) ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>
          </div>
          <label className="block">
            <span className="text-foreground mb-2 block text-sm font-medium">
              Name *
            </span>
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
            <span className="text-foreground mb-2 block text-sm font-medium">
              Role / Company (optional)
            </span>
            <input
              maxLength={80}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. HR Lead, BrightCorp"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-foreground mb-2 block text-sm font-medium">
              Your review *
            </span>
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
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-sm transition-colors disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Submit review
        </button>
      </form>
    </div>
  );
}
