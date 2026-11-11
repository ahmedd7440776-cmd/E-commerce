"use server";

import { auth } from "@/auth";
import { getUserToken } from "@/lib/MyUtil";


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
      cache: "no-store",
      next:{revalidate:60*60*24}
    },
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`failed to fetch orders : ${response.status}`);
  }

  return data;
}
