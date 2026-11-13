// // src/app/products/ProductGrid.tsx
// import Products from "@/app/products/page";
// import { Product } from "@/app/services/home.interface";

// export default function ProductGrid({ products }: { products: Product[] }) {
//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
//       {products.filter(Boolean).map((product) => (
//         <Products key={product._id} prod={product} />
//       ))}
//     </div>
//   );
// }
import { Eye, RefreshCw, Star } from "lucide-react";
import Link from "next/link";

import type { Product } from "@/app/services/home.interface";
import AddToCart from "@/components/AddToCart/AddToCart";
import WishlistButton from "@/app/wishlist/WishlistButton";

function ProductCard({ prod }: { prod: Product }) {
  const {
    brand,
    category,
    imageCover,
    price,
    priceAfterDiscount,
    quantity,
    title,
    _id,
    ratingsQuantity,
    ratingsAverage,
  } = prod;

  const rating = ratingsAverage ?? 0;
  const currentPrice = priceAfterDiscount ?? price;
  const hasDiscount = priceAfterDiscount != null && priceAfterDiscount < price;
  const discountPercent =
    hasDiscount && price > 0
      ? Math.round(((price - priceAfterDiscount) / price) * 100)
      : 0;

  return (
    <article className="group relative bg-gray-100 flex h-full min-w-0 w-full flex-col overflow-hidden rounded-xl border border-gray-200 shadow-green-400  p-3 transition-shadow hover:shadow-lg sm:p-4">
      <div className="relative">
        <Link
          href={`/products/${_id}`}
          aria-label={`View ${title}`}
          className="flex aspect-[1.15/1] items-center justify-center overflow-hidden rounded-lg"
        >
          <img
            src={imageCover}
            alt={title}
            className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {hasDiscount && (
          <span className="absolute left-0 top-0 rounded bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
            -{discountPercent}%
          </span>
        )}

        <div className="absolute right-0 top-0 flex flex-col items-center gap-2">
          <WishlistButton productId={_id} productTitle={title} />

          <button
            type="button"
            aria-label={`Compare ${title}`}
            className="grid size-7 place-items-center rounded-full border border-gray-100 bg-white text-slate-600 shadow-sm transition hover:text-green-600"
          >
            <RefreshCw className="size-4" />
          </button>

          <Link
            href={`/products/${_id}`}
            aria-label={`View ${title} details`}
            className="grid size-7 place-items-center rounded-full border border-gray-100 bg-white text-slate-600 shadow-sm transition hover:text-green-600"
          >
            <Eye className="size-4" />
          </Link>
        </div>

        {quantity === 0 && (
          <span className="absolute bottom-0 left-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
            Out of stock
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <p className="text-sm text-slate-500">
          {category?.name ?? "Uncategorized"}
        </p>

        <Link href={`/products/${_id}`} className="mt-1">
          <h2 className="line-clamp-1 text-base font-medium text-slate-800 hover:text-green-700 sm:text-lg">
            {title}
          </h2>
        </Link>

        {brand?.name && <p className="sr-only">{brand.name}</p>}

        <div className="mt-2 flex items-center gap-2">
          <div
            className="flex items-center"
            aria-label={`${rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={`size-5 ${
                  index < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-yellow-400"
                }`}
              />
            ))}
          </div>

          <span className="text-sm text-slate-500">
            {rating.toFixed(1)} ({ratingsQuantity ?? 0})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-lg font-bold text-slate-800">
              {currentPrice} EGP
            </span>

            {hasDiscount && (
              <span className="text-sm text-slate-400 line-through">
                {price} EGP
              </span>
            )}
          </div>

          <AddToCart prod={prod} />
        </div>
      </div>
    </article>
  );
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {" "}
      {products.filter(Boolean).map((product) => (
        <ProductCard key={product._id} prod={product} />
      ))}
    </div>
  );
}