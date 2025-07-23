"use client";

import React from "react";
import SidebarInputComponent from "./SidebarInputComponent";

interface Props<T> {
  label?: string;
  fieldKey?: keyof T;
  placeholder: string;
  data: T;
  setData: React.Dispatch<T>;
}

const SidebarInput = <T,>({
  fieldKey,
  placeholder,
  data,
  setData,
}: Props<T>) => {
  const handleChange = (item: string) => {
    if (fieldKey) {
      const update = { ...data, [fieldKey]: item };
      setData(update);
      return;
    }

    const update = { ...data, item };
    setData(update);
  };

  return (
    <SidebarInputComponent
      placeholder={placeholder}
      fieldKey={fieldKey}
      onChange={(e) => handleChange(e.currentTarget.value)}
    />
  );
};

export default SidebarInput;
