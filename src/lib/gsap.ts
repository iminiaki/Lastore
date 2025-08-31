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


export function useStaggerFadeIn(
  containerSelector: string,
  itemSelector: string = "> *",
  options: { delay?: number; stagger?: number; y?: number; duration?: number } = {}
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = `${containerSelector} ${itemSelector}`.trim();
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: options.y ?? 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: options.duration ?? 0.5,
          ease: "power2.out",
          delay: options.delay ?? 0,
          stagger: options.stagger ?? 0.06,
        }
      );
    });
    return () => ctx.revert();
  }, [containerSelector, itemSelector, options.delay, options.stagger, options.duration, options.y]);
}


