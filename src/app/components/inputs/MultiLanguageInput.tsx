"use client";

import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { FinEng } from "@/types";
import { useState } from "react";
import SidebarInputComponent from "../Sidebar/SidebarInputComponent";

interface Props<T> {
  placeholder: string;
  setData: React.Dispatch<React.SetStateAction<T>>;
  fieldKey: keyof T;
}

const MultiLanguageInput = <T,>({
  setData,
  placeholder,
  fieldKey,
}: Props<T>) => {
  const dict = useTranslations();

  const [newItem, setNewItem] = useState<FinEng>({} as FinEng);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));

    setData((prev: T) => ({
      ...prev,
      [fieldKey]: newItem,
    }));
  };

  return (
    <div>
      <h3>{dict.finnish}</h3>
      <SidebarInputComponent
        placeholder={placeholder}
        fieldKey={"fin"}
        onChange={handleChange}
      />
      <h3>{dict.english}</h3>
      <SidebarInputComponent
        placeholder={placeholder}
        fieldKey={"eng"}
        onChange={handleChange}
      />
    </div>
  );
};

export default MultiLanguageInput;
