"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFadeIn } from "@/lib/gsap";
import { Unplug } from "lucide-react";

export default function NotFound() {
  useFadeIn(".not-found-animate", { delay: 0.05 });
  return (
    <div className="relative mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-4 py-20 not-found-animate">
      <div className="relative w-full overflow-hidden rounded-2xl border bg-background/60 p-8 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/50 md:p-12">
        <div className="absolute -right-16 -top-16 hidden h-48 w-48 rotate-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl md:block" />
        <div className="absolute -left-16 -bottom-16 hidden h-48 w-48 -rotate-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 blur-2xl md:block" />

        <div className="mx-auto grid max-w-3xl grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Error 404</p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Page not found</h1>
            <p className="text-muted-foreground">
              The page you are looking for doesn’t exist or may have been moved. 
              <br />
              You can continue browsing our latest products.
            </p>

            <div className="pt-2">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/90">
                <Link href="/shop">Browse the shop</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto hidden md:block">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-primary/10 blur-xl" />
              <div className="relative grid h-24 w-24 place-items-center rounded-2xl border bg-background text-muted-foreground">
                <Unplug width={32} height={32} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}