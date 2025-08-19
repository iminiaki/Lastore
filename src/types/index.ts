export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subCategory: string;
  brand: string;
  material: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  newArrival: boolean;
  clearance: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: Date;
  readTime: number;
  image: string;
  tags: string[];
  slug: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export type SortOption = 'newest' | 'top-sells' | 'price-low-high' | 'price-high-low';
export type FilterType = 'category' | 'subCategory' | 'brand' | 'material' | 'color' | 'size' | 'price';

export interface FilterState {
  categories: string[];
  subCategories: string[];
  brands: string[];
  materials: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  sortBy: SortOption;
}
