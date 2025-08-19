"use client";

import { useCart } from "@/components/cart-store";
import { products } from "@/data/mock-data";
import { cn } from "@/lib/utils";

export function AddToCartButton({ productId }: { productId: string }) {
  const { dispatch } = useCart();
  const product = products.find((p) => p.id === productId)!;
  
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 h-10 rounded-md px-6",
        "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
      onClick={() => dispatch({ type: "add", product })}
      disabled={!product.inStock}
    >
      {product.inStock ? "Add to cart" : "Out of stock"}
    </button>
  );
}
