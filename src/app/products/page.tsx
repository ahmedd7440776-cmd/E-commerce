// import { Eye, RefreshCw, Star } from "lucide-react";
// import Link from "next/link";
// import type { Product } from "@/app/services/home.interface";
// import AddToCart from "@/components/AddToCart/AddToCart";
// import WishlistButton from "../wishlist/WishlistButton";

// export default function Products({ prod }: { prod?: Product | null }) {
//   if (!prod) return null;

//   const {
//     brand,
//     category,
//     imageCover,
//     price,
//     priceAfterDiscount,
//     quantity,
//     title,
//     _id,
//     ratingsQuantity,
//     ratingsAverage,
//   } = prod;

//   const rating = ratingsAverage ?? 0;
//   const currentPrice = priceAfterDiscount ?? price;
//   const hasDiscount = priceAfterDiscount != null && priceAfterDiscount < price;
//   const discountPercent = hasDiscount
//     ? Math.round(((price - priceAfterDiscount!) / price) * 100)
//     : 0;

//   return (
//     <article className="group relative mx-1 flex h-full w-11/12 container flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-3 transition-shadow hover:shadow-lg sm:p-4 md:mx-0">
//       <div className="relative">
//         <Link
//           href={`/products/${_id}`}
//           aria-label={`View ${title}`}
//           className="flex aspect-[1.15/1] items-center justify-center overflow-hidden rounded-lg"
//         >
//           <img
//             src={imageCover}
//             alt={title}
//             className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
//           />
//         </Link>

//         {hasDiscount && (
//           <span className="absolute left-0 top-0 rounded bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
//             -{discountPercent}%
//           </span>
//         )}

//         <div className="absolute right-0 top-0 flex flex-col items-center gap-2">
//           <WishlistButton productId={_id} productTitle={title} />

//           <button
//             type="button"
//             aria-label={`Compare ${title}`}
//             className="grid size-7 place-items-center rounded-full border border-gray-100 bg-white text-slate-600 shadow-sm transition hover:text-green-600"
//           >
//             <RefreshCw className="size-4" />
//           </button>

//           <Link
//             href={`/products/${_id}`}
//             aria-label={`View ${title} details`}
//             className="grid size-7 place-items-center rounded-full border border-gray-100 bg-white text-slate-600 shadow-sm transition hover:text-green-600"
//           >
//             <Eye className="size-4" />
//           </Link>
//         </div>

//         {quantity === 0 && (
//           <span className="absolute bottom-0 left-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
//             Out of stock
//           </span>
//         )}
//       </div>

//       <div className="mt-3 flex flex-1 flex-col">
//         <p className="text-sm text-slate-500">{category.name}</p>

//         <Link href={`/products/${_id}`} className="mt-1">
//           <h2 className="line-clamp-1 text-base font-medium text-slate-800 hover:text-green-700 sm:text-lg">
//             {title}
//           </h2>
//         </Link>

//         {brand.name && <p className="sr-only">{brand.name}</p>}

//         <div className="mt-2 flex items-center gap-2">
//           <div
//             className="flex items-center"
//             aria-label={`${rating} out of 5 stars`}
//           >
//             {Array.from({ length: 5 }, (_, index) => (
//               <Star
//                 key={index}
//                 className={`size-5 ${
//                   index < Math.floor(rating)
//                     ? "fill-yellow-400 text-yellow-400"
//                     : "text-yellow-400"
//                 }`}
//               />
//             ))}
//           </div>

//           <span className="text-sm text-slate-500">
//             {rating.toFixed(1)} ({ratingsQuantity ?? 0})
//           </span>
//         </div>

//         <div className="mt-auto flex items-center justify-between gap-2 pt-4">
//           <div className="flex flex-wrap items-baseline gap-x-2">
//             <span className="text-lg font-bold text-slate-800">
//               {currentPrice} EGP
//             </span>

//             {hasDiscount && (
//               <span className="text-sm text-slate-400 line-through">
//                 {price} EGP
//               </span>
//             )}
//           </div>

//           <AddToCart prod={prod} />
//         </div>
//       </div>
//     </article>
//   );
// }

import { connection } from "next/server";

import { getAllProducts } from "@/app/services/home.services";
import ProductGrid from "@/components/ProductGrid/ProductGrid";

export default async function ProductsPage() {
  await connection();

  const products = await getAllProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">All Products</h1>
      <ProductGrid products={products.filter(Boolean)} />
    </main>
  );
}