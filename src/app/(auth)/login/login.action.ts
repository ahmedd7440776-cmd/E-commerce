"use server";

import { cookies } from "next/headers";
import { LoginDataTypeInterface, LoginResponseType } from "./Login.interface";

export async function handleUserLogin(userData: LoginDataTypeInterface) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    },
  );
  const data: LoginResponseType = await response.json();

  if (data.message === "success") {
    const cookie = await cookies();

    cookie.set("user_token", data.token, {
      httpOnly: true,
      maxAge: 60 * 60 *12 , 
      sameSite: "strict",
    });

    return "User logged successfuly";
  }

  return data.message || 'Something went wrong';
}
