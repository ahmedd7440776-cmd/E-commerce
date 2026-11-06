"use server";
import { cookies } from 'next/headers';
import { Cookie } from './../../../../node_modules/@auth/core/lib/utils/cookie.d';
import { RegisterDataTypeInterface } from "./register.interface";

export async function handleUserRegister(userData: RegisterDataTypeInterface) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userData),
    },
  );

  const data = await response.json();

  // console.log(data);
  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      message:
        response.status === 409
          ? "Account already exists"
          : data.message || "Something went wrong",
    };
  }



  const cookie = await cookies();
   cookie.set("user_token", data.token, {
     httpOnly: true,
     maxAge: 60 * 60 * 24,
     sameSite: "strict",
   });

  return { success: true, status: response.status, message: data.message };
}
