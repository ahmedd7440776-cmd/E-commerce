import { authJsConfig } from "@/authConfig/authConfig";
import NextAuth from "next-auth";

const {handlers:{GET,POST}} =  NextAuth(authJsConfig);
export { GET, POST };