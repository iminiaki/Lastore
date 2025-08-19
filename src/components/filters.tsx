"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SortOption } from "@/types";

type Group = { key: string; title: string; options: string[] };

export function Filters({ groups, priceMax }: { groups: Group[]; priceMax: number }) {
  const router = useRouter();
  const params = useSearchParams();

  const selected = useMemo(() => new URLSearchParams(params.toString()), [params]);

  const toggle = (key: string, value: string) => {
    const existing = selected.get(key);
    const set = new Set((existing ? existing.split(",") : []).filter(Boolean));
    if (set.has(value)) set.delete(value);
    else set.add(value);
    if (set.size) selected.set(key, Array.from(set).join(","));
    else selected.delete(key);
    router.push(`/shop?${selected.toString()}`);
  };

  const setRange = (min: number, max: number) => {
    selected.set("minPrice", String(min));
    selected.set("maxPrice", String(max));
    router.push(`/shop?${selected.toString()}`);
  };

  const setSort = (sortBy: SortOption) => {
    selected.set("sortBy", sortBy);
    router.push(`/shop?${selected.toString()}`);
  };

  const min = Number(params.get("minPrice") || 0);
  const max = Number(params.get("maxPrice") || priceMax);

  return (
    <div className="space-y-6">
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
        {groups.map((g) => (
          <AccordionItem key={g.key} value={g.key}>
            <AccordionTrigger>{g.title}</AccordionTrigger>
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
        ))}
        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
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


