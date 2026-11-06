import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod.email(),
  password: zod.string(),
});

// .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$ /,
//     )

// .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$ /,
//     )
