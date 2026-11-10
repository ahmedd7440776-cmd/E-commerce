"use client";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AppButton from "@/components/AppButton/AppButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./Login.zod";
import { LoginDataTypeInterface } from "./Login.interface";
import { sendUserDataLogin } from "./Login.service";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { signIn, } from "next-auth/react";
import { log } from "console";
// import { googleLogin } from "./social.action";

export default function RegisterForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  async function handle(data: LoginDataTypeInterface) {
    const res = signIn("credentials", { ...data, redirect: false })
    .then(function (res) {
        if (res.error) {
          throw new Error();
        }
        return "success";
      },
    );

    toast.promise(res, {
      success: () => {
        router.push("/");
        return "User logged in successfully";
      },
      error: "Incorrect email or password",
      loading: "Please wait",
      // error: (data) => {
      //   return data.message || "Incorrect email or password";
      // },
    });
  }

  // async function handle(data: LoginDataTypeInterface) {
  //   const res = await signIn("credentials", {
  //     ...data,
  //     redirect: false,
  //     redirectTo: "/",
  //   });
  //   if (res?.error) {
  //     throw new Error("Incorrect email or password");
  //   }
  //   return "success";
  //   const promise = handle(data);
  // }

  return (
    <>
      <form onSubmit={handleSubmit(handle)} className="flex flex-col gap-6">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Enter your email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your email"
                autoComplete="off"
                type="email"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Enter your password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your password"
                autoComplete="off"
                type="password"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="gap-3  flex justify-center">
          <AppButton
            disabled={isSubmitting}
            type="submit"
            className="disabled:cursor-not-allowed disabled:bg-green-700 cursor-pointer  bg-green-700 text-white hover:bg-green-500 w-6/12 hover:text-black"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2Icon className="size-4 animate-spin" />
              </span>
            ) : (
              " Sign In"
            )}
          </AppButton>
          {/* <AppButton
onClick={()=>googleLogin()}
            type="submit"
            className="disabled:cursor-not-allowed disabled:bg-green-700 cursor-pointer  bg-yellow-700 text-white hover:bg-green-500 w-6/12 hover:text-black"
          >
          google Sign In
          </AppButton> */}

          <AppButton
            onClick={() => reset()}
            type="button"
            className="bg-red-700 text-white hover:bg-red-500 w-6/12 cursor-pointer hover:text-black"
          >
            Reset{" "}
          </AppButton>
        </div>
      </form>
    </>
  );
}
