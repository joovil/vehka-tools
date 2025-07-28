"use client";

import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { FinEng } from "@/types";
import { useState } from "react";
import SidebarInputComponent from "./SidebarInputComponent";

interface Props<T> {
  placeholder: string;
  setData: React.Dispatch<React.SetStateAction<T>>;
  fieldKey: keyof T;
  required?: boolean;
  ref?: React.RefObject<HTMLDivElement>;
}

const MultiLanguageInput = <T,>({
  setData,
  placeholder,
  fieldKey,
  required,
  ref,
}: Props<T>) => {
  const dict = useTranslations();

  const [newItem, setNewItem] = useState<FinEng>({} as FinEng);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const update = { ...newItem, [name]: value };

    console.log(update);
    setNewItem((prev) => ({ ...prev, [name]: value }));
    setData((prev: T) => ({ ...prev, [fieldKey]: update }));
  };

  return (
    <div ref={ref}>
      <label>{dict.finnish}</label>
      <SidebarInputComponent
        placeholder={placeholder}
        fieldKey={"fin"}
        onChange={handleChange}
        required={required}
      />
      <label>{dict.english}</label>
      <SidebarInputComponent
        placeholder={placeholder}
        fieldKey={"eng"}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};

export default MultiLanguageInput;
