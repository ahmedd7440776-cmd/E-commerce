import React from "react";
import { Star } from "lucide-react";
import AppButton from "@/components/AppButton/AppButton";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ ham: string }>;
}) {
  const { ham } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${ham}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Could not load product");
  }

  const response = await res.json();
  const product = response.data;

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
                  key={image}
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
          <p className="text-sm font-medium text-green-700">
            {product.category?.name}
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            {product.title}
          </h1>

          {product.brand?.name && (
            <p className="mt-2 text-gray-600">{product.brand.name}</p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div
              className="flex items-center"
              aria-label={`${product.ratingsAverage} out of 5 stars`}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
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

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
            <span>{product.quantity} in stock</span>
            <span>{product.sold} sold</span>
          </div>

          <AppButton className="mt-8 w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 sm:w-fit">
            Add to cart
          </AppButton>
        </section>
      </div>
    </main>
  );
}