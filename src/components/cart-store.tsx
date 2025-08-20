"use client";

import React, { createContext, useContext, useMemo, useReducer, useEffect, useRef } from "react";
import type { CartItem, Product } from "@/types";
import { toast } from "@/components/ui/use-toast";

type CartAction =
  | { type: "add"; product: Product; quantity?: number }
  | { type: "remove"; productId: string }
  | { type: "clear" }
  | { type: "clearToast" };

interface CartState {
  items: CartItem[];
  pendingToast?: { title: string; description: string };
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalQuantity: number;
  totalPrice: number;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const quantity = action.quantity ?? 1;
      const existing = state.items.find((i) => i.productId === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === action.product.id ? { ...i, quantity: i.quantity + quantity } : i
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
          { productId: action.product.id, quantity, product: action.product },
        ],
        pendingToast: {
          title: "Added to cart",
          description: `${action.product.name} has been added to your cart`,
        },
      };
    }
    case "remove": {
      return { 
        items: state.items.filter((i) => i.productId !== action.productId),
        pendingToast: undefined,
      };
    }
    case "clear": {
      return { 
        items: [],
        pendingToast: undefined,
      };
    }
    case "clearToast": {
      return { 
        ...state,
        pendingToast: undefined,
      };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], pendingToast: undefined });

  // Handle pending toasts after render
  useEffect(() => {
    if (state.pendingToast) {
      toast(state.pendingToast);
      // Clear the pending toast
      dispatch({ type: "clearToast" });
    }
  }, [state.pendingToast]);

  const { totalQuantity, totalPrice } = useMemo(() => {
    const totalQuantityCalc = state.items.reduce((acc, i) => acc + i.quantity, 0);
    const totalPriceCalc = state.items.reduce((acc, i) => acc + i.quantity * i.product.price, 0);
    return { totalQuantity: totalQuantityCalc, totalPrice: totalPriceCalc };
  }, [state.items]);

  const value = useMemo(() => ({ state, dispatch, totalQuantity, totalPrice }), [state, totalQuantity, totalPrice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
