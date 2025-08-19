"use client";

import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

export function ClientButton(props: ComponentProps<typeof Button>) {
  return <Button {...props} />;
}
