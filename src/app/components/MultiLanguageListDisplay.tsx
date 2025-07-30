"use client";

import { FinEng } from "@/types";
import React from "react";
import { removeItem } from "../utils/removeItem";

interface Props<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  fieldKey: keyof T;
}

const MultiLanguageListDisplay = <T,>({
  data,
  setData,
  fieldKey,
}: Props<T>) => {
  const handleRemoveItem = (item: FinEng, fieldKey: keyof T) => {
    removeItem(item, fieldKey, data, setData);
  };

  console.log("render", fieldKey);

  return (
    <>
      {(data[fieldKey] as FinEng[]).map((item: FinEng) => (
        <div
          className="grid grid-cols-2"
          key={item.eng}
        >
          <div className="flex">
            <button
              className="mr-2 flex h-6 w-6 items-center justify-center p-0"
              onClick={() => handleRemoveItem(item, fieldKey)}
            >
              X
            </button>
            <div>{item.fin}</div>
          </div>
          <div>{item.eng}</div>
        </div>
      ))}
    </>
  );
};

export const ListDisplayBuilder = <T extends keyof T>(
  fieldKey: T,
  data: T,
  setData: React.Dispatch<React.SetStateAction<T>>,
) => {
  return (
    <MultiLanguageListDisplay
      data={data}
      setData={setData}
      fieldKey={fieldKey}
    />
  );
};

export default MultiLanguageListDisplay;
