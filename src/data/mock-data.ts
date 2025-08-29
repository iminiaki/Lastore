import type { Product, Category, BlogPost, Order, User } from "@/types";

export const categories: Category[] = [
  {
    id: "cat-men",
    name: "Men",
    slug: "men",
    image: "/product images/man.jpg",
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
    image: "/product images/woman.jpg",
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
    image: "/product images/kids.jpg",
    subCategories: [
      { id: "sub-kids-tops", name: "Tops", slug: "tops", categoryId: "cat-kids" },
      { id: "sub-kids-bottoms", name: "Bottoms", slug: "bottoms", categoryId: "cat-kids" },
    ],
  },
  {
    id: "cat-accessories",
    name: "Accessories",
    slug: "accessories",
    image: "/product images/accessories.jpg",
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
  
  // Array of local clothing images from the product images folder
  const clothingImages = [
    "/product images/27A278AA-BRWN--17964.jpg",
    "/product images/27A228AA-BRWN--15363.jpg",
    "/product images/27A228AA-NAVY--11216.jpg",
    "/product images/SPRINGWOVENS--8314.jpg",
    "/product images/2164350H-EVBL--3822.jpg",
    "/product images/21497589-BEBN--12730.jpg",
    "/product images/27A227AA-TNBR--13142.jpg",
    "/product images/2166861D-WHIT--5545.jpg",
    "/product images/747006C1K-WHBL--4773.jpg",
    "/product images/321116C1Q-UVRD--13441_770ff183-ec62-4235-8f3b-064994175912.jpg",
    "/product images/21116C1Q-HRTL--14610_96ed2895-2e5c-4cf1-84ad-fe9614553850.jpg",
    "/product images/321115C1Q-WIRS--14174.jpg",
    "/product images/2164612J-MCMS--12495.jpg",
    "/product images/2162806H-WDBH--13110.jpg",
    "/product images/213285RB-NEBY--12615CROP.jpg",
    "/product images/11C5813O-HGRY--8357.jpg",
    "/product images/11C678-WHIT--11394.jpg",
    "/product images/11D2252X-ERED--87281.jpg",
    "/product images/11D2252X-CLNV--89547.jpg",
    "/product images/11A752GA-OLDK--1641.jpg",
    "/product images/11D258EE-BLRF--4068.jpg",
    "/product images/11D258EE-GNLW--14266.jpg",
    "/product images/11D2673O-BOXF--4733CROP.jpg",
    "/product images/11D77504-ERED--8597.jpg",
    "/product images/11C61704-OYSA--1821CROP.jpg",
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
    // Add variant-specific pricing for some products
    variants: idx % 3 === 0 ? [
      { color: "black", size: "S", price: price + 5, originalPrice: originalPrice ? originalPrice + 5 : undefined, inStock: true },
      { color: "black", size: "M", price: price + 3, originalPrice: originalPrice ? originalPrice + 3 : undefined, inStock: true },
      { color: "black", size: "L", price: price + 7, originalPrice: originalPrice ? originalPrice + 7 : undefined, inStock: false },
      { color: "white", size: "S", price: price + 2, originalPrice: originalPrice ? originalPrice + 2 : undefined, inStock: true },
      { color: "white", size: "M", price: price, originalPrice, inStock: true },
      { color: "white", size: "L", price: price + 4, originalPrice: originalPrice ? originalPrice + 4 : undefined, inStock: true },
      { color: "navy", size: "S", price: price + 6, originalPrice: originalPrice ? originalPrice + 6 : undefined, inStock: true },
      { color: "navy", size: "M", price: price + 1, originalPrice: originalPrice ? originalPrice + 1 : undefined, inStock: true },
      { color: "navy", size: "L", price: price + 8, originalPrice: originalPrice ? originalPrice + 8 : undefined, inStock: false },
    ] : undefined,
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

export const posts: BlogPost[] = [
  {
    id: "post-1",
    title: "10 Essential Pieces for a Minimalist Wardrobe",
    excerpt: "Discover the key items that will transform your closet into a curated collection of versatile, timeless pieces that work for any occasion.",
    content: `# 10 Essential Pieces for a Minimalist Wardrobe

Building a minimalist wardrobe doesn't mean sacrificing style—it's about choosing quality over quantity. Here are the 10 essential pieces that will form the foundation of your capsule collection.

## 1. Classic White T-Shirt
A well-fitted white t-shirt is the ultimate wardrobe staple. Look for 100% cotton with a comfortable fit that works for both casual and semi-formal occasions.

## 2. Tailored Blazer
A versatile blazer in navy or black can instantly elevate any outfit. Choose a classic cut that works with both jeans and dress pants.

## 3. Dark Denim Jeans
Invest in a pair of high-quality dark wash jeans that fit perfectly. They should be comfortable enough for daily wear but polished enough for casual work environments.

## 4. White Button-Down Shirt
A crisp white button-down is essential for professional settings and can be dressed down for weekend wear.

## 5. Neutral Sweater
A soft, neutral-colored sweater in wool or cashmere will keep you warm and stylish through multiple seasons.

## 6. Black Dress
Every woman needs a little black dress that can be dressed up or down depending on the occasion.

## 7. Comfortable Flats
A pair of well-made flats in a neutral color will serve you well for both work and casual outings.

## 8. Structured Bag
A quality leather bag in a neutral color will complement any outfit and last for years.

## 9. Classic Coat
Invest in a well-tailored coat that will keep you warm and stylish through the winter months.

## 10. Versatile Scarf
A silk or wool scarf in a neutral color can add interest to any outfit and serve as a practical accessory.

Remember, the key to a successful minimalist wardrobe is choosing pieces that work together and reflect your personal style.`,
    author: { 
      name: "Sarah Chen", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" 
    },
    publishedAt: new Date(now.getTime() - 2 * 86400000),
    readTime: 8,
    image: "/product images/27A278AA-BRWN--17964.jpg",
    tags: ["style", "minimalism", "wardrobe"],
    slug: "10-essential-pieces-minimalist-wardrobe",
  },
  {
    id: "post-2",
    title: "Sustainable Fashion: Caring for Your Natural Fabrics",
    excerpt: "Learn the best practices for maintaining your cotton, linen, and wool garments to extend their lifespan and keep them looking fresh.",
    content: `# Sustainable Fashion: Caring for Your Natural Fabrics

Taking care of your natural fiber garments is essential for both their longevity and the environment. Here's how to properly care for different types of natural fabrics.

## Cotton Care
- Wash cotton garments in cold water to prevent shrinking
- Use mild detergents and avoid fabric softeners
- Air dry when possible to maintain shape and reduce energy consumption
- Iron on medium heat if needed

## Linen Maintenance
- Hand wash or use gentle cycle for linen items
- Avoid wringing out linen garments
- Steam iron while damp for best results
- Store folded to prevent creasing

## Wool Care
- Dry clean wool garments or hand wash with wool-specific detergent
- Never wring out wool items
- Lay flat to dry to maintain shape
- Use cedar blocks for storage to prevent moths

## General Tips
- Always check care labels before washing
- Repair small damages immediately to prevent larger issues
- Store garments properly to prevent damage
- Consider eco-friendly laundry products

By following these care instructions, your natural fiber garments will last longer and look better, reducing the need for frequent replacements.`,
    author: { 
      name: "Marcus Rodriguez", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
    },
    publishedAt: new Date(now.getTime() - 7 * 86400000),
    readTime: 6,
    image: "/product images/2166861D-WHIT--5545.jpg",
    tags: ["sustainability", "care", "fabrics"],
    slug: "sustainable-fashion-caring-natural-fabrics",
  },
  {
    id: "post-3",
    title: "Mastering the Art of Layering for Every Season",
    excerpt: "From lightweight summer layers to cozy winter combinations, master the techniques that will elevate your style year-round.",
    content: `# Mastering the Art of Layering for Every Season

Layering is an art form that can transform your wardrobe and keep you comfortable in any weather. Here's how to master layering for every season.

## Spring Layering
- Start with a lightweight base layer
- Add a cardigan or light jacket
- Use scarves for added warmth and style
- Choose breathable fabrics like cotton and linen

## Summer Layering
- Focus on lightweight, breathable materials
- Use tank tops under sheer blouses
- Add a light cardigan for cooler evenings
- Choose natural fibers that wick moisture

## Fall Layering
- Begin with a fitted base layer
- Add a sweater or cardigan
- Include a structured jacket or blazer
- Use accessories like scarves and hats

## Winter Layering
- Start with thermal underwear
- Add multiple thin layers rather than one thick layer
- Include a warm coat or jacket
- Don't forget accessories like gloves and hats

## Layering Tips
- Mix textures for visual interest
- Use color coordination to create cohesive looks
- Consider the weather and your activities
- Don't be afraid to experiment with different combinations

Remember, the key to successful layering is choosing pieces that work together and can be easily added or removed as needed.`,
    author: { 
      name: "Emma Thompson", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" 
    },
    publishedAt: new Date(now.getTime() - 14 * 86400000),
    readTime: 10,
    image: "/product images/11C678-WHIT--11394.jpg",
    tags: ["style", "layering", "seasonal"],
    slug: "mastering-art-layering-every-season",
  },
  {
    id: "post-4",
    title: "The Psychology of Color in Fashion",
    excerpt: "Understanding how different colors affect our mood and perception can help you make more intentional style choices.",
    content: `# The Psychology of Color in Fashion

Colors have a profound impact on our emotions and how others perceive us. Understanding color psychology can help you make more intentional style choices.

## Red: Power and Confidence
Red is associated with energy, passion, and confidence. It's perfect for important meetings or when you want to make a bold statement.

## Blue: Trust and Stability
Blue conveys trustworthiness and professionalism. It's ideal for job interviews and business settings.

## Green: Growth and Harmony
Green represents nature, growth, and balance. It's calming and works well for creative environments.

## Yellow: Optimism and Creativity
Yellow is cheerful and stimulates creativity. It's great for social events and creative workplaces.

## Purple: Luxury and Mystery
Purple is associated with luxury, creativity, and mystery. It's perfect for evening events and artistic settings.

## Black: Sophistication and Authority
Black conveys sophistication and authority. It's versatile and works for almost any occasion.

## White: Purity and Simplicity
White represents cleanliness and simplicity. It's perfect for fresh starts and minimalist aesthetics.

## Choosing Colors
Consider your mood, the occasion, and the message you want to convey when selecting colors for your outfit.`,
    author: { 
      name: "Sarah Chen", 
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" 
    },
    publishedAt: new Date(now.getTime() - 21 * 86400000),
    readTime: 7,
    image: "/product images/27A228AA-BRWN--15363.jpg",
    tags: ["psychology", "color", "style"],
    slug: "psychology-color-fashion",
  },
  {
    id: "post-5",
    title: "Building a Capsule Wardrobe on a Budget",
    excerpt: "Learn how to create a versatile, high-quality wardrobe without breaking the bank through smart shopping strategies.",
    content: `# Building a Capsule Wardrobe on a Budget

Creating a capsule wardrobe doesn't have to be expensive. With smart shopping strategies, you can build a versatile, high-quality wardrobe on any budget.

## Set Your Budget
- Determine how much you can spend on your wardrobe
- Allocate funds for key pieces vs. accessories
- Plan for seasonal updates

## Quality Over Quantity
- Invest in well-made basics that will last
- Look for natural fibers and good construction
- Avoid trendy pieces that will quickly go out of style

## Smart Shopping Strategies
- Shop during sales and clearance events
- Consider second-hand and vintage options
- Look for versatile pieces that work with multiple outfits
- Buy off-season for better prices

## Essential Pieces to Invest In
- A well-fitting pair of jeans
- A quality white t-shirt
- A versatile blazer
- Comfortable, durable shoes
- A structured bag

## Maintenance Tips
- Learn basic repairs to extend garment life
- Proper care and storage prevent damage
- Regular cleaning keeps clothes looking fresh

Remember, a capsule wardrobe is an investment in your style and confidence. Take your time building it piece by piece.`,
    author: { 
      name: "Marcus Rodriguez", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
    },
    publishedAt: new Date(now.getTime() - 28 * 86400000),
    readTime: 9,
    image: "/product images/2162806H-WDBH--13110.jpg",
    tags: ["budget", "capsule", "shopping"],
    slug: "building-capsule-wardrobe-budget",
  },
  {
    id: "post-6",
    title: "Sustainable Fashion: The Future of Style",
    excerpt: "Explore how sustainable practices are shaping the future of fashion and how you can make more eco-conscious choices.",
    content: `# Sustainable Fashion: The Future of Style

The fashion industry is evolving, and sustainability is at the forefront of this transformation. Here's how sustainable practices are shaping the future of style.

## The Impact of Fast Fashion
- Environmental damage from textile production
- Poor working conditions in manufacturing
- Excessive waste from disposable clothing
- Carbon footprint of global supply chains

## Sustainable Alternatives
- Choose brands with transparent supply chains
- Look for eco-friendly materials like organic cotton
- Support local and ethical manufacturers
- Consider rental and second-hand options

## Making Conscious Choices
- Buy less, choose well
- Invest in quality over quantity
- Care for your clothes to extend their life
- Repurpose and upcycle old garments

## Supporting Sustainable Brands
- Research brand values and practices
- Look for certifications and transparency
- Support small, local businesses
- Choose timeless over trendy

## The Future of Fashion
Sustainable fashion isn't just a trend—it's the future. By making conscious choices, we can all contribute to a more ethical and environmentally friendly fashion industry.`,
    author: { 
      name: "Emma Thompson", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" 
    },
    publishedAt: new Date(now.getTime() - 35 * 86400000),
    readTime: 11,
    image: "/product images/747006C1K-WHBL--4773.jpg",
    tags: ["sustainability", "future", "ethics"],
    slug: "sustainable-fashion-future-style",
  }
];

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


