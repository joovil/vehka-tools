"use client";

import { FinEng } from "@/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import SidebarInputComponent from "./SidebarInputComponent";

interface Props<T> {
  placeholder: string;
  setData: React.Dispatch<React.SetStateAction<T>>;
  fieldKey: keyof T;
  errorMessage?: string;
  hasError?: boolean;
  header?: string;
}

const MultiLanguageInput = <T,>({
  setData,
  placeholder,
  fieldKey,
  errorMessage,
  hasError,
  header,
}: Props<T>) => {
  const t = useTranslations();

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
      {header && (
        <div className="text-teal-darker text-base font-bold">{header}</div>
      )}

      <label className="text-sm text-gray-600">{t("finnish")}</label>
      <SidebarInputComponent
        placeholder={placeholder}
        fieldKey={"fin"}
        onChange={handleChange}
        hasError={hasError && !newItem["fin"]}
        errorMessage={errorMessage}
      />
      <label className="text-sm text-gray-600">{t("english")}</label>
      <SidebarInputComponent
        placeholder={placeholder}
        fieldKey={"eng"}
        onChange={handleChange}
        hasError={hasError && !newItem["eng"]}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default MultiLanguageInput;
