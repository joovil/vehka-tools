"use client";

import React from "react";
import SidebarInputComponent from "./SidebarInputComponent";

interface Props<T> {
  label: string;
  fieldKey: keyof T;
  placeholder: string;
  data: T;
  setData: React.Dispatch<T>;
}

const SidebarInput = <T,>({
  label,
  fieldKey,
  placeholder,
  data,
  setData,
}: Props<T>) => {
  const handleChange = (item: string) => {
    const update = { ...data, [fieldKey]: item };
    setData(update);
  };

  return (
    <SidebarInputComponent
      label={label}
      placeholder={placeholder}
      fieldKey={fieldKey}
      onChange={(e) => handleChange(e.currentTarget.value)}
    />
  );
};

export default SidebarInput;
