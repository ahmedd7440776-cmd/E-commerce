

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";

import AddToCart from "@/components/AddToCart/AddToCart";
import WishlistButton from "@/app/wishlist/WishlistButton";
import type { Product } from "@/app/services/home.interface";
import ReviewForm from "./ReviewForm";

type PageProps = {
  params: Promise<{ ham: string }>;
};

type ProductReview = {
  _id: string;
  review?: string;
  rating: number;
  user?: {
    name?: string;
  };
  createdAt: string;
};

type ReviewsResponse = {
  data?: ProductReview[];
};

export default function Page({ params }: PageProps) {
  return (
    <Suspense
      fallback={<main className="p-8 text-center">Loading product...</main>}
    >
      <ProductDetails params={params} />
    </Suspense>
  );
}

async function getProductReviews(productId: string): Promise<ProductReview[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${productId}/reviews`,
      { next: { revalidate: 60 } },
    );

    if (!response.ok) return [];

    const result: ReviewsResponse = await response.json();
    return Array.isArray(result.data) ? result.data : [];
  } catch {
    return [];
  }
}

async function ProductDetails({ params }: PageProps) {
  const { ham } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${ham}`,
    { next: { revalidate: 60 } },
  );

  if (response.status === 404) notFound();
  if (!response.ok) throw new Error("Could not load product");

  const result = await response.json();
  const product: Product | undefined = result.data;

  if (!product) notFound();

  const reviews = await getProductReviews(product._id);

  return (
    <main className="container mx-auto px-4 py-6 sm:px-6 sm:py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <section className="min-w-0">
          <div className="overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={product.imageCover}
              alt={product.title}
              className="aspect-square w-full object-cover"
            />
          </div>

          {product.images?.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {product.images.map((image: string, index: number) => (
                <div
                  key={`${image}-${index}`}
                  className="overflow-hidden rounded-lg bg-gray-100"
                >
                  <img
                    src={image}
                    alt={`${product.title}, view ${index + 1}`}
                    className="aspect-square w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="flex min-w-0 flex-col">
          <p className="mb-2 text-sm font-medium text-green-700">
            {product.category?.name}
          </p>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {product.title}
            </h1>

            <WishlistButton
              productId={product._id}
              productTitle={product.title}
            />
          </div>

          {product.brand?.name && (
            <p className="mt-2 text-gray-600">{product.brand.name}</p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div
              className="flex items-center"
              aria-label={`${product.ratingsAverage ?? 0} out of 5 stars`}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={`size-5 ${
                    index < Math.floor(product.ratingsAverage ?? 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <span className="text-sm text-gray-500">
              {product.ratingsAverage ?? 0} ({product.ratingsQuantity ?? 0}{" "}
              reviews)
            </span>
          </div>

          <p className="mt-6 text-2xl font-bold text-green-700 sm:text-3xl">
            {product.price} EGP
          </p>

          <p className="mt-5 whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base">
            {product.description}
          </p>

          <div className="mb-2 mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
            <span>{product.quantity} in stock</span>
            <span>{product.sold} sold</span>
          </div>

          <AddToCart prod={product} />
        </section>
      </div>

      <section className="mt-12 border-t border-slate-200 pt-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Customer reviews
          </h2>

          <p className="text-sm text-slate-500">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>

        {reviews.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
            No reviews yet for this product.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((review) => (
              <article
                key={review._id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3 ">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {review.user?.name || "Customer"}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 ">
                      {new Date(review.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div
                    className="flex shrink-0 items-center"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        className={`size-4 ${
                          index < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-3 whitespace-pre-line text-sm leading-6  text-slate-600">
                  {review.review || "No written comment."}
                </p>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 border-t border-slate-200 pt-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Write a review
          </h3>

          <ReviewForm productId={product._id} />
        </div>
      </section>
    </main>
  );
}
