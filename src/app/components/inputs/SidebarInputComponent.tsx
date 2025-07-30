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
  type?: "text" | "number";
  header?: string;
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
  type = "text",
  header,
}: Props<T>) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      {header && <div className="text-xl font-bold">{header}</div>}
      {label && <label>{label}</label>}
      <ErrorModal message={isHovered && hasError ? errorMessage : ""} />
      <div className={`input-wrapper ${hasError ? "has-error" : ""}`}>
        <input
          name={String(fieldKey)}
          type={type}
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
