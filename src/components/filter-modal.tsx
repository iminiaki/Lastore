"use client";

import { useState } from "react";
import { Filter, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filters } from "./filters";
import { useSearchParams, useRouter } from "next/navigation";
import { countActiveFilters } from "@/lib/filter-utils";
import { Badge } from "@/components/ui/badge";

type Group = { key: string; title: string; options: string[] };
type Option = { label: string; value: string };

export function FilterModal({ groups, priceMax, categoryOptions, subOptionsByCategory }: { groups: Group[]; priceMax: number; categoryOptions?: Option[]; subOptionsByCategory?: Record<string, Option[]> }) {
  const [open, setOpen] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const activeFiltersCount = countActiveFilters(params);

  const resetFilters = () => {
    // Get current pathname and reset all filters
    const pathname = window.location.pathname;
    router.push(pathname);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="md:hidden relative">
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 min-w-5 justify-center rounded-full px-1 text-[10px] bg-primary text-primary-foreground">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-full max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto py-4">
          <Filters groups={groups} priceMax={priceMax} categoryOptions={categoryOptions} subOptionsByCategory={subOptionsByCategory} />
        </div>
        <div className="flex gap-2 pt-4 border-t flex-shrink-0">
          <Button
            variant="outline"
            onClick={resetFilters}
            className="flex-1"
            disabled={activeFiltersCount === 0}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={() => setOpen(false)}
            className="flex-1"
          >
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
