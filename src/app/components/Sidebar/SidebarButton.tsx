"use client";

import React from "react";

interface Props<T> {
  label: string;
  fieldKey: string;
  placeholder: string;
  data: T;
  setData: React.Dispatch<T>;
}

const SidebarButton = <T,>({
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
    <div>
      <div className="flex flex-col">
        <label>{label}</label>
        <div className="input-wrapper">
          <input
            name={fieldKey}
            type="text"
            placeholder={placeholder}
            onChange={(e) => handleChange(e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarButton;
