"use client";

import { useTranslations } from "@/app/i18n/TranslationsProvider";
import React, { useState } from "react";
import SidebarInputComponent from "./SidebarInputComponent";

interface Props<T> {
  label?: string;
  fieldKey: keyof T;
  placeholder?: string;
  setData: React.Dispatch<React.SetStateAction<T>>;
  children?: React.ReactNode;
  errorMessage?: string;
}

const SidebarListInput = <T,>({
  label,
  fieldKey,
  placeholder,
  setData,
  children,
  errorMessage,
}: Props<T>) => {
  const dict = useTranslations();
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

    setNewItem("");
  };

  return (
    <div className={`${!label && "first:mt-2"} `}>
      <SidebarInputComponent
        label={label}
        placeholder={placeholder}
        fieldKey={fieldKey}
        onChange={(e) => setNewItem(e.currentTarget.value)}
        value={newItem}
        errorMessage={errorMessage}
        hasError={!newItem && !!errorMessage}
      >
        <button
          className="mt-1 w-fit"
          onClick={() => handleListChange(newItem)}
        >
          {dict.addItem}
        </button>
      </SidebarInputComponent>
      {children}
    </div>
  );
};

export default SidebarListInput;
