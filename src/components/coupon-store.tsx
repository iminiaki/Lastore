"use client";

import React, { createContext, useContext, useReducer, useMemo } from "react";
import type { Coupon, AppliedCoupon } from "@/types";
import { toast } from "@/components/ui/use-toast";

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

type CouponAction =
  | { type: "apply"; code: string; subtotal: number }
  | { type: "remove" }
  | { type: "clear" };

interface CouponState {
  appliedCoupon: AppliedCoupon | null;
  error: string | null;
}

const CouponContext = createContext<{
  state: CouponState;
  dispatch: React.Dispatch<CouponAction>;
  validateCoupon: (code: string, subtotal: number) => { isValid: boolean; error?: string; coupon?: Coupon };
  getDiscountAmount: (coupon: Coupon, subtotal: number) => number;
} | null>(null);

function couponReducer(state: CouponState, action: CouponAction): CouponState {
  switch (action.type) {
    case "apply": {
      const coupon = mockCoupons.find(c => c.code.toUpperCase() === action.code.toUpperCase());
      if (!coupon) {
        return {
          ...state,
          error: "Invalid coupon code",
          appliedCoupon: null
        };
      }

      // Validate coupon
      const now = new Date();
      if (now < coupon.validFrom || now > coupon.validTo) {
        return {
          ...state,
          error: "Coupon has expired or is not yet valid",
          appliedCoupon: null
        };
      }

      if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        return {
          ...state,
          error: "Coupon usage limit reached",
          appliedCoupon: null
        };
      }

      if (coupon.minAmount && action.subtotal < coupon.minAmount) {
        return {
          ...state,
          error: `Minimum order amount of $${coupon.minAmount} required`,
          appliedCoupon: null
        };
      }

      // Calculate discount
      let discountAmount = 0;
      if (coupon.type === "percentage") {
        discountAmount = (action.subtotal * coupon.value) / 100;
        if (coupon.maxDiscount) {
          discountAmount = Math.min(discountAmount, coupon.maxDiscount);
        }
      } else {
        discountAmount = coupon.value;
      }

      const finalPrice = action.subtotal - discountAmount;

      return {
        appliedCoupon: {
          coupon,
          discountAmount,
          finalPrice
        },
        error: null
      };
    }
    case "remove": {
      return {
        appliedCoupon: null,
        error: null
      };
    }
    case "clear": {
      return {
        appliedCoupon: null,
        error: null
      };
    }
    default:
      return state;
  }
}

export function CouponProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(couponReducer, {
    appliedCoupon: null,
    error: null
  });

  const validateCoupon = (code: string, subtotal: number) => {
    const coupon = mockCoupons.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (!coupon) {
      return { isValid: false, error: "Invalid coupon code" };
    }

    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validTo) {
      return { isValid: false, error: "Coupon has expired or is not yet valid" };
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return { isValid: false, error: "Coupon usage limit reached" };
    }

    if (coupon.minAmount && subtotal < coupon.minAmount) {
      return { isValid: false, error: `Minimum order amount of $${coupon.minAmount} required` };
    }

    return { isValid: true, coupon };
  };

  const getDiscountAmount = (coupon: Coupon, subtotal: number) => {
    if (coupon.type === "percentage") {
      let discount = (subtotal * coupon.value) / 100;
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
      return discount;
    } else {
      return coupon.value;
    }
  };

  const value = useMemo(() => ({
    state,
    dispatch,
    validateCoupon,
    getDiscountAmount
  }), [state]);

  return <CouponContext.Provider value={value}>{children}</CouponContext.Provider>;
}

export function useCoupon() {
  const ctx = useContext(CouponContext);
  if (!ctx) throw new Error("useCoupon must be used within CouponProvider");
  return ctx;
}
