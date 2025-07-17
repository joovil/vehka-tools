"use client";

import React, { useState } from "react";

interface Props<T> {
  label: string;
  name: string;
  placeholder: string;
  data: T;
  setData: React.Dispatch<T>;
  children: React.ReactNode;
}

const SidebarListButton = <T,>({
  label,
  name,
  placeholder,
  data,
  setData,
  children,
}: Props<T>) => {
  const [newItem, setNewItem] = useState<string>("");

  // Adds a new item to the end of the array using the key as the field name
  const handleListChange = (rawKey: keyof T, item: string) => {
    const key = String(rawKey);
    console.log(data);

    // Type assertion to tell TypeScript this is a Record with string array
    const typedData = data as Record<string, string[]>;

    if (Array.isArray(typedData[name])) {
      const update = [...typedData[name], item];
      setData({ ...data, [key]: update } as T);
      console.log(update);
    } else {
      console.warn(`data[${key}] is not an array.`);
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <label>{label}</label>
        <div className="input-wrapper">
          <input
            name={name}
            type="text"
            placeholder={placeholder}
            onChange={(e) => setNewItem(e.currentTarget.value)}
            value={newItem}
          />
          <button
            className="aspect-square rounded bg-[#9fd3c7]/50"
            onClick={() => handleListChange(name as keyof T, newItem)}
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
