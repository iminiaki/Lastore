"use client";

import { useCart } from "@/components/cart-store";
import { products } from "@/data/mock-data";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  productId: string;
  selectedColor?: string;
  selectedSize?: string;
}

export function AddToCartButton({ productId, selectedColor, selectedSize }: AddToCartButtonProps) {
  const { dispatch } = useCart();
  const product = products.find((p) => p.id === productId)!;
  
  const handleAddToCart = () => {
    // Create a product variant with selected options
    const productVariant = {
      ...product,
      selectedColor,
      selectedSize,
    };
    
    dispatch({ type: "add", product: productVariant });
  };
  
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 h-10 rounded-md px-6",
        "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
      onClick={handleAddToCart}
      disabled={!product.inStock}
    >
      {product.inStock ? "Add to cart" : "Out of stock"}
    </button>
  );
}
