"use server";

import { getUserToken } from "@/lib/MyUtil";
import { CartResponse } from "../services/addToUserCart.interface";
import { revalidatePath } from "next/cache";

//  updata + & - buttons
export async function handleUpdataCartCount(
  productId: string,
  count: number,
): Promise<CartResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        token: (await getUserToken()) as string,
        "content-Type": "application/json",
      },
      body: JSON.stringify({ count }),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "faield to updata");
  }
  revalidatePath("/cart");
  
  return data;
}
//  clear spicific iytem from the cart

export default async function handleDeleteProduct(productId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: (await getUserToken()) as string,
        "content-Type": "application/json",
      },
    },
  );

  const data = await response.json();
  revalidatePath( '/cart');


  //   console.log(data);
  return data;
}

//  clear all cart

export async function handleDeleteAllProduct() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart/`,
    {
      method: "DELETE",
      headers: {
        token: (await getUserToken()) as string,
        // "content-Type": "application/json",
      },
    },
  );

  const data = await response.json();
  revalidatePath("/cart");
  //   console.log(data);
  return data;
}
