"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tag } from "lucide-react";

import { applayCoupon } from "./coupon";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ApplyCoupon() {
  const [couponName, setCouponName] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const router = useRouter();





async function handleApplyCoupon(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const name = couponName.trim();
  if (!name) return;

  setIsApplying(true);

  const promise = applayCoupon(name);

  toast.promise(promise, {
    loading: "Applying coupon...",
    success: (result) => result.message || "Coupon applied successfully.",
    error: (error) =>
      error instanceof Error ? error.message : "Could not apply coupon.",
  });

  try {
    await promise;
    setCouponName("");
    router.refresh();
  } catch {
    // The toast displays the error.
  } finally {
    setIsApplying(false);
  }
}

  return (
    <form onSubmit={handleApplyCoupon} className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={couponName}
          onChange={(event) => setCouponName(event.target.value)}
          placeholder="Enter promo code"
          aria-label="Promo code"
          className="min-w-0"
        />
        <Button type="submit" disabled={isApplying || !couponName.trim()}>
          <Tag className="mr-2 size-4" />
          {isApplying ? "Applying..." : "Apply"}
        </Button>
      </div>
    </form>
  );
}
