"Use client";
import React from "react";
import { Button } from "../ui/button";

export default function AppButton({
  children,
  ...probs
}: React.ComponentProps<typeof Button>) {
  return <Button {...probs}>{children}</Button>;
}
