"use client";

import { ReactNode, useState } from "react";
import { useTranslations } from "../i18n/TranslationsProvider";

interface DropdownProps {
  children: ReactNode;
  header: string;
}

const Dropdown = ({ children, header }: DropdownProps) => {
  const dict = useTranslations();
  const [isOpen, setIsOpen] = useState(!false);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-xl font-bold">{header}</div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? dict.toggleClose : dict.toggleOpen}
        </button>
      </div>

      <div
        className="overflow-y-clip pb-2 transition-all duration-150 ease-in-out"
        style={
          isOpen
            ? {
                maxHeight: "500px",
                paddingBottom: "8px",
                visibility: "visible",
              }
            : {
                maxHeight: "0",
                paddingBottom: "0",
                visibility: "hidden",
              }
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
