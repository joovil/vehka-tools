"use client";

import React, { useState } from "react";
import SidebarInputComponent from "./SidebarInputComponent";

interface Props<T> {
  label?: string;
  fieldKey: keyof T;
  placeholder?: string;
  setData: React.Dispatch<React.SetStateAction<T>>;
  children?: React.ReactNode;
}

const SidebarListInput = <T,>({
  label,
  fieldKey,
  placeholder,
  setData,
  children,
}: Props<T>) => {
  const [newItem, setNewItem] = useState<string>("");

  // Adds a new item to the end of the array using the key as the field name
  const handleListChange = (item: string) => {
    setData((prev: T) => ({
      ...prev,
      [fieldKey]: [
        ...(Array.isArray(prev[fieldKey]) ? prev[fieldKey] : []),
        item,
      ],
    }));
  };

  return (
    <div>
      <SidebarInputComponent
        label={label}
        placeholder={placeholder}
        fieldKey={fieldKey}
        onChange={(e) => setNewItem(e.currentTarget.value)}
      >
        <button
          // Chrome and Firefox specific styles
          className="aspect-square h-7 rounded bg-[#9fd3c7]/50 [@supports(-moz-appearance:none)]:h-auto"
          onClick={() => handleListChange(newItem)}
        >
          +
        </button>
      </SidebarInputComponent>
      {children}
    </div>
  );
};

export default SidebarListInput;
