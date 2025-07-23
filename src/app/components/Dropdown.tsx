"use client";

import { ReactNode, useState } from "react";

interface DropdownProps {
  children: ReactNode;
  header: string;
}

const Dropdown = ({ children, header }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between">
        <h2>{header}</h2>
        <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      </div>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "200px" : "0" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
