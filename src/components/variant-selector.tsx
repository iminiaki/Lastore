"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface VariantSelectorProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: string, selectedSize: string) => void;
}

export function VariantSelector({ product, isOpen, onClose, onAddToCart }: VariantSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");

  // Color mapping for color circles
  const colorMap: Record<string, string> = {
    black: "bg-black border border-black",
    white: "bg-white border border-gray-300",
    navy: "bg-blue-900",
    beige: "bg-amber-100",
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
    yellow: "bg-yellow-400",
    purple: "bg-purple-500",
    pink: "bg-pink-400",
    gray: "bg-gray-500",
    brown: "bg-amber-700",
  };

  const handleAddToCart = () => {
    if (selectedColor && selectedSize) {
      onAddToCart(product, selectedColor, selectedSize);
      onClose();
    }
  };

  const canAddToCart = selectedColor && selectedSize;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Options</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex gap-4 items-center">
            <div className="relative h-20 w-20 overflow-hidden rounded-md bg-muted flex-shrink-0">
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
              <p className="font-medium mt-1">${product.price.toFixed(2)}</p>
            </div>
          </div>

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Color: {selectedColor}</span>
                <span className="text-sm text-muted-foreground">{product.colors.length} options</span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "relative w-8 h-8 rounded-full border-2 transition-all",
                      colorMap[color] || 'bg-gray-300',
                      selectedColor === color 
                        ? "border-primary ring-2 ring-primary/20" 
                        : "border-border hover:border-primary/50"
                    )}
                    title={color}
                  >
                    {selectedColor === color && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <svg className="w-2.5 h-2.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Size: {selectedSize}</span>
                <span className="text-sm text-muted-foreground">{product.sizes.length} options</span>
              </div>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-4 py-2 text-sm border rounded-md transition-all",
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-accent"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            className="w-full"
          >
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
