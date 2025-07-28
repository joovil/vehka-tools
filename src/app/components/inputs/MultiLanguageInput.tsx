"use client";

import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { FinEng } from "@/types";
import { useState } from "react";
import ErrorModal from "./ErrorModal";
import SidebarInputComponent from "./SidebarInputComponent";

interface Props<T> {
  placeholder: string;
  setData: React.Dispatch<React.SetStateAction<T>>;
  fieldKey: keyof T;
  ref?: React.RefObject<HTMLDivElement>;
  errorMessage?: string;
}

const MultiLanguageInput = <T,>({
  setData,
  placeholder,
  fieldKey,
  ref,
  errorMessage,
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
      {!newItem.fin && <ErrorModal message={errorMessage} />}
      <SidebarInputComponent
        placeholder={placeholder}
        fieldKey={"fin"}
        onChange={handleChange}
      />
      <label>{dict.english}</label>
      {!newItem.eng && <ErrorModal message={errorMessage} />}
      <SidebarInputComponent
        placeholder={placeholder}
        fieldKey={"eng"}
        onChange={handleChange}
      />
    </div>
  );
};

export default MultiLanguageInput;
