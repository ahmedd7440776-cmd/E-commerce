

"use server";

import { getUserToken } from "@/lib/MyUtil";

export async function applayCoupon(couponName: string) {
  try {
    const token = await getUserToken();

    if (!token) {
      return { success: false, message: "Please log in to apply a coupon." };
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
      return {
        success: false,
        message: data.message || "Coupon is invalid or has expired.",
      };
    }

    return {
      success: true,
      message: data.message || "Coupon applied successfully.",
    };
  } catch {
    return { success: false, message: "Could not apply the coupon." };
  }
}