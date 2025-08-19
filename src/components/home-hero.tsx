"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFadeIn } from "@/lib/gsap";

export function HomeHero() {
  useFadeIn(".hero-animate", { delay: 0.1 });
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 md:grid-cols-2 hero-animate">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Minimal styles for every season</h1>
          <p className="text-muted-foreground">Discover curated apparel with clean aesthetics and thoughtful details. Built for comfort, designed to last.</p>
          <div className="flex gap-3">
            <Link href="/shop"><Button size="lg">Shop now</Button></Link>
            <Link href="/about"><Button variant="outline" size="lg">About us</Button></Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
          <Image src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop" alt="Hero" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}


