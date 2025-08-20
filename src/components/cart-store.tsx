"use client";

import React, { createContext, useContext, useMemo, useReducer, useEffect, useRef } from "react";
import type { CartItem, Product, AppliedCoupon } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { getVariantPrice } from "@/lib/variant-utils";

type CartAction =
  | { type: "add"; product: Product; quantity?: number }
  | { type: "remove"; variantKey: string }
  | { type: "clear" }
  | { type: "clearToast" }
  | { type: "applyCoupon"; coupon: AppliedCoupon }
  | { type: "removeCoupon" };

interface CartState {
  items: CartItem[];
  pendingToast?: { title: string; description: string };
  appliedCoupon: AppliedCoupon | null;
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalQuantity: number;
  totalPrice: number;
  subtotal: number;
  discountAmount: number;
  finalPrice: number;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const quantity = action.quantity ?? 1;
      
      // Create a unique variant key based on product ID and selected variants
      const variantKey = `${action.product.id}-${action.product.selectedColor || 'no-color'}-${action.product.selectedSize || 'no-size'}`;
      
      const variantPrice = getVariantPrice(action.product, action.product.selectedColor, action.product.selectedSize);
      
      const existing = state.items.find((i) => i.variantKey === variantKey);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.variantKey === variantKey ? { ...i, quantity: i.quantity + quantity } : i
          ),
          pendingToast: {
            title: "Product updated",
            description: `${action.product.name} quantity updated in cart`,
          },
        };
      }
      return {
        items: [
          ...state.items,
          { 
            productId: action.product.id, 
            quantity, 
            product: action.product,
            variantKey,
            variantPrice
          },
        ],
        pendingToast: {
          title: "Added to cart",
          description: `${action.product.name} has been added to your cart`,
        },
      };
    }
    case "remove": {
      return { 
        items: state.items.filter((i) => i.variantKey !== action.variantKey),
        pendingToast: undefined,
      };
    }
    case "clear": {
      return { 
        items: [],
        pendingToast: undefined,
        appliedCoupon: null,
      };
    }
    case "clearToast": {
      return { 
        ...state,
        pendingToast: undefined,
      };
    }
    case "applyCoupon": {
      return {
        ...state,
        appliedCoupon: action.coupon,
      };
    }
    case "removeCoupon": {
      return {
        ...state,
        appliedCoupon: null,
      };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    pendingToast: undefined,
    appliedCoupon: null 
  });

  // Handle pending toasts after render
  useEffect(() => {
    if (state.pendingToast) {
      toast(state.pendingToast);
      // Clear the pending toast
      dispatch({ type: "clearToast" });
    }
  }, [state.pendingToast]);

  const { totalQuantity, subtotal, discountAmount, finalPrice } = useMemo(() => {
    const totalQuantityCalc = state.items.reduce((acc, i) => acc + i.quantity, 0);
    const subtotalCalc = state.items.reduce((acc, i) => acc + i.quantity * i.variantPrice, 0);
    const discountCalc = state.appliedCoupon?.discountAmount || 0;
    const finalPriceCalc = subtotalCalc - discountCalc;
    return { 
      totalQuantity: totalQuantityCalc, 
      subtotal: subtotalCalc,
      discountAmount: discountCalc,
      finalPrice: finalPriceCalc
    };
  }, [state.items, state.appliedCoupon]);

  const value = useMemo(() => ({ 
    state, 
    dispatch, 
    totalQuantity, 
    subtotal,
    discountAmount,
    finalPrice 
  }), [state, totalQuantity, subtotal, discountAmount, finalPrice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
