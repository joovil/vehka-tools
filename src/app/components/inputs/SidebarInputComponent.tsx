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
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  required?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  type?: "text" | "number" | "password";
  header?: string;
}

const SidebarInputComponent = <T,>({
  label,
  fieldKey,
  placeholder,
  children,
  value,
  onChange,
  onKeyDown,
  inputRef,
  required,
  errorMessage,
  hasError,
  type = "text",
  header,
}: Props<T>) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-0.5">
      {header && (
        <div className="text-teal-darker text-base font-bold">{header}</div>
      )}
      {label && <label className="text-sm text-gray-600">{label}</label>}
      <ErrorModal message={isHovered && hasError ? errorMessage : ""} />
      <div className={`input-wrapper ${hasError ? "has-error" : ""}`}>
        <input
          name={String(fieldKey)}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          ref={inputRef}
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
