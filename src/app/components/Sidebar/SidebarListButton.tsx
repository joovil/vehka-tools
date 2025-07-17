"use client";

import React, { useState } from "react";

interface Props<T> {
  label: string;
  fieldKey: keyof T;
  placeholder: string;
  data: T;
  setData: React.Dispatch<T>;
  children: React.ReactNode;
}

const SidebarListButton = <T,>({
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
      <div className="flex flex-col">
        <label>{label}</label>
        <div className="input-wrapper">
          <input
            name={String(fieldKey)}
            type="text"
            placeholder={placeholder}
            onChange={(e) => setNewItem(e.currentTarget.value)}
            value={newItem}
          />
          <button
            className="aspect-square rounded bg-[#9fd3c7]/50"
            onClick={() => handleListChange(newItem)}
          >
            +
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SidebarListButton;
