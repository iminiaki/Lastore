"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Check, AlertCircle } from "lucide-react";
import { useCart } from "@/components/cart-store";
import type { Coupon } from "@/types";

interface CouponInputProps {
  subtotal: number;
  className?: string;
}

// Mock coupon data - in a real app, this would come from your backend
const mockCoupons: Coupon[] = [
  {
    code: "SAVE10",
    type: "percentage",
    value: 10,
    minAmount: 50,
    maxDiscount: 100,
    validFrom: new Date("2024-01-01"),
    validTo: new Date("2025-12-31"),
    usageLimit: 1000,
    usedCount: 500,
    description: "Save 10% on orders over $50"
  },
  {
    code: "FREESHIP",
    type: "fixed",
    value: 15,
    minAmount: 100,
    validFrom: new Date("2024-01-01"),
    validTo: new Date("2025-12-31"),
    usageLimit: 500,
    usedCount: 200,
    description: "Free shipping on orders over $100"
  },
  {
    code: "WELCOME20",
    type: "percentage",
    value: 20,
    minAmount: 30,
    maxDiscount: 50,
    validFrom: new Date("2024-01-01"),
    validTo: new Date("2025-12-31"),
    usageLimit: 200,
    usedCount: 50,
    description: "Welcome discount - 20% off"
  }
];

export function CouponInput({ subtotal, className = "" }: CouponInputProps) {
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { state, dispatch } = useCart();

  const validateAndApplyCoupon = (code: string) => {
    const coupon = mockCoupons.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (!coupon) {
      setError("Invalid coupon code");
      return;
    }

    // Validate coupon
    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validTo) {
      setError("Coupon has expired or is not yet valid");
      return;
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      setError("Coupon usage limit reached");
      return;
    }

    if (coupon.minAmount && subtotal < coupon.minAmount) {
      setError(`Minimum order amount of $${coupon.minAmount} required`);
      return;
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.type === "percentage") {
      discountAmount = (subtotal * coupon.value) / 100;
      if (coupon.maxDiscount) {
        discountAmount = Math.min(discountAmount, coupon.maxDiscount);
      }
    } else {
      discountAmount = coupon.value;
    }

    const finalPrice = subtotal - discountAmount;

    // Apply coupon to cart
    dispatch({ 
      type: "applyCoupon", 
      coupon: {
        coupon,
        discountAmount,
        finalPrice
      }
    });

    setError(null);
    setCouponCode("");
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    validateAndApplyCoupon(couponCode.trim());
  };

  const handleRemoveCoupon = () => {
    dispatch({ type: "removeCoupon" });
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApplyCoupon();
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {state.appliedCoupon ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  Coupon applied: {state.appliedCoupon.coupon.code}
                </p>
                <p className="text-xs text-green-600">
                  {state.appliedCoupon.coupon.description}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveCoupon}
              className="h-10 p-1 text-green-600 hover:text-green-800 hover:!bg-green-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={handleApplyCoupon}
              disabled={!couponCode.trim()}
              size="sm"
            >
              Apply
            </Button>
          </div>
          {error && (
            <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
