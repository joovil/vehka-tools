"use client";

import React from "react";
import SidebarInputComponent from "./SidebarInputComponent";

interface Props<T> {
  label?: string;
  fieldKey?: keyof T;
  value?: string;
  data?: T;
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
  data,
  label,
  type = "text",
  header,
  hasError,
  errorMessage,
}: Props<T>) => {
  const derivedValue =
    value ?? (data && fieldKey ? String(data[fieldKey] ?? "") : undefined);
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
      value={derivedValue}
      label={label}
      type={type}
      header={header}
      hasError={hasError}
      errorMessage={errorMessage}
    />
  );
};

export default SidebarInput;
