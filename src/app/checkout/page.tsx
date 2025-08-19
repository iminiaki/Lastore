"use client";

import { useCart } from "@/components/cart-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CheckoutPage() {
  const { state, totalPrice, dispatch } = useCart();
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 grid gap-10 md:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Checkout</h1>
          <p className="text-muted-foreground">Enter your shipping and payment details.</p>
        </div>
        <form className="grid gap-4">
          <Input placeholder="Full name" />
          <Input placeholder="Email" type="email" />
          <Input placeholder="Phone" />
          <Input placeholder="Address" />
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="City" />
            <Input placeholder="State" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="ZIP" />
            <Input placeholder="Country" />
          </div>
          <Textarea placeholder="Notes (optional)" rows={4} />
          <Button type="submit" onClick={(e) => { e.preventDefault(); dispatch({ type: "clear" }); alert("Order placed!"); }}>Place order</Button>
        </form>
      </div>
      <aside className="space-y-4 rounded-lg border p-4">
        <div className="font-medium">Order summary</div>
        <div className="space-y-2 text-sm">
          {state.items.map((i) => (
            <div key={i.productId} className="flex items-center justify-between">
              <span>{i.product.name} × {i.quantity}</span>
              <span>${(i.quantity * i.product.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t pt-2">
          <span>Total</span>
          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </div>
      </aside>
    </div>
  );
}


