"use server";

import { CartResponse } from "@/app/services/addToUserCart.interface";
import { getUserToken } from "@/lib/MyUtil";
import { revalidatePath } from "next/cache";

export async function addToUserCart(productId: string): Promise<CartResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart`,
    {
      method: "POST",

      headers: {
        token: (await getUserToken()) as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    },
  );

 const data:CartResponse = await response.json();
if(!response.ok){
  throw new Error(data.message || 'faield to add product to cart')
}
  revalidatePath("/cart");



  return data
  };
  //   console.log(JSON.stringify(data ,null ,2));


export async function getLoggedUserCart(): Promise<CartResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart`,
    {
      method: "GET",

      headers: {
        token: (await getUserToken()) as string,
        "Content-Type": "application/json",
      },
  cache:'force-cache'
    },
  );

  const data: CartResponse = await response.json();
  return data;
 }
