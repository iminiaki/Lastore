"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Check, AlertCircle } from "lucide-react";
import { useCoupon } from "@/components/coupon-store";

interface CouponInputProps {
  subtotal: number;
  className?: string;
}

export function CouponInput({ subtotal, className = "" }: CouponInputProps) {
  const [couponCode, setCouponCode] = useState("");
  const { state, dispatch } = useCoupon();

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    dispatch({ type: "apply", code: couponCode.trim(), subtotal });
    
    if (!state.error) {
      setCouponCode("");
    }
  };

  const handleRemoveCoupon = () => {
    dispatch({ type: "remove" });
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
              className="h-auto p-1 text-green-600 hover:text-green-800 hover:bg-green-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Discount:</span>
            <span className="font-medium text-green-600">
              -${state.appliedCoupon.discountAmount.toFixed(2)}
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
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
          {state.error && (
            <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <p className="text-sm text-red-600">{state.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
