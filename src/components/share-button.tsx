"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export function ShareButton({ title }: { title: string }) {
  const handleShare = () => {
    navigator.share?.({
      title,
      url: typeof window !== "undefined" ? window.location.href : ""
    });
  };

  return (
    <Button variant="ghost" size="sm" className="ml-auto" onClick={handleShare}>
      <Share2 className="mr-2 h-4 w-4" /> Share
    </Button>
  );
}
