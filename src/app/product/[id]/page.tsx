"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, categories } from "@/data/mock-data";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ImageModal } from "@/components/image-modal";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-store";
import { useState, use } from "react";
import { cn } from "@/lib/utils";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  if (!product) return notFound();

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");

  const { dispatch: cartDispatch } = useCart();

  const handleAddToCart = () => {
    const productWithVariants = {
      ...product,
      selectedColor,
      selectedSize,
    };
    cartDispatch({ type: "add", product: productWithVariants, quantity: 1 });
  };

  const canAddToCart = selectedColor && selectedSize && product.inStock;

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
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6">
        <Breadcrumbs 
          items={[
            { label: "Shop", href: "/shop" },
            { label: product.category, href: `/category/${product.category}` },
            { label: product.name }
          ]} 
        />
      </div>
      
      <div className="grid gap-10 md:grid-cols-2">
      <div className="grid gap-3">
        <div 
          className="relative aspect-[1/1] overflow-hidden rounded-xl bg-muted cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => {
            setSelectedImageIndex(0);
            setIsImageModalOpen(true);
          }}
        >
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {product.images.map((src, i) => (
            <div 
              key={i} 
              className="relative aspect-square overflow-hidden rounded-md bg-muted cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => {
                setSelectedImageIndex(i);
                setIsImageModalOpen(true);
              }}
            >
              <Image src={src} alt={product.name} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-muted-foreground">{product.brand} • {product.material}</p>
          
          {/* Category Links */}
          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className="text-muted-foreground">Category:</span>
            <Link 
              href={`/category/${product.category}`}
              className="text-primary hover:underline capitalize"
            >
              {product.category}
            </Link>
            {product.subCategory && (
              <>
                <span className="text-muted-foreground">•</span>
                <Link 
                  href={`/category/${product.category}/${product.subCategory}`}
                  className="text-primary hover:underline capitalize"
                >
                  {product.subCategory}
                </Link>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold">${product.price}</div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.inStock 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
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
                    "w-8 h-8 rounded-full border-2 transition-all",
                    colorMap[color] || 'bg-gray-300',
                    selectedColor === color 
                      ? "border-primary ring-2 ring-primary/20" 
                      : "border-border hover:border-primary/50"
                  )}
                  title={color}
                />
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

        <Button 
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className="w-full"
          size="lg"
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
        
        <div>
          <h2 className="text-lg font-medium">Description</h2>
          <p className="text-muted-foreground">{product.description}</p>
        </div>
      </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        images={product.images}
        initialIndex={selectedImageIndex}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        productName={product.name}
      />
    </div>
  );
}


