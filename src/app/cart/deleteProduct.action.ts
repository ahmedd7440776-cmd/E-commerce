"use server";

import { getUserToken } from "@/lib/MyUtil";
import { getToken } from "next-auth/jwt";
import { revalidatePath } from "next/cache";
import React from "react";

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
  revalidatePath('/cart')
//   console.log(data);
  return data;
}
