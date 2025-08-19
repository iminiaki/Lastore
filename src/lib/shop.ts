import type { Product, SortOption } from "@/types";

export interface ProductQuery {
  search?: string;
  category?: string;
  subCategory?: string;
  brand?: string[];
  material?: string[];
  color?: string[];
  size?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SortOption;
}

export function filterProducts(products: Product[], query: ProductQuery): Product[] {
  let result = products.filter((p) => {
    // Search functionality
    if (query.search && query.search.trim()) {
      const searchTerm = query.search.toLowerCase();
      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm) ||
        p.subCategory.toLowerCase().includes(searchTerm) ||
        p.material.toLowerCase().includes(searchTerm);
      
      if (!matchesSearch) return false;
    }
    
    if (query.category && p.category !== query.category) return false;
    if (query.subCategory && p.subCategory !== query.subCategory) return false;
    if (query.brand && query.brand.length && !query.brand.includes(p.brand)) return false;
    if (query.material && query.material.length && !query.material.includes(p.material)) return false;
    if (query.color && query.color.length && !query.color.some((c) => p.colors.includes(c))) return false;
    if (query.size && query.size.length && !query.size.some((s) => p.sizes.includes(s))) return false;
    if (typeof query.minPrice === "number" && p.price < query.minPrice) return false;
    if (typeof query.maxPrice === "number" && p.price > query.maxPrice) return false;
    return true;
  });

  switch (query.sortBy) {
    case "price-low-high":
      result = result.sort((a, b) => a.price - b.price);
      break;
    case "price-high-low":
      result = result.sort((a, b) => b.price - a.price);
      break;
    case "top-sells":
      result = result.sort((a, b) => b.reviews - a.reviews);
      break;
    case "newest":
    default:
      result = result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  return result;
}

export function parseQuery(params: Record<string, string | string[] | undefined>): ProductQuery {
  const toArray = (val?: string | string[]): string[] | undefined => {
    if (!val) return undefined;
    return Array.isArray(val) ? val : val.split(",").filter(Boolean);
  };
  const num = (v?: string | string[]) => (Array.isArray(v) ? parseFloat(v[0]!) : v ? parseFloat(v) : undefined);
  return {
    search: typeof params.search === "string" ? params.search : undefined,
    category: typeof params.category === "string" ? params.category : undefined,
    subCategory: typeof params.subCategory === "string" ? params.subCategory : undefined,
    brand: toArray(params.brand),
    material: toArray(params.material),
    color: toArray(params.color),
    size: toArray(params.size),
    minPrice: num(params.minPrice),
    maxPrice: num(params.maxPrice),
    sortBy: (params.sortBy as SortOption) || "newest",
  };
}


