"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

function generateId(): string {
  return "cart-" + Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
}

type CartStore = {
  cartId: string;
  itemCount: number;
  setItemCount: (count: number) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartId: generateId(),
      itemCount: 0,
      setItemCount: (count) => set({ itemCount: count }),
    }),
    {
      name: "harty-cart",
      partialize: (state) => ({ cartId: state.cartId }),
    },
  ),
);
