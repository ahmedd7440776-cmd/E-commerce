"use server";

import { getUserToken } from "@/lib/MyUtil";
import { revalidatePath } from "next/cache";

async function fetchWishlistData() {
  const token = await getUserToken();
  if (!token) throw new Error("Please log in to view your wishlist.");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
    {
      headers: { token, Accept: "application/json" },
      cache: "no-store",
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Could not load wishlist.");
  }

  return result;
}




export async function getWishlistProducts() {
  const result = await fetchWishlistData();
  return result.data ?? [];
}

export async function getWishlistProductIds(): Promise<string[]> {
  const products = await getWishlistProducts();
  return products.map((product: { _id: string }) => product._id);
}








//  send a rrequest
export async function handleWishlist(productId: string) {
  const token = await getUserToken();
  if (!token) throw new Error("Please log in to add items to your wishlist.");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ productId }),
      cache: "no-store",
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Could not add product to wishlist.");
  }

  revalidatePath("/wishlist");
  return result;
}





// remove
export async function removeWishlistProduct(productId: string) {
  const token = await getUserToken();
  if (!token) throw new Error("Please log in to edit your wishlist.");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: { token, Accept: "application/json" },
      cache: "no-store",
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Could not remove product.");
  }

  revalidatePath("/wishlist");
  return result;
}
