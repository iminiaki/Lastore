"use client";

import { useState, useRef, useEffect } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { products } from "@/data/mock-data";
import Link from "next/link";
import Image from "next/image";

export function Search() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<typeof products>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 6));
      setIsOpen(true);
      setSelectedIndex(-1); // Reset selection when results change
    } else {
      setResults([]);
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [query]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth"
        });
      }
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          // Navigate to selected product
          window.location.href = `/product/${results[selectedIndex].id}`;
        } else if (query.trim()) {
          // Navigate to search results
          window.location.href = `/shop?search=${encodeURIComponent(query)}`;
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && selectedIndex < results.length) {
      // Navigate to selected product
      window.location.href = `/product/${results[selectedIndex].id}`;
    } else if (query.trim()) {
      // Navigate to shop page with search query
      window.location.href = `/shop?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="relative flex-1 max-w-md" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-lg z-50 max-h-96 flex flex-col">
          <div ref={resultsRef} className="overflow-y-auto flex-1">
            {results.map((product, index) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className={`flex items-center gap-3 p-3 transition-colors ${
                  index === selectedIndex
                    ? "bg-primary/10 border-l-2 border-l-primary"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => setIsOpen(false)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted flex-shrink-0">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                  <p className="text-sm font-semibold">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="border-t p-2 bg-background flex-shrink-0">
            <Link
              href={`/shop?search=${encodeURIComponent(query)}`}
              className="text-sm text-primary hover:underline block text-center"
              onClick={() => setIsOpen(false)}
            >
              View all results ({results.length})
            </Link>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.trim().length > 0 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-lg z-50 p-4">
          <p className="text-sm text-muted-foreground text-center">
            No products found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
