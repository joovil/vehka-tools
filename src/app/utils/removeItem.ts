import { FinEng } from "@/types";
import React from "react";

export const removeItem = <T>(
  item: string | FinEng,
  fieldKey: keyof T,
  data: T,
  setData: React.Dispatch<React.SetStateAction<T>>,
) => {
  if (!item || !data[fieldKey]) return;

  const fieldValue = data[fieldKey];
  if (Array.isArray(fieldValue)) {
    const update = fieldValue.filter((i) => i !== item);
    setData((prev) => ({
      ...prev,
      [fieldKey]: update,
    }));
  }
};
