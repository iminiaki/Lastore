import { ReadonlyURLSearchParams } from "next/navigation";

export function countActiveFilters(params: ReadonlyURLSearchParams): number {
  let count = 0;
  
  // Count filter groups (brand, material, color, size)
  const filterKeys = ['brand', 'material', 'color', 'size'];
  filterKeys.forEach(key => {
    const value = params.get(key);
    if (value) {
      count += value.split(',').filter(Boolean).length;
    }
  });
  // Count category and subCategory if present
  if (params.get('category')) count += 1;
  if (params.get('subCategory')) count += 1;
  
  // Count price range if it's not at default
  const minPrice = params.get('minPrice');
  const maxPrice = params.get('maxPrice');
  if (minPrice || maxPrice) {
    count += 1; // Count price as one filter
  }
  
  return count;
}

