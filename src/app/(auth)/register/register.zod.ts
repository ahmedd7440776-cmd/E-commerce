import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must include a lowercase letter")
  .regex(/[A-Z]/, "Password must include an uppercase letter")
  .regex(/\d/, "Password must include a number")
  .regex(/[^A-Za-z0-9\s]/, "Password must include a special character");

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    password: passwordSchema,
    rePassword: z.string(),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Must be an Egyptian number"),
  })
  .refine((values) => values.password === values.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });
