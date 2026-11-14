"use server";

type ApiResponse = {
  status?: string;
  message?: string;
  [key: string]: unknown;
};

async function sendRequest(path: string,method: "POST" | "PUT",body: Record<string, string>,): Promise<ApiResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/${path}`,
    {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );

  const text = await response.text();
  let data: ApiResponse = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    // Keep the empty response; report the HTTP error below if needed.
  }

  const status = data.status?.toLowerCase();
  if (!response.ok || status === "fail" || status === "error") {
    throw new Error(data.message || "The request failed. Please try again.");
  }

  return data;
}

export async function requestPasswordReset(email: string) {
  return sendRequest("forgotPasswords", "POST", { email });
}

export async function verifyPasswordResetCode(resetCode: string) {
  return sendRequest("verifyResetCode", "POST", { resetCode });
}

export async function resetPassword(email: string, newPassword: string) {
  return sendRequest("resetPassword", "PUT", { email, newPassword });
}
