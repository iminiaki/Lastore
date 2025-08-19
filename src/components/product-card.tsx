"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "./cart-store";
import { useWishlist } from "./wishlist-store";

export function ProductCard({ product }: { product: Product }) {
  const { dispatch: wishlistDispatch, isInWishlist } = useWishlist();
  const { dispatch: cartDispatch } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      wishlistDispatch({ type: "remove", productId: product.id });
    } else {
      wishlistDispatch({ type: "add", product });
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cartDispatch({ type: "add", product, quantity: 1 });
  };

  // Calculate discount percentage if original price exists
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

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

  return (
    <Card className="group overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative aspect-[1/1]">
            <Image 
              src={product.images[0]} 
              alt={product.name} 
              fill 
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className={`object-cover transition-transform group-hover:scale-105 ${!product.inStock ? 'grayscale' : ''}`}
              priority={false}
              loading="lazy"
              quality={85}
              onError={(e) => {
                // Fallback to a placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop";
              }}
            />
            {/* Fallback placeholder for debugging */}
            <div className="absolute inset-0 bg-muted flex items-center justify-center text-xs text-muted-foreground opacity-0 pointer-events-none">
              Image loading...
            </div>
            
            {/* Discount Badge */}
            {discountPercentage && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                -{discountPercentage}%
              </div>
            )}
            
            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 bg-background border border-border hover:bg-accent transition-colors"
              onClick={handleWishlistToggle}
            >
              <Heart 
                className={`h-4 w-4 transition-colors ${
                  isWishlisted 
                    ? "fill-red-500 text-red-500" 
                    : "text-muted-foreground hover:text-red-500"
                }`}
              />
            </Button>

            {/* Quick Add Button - Desktop Only (Hover) */}
            {product.inStock ? (
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-background border border-border hover:bg-accent text-foreground font-medium px-3 py-1.5 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                onClick={handleQuickAdd}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Quick Add
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-background border border-border text-muted-foreground font-medium px-3 py-1.5 transition-all cursor-not-allowed !opacity-100"
                disabled
              >
                
                Out of Stock
              </Button>
            )}
          </div>
        </Link>
        
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <Link href={`/product/${product.id}`} className="block">
                <h3 className="font-medium text-sm">{product.name}</h3>
              </Link>
              
              {/* Category */}
              <p className="text-xs text-muted-foreground capitalize mt-1">{product.category}</p>
              
              {/* Color Options */}
              {product.colors.length > 0 && (
                <div className="flex gap-1 mt-3">
                  {product.colors.slice(0, 3).map((color) => (
                    <div
                      key={color}
                      className={`w-3 h-3 rounded-full ${colorMap[color] || 'bg-gray-300'}`}
                      title={color}
                    />
                  ))}
                </div>
              )}
              
              {/* Price */}
              <div className="mt-3 flex items-center gap-2">
                <span className="font-medium text-sm">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            
            {/* Quick Add Button - Mobile Only */}
            {product.inStock && (
              <Button
                variant="secondary"
                size="icon"
                className="ml-3 h-8 w-8 bg-background border border-border hover:bg-accent text-foreground transition-colors flex-shrink-0 md:hidden"
                onClick={handleQuickAdd}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            ) }
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


