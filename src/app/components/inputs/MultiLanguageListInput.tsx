"use client";

import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { FinEng } from "@/types";
import { useState } from "react";
import SidebarInput from "./SidebarInput";
interface Props<T> {
  fieldKey: keyof T;
  placeholder: string;
  setData: React.Dispatch<React.SetStateAction<T>>;
}

const MultiLanguageListInput = <T,>({
  setData,
  fieldKey,
  placeholder,
}: Props<T>) => {
  const dict = useTranslations();

  const [newItem, setNewItem] = useState<FinEng>({ fin: "", eng: "" });

  const handleClick = () => {
    setData((prev: T) => {
      const update = [...(prev[fieldKey] as []), newItem];
      return { ...prev, [fieldKey]: update };
    });

    setNewItem({ fin: "", eng: "" });
  };

  return (
    <div>
      <h3>{dict.finnish}</h3>
      <SidebarInput
        placeholder={placeholder}
        fieldKey={"fin"}
        value={newItem.fin}
        setData={setNewItem}
      />
      <h3>{dict.english}</h3>
      <SidebarInput
        placeholder={placeholder}
        fieldKey={"eng"}
        value={newItem.eng}
        setData={setNewItem}
      />

      <button
        className="mt-2"
        onClick={handleClick}
      >
        {dict.addItem}
      </button>
    </div>
  );
};

export default MultiLanguageListInput;
