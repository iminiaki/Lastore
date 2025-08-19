"use client";

import { useEffect } from "react";
import gsap from "gsap";

export function useFadeIn(selector: string, options: { delay?: number } = {}) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", delay: options.delay ?? 0 }
      );
    });
    return () => ctx.revert();
  }, [selector, options.delay]);
}


