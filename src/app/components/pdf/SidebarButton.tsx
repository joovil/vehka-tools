"use client";

import React from "react";

interface Props {
  label: string;
  name: string;
  placeholder: string;
  onChange: (e: any) => void;
  value: string;
  onClick: () => void;
  children: React.ReactNode;
}

const SidebarButton = ({
  label,
  name,
  placeholder,
  onChange,
  value,
  onClick,
  children,
}: Props) => {
  return (
    <div>
      <div className="flex flex-col">
        <label>{label}</label>
        <div className="input-wrapper">
          <input
            name={name}
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />
          <button
            className="aspect-square rounded bg-[#9fd3c7]/50"
            onClick={onClick}
          >
            +
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SidebarButton;
