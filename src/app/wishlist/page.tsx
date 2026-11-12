import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

import { getWishlistProducts } from "./wishlist.action";
import RemoveWishlistButton from "./RemoveWishlistButton";

export default async function WishlistPage() {
  const products = await getWishlistProducts();

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-red-50 text-red-500">
            <Heart className="size-5 fill-current" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Wishlist</h1>
            <p className="text-sm text-slate-500">
              {products.length} {products.length === 1 ? "item" : "items"} saved
            </p>
          </div>
        </div>
      </header>

      {products.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <Heart className="mx-auto size-10 text-slate-300" />
          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            Your wishlist is empty
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Save products you like and find them here later.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
          >
            <ShoppingBag className="size-4" />
            Browse products
          </Link>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product: any) => (
            <article
              key={product._id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <Link
                href={`/products/${product._id}`}
                className="flex aspect-[4/3] items-center justify-center bg-slate-50 p-5"
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </Link>

              <div className="space-y-3 p-4">
                <div>
                  <p className="text-xs text-slate-500">
                    {product.category?.name}
                  </p>
                  <Link href={`/products/${product._id}`}>
                    <h2 className="mt-1 line-clamp-2 font-semibold text-slate-900 hover:text-green-700">
                      {product.title}
                    </h2>
                  </Link>
                </div>

                <p className="font-bold text-green-700">
                  {product.price?.toLocaleString()} EGP
                </p>

                <RemoveWishlistButton productId={product._id} />
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
