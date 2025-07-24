"use client";

import { ReactNode, useState } from "react";
import { useTranslations } from "../i18n/TranslationsProvider";

interface DropdownProps {
  children: ReactNode;
  header: string;
}

const Dropdown = ({ children, header }: DropdownProps) => {
  const dict = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between">
        <h2>{header}</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? dict.toggleClose : dict.toggleOpen}
        </button>
      </div>

      <div
        className="overflow-y-clip transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "500px" : "0" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
