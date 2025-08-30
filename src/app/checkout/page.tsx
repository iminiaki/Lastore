"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CouponInput } from "@/components/coupon-input";
import { Country, State, City } from "country-state-city";

export default function CheckoutPage() {
  const { state, subtotal, discountAmount, finalPrice, dispatch } = useCart();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Get all countries
  const countries = Country.getAllCountries();
  
  // Get states for selected country
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  
  // Get cities for selected state
  const cities = selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedState(""); // Reset state when country changes
    setSelectedCity(""); // Reset city when country changes
  };

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedCity(""); // Reset city when state changes
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-6">
        <Breadcrumbs 
          items={[
            { label: "Cart", href: "/cart" },
            { label: "Checkout" }
          ]} 
        />
      </div>
      <div className="grid gap-10 md:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Checkout</h1>
            <p className="text-muted-foreground">Enter your shipping and payment details.</p>
          </div>
          <form className="grid gap-4">
            <Input placeholder="Full name" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Phone" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedCountry} onValueChange={handleCountryChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedState} onValueChange={handleStateChange} disabled={!selectedCountry}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select State/Province" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!selectedState}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input placeholder="Address" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Additional Address Line" />
              <Input placeholder="ZIP/Postal Code" />
            </div>
            <Textarea placeholder="Notes (optional)" rows={4} />
            <Button type="submit" onClick={(e) => { e.preventDefault(); dispatch({ type: "clear" }); alert("Order placed!"); }}>Place order</Button>
          </form>
        </div>
        <aside className="space-y-4 rounded-lg border p-4">
          <div className="font-medium">Order summary</div>
          <div className="space-y-2 text-sm">
            {state.items.map((i) => (
              <div key={i.variantKey} className="flex items-center justify-between">
                <span>{i.product.name} × {i.quantity}</span>
                <span>${(i.quantity * i.variantPrice).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 space-y-2">
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
        </aside>
      </div>
    </div>
  );
}