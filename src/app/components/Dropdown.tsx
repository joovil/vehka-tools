"use client";

import { ReactNode, useState } from "react";
import { useTranslations } from "../i18n/TranslationsProvider";

interface DropdownProps {
  children: ReactNode;
  header?: string;
  handledExternally?: boolean;
  open?: boolean;
  maxHeight?: string;
  transitionDuration?: string;
}
const Dropdown = ({
  children,
  header,
  handledExternally,
  open,
  maxHeight,
  transitionDuration,
}: DropdownProps) => {
  const dict = useTranslations();
  const [isOpen, setIsOpen] = useState(!false);

  transitionDuration = !transitionDuration
    ? "150ms"
    : `${transitionDuration}ms`;

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-xl font-bold">{header}</div>
        {!handledExternally && (
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? dict.toggleClose : dict.toggleOpen}
          </button>
        )}
      </div>

      <div
        className={`overflow-y-clip pb-2 transition-all ease-in-out`}
        style={{
          transitionDuration: transitionDuration,
          ...((isOpen && !handledExternally) || open
            ? {
                maxHeight: maxHeight || "500px",
                paddingBottom: "8px",
                visibility: "visible",
              }
            : {
                maxHeight: "0",
                paddingBottom: "0",
                visibility: "hidden",
              }),
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
