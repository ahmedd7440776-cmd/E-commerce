

"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import AppButton from "@/components/AppButton/AppButton";
import { updateProfile, type ProfileData } from "./profile.action";

export default function ProfileForm() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
      setEmail(session.user.email ?? "");
    }
  }, [session]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsError(false);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone) {
      setIsError(true);
      setMessage("Please fill in your name, email, and phone.");
      return;
    }

    const currentEmail = session?.user?.email?.trim() ?? "";

    const profile: ProfileData = {
      name: trimmedName,
      phone: trimmedPhone,
    };

    if (trimmedEmail.toLowerCase() !== currentEmail.toLowerCase()) {
      profile.email = trimmedEmail;
    }

    setIsSaving(true);

    try {
      const result = await updateProfile(profile);

await update({
  name: trimmedName,
  email: trimmedEmail,
});
      setMessage(
        typeof result.message === "string"
          ? result.message
          : "Profile updated successfully.",
      );
      setIsError(false);
      router.refresh();
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not update your profile.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (status === "loading") {
    return <p className="p-6 text-center">Loading your profile...</p>;
  }

  if (!session) {
    return (
      <p className="p-6 text-center">
        Please{" "}
        <Link href="/login" className="font-semibold text-green-700 underline">
          sign in
        </Link>{" "}
        to view your profile.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl space-y-5">
      <div className="space-y-2">
        <label htmlFor="profile-name" className="text-sm font-medium">
          Name
        </label>
        <Input
          id="profile-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="profile-email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="profile-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="profile-phone" className="text-sm font-medium">
          Phone
        </label>
        <Input
          id="profile-phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          autoComplete="tel"
          placeholder="Enter your phone number"
          required
        />
      </div>

      {message && (
        <p
          role="status"
          className={`text-sm ${isError ? "text-red-600" : "text-green-700"}`}
        >
          {message}
        </p>
      )}

      <AppButton
        type="submit"
        disabled={isSaving}
        className="bg-green-700 text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? "Saving..." : "Save changes"}
      </AppButton>
    </form>
  );
}