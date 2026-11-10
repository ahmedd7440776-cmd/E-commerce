"use server";

import { auth } from "@/auth";
import { getUserToken } from "@/lib/MyUtil";
import { revalidatePath } from "next/cache";

export async function getAllOrdersAction() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Please login first");
  }

  const token = await getUserToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${session?.user?.id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "force-cache",
    },
  );

  const data = await response.json();
//   revalidatePath('/orders')
  if (!response.ok) {
    throw new Error(`failed to fetch orders : ${response.status}`);
  }

  return data;
}
