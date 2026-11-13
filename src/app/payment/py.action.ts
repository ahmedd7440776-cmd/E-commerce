"use server";
import { CheckoutSessionResponse, PaymentDataType, PayResponse } from "./py.interface";
import { getUserToken } from "@/lib/MyUtil";
import { revalidatePath } from "next/cache";
import { getSiteUrl } from "@/lib/siteUrl";

export async function cashOrder(
  shippingAddress: PaymentDataType,
  cartId: string,
): Promise<PayResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        token: (await getUserToken()) as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress }),
    },
  );
  const data: PayResponse = await response.json();
  // console.log("acatuly data", data);
  revalidatePath("/cart");

  return data;
}



export async function onlineOrder(
  shippingAddress: PaymentDataType,
  cartId: string,
): Promise<CheckoutSessionResponse> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not set");
  }

  const checkoutUrl = new URL(
    `/api/v1/orders/checkout-session/${cartId}`,
    apiBaseUrl,
  );
  checkoutUrl.searchParams.set("url", getSiteUrl());

  const token = await getUserToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch(checkoutUrl, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ shippingAddress }),
    cache: "no-store",
  });

  const data: CheckoutSessionResponse = await response.json();

  if (!response.ok) {
    throw new Error(`Could not start online checkout: ${response.status}`);
  }
  revalidatePath("/cart");

  return data;
}
