"use client";

import { FinEng } from "@/types";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import SidebarInput from "./SidebarInput";
interface Props<T> {
  fieldKey: keyof T;
  placeholder: string;
  setData: React.Dispatch<React.SetStateAction<T>>;
  header?: string;
  hasError?: boolean;
  errorMessage?: string;
}

const MultiLanguageListInput = <T,>({
  setData,
  fieldKey,
  placeholder,
  header,
  hasError,
  errorMessage,
}: Props<T>) => {
  const t = useTranslations();

  const [newItem, setNewItem] = useState<FinEng>({ fin: "", eng: "" });
  const finRef = useRef<HTMLInputElement>(null);
  const engRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!newItem.fin) {
      finRef.current?.focus();
      return;
    }

    if (!newItem.eng) {
      engRef.current?.focus();
      return;
    }

    setData((prev: T) => {
      const update = [...(prev[fieldKey] as []), newItem];
      return { ...prev, [fieldKey]: update };
    });

    setNewItem({ fin: "", eng: "" });
    finRef.current?.focus();
  };

  const handleFinEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      engRef.current?.focus();
    }
  };

  const handleEngEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="relative">
      {header && (
        <div className="text-teal-darker text-base font-bold">{header}</div>
      )}

      <h3 className="text-sm text-gray-600">{t("finnish")}</h3>
      <SidebarInput
        placeholder={placeholder}
        fieldKey={"fin"}
        value={newItem.fin}
        setData={setNewItem}
        inputRef={finRef}
        onKeyDown={handleFinEnter}
        hasError={hasError}
        errorMessage={errorMessage}
      />
      <h3 className="text-sm text-gray-600">{t("english")}</h3>
      <SidebarInput
        placeholder={placeholder}
        fieldKey={"eng"}
        value={newItem.eng}
        setData={setNewItem}
        inputRef={engRef}
        onKeyDown={handleEngEnter}
        hasError={hasError}
        errorMessage={errorMessage}
      />

      <button
        className="mt-2"
        onClick={handleClick}
      >
        {t("addItem")}
      </button>
    </div>
  );
};

export default MultiLanguageListInput;
