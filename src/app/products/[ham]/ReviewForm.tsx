"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Star } from "lucide-react";

import AppButton from "@/components/AppButton/AppButton";
import { createProductReview } from "@/app/services/reviews.action";

export default function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!review.trim()) {
      setMessage("Please write a review.");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createProductReview(productId, review, rating);

      if (!result.success) {
        setMessage(result.message);
        setMessageType("error");

        if (/already.*review|review.*already/i.test(result.message)) {
          setAlreadyReviewed(true);
        }

        return;
      }

      setMessage("Thanks! Your review has been submitted.");
      setMessageType("success");
      setReview("");
      setRating(5);
      setAlreadyReviewed(true);
    } catch (cause) {
      setMessage(
        cause instanceof Error
          ? cause.message
          : "Could not submit your review.",
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!mounted || status === "loading") {
    return <p className="text-sm text-slate-500">Loading review form...</p>;
  }

  if (!session) {
    return (
      <p className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
        <Link
          href="/login"
          className="font-semibold text-green-700 hover:underline"
        >
          Sign in
        </Link>{" "}
        to write a review.
      </p>
    );
  }

  if (alreadyReviewed) {
    return (
      <p
        className={`rounded-xl border p-4 text-sm ${
          messageType === "success"
            ? "border-green-200 bg-green-50 text-green-800"
            : "border-amber-200 bg-amber-50 text-amber-800"
        }`}
      >
        {message || "You already reviewed this product."}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium text-slate-800">Your rating</p>

        <div
          className="flex gap-1"
          role="group"
          aria-label={`Selected rating: ${rating} out of 5`}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              aria-label={`${value} star${value === 1 ? "" : "s"}`}
              aria-pressed={rating === value}
              className="rounded p-1 focus-visible:outline-2 focus-visible:outline-green-700"
            >
              <Star
                className={`size-6 ${
                  value <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="product-review"
          className="mb-2 block text-sm font-medium text-slate-800"
        >
          Your review
        </label>

        <textarea
          id="product-review"
          value={review}
          onChange={(event) => setReview(event.target.value)}
          rows={4}
          maxLength={1000}
          placeholder="Share what you think about this product"
          className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
        />
      </div>

      {message && (
        <p
          role="status"
          className={`text-sm ${
            messageType === "success" ? "text-green-700" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <AppButton
        type="submit"
        disabled={isSubmitting}
        className="bg-green-700 text-white hover:bg-green-800 disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Submit review"}
      </AppButton>
    </form>
  );
}





