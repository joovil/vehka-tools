"use client";

import React from "react";
import SidebarInputComponent from "./SidebarInputComponent";

interface Props<T> {
  label?: string;
  fieldKey?: keyof T;
  value?: string;
  placeholder: string;
  setData: React.Dispatch<React.SetStateAction<T>>;
  type?: "text" | "number";
  header?: string;
  hasError?: boolean;
  errorMessage?: string;
}

const SidebarInput = <T,>({
  fieldKey,
  placeholder,
  setData,
  value,
  label,
  type = "text",
  header,
  hasError,
  errorMessage,
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
      label={label}
      type={type}
      header={header}
      hasError={hasError}
      errorMessage={errorMessage}
    />
  );
};

export default SidebarInput;
