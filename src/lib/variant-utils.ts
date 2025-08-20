import type { Product, ProductVariant } from "@/types";

/**
 * Get the price for a specific product variant
 */
export function getVariantPrice(product: Product, selectedColor?: string, selectedSize?: string): number {
  // If no variants defined, return base price
  if (!product.variants || (!selectedColor && !selectedSize)) {
    return product.price;
  }

  // Try to find exact match
  const exactVariant = product.variants.find(v => 
    v.color === selectedColor && v.size === selectedSize
  );
  
  if (exactVariant) {
    return exactVariant.price;
  }

  // Fallback: find variant with matching color or size
  if (selectedColor) {
    const colorVariant = product.variants.find(v => v.color === selectedColor);
    if (colorVariant) return colorVariant.price;
  }
  
  if (selectedSize) {
    const sizeVariant = product.variants.find(v => v.size === selectedSize);
    if (sizeVariant) return sizeVariant.price;
  }

  // Fallback to base price
  return product.price;
}

/**
 * Get the original price for a specific product variant
 */
export function getVariantOriginalPrice(product: Product, selectedColor?: string, selectedSize?: string): number | undefined {
  // If no variants defined, return base original price
  if (!product.variants || (!selectedColor && !selectedSize)) {
    return product.originalPrice;
  }

  // Try to find exact match
  const exactVariant = product.variants.find(v => 
    v.color === selectedColor && v.size === selectedSize
  );
  
  if (exactVariant) {
    return exactVariant.originalPrice;
  }

  // Fallback: find variant with matching color or size
  if (selectedColor) {
    const colorVariant = product.variants.find(v => v.color === selectedColor);
    if (colorVariant) return colorVariant.originalPrice;
  }
  
  if (selectedSize) {
    const sizeVariant = product.variants.find(v => v.size === selectedSize);
    if (sizeVariant) return sizeVariant.originalPrice;
  }

  // Fallback to base original price
  return product.originalPrice;
}

/**
 * Check if a specific variant is in stock
 */
export function isVariantInStock(product: Product, selectedColor?: string, selectedSize?: string): boolean {
  // If no variants defined, return base inStock status
  if (!product.variants || (!selectedColor && !selectedSize)) {
    return product.inStock;
  }

  // Try to find exact match
  const exactVariant = product.variants.find(v => 
    v.color === selectedColor && v.size === selectedSize
  );
  
  if (exactVariant) {
    return exactVariant.inStock;
  }

  // Fallback: find variant with matching color or size
  if (selectedColor) {
    const colorVariant = product.variants.find(v => v.color === selectedColor);
    if (colorVariant) return colorVariant.inStock;
  }
  
  if (selectedSize) {
    const sizeVariant = product.variants.find(v => v.size === selectedSize);
    if (sizeVariant) return sizeVariant.inStock;
  }

  // Fallback to base inStock status
  return product.inStock;
}

/**
 * Get available variants for a product
 */
export function getAvailableVariants(product: Product): ProductVariant[] {
  return product.variants || [];
}

/**
 * Get price range for a product (min and max prices)
 */
export function getPriceRange(product: Product): { min: number; max: number } {
  if (!product.variants || product.variants.length === 0) {
    return { min: product.price, max: product.price };
  }

  const prices = product.variants.map(v => v.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}
