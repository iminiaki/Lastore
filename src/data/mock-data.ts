import type { Product, Category, BlogPost, Order, User } from "@/types";

export const categories: Category[] = [
  {
    id: "cat-men",
    name: "Men",
    slug: "men",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    subCategories: [
      { id: "sub-men-tops", name: "Tops", slug: "tops", categoryId: "cat-men" },
      { id: "sub-men-bottoms", name: "Bottoms", slug: "bottoms", categoryId: "cat-men" },
      { id: "sub-men-outerwear", name: "Outerwear", slug: "outerwear", categoryId: "cat-men" },
    ],
  },
  {
    id: "cat-women",
    name: "Women",
    slug: "women",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop",
    subCategories: [
      { id: "sub-women-tops", name: "Tops", slug: "tops", categoryId: "cat-women" },
      { id: "sub-women-dresses", name: "Dresses", slug: "dresses", categoryId: "cat-women" },
      { id: "sub-women-outerwear", name: "Outerwear", slug: "outerwear", categoryId: "cat-women" },
    ],
  },
  {
    id: "cat-kids",
    name: "Kids",
    slug: "kids",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop",
    subCategories: [
      { id: "sub-kids-tops", name: "Tops", slug: "tops", categoryId: "cat-kids" },
      { id: "sub-kids-bottoms", name: "Bottoms", slug: "bottoms", categoryId: "cat-kids" },
    ],
  },
  {
    id: "cat-accessories",
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop",
    subCategories: [
      { id: "sub-acc-bags", name: "Bags", slug: "bags", categoryId: "cat-accessories" },
      { id: "sub-acc-hats", name: "Hats", slug: "hats", categoryId: "cat-accessories" },
    ],
  },
];

const now = new Date();

export const products: Product[] = Array.from({ length: 24 }).map((_, idx) => {
  const isClearance = idx % 6 === 0;
  const isNew = idx % 4 === 0;
  const category = categories[idx % categories.length];
  const sub = category.subCategories[idx % category.subCategories.length];
  const price = 29 + (idx % 8) * 10;
  const originalPrice = isClearance ? price + 20 : undefined;
  
  // Array of different clothing images for variety
  const clothingImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop", // Men's shirt
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop", // Women's dress
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=600&fit=crop", // Kids clothing
    "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=600&fit=crop", // Accessories
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop", // Denim jacket
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop", // Casual shirt
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=600&fit=crop", // Summer dress
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop", // Fashion model
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop", // Casual wear
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=600&fit=crop", // Street style
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=600&fit=crop", // Business casual
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=600&fit=crop", // Elegant dress
    "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=400&h=600&fit=crop", // Minimalist outfit
    "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=400&h=600&fit=crop", // Casual jacket
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=600&fit=crop", // Urban style
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop", // Classic shirt
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop", // Fashion dress
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop", // Denim style
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop", // Relaxed fit
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=600&fit=crop", // Summer fashion
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop", // Modern style
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop", // Casual chic
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=600&fit=crop", // Street fashion
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=600&fit=crop", // Professional look
  ];

  return {
    id: `prod-${idx + 1}`,
    name: ["Linen Shirt", "Cotton Tee", "Denim Jacket", "Chino Pants", "Summer Dress", "Casual Blazer", "Knit Sweater", "Silk Blouse"][(idx % 8)] + ` ${idx + 1}`,
    description: "Breathable fabric with minimal silhouette for daily comfort.",
    price,
    originalPrice,
    images: [
      clothingImages[idx % clothingImages.length],
      clothingImages[(idx + 1) % clothingImages.length], // Second image for variety
    ],
    category: category.slug,
    subCategory: sub.slug,
    brand: ["Lastore", "Essential", "Form", "Arc"][idx % 4],
    material: ["Cotton", "Linen", "Denim", "Wool"][idx % 4],
    colors: ["black", "white", "navy", "beige"].slice(0, (idx % 4) + 1),
    sizes: ["XS", "S", "M", "L", "XL"].slice(0, 3 + (idx % 3)),
    rating: 3 + (idx % 3),
    reviews: 10 + idx * 2,
    inStock: idx % 7 !== 0,
    featured: idx % 5 === 0,
    newArrival: isNew,
    clearance: isClearance,
    tags: [category.slug, sub.slug],
    createdAt: now,
    updatedAt: now,
  };
});

export const posts: BlogPost[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `post-${i + 1}`,
  title: [
    "Effortless Wardrobe Essentials",
    "Caring for Natural Fabrics",
    "Layering for Transitional Weather",
  ][i % 3],
  excerpt: "Thoughtful style notes and practical tips for everyday dressing.",
  content: `# Minimal Wardrobe Guide\n\nBuild a capsule collection with breathable, durable fabrics.`,
  author: { name: "Alex Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  publishedAt: new Date(now.getTime() - i * 86400000),
  readTime: 5 + (i % 3),
  image: `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop&ix=${i}`,
  tags: ["style", "care", "guide"],
  slug: `effortless-wardrobe-${i + 1}`,
}));

export const mockUser: User = {
  id: "user-1",
  name: "Alex Doe",
  email: "alex@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  phone: "+1 555 0123",
  address: {
    street: "123 Market St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94110",
    country: "USA",
  },
};

export const orders: Order[] = [
  {
    id: "ord-1001",
    userId: mockUser.id,
    items: [
      { productId: products[0].id, quantity: 1, price: products[0].price, product: products[0] },
      { productId: products[1].id, quantity: 2, price: products[1].price, product: products[1] },
    ],
    total: products[0].price + 2 * products[1].price,
    status: "shipped",
    shippingAddress: mockUser.address!,
    paymentMethod: "Card",
    createdAt: now,
    updatedAt: now,
  },
];

export const brands = ["Lastore", "Essential", "Form", "Arc"];
export const materials = ["Cotton", "Linen", "Denim", "Wool"];
export const colors = ["black", "white", "navy", "beige"];
export const sizes = ["XS", "S", "M", "L", "XL"];


