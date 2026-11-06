"use server";

import { CartResponse } from "@/app/services/addToUserCart.interface";
import { getUserToken } from "@/lib/MyUtil";
import { revalidatePath } from "next/cache";
import { promises } from "readline";

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
  const {
    message,
    cartId,
    numOfCartItems,
    status,
    data: {
      _id,
      cartOwner,
      createdAt,
      totalCartPrice,
      updatedAt,
      products,
      __v,
    },
  }: CartResponse = await response.json();

  
  // once you add a prodduct to te cart it validates the data again
  revalidatePath("/cart");


  return {
    message,
    cartId,
    numOfCartItems,
    status,
    data: {
      _id,
      cartOwner,
      createdAt,
      totalCartPrice,
      updatedAt,
      products,
      __v,
    },
  };
  //   console.log(JSON.stringify(data ,null ,2));
}

export async function addProductToUserCart(): Promise<CartResponse> {
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
