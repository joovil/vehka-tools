"use client";

import React from "react";

interface Props<T> {
  label?: string;
  fieldKey?: keyof T;
  placeholder?: string;
  children?: React.ReactNode;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const SidebarInputComponent = <T,>({
  label,
  fieldKey,
  placeholder,
  children,
  value,
  onChange,
  required,
}: Props<T>) => {
  return (
    <div className="flex flex-col">
      {label && <label>{label}</label>}
      <div className="input-wrapper">
        <input
          name={String(fieldKey)}
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required={required}
        />
      </div>
      {children}
    </div>
  );
};

export default SidebarInputComponent;
