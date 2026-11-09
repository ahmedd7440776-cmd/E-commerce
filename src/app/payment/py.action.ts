"use server";
import { getToken } from "next-auth/jwt";
import { PaymentDataType, PayResponse } from "./py.interface";
import { getUserToken } from "@/lib/MyUtil";
import { revalidatePath } from "next/cache";



export async function cashOrder(shippingAddress: PaymentDataType,cartId: string): Promise<PayResponse> {
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
  const data:PayResponse = await response.json();
  console.log("acatuly data", data);
  revalidatePath('/cart')

  return data;
}
