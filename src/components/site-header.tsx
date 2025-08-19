"use client";

import Link from "next/link";
import { ShoppingBag, User2 } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useCart } from "./cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "./search";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const { totalQuantity } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center gap-12 flex-1">
          <Link href="/" className="font-semibold text-lg">
            Lastore
          </Link>
          <nav className="hidden gap-6 md:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Center - Search Bar */}
        <div className="hidden md:flex justify-center flex-1">
          <Search />
        </div>
        
        {/* Right side - User actions */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <Link href="/profile" aria-label="Profile" className="hidden md:block">
            <Button variant="ghost" size="icon">
              <User2 className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/cart" className="relative" aria-label="Cart">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            {totalQuantity > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]">
                {totalQuantity}
              </Badge>
            )}
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
