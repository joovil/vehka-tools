"use client";

import React, { useState } from "react";
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
  hasError?: boolean;
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
  hasError,
}: Props<T>) => {
  const [isHovered, setIsHovered] = useState<boolean>(false); // hover state

  return (
    <div className="flex flex-col">
      {label && <label>{label}</label>}
      <ErrorModal message={isHovered ? errorMessage : ""} />
      <div className={`input-wrapper ${hasError ? "has-error" : ""}`}>
        <input
          name={String(fieldKey)}
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required={required}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>
      {children}
    </div>
  );
};

export default SidebarInputComponent;
