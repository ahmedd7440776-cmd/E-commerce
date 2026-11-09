"Use client";
import React from "react";
import { Button } from "../ui/button";

export default function AppButton({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return <Button {...props}>{children}</Button>;
}
