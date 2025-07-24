"use client";

import React from "react";
import SidebarInputComponent from "./SidebarInputComponent";

interface Props<T> {
  label?: string;
  fieldKey?: keyof T;
  value?: string;
  placeholder: string;
  setData: React.Dispatch<React.SetStateAction<T>>;
}

const SidebarInput = <T,>({
  fieldKey,
  placeholder,
  setData,
  value,
}: Props<T>) => {
  const handleChange = (item: string) => {
    if (fieldKey) {
      setData((prev: T) => ({ ...prev, [fieldKey]: item }));
      return;
    }

    setData((prev: T) => ({ ...prev, item }));
  };

  return (
    <SidebarInputComponent
      placeholder={placeholder}
      fieldKey={fieldKey}
      onChange={(e) => handleChange(e.currentTarget.value)}
      value={value}
    />
  );
};

export default SidebarInput;
