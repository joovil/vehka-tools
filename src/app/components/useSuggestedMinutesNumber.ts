"use client";

import { getNextMinutesNumber } from "@/app/api/services/getNextMinutesNumber";
import { useAuth } from "@/app/components/AuthProvider";
import { DocumentType } from "@/types";
import { useEffect } from "react";

export const useSuggestedMinutesNumber = <
  T extends { suggestedNumber?: number },
>(
  documentType: DocumentType,
  year: number,
  locked: boolean,
  setData: React.Dispatch<React.SetStateAction<T>>,
) => {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (locked) return;

    const loadSuggestedNumber = async () => {
      const suggestedNumber = await getNextMinutesNumber(documentType, year);
      setData((prev) => ({ ...prev, suggestedNumber }));
    };

    loadSuggestedNumber();
  }, [documentType, year, locked, isLoggedIn, setData]);
};

// The input stores a string ("" once cleared), despite the number type
export const resolveMinutesNumber = (
  manual: number | string | undefined,
  suggested: number | undefined,
) => {
  const typed = String(manual ?? "").trim();
  return typed !== "" ? Number(typed) : suggested;
};
