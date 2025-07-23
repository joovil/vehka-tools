"use client";

import React, { useState } from "react";
import SidebarInputComponent from "./SidebarInputComponent";

interface Props<T> {
  label?: string;
  fieldKey: keyof T;
  placeholder: string;
  data: T;
  setData: React.Dispatch<T>;
  children: React.ReactNode;
}

const SidebarListInput = <T,>({
  label,
  fieldKey,
  placeholder,
  data,
  setData,
  children,
}: Props<T>) => {
  const [newItem, setNewItem] = useState<string>("");

  // Adds a new item to the end of the array using the key as the field name
  const handleListChange = (item: string) => {
    if (Array.isArray(data[fieldKey])) {
      const update = [...data[fieldKey], item];
      setData({ ...data, [fieldKey]: update } as T);
      console.log(update);
    } else {
      console.warn(`data[${String(fieldKey)}] is not an array.`);
    }
  };

  return (
    <div>
      <SidebarInputComponent
        label={label}
        placeholder={placeholder}
        fieldKey={fieldKey}
        onChange={(e) => setNewItem(e.currentTarget.value)}
      >
        {/* <button
          // Chrome and Firefox specific styles
          className="aspect-square h-7 rounded bg-[#9fd3c7]/50 [@supports(-moz-appearance:none)]:h-auto"
          onClick={() => handleListChange(newItem)}
        >
          +
        </button> */}
      </SidebarInputComponent>
      {children}
    </div>
  );
};

export default SidebarListInput;
