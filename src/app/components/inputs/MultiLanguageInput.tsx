"use client";

import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { FinEng } from "@/types";
import { useState } from "react";
import SidebarInputComponent from "./SidebarInputComponent";

interface Props<T> {
  placeholder: string;
  setData: React.Dispatch<React.SetStateAction<T>>;
  fieldKey: keyof T;
  errorMessage?: string;
  checkErrors?: boolean;
}

const MultiLanguageInput = <T,>({
  setData,
  placeholder,
  fieldKey,
  errorMessage,
  checkErrors,
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
    <div>
      <label>{dict.finnish}</label>
      <SidebarInputComponent
        placeholder={placeholder}
        fieldKey={"fin"}
        onChange={handleChange}
        hasError={checkErrors && !newItem["fin"]}
        errorMessage={errorMessage}
      />
      <label>{dict.english}</label>
      <SidebarInputComponent
        placeholder={placeholder}
        fieldKey={"eng"}
        onChange={handleChange}
        hasError={checkErrors && !newItem["eng"]}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default MultiLanguageInput;
