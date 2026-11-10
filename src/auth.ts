import NextAuth from "next-auth";
import { authJsConfig } from "./authConfig/authConfig";

export const { handlers, auth, signIn, signOut } = NextAuth(authJsConfig);
