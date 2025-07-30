import { FinEng } from "@/types";
import React, { useMemo } from "react";
import { removeItem } from "../utils/removeItem";

interface Props<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  fieldKey: keyof T;
  finHeader?: string;
  engHeader?: string;
}

const MultiLanguageListDisplay = <T,>({
  data,
  setData,
  fieldKey,
  finHeader,
  engHeader,
}: Props<T>) => {
  const handleRemoveItem = (item: FinEng, fieldKey: keyof T) => {
    removeItem(item, fieldKey, data, setData);
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <div>
          {finHeader && <h2>{finHeader}</h2>}
          {(data[fieldKey] as FinEng[]).map((item: FinEng) => (
            <div
              key={item.fin}
              className="flex"
            >
              <button
                className="mr-2 flex h-6 w-6 items-center justify-center p-0"
                onClick={() => handleRemoveItem(item, fieldKey)}
              >
                X
              </button>
              <div>{item.fin}</div>
            </div>
          ))}
        </div>

        <div>
          {engHeader && <h2>{engHeader}</h2>}
          {(data[fieldKey] as FinEng[]).map((item: FinEng) => (
            <div key={item.eng}>
              <div>{item.eng}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Wrapper component that handles memoization
interface BuilderProps<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  finHeader?: string;
  engHeader?: string;
}

export const MultiLanguageListDisplayBuilder = <T,>({
  data,
  setData,
}: BuilderProps<T>) => {
  const Component = useMemo(() => {
    const DisplayComponent = (
      fieldKey: keyof T,
      headers?: { finHeader?: string; engHeader?: string },
    ) => (
      <MultiLanguageListDisplay
        data={data}
        setData={setData}
        fieldKey={fieldKey}
        finHeader={headers?.finHeader}
        engHeader={headers?.engHeader}
      />
    );
    DisplayComponent.displayName = "MemoizedMultiLanguageListDisplay";
    return DisplayComponent;
  }, [data, setData]);
  return Component;
};
