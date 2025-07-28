"use client";

import React from "react";
import ErrorModal from "./ErrorModal";

interface Props<T> {
  label?: string;
  fieldKey?: keyof T;
  placeholder?: string;
  children?: React.ReactNode;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  errorMessage?: string;
}

const SidebarInputComponent = <T,>({
  label,
  fieldKey,
  placeholder,
  children,
  value,
  onChange,
  required,
  errorMessage,
}: Props<T>) => {
  return (
    <div className="flex flex-col">
      {label && <label>{label}</label>}
      <ErrorModal message={errorMessage} />
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
