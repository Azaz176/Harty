"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type LanguageStore = {
  language: string;
  setLanguage: (code: string) => void;
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (code) => set({ language: code }),
    }),
    {
      name: "harty-language",
    },
  ),
);
