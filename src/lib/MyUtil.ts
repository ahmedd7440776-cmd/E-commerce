import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

// export async function getUserToken() {
//   const cookie = await cookies();
//   // console.log(cookie);

//   const seccionToken = cookie.get("authjs.session-token")?.value;
// const token = await decode({
//   token: seccionToken,
//   secret: process.env.AUTH_SECRET || "",
//   salt: "authjs.session-token",
// });
//   console.log( 'real token', token);
//   return token?.CredentialsToken
// }



export async function getUserToken(): Promise<string | null> {
  const cookieStore = await cookies();

  const cookieNames = ["__Secure-authjs.session-token", "authjs.session-token"];

  const cookieName = cookieNames.find((name) => cookieStore.has(name));

  if (!cookieName) return null;

  const sessionToken = cookieStore.get(cookieName)?.value;
  const secret = process.env.AUTH_SECRET;

  if (!sessionToken) return null;

  if (!secret) {
    throw new Error("AUTH_SECRET is missing");
  }

  const decoded = await decode({
    token: sessionToken,
    secret,
    salt: cookieName,
  });

  return typeof decoded?.CredentialsToken === "string"
    ? decoded.CredentialsToken
    : null;
}