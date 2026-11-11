"use server";

import { getUserToken } from "@/lib/MyUtil";

export async function applayCoupon(couponName: string) {
  const token = await getUserToken();

  if (!token) {
    throw new Error("Please log in to apply a coupon.");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart/applyCoupon`,
    {
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ couponName }),
      cache: "no-store",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not apply coupon.");
  }

  return data;
}



