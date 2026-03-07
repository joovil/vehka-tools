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
    <div
      className={
        handledExternally ? "" : "rounded-lg border border-gray-200 bg-white/50"
      }
    >
      {!handledExternally && (
        <div className="flex items-center justify-between px-3 py-2">
          <div className="text-teal-darker text-base font-bold">{header}</div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 bg-transparent! px-2 py-1 text-sm shadow-none!"
          >
            <span
              className="inline-block text-xs transition-transform duration-200"
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              ▼
            </span>
            {isOpen ? dict.toggleClose : dict.toggleOpen}
          </button>
        </div>
      )}

      <div
        className={`flex flex-col gap-2 transition-all ease-in-out ${handledExternally ? "" : "px-3"}`}
        style={{
          transitionDuration: transitionDuration,
          ...((isOpen && !handledExternally) || open
            ? {
                maxHeight: maxHeight || "500px",
                paddingBottom: "12px",
                visibility: "visible",
                overflowY: "visible",
              }
            : {
                maxHeight: "0",
                paddingBottom: "0",
                visibility: "hidden",
                overflowY: "clip",
              }),
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
