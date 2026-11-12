"use client";

import { useContext, useState } from "react";
import { Heart } from "lucide-react";

import { CartCountProvider } from "@/context/cartContext/cartContext";
import { toast } from "@/components/ui/toast";
import { handleWishlist } from "./wishlist.action";

export default function WishlistButton({
  productId,
  productTitle,
}: {
  productId: string;
  productTitle?: string;
}) {
  const { wishlistIds, setWishlistIds } = useContext(CartCountProvider);
  const [isAdding, setIsAdding] = useState(false);

  const isWishlisted = wishlistIds.includes(productId);

  async function addToWishlist() {
    if (isAdding || isWishlisted) return;

    setIsAdding(true);
    const promise = handleWishlist(productId);

    toast.promise(promise, {
      loading: "Adding to wishlist...",
      success: (result) => result.message || "Added to wishlist.",
      error: (error) =>
        error instanceof Error ? error.message : "Could not add to wishlist.",
    });

    try {
      const result = await promise;

      // Use the updated IDs returned by the API when available.
      if (Array.isArray(result.data)) {
        setWishlistIds(result.data);
      } else {
        setWishlistIds((currentIds) =>
          currentIds.includes(productId)
            ? currentIds
            : [...currentIds, productId],
        );
      }
    } catch {
      // The toast displays the error. Keep the heart and count unchanged.
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={addToWishlist}
        disabled={isAdding || isWishlisted}
        aria-label={
          isWishlisted
            ? `${productTitle ?? "Product"} is in your wishlist`
            : `Add ${productTitle ?? "product"} to wishlist`
        }
        title={isWishlisted ? "In wishlist" : "Add to wishlist"}
        className="grid size-7 place-items-center rounded-full border border-gray-100 bg-white text-slate-600 shadow-sm transition hover:text-red-500 disabled:cursor-default"
      >
        <Heart
          className={`size-4 transition-colors ${
            isWishlisted ? "fill-red-500 text-red-500" : ""
          }`}
        />
      </button>
    </>
  );
}
