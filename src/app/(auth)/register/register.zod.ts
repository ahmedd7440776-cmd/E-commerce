import * as zod from "zod";

export const registerSchema = zod.object({
  name: zod.string().min(2),
  email: zod.email(),
  password: zod.string(),
  rePassword: zod.string(),
  phone: zod.string().regex(/^01[0125][0-9]{8}$/, "Must be an Egyptian number"),
});





// .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$ /,
//     )


// .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$ /,
//     )