"use client";

import React, { createContext, useContext, useMemo, useReducer } from "react";
import type { CartItem, Product } from "@/types";

type CartAction =
  | { type: "add"; product: Product; quantity?: number }
  | { type: "remove"; productId: string }
  | { type: "clear" };

interface CartState {
  items: CartItem[];
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
        };
      }
      return {
        items: [
          ...state.items,
          { productId: action.product.id, quantity, product: action.product },
        ],
      };
    }
    case "remove": {
      return { items: state.items.filter((i) => i.productId !== action.productId) };
    }
    case "clear": {
      return { items: [] };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

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
