"use client";

import React, { createContext, useContext, useMemo, useReducer } from "react";
import type { Product } from "@/types";

type WishlistAction =
  | { type: "add"; product: Product }
  | { type: "remove"; productId: string }
  | { type: "clear" };

interface WishlistState {
  items: Product[];
}

const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
  isInWishlist: (productId: string) => boolean;
} | null>(null);

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "add": {
      const existing = state.items.find((item) => item.id === action.product.id);
      if (existing) {
        return state; // Already in wishlist
      }
      return {
        items: [...state.items, action.product],
      };
    }
    case "remove": {
      return { items: state.items.filter((item) => item.id !== action.productId) };
    }
    case "clear": {
      return { items: [] };
    }
    default:
      return state;
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  const isInWishlist = useMemo(() => (productId: string) => {
    return state.items.some((item) => item.id === productId);
  }, [state.items]);

  const value = useMemo(() => ({ state, dispatch, isInWishlist }), [state, isInWishlist]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
