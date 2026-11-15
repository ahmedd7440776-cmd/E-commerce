"use server";

import { revalidatePath } from "next/cache";
import { getUserToken } from "@/lib/MyUtil";

export type ProfileData = {
  name: string;
  email?: string;
  phone: string;
};

type ProfileResponse = {
  status?: string;
  message?: unknown;
  data?: unknown;
  errors?: unknown;
};

function getApiErrorMessage(
  result: ProfileResponse,
  responseText: string,
): string {
  const message = result.message;

  if (typeof message === "string" && message !== "fail") {
    return message;
  }

  if (message && typeof message === "object" && "msg" in message) {
    const detail = (message as { msg?: unknown }).msg;
    if (typeof detail === "string") return detail;
  }

  if (Array.isArray(result.errors) && result.errors.length > 0) {
    const firstError = result.errors[0];

    if (firstError && typeof firstError === "object" && "msg" in firstError) {
      const detail = (firstError as { msg?: unknown }).msg;
      if (typeof detail === "string") return detail;
    }
  }

  return responseText || "Could not update your profile.";
}

export async function updateProfile(profile: ProfileData) {
  const token = await getUserToken();

  if (!token) {
    throw new Error("Please log in to update your profile.");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/updateMe/`,
    {
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(profile),
      cache: "no-store",
    },
  );

  const responseText = await response.text();
  let result: ProfileResponse = {};

  try {
    result = JSON.parse(responseText) as ProfileResponse;
  } catch {
    // The API response wasn't JSON.
  }

  const status =
    typeof result.status === "string" ? result.status.toLowerCase() : "";

  if (!response.ok || status === "fail" || status === "error") {
    throw new Error(getApiErrorMessage(result, responseText));
  }

  revalidatePath("/account");
  // revalidatePath("/Navabr");
  return result;
}
