"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import type { SortOption } from "@/types";

type Group = { key: string; title: string; options: string[] };
type Option = { label: string; value: string };

export function Filters({ 
  groups, 
  priceMax,
  categoryOptions,
  subOptionsByCategory
}: { 
  groups: Group[]; 
  priceMax: number;
  categoryOptions?: Option[];
  subOptionsByCategory?: Record<string, Option[]>;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const selected = useMemo(() => new URLSearchParams(params.toString()), [params]);

  const toggle = (key: string, value: string) => {
    const existing = selected.get(key);
    const set = new Set((existing ? existing.split(",") : []).filter(Boolean));
    if (set.has(value)) set.delete(value);
    else set.add(value);
    if (set.size) selected.set(key, Array.from(set).join(","));
    else selected.delete(key);
    router.push(`${pathname}?${selected.toString()}`);
  };

  const setRange = (min: number, max: number) => {
    selected.set("minPrice", String(min));
    selected.set("maxPrice", String(max));
    router.push(`${pathname}?${selected.toString()}`);
  };

  const setSort = (sortBy: SortOption) => {
    selected.set("sortBy", sortBy);
    router.push(`${pathname}?${selected.toString()}`);
  };

  const setCategory = (category: string) => {
    if (category) selected.set("category", category);
    else selected.delete("category");
    // reset subCategory when category changes
    selected.delete("subCategory");
    router.push(`${pathname}?${selected.toString()}`);
  };

  const setSubCategory = (sub: string) => {
    if (sub) selected.set("subCategory", sub);
    else selected.delete("subCategory");
    router.push(`${pathname}?${selected.toString()}`);
  };

  const min = Number(params.get("minPrice") || 0);
  const max = Number(params.get("maxPrice") || priceMax);

  // Helper function to count active filters for a specific group
  const getActiveCount = (key: string) => {
    const value = params.get(key);
    return value ? value.split(',').filter(Boolean).length : 0;
  };

  // Check if price filter is active
  const isPriceActive = min > 0 || max < priceMax;

  // Get all active filters (including category and subCategory)
  const activeFilters = useMemo(() => {
    const filters: Array<{ key: string; value: string; label: string; type: 'category' | 'price' }> = [];

    // category (single)
    const cat = params.get('category');
    if (cat) {
      const label = categoryOptions?.find((o) => o.value === cat)?.label || cat;
      filters.push({ key: 'category', value: cat, label, type: 'category' });
    }

    // subCategory (multi)
    const subs = params.get('subCategory');
    if (subs) {
      subs
        .split(',')
        .filter(Boolean)
        .forEach((sub) => {
          const label = subOptionsByCategory?.[cat || '']?.find((o) => o.value === sub)?.label || sub;
          filters.push({ key: 'subCategory', value: sub, label, type: 'category' });
        });
    }

    // other groups
    groups.forEach((group) => {
      const values = params.get(group.key);
      if (values) {
        values
          .split(',')
          .filter(Boolean)
          .forEach((value) => {
            filters.push({ key: group.key, value, label: value, type: 'category' });
          });
      }
    });

    // price
    if (isPriceActive) {
      filters.push({ key: 'price', value: `${min}-${max}`, label: `$${min} - ${max}`, type: 'price' });
    }

    return filters;
  }, [params, groups, isPriceActive, min, max, categoryOptions, subOptionsByCategory]);

  // Remove a specific filter
  const removeFilter = (filter: typeof activeFilters[0]) => {
    if (filter.type === 'price') {
      selected.delete('minPrice');
      selected.delete('maxPrice');
    } else {
      const existing = selected.get(filter.key);
      const set = new Set((existing ? existing.split(",") : []).filter(Boolean));
      set.delete(filter.value);
      if (set.size) {
        selected.set(filter.key, Array.from(set).join(","));
      } else {
        selected.delete(filter.key);
      }
    }
    router.push(`${pathname}?${selected.toString()}`);
  };

  // Clear all filters
  const clearAllFilters = () => {
    groups.forEach(group => {
      selected.delete(group.key);
    });
    selected.delete('minPrice');
    selected.delete('maxPrice');
    selected.delete('category');
    selected.delete('subCategory');
    router.push(`${pathname}?${selected.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Active Filters Section */}
      {activeFilters.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Active Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <Badge
                key={`${filter.key}-${filter.value}-${index}`}
                variant="secondary"
                className="flex items-center gap-1 px-2 py-1 text-xs"
              >
                <span>{filter.label}</span>
                <button
                  type="button"
                  onClick={() => removeFilter(filter)}
                  className="flex items-center justify-center hover:bg-muted rounded-sm transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <Separator />
        </div>
      )}

      <Select onValueChange={(v) => setSort(v as SortOption)} defaultValue={(params.get("sortBy") as string) || "newest"}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="top-sells">Top sells</SelectItem>
          <SelectItem value="price-low-high">Price: Low to high</SelectItem>
          <SelectItem value="price-high-low">Price: High to low</SelectItem>
        </SelectContent>
      </Select>

      <Accordion type="multiple" className="w-full">
        {/* Category Accordion */}
        {categoryOptions && (
          <AccordionItem value="category">
            <AccordionTrigger asChild>
              <button className="flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                <span>Category</span>
                <div className="flex items-center gap-2">
                  {params.get('category') && (
                    <Badge className="h-5 min-w-5 justify-center rounded-sm px-1 text-[10px] bg-primary text-primary-foreground">1</Badge>
                  )}
                  <svg
                    className="h-4 w-4 shrink-0 transition-transform duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </div>
              </button>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categoryOptions.map((opt) => {
                  const checked = params.get('category') === opt.value;
                  return (
                    <div className="flex items-center gap-2" key={opt.value}>
                      <Checkbox id={`cat-${opt.value}`} checked={checked} onCheckedChange={() => setCategory(checked ? '' : opt.value)} />
                      <Label htmlFor={`cat-${opt.value}`}>{opt.label}</Label>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Subcategory Accordion */}
        {subOptionsByCategory && (
          <AccordionItem value="subCategory">
            <AccordionTrigger asChild>
              <button className="flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                <span>Subcategory</span>
                <div className="flex items-center gap-2">
                  {getActiveCount('subCategory') > 0 && (
                    <Badge className="h-5 min-w-5 justify-center rounded-sm px-1 text-[10px] bg-primary text-primary-foreground">
                      {getActiveCount('subCategory')}
                    </Badge>
                  )}
                  <svg
                    className="h-4 w-4 shrink-0 transition-transform duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </div>
              </button>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {(() => {
                  const catParam = params.get('category');
                  const keys = Object.keys(subOptionsByCategory);
                  const effectiveCat = catParam || (keys.length === 1 ? keys[0] : '');
                  const options = effectiveCat ? (subOptionsByCategory[effectiveCat] || []) : [];
                  return options.length ? (
                    options.map((opt) => {
                      const values = new Set((params.get('subCategory')?.split(',') || []).filter(Boolean));
                      const checked = values.has(opt.value);
                      return (
                        <div className="flex items-center gap-2" key={opt.value}>
                          <Checkbox id={`sub-${opt.value}`} checked={checked} onCheckedChange={() => toggle('subCategory', opt.value)} />
                          <Label htmlFor={`sub-${opt.value}`}>{opt.label}</Label>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-xs text-muted-foreground">Select a category to see subcategories</div>
                  );
                })()}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
        {groups.map((g) => {
          const activeCount = getActiveCount(g.key);
          return (
            <AccordionItem key={g.key} value={g.key}>
              <AccordionTrigger asChild>
                <button className="flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                  <span>{g.title}</span>
                  <div className="flex items-center gap-2">
                    {activeCount > 0 && (
                      <Badge className="h-5 min-w-5 justify-center rounded-sm px-1 text-[10px] bg-primary text-primary-foreground">
                        {activeCount}
                      </Badge>
                    )}
                    <svg
                      className="h-4 w-4 shrink-0 transition-transform duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </button>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {g.options.map((opt) => {
                    const values = new Set((params.get(g.key)?.split(",") || []).filter(Boolean));
                    const checked = values.has(opt);
                    return (
                      <div className="flex items-center gap-2" key={opt}>
                        <Checkbox id={`${g.key}-${opt}`} checked={checked} onCheckedChange={() => toggle(g.key, opt)} />
                        <Label htmlFor={`${g.key}-${opt}`}>{opt}</Label>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
        <AccordionItem value="price">
          <AccordionTrigger asChild>
            <button className="flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
              <span>Price</span>
              <div className="flex items-center gap-2">
                {isPriceActive && (
                  <Badge className="h-5 min-w-5 justify-center rounded-sm px-1 text-[10px] bg-primary text-primary-foreground">
                    1
                  </Badge>
                )}
                <svg
                  className="h-4 w-4 shrink-0 transition-transform duration-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6,9 12,15 18,9" />
                </svg>
              </div>
            </button>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={[min, max]} min={0} max={priceMax} step={5} onValueChange={(v) => setRange(v[0]!, v[1]!)} />
              <div className="text-sm text-muted-foreground">${min} - ${max}</div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}


