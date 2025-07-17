"use client";

import { createContext, useContext } from "react";

import { Dictionary } from "./types";

export const TranslationsContext = createContext<Dictionary>({} as Dictionary);

export function TranslationsProvider({
  children,
  dictionary,
}: {
  children: React.ReactNode;
  dictionary: Dictionary;
}) {
  return (
    <TranslationsContext.Provider value={dictionary}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const dictionary = useContext(TranslationsContext);
  if (!dictionary) {
    throw new Error(
      "useTranslations must be used within a TranslationsProvider",
    );
  }
  return dictionary;
}
