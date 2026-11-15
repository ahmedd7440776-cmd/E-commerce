"use server";

import { revalidatePath } from "next/cache";
import { getUserToken } from "@/lib/MyUtil";

type ApiResponse = {
  status?: string;
  message?: string;
  msg?: string;
  data?: unknown;
  errors?: unknown;
};

type ReviewActionResult =
  | { success: true; message: string; data?: unknown }
  | { success: false; message: string };

function getApiErrorMessage(result: ApiResponse, httpStatus: number) {
  if (Array.isArray(result.errors)) {
    const messages = result.errors
      .map((entry: unknown) => {
        if (
          entry &&
          typeof entry === "object" &&
          "msg" in entry &&
          typeof entry.msg === "string"
        ) {
          return entry.msg;
        }

        return "";
      })
      .filter(Boolean);

    if (messages.length) return messages.join(" ");
  }

  if (typeof result.msg === "string") return result.msg;

  if (
    typeof result.message === "string" &&
    result.message.toLowerCase() !== "fail"
  ) {
    return result.message;
  }

  return ` (you already commented) The API rejected the review (HTTP ${httpStatus}).`;
}

export async function createProductReview(
  productId: string,
  review: string,
  rating: number,
): Promise<ReviewActionResult> {
  const token = await getUserToken();

  if (!token) {
    return { success: false, message: "Please log in to write a review." };
  }

  if (!review.trim()) {
    return { success: false, message: "Please write a review." };
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { success: false, message: "Rating must be between 1 and 5." };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${productId}/reviews`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ review: review.trim(), rating }),
      cache: "no-store",
    },
  );

  const result = (await response.json().catch(() => ({}))) as ApiResponse;
  const status = result.status?.toLowerCase();

  if (
    !response.ok ||
    status === "fail" ||
    status === "error" ||
    result.errors
  ) {
    return {
      success: false,
      message: getApiErrorMessage(result, response.status),
    };
  }

  revalidatePath(`/products/${productId}`);

  return {
    success: true,
    message: result.message || "Review submitted.",
    data: result.data,
  };
}
