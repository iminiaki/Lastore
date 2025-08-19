"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-store";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function CartPage() {
  const { state, totalPrice, dispatch } = useCart();
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
        <div className="text-muted-foreground">Your cart is empty.</div>
      ) : (
        <div className="grid gap-8 md:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 rounded-lg border p-3">
                <div className="relative h-20 w-16 overflow-hidden rounded-md bg-muted">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.product.name}</div>
                  <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                </div>
                <div className="font-medium">${item.quantity * item.product.price}</div>
                <Button variant="ghost" onClick={() => dispatch({ type: "remove", productId: item.productId })}>Remove</Button>
              </div>
            ))}
          </div>
          <div className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            <Link href="/checkout"><Button className="w-full">Checkout</Button></Link>
          </div>
        </div>
      )}
    </div>
  );
}


