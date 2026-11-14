"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import AppButton from "@/components/AppButton/AppButton";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

import {
  requestPasswordReset,
  verifyPasswordResetCode,
  resetPassword,
} from "./forgotPassword.action";

type FormValues = {
  email: string;
  resetCode: string;
  newPassword: string;
  confirmPassword: string;
};

type Step = "email" | "code" | "password";

export default function ForgotPasswordForm() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      resetCode: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function handleFormSubmit(values: FormValues) {
    if (step === "email") {
      const enteredEmail = values.email.trim();
      const promise = requestPasswordReset(enteredEmail);

      toast.promise(promise, {
        loading: "Sending reset code...",
        success: (data) =>
          data.message || "Check your email for the reset code.",
        error: "Could not send a reset code.",
      });

      try {
        await promise;
        setEmail(enteredEmail);
        setStep("code");
      } catch {
        // The toast displays the error.
      }

      return;
    }

    if (step === "code") {
      const promise = verifyPasswordResetCode(values.resetCode);

      toast.promise(promise, {
        loading: "Verifying code...",
        success: (data) => data.message || "Code verified.",
        error: "That reset code is invalid.",
      });

      try {
        await promise;
        setStep("password");
      } catch {
        // The toast displays the error.
      }

      return;
    }

    const promise = resetPassword(email, values.newPassword);

    toast.promise(promise, {
      loading: "Updating password...",
      success: (data) => data.message || "Password updated successfully.",
      error: "Could not reset your password.",
    });

    try {
      await promise;
      router.replace("/login");
    } catch {
      // The toast displays the error.
    }
  }

  return (
    <main className="mx-auto w-full max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">
        {step === "email"
          ? "Forgot your password?"
          : step === "code"
            ? "Check your email"
            : "Choose a new password"}
      </h1>

      <p className="mt-2 text-sm text-slate-600">
        {step === "email"
          ? "Enter your account email and we’ll send you a reset code."
          : step === "code"
            ? `Enter the reset code sent to ${email}.`
            : "Enter and confirm your new password."}
      </p>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="mt-6 flex flex-col gap-4"
      >
        {step === "email" && (
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
        )}

        {step === "code" && (
          <div>
            <label
              htmlFor="resetCode"
              className="mb-1 block text-sm font-medium"
            >
              Reset code
            </label>
            <Input
              id="resetCode"
              inputMode="numeric"
              placeholder="Enter the code"
              aria-invalid={!!errors.resetCode}
              {...register("resetCode", {
                required: "Reset code is required",
              })}
            />
            {errors.resetCode && (
              <p className="mt-1 text-sm text-red-600">
                {errors.resetCode.message}
              </p>
            )}
          </div>
        )}

        {step === "password" && (
          <>
            <div>
              <label
                htmlFor="newPassword"
                className="mb-1 block text-sm font-medium"
              >
                New password
              </label>
              <Input
                id="newPassword"
                type="password"
                autoComplete="new-password"
                aria-invalid={!!errors.newPassword}
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-sm font-medium"
              >
                Confirm new password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === getValues("newPassword") ||
                    "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </>
        )}

        <AppButton
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-700 text-white hover:bg-green-800 disabled:opacity-60"
        >
          {isSubmitting
            ? "Please wait..."
            : step === "email"
              ? "Send reset code"
              : step === "code"
                ? "Verify code"
                : "Reset password"}
        </AppButton>

        {step !== "email" && (
          <AppButton
            type="button"
            onClick={() => setStep(step === "password" ? "code" : "email")}
            className="w-full bg-slate-200 text-slate-800 hover:bg-slate-300"
          >
            Back
          </AppButton>
        )}

        <Link
          href="/login"
          className="text-center text-sm text-green-700 hover:underline"
        >
          Back to login
        </Link>
      </form>
    </main>
  );
}
