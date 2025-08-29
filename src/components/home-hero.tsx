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
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Minimal styles<br/>for every season</h1>
          <p className="text-muted-foreground">Discover curated apparel with clean aesthetics and thoughtful details.<br/> Built for comfort, designed to last.</p>
          <div className="flex gap-3">
            <Link href="/shop"><Button size="lg">Shop now</Button></Link>
            <Link href="/about"><Button variant="outline" size="lg">About us</Button></Link>
          </div>
        </div>
        <div className="relative w-full aspect-[1/1] overflow-hidden rounded-xl">
          <Image src="/product images/AExSYDNEYSWEENEY_9.webp" alt="Hero" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}


