"use client";

import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import SidebarInputComponent from "./SidebarInputComponent";

interface Props<T> {
  label?: string;
  fieldKey: keyof T;
  placeholder?: string;
  setData: React.Dispatch<React.SetStateAction<T>>;
  children?: React.ReactNode;
  errorMessage?: string;
  hasError?: boolean;
}

const SidebarListInput = <T,>({
  label,
  fieldKey,
  placeholder,
  setData,
  children,
  errorMessage,
  hasError,
}: Props<T>) => {
  const t = useTranslations();
  const [newItem, setNewItem] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Adds a new item to the end of the array using the key as the field name
  const handleListChange = (item: string) => {
    if (!item.trim()) return;

    setData((prev: T) => ({
      ...prev,
      [fieldKey]: [
        ...(Array.isArray(prev[fieldKey]) ? prev[fieldKey] : []),
        item,
      ],
    }));

    setNewItem("");
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleListChange(newItem);
    }
  };

  return (
    <div className={`${!label && "first:mt-2"} `}>
      <SidebarInputComponent
        label={label}
        placeholder={placeholder}
        fieldKey={fieldKey}
        onChange={(e) => setNewItem(e.currentTarget.value)}
        onKeyDown={handleEnter}
        inputRef={inputRef}
        value={newItem}
        errorMessage={errorMessage}
        hasError={!newItem && hasError}
      >
        <button
          className="mt-1 w-fit"
          onClick={() => {
            handleListChange(newItem);
            inputRef.current?.focus();
          }}
        >
          {t("addItem")}
        </button>
      </SidebarInputComponent>
      {children}
    </div>
  );
};

export default SidebarListInput;
