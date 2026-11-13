// import { Star } from "lucide-react";
// import AppButton from "@/components/AppButton/AppButton";
// import WishlistButton from "@/app/wishlist/WishlistButton";
// import AddToCart from "@/components/AddToCart/AddToCart";

// import { Suspense } from "react";

// type PageProps = {
//   params: Promise<{ ham: string }>;
// };

// export default function Page({ params }: PageProps) {
//   return (
//     <Suspense
//       fallback={<main className="p-8 text-center">Loading product...</main>}
//     >
//       <ProductDetails params={params} />
//     </Suspense>
//   );
// }

//   async function ProductDetails(
// { params }: PageProps) {
//   const { ham } = await params;

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${ham}`,
//     {
//       cache: "force-cache",
//       next: { revalidate: 60 },
//     },
//   );

//   if (!res.ok) {
//     throw new Error("Could not load product");
//   }

//   const response = await res.json();
//   const product = response.data;

//   return (
//     <main className="container mx-auto px-4 py-6 sm:px-6 sm:py-10">
//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
//         <section className="min-w-0">
//           <div className="overflow-hidden rounded-2xl bg-gray-100">
//             <img
//               src={product.imageCover}
//               alt={product.title}
//               className="aspect-square w-full object-cover"
//             />
//           </div>

//           <div className="mt-4">

//           </div>

//           {product.images?.length > 0 && (
//             <div className="mt-3 grid grid-cols-4 gap-3">
//               {product.images.map((image: string, index: number) => (
//                 <div
//                   key={image}
//                   className="overflow-hidden rounded-lg bg-gray-100"
//                 >
//                   <img
//                     src={image}
//                     alt={`${product.title}, view ${index + 1}`}
//                     className="aspect-square w-full object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//         <section className="flex min-w-0 flex-col">
//           <div>
//             <p className="text-sm font-medium text-green-700 mb-2">
//               {product.category?.name}
//             </p>

//             <WishlistButton
//               productId={product._id}
//               productTitle={product.title}
//             />
//           </div>

//           <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
//             {product.title}
//           </h1>

//           {product.brand?.name && (
//             <p className="mt-2 text-gray-600">{product.brand.name}</p>
//           )}

//           <div className="mt-4 flex flex-wrap items-center gap-2">
//             <div
//               className="flex items-center"
//               aria-label={`${product.ratingsAverage ?? 0} out of 5 stars`}
//             >
//               {Array.from({ length: 5 }, (_, index) => (
//                 <Star
//                   key={index}
//                   className={`size-5 ${
//                     index < Math.floor(product.ratingsAverage ?? 0)
//                       ? "fill-yellow-400 text-yellow-400"
//                       : "text-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>

//             <span className="text-sm text-gray-500">
//               {product.ratingsAverage ?? 0} ({product.ratingsQuantity ?? 0}{" "}
//               reviews)
//             </span>
//           </div>

//           <p className="mt-6 text-2xl font-bold text-green-700 sm:text-3xl">
//             {product.price} EGP
//           </p>

//           <p className="mt-5 whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base">
//             {product.description}
//           </p>

//           <div className="mt-6  mb-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
//             <span>{product.quantity} in stock</span>
//             <span>{product.sold} sold</span>
//           </div>

//           <AddToCart prod={product} />
//         </section>
//       </div>
//     </main>
//   );
// }

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";

import AddToCart from "@/components/AddToCart/AddToCart";
import WishlistButton from "@/app/wishlist/WishlistButton";
import type { Product } from "@/app/services/home.interface";

type PageProps = {
  params: Promise<{ ham: string }>;
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
    </main>
  );
}