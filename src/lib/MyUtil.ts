import { log } from "console";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const cookie = await cookies();
  console.log(cookie);
  
  const seccionToken = cookie.get("authjs.session-token")?.value;
const token = await decode({
  token: seccionToken,
  secret: process.env.AUTH_SECRET || "",
  salt: "authjs.session-token",
});
//   console.log( 'real token', token);
  return token?.CredentialsToken
}
