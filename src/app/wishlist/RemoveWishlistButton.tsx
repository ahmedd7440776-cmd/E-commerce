"use client";

import { useContext, useState } from "react";
import { Trash2 } from "lucide-react";

import { removeWishlistProduct } from "./wishlist.action";
import { CartCountProvider } from "@/context/cartContext/cartContext";
import { toast } from "@/components/ui/toast";

export default function RemoveWishlistButton({
  productId,
}: {
  productId: string;
}) {
  const { setWishlistIds } = useContext(CartCountProvider);
  const [isRemoving, setIsRemoving] = useState(false);

  async function handleRemove() {
    setIsRemoving(true);
    const promise = removeWishlistProduct(productId);

    toast.promise(promise, {
      loading: "Removing from wishlist...",
      success: "Removed from wishlist.",
      error: (error) =>
        error instanceof Error ? error.message : "Could not remove product.",
    });

    try {
      await promise;
      setWishlistIds((ids) => ids.filter((id) => id !== productId));
    } catch {
      // The toast displays the error.
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      disabled={isRemoving}
      aria-label="Remove from wishlist"
      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      <Trash2 className="size-4" />
      {isRemoving ? "Removing..." : "Remove"}
    </button>
  );
}
