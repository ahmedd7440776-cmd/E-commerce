"use client";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AppButton from "@/components/AppButton/AppButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./register.zod";
import { sendUserDataRegister } from "./register.service";
import { RegisterDataTypeInterface, User } from "./register.interface";
import { Loader2Icon } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { handleUserRegister } from "./register.action";
import { signIn } from "next-auth/react";
export default function RegisterForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    mode: "all",
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();



  async function handle(data: RegisterDataTypeInterface) {
    const promise = (async () => {
      const registration = await handleUserRegister(data);

      if (!registration.success) {
        throw new Error(registration.message);
      }

      const login = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (login?.error) {
        throw new Error(
          "Your account was created, but automatic sign-in failed. Please log in.",
        );
      }

      return registration;
    })();

    toast.promise(promise, {
      loading: "Creating your account...",
      success: () => {
        // Reload so CartContext fetches the cart and wishlist with the new session.
        window.location.replace("/");
        return "Account created and signed in!";
      },
      error: (error: Error) => error.message,
    });

    try {
      await promise;
    } catch {
      // The toast displays the error.
    }
  }



  return (
    <>
      <form onSubmit={handleSubmit(handle)} className="flex flex-col gap-6">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Enter your name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your name"
                autoComplete="off"
                type="text"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
        <Controller
          name="rePassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Confirm your password
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Confirm your password"
                autoComplete="off"
                type="password"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Enter you phone</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter you phone"
                autoComplete="off"
                type="tel"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="gap-3 flex justify-center">
          <AppButton
            type="submit"
            disabled={isSubmitting}
            className="disabled:cursor-not-allowed disabled:bg-green-700 cursor-pointer  bg-green-700 text-white hover:bg-green-500 w-6/12 hover:text-black"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2Icon className="size-4 animate-spin" />
              </span>
            ) : (
              "Sign up"
            )}
          </AppButton>

          <AppButton
            onClick={() => reset()}
            type="button"
            className="bg-red-700 text-white hover:bg-red-500 w-6/12 hover:text-black"
          >
            Reset form
          </AppButton>
        </div>
      </form>
    </>
  );
}
