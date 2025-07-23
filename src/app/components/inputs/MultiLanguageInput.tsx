"use client";

import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { FinEng } from "@/types";
import { useState } from "react";
import SidebarInput from "../Sidebar/SidebarInput";
interface Props<T> {
  fieldKey: keyof T;
  placeholder: string;
  data: T;
  setData: React.Dispatch<T>;
}

const MultiLanguageListInput = <T,>({
  data,
  setData,
  fieldKey,
  placeholder,
}: Props<T>) => {
  const dict = useTranslations();

  const [item, newItem] = useState<FinEng>({} as FinEng);

  const handleClick = () => {
    if (!Array.isArray(data[fieldKey])) return;
    const update = [...data[fieldKey], item];
    setData({ ...data, [fieldKey]: update });
  };

  return (
    <div>
      <h3>{dict.finnish}</h3>
      <SidebarInput
        placeholder={placeholder}
        fieldKey={"fin"}
        data={item}
        setData={newItem}
      />
      <h3>{dict.english}</h3>
      <SidebarInput
        placeholder={placeholder}
        fieldKey={"eng"}
        data={item}
        setData={newItem}
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
