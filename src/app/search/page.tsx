"use client";

import { Search } from "@/components/search";

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Search Products</h1>
          <p className="text-muted-foreground">Find exactly what you&apos;re looking for</p>
        </div>
        <div className="max-w-md">
          <Search />
        </div>
      </div>
    </div>
  );
}
