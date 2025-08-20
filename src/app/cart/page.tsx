"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-store";
import { useCoupon } from "@/components/coupon-store";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Trash2 } from "lucide-react";
import { CouponInput } from "@/components/coupon-input";

export default function CartPage() {
  const { state, subtotal, discountAmount, finalPrice, dispatch } = useCart();
  const { state: couponState } = useCoupon();
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-8">
      <div className="mb-6">
        <Breadcrumbs 
          items={[
            { label: "Cart" }
          ]} 
        />
      </div>
      <h1 className="text-2xl font-semibold">Cart</h1>
      {state.items.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start adding items to your cart to see them here
            </p>
            <Button asChild>
              <Link href="/shop">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-8 md:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={item.variantKey} className="flex items-center gap-4 rounded-lg border p-3">
                <Link href={`/product/${item.productId}`} className="relative h-20 w-20 overflow-hidden rounded-md bg-muted hover:opacity-80 transition-opacity">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                </Link>
                <div className="flex-1">
                  <Link href={`/product/${item.productId}`} className="font-medium hover:text-primary transition-colors">
                    {item.product.name}
                  </Link>
                  <div className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                    {item.product.selectedColor && (
                      <span> • Color: {item.product.selectedColor}</span>
                    )}
                    {item.product.selectedSize && (
                      <span> • Size: {item.product.selectedSize}</span>
                    )}
                  </div>
                </div>
                <div className="font-medium">${item.quantity * item.variantPrice}</div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => dispatch({ type: "remove", variantKey: item.variantKey })}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="space-y-4 rounded-lg border p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between border-t pt-2 font-semibold">
                <span>Total</span>
                <span>${finalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <CouponInput subtotal={subtotal} />
            
            <Link href="/checkout">
              <Button className="w-full">Checkout</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}


