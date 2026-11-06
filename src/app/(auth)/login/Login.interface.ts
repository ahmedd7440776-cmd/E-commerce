import * as zod from "zod";
import { loginSchema } from "./Login.zod";

export type LoginDataTypeInterface = zod.infer<typeof loginSchema>;

export interface LoginResponseType {
  message: "success" | "incorect email or password";
  user: User;
  token: string;
  statusMsg: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
}
