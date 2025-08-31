"use client";
import type { Product } from "@/types";
import { ProductCard } from "./product-card";
import { useStaggerFadeIn } from "@/lib/gsap";

export function ProductGrid({ products }: { products: Product[] }) {
  useStaggerFadeIn(".product-grid", "> *", { delay: 0.1, stagger: 0.05 });
  return (
    <div className="product-grid grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}


