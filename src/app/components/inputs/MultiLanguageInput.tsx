"use client";

import { FinEng } from "@/types";
import { useTranslations } from "next-intl";
import SidebarInputComponent from "./SidebarInputComponent";

interface Props<T> {
  placeholder: string;
  data?: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  fieldKey: keyof T;
  errorMessage?: string;
  hasError?: boolean;
  header?: string;
}

const MultiLanguageInput = <T,>({
  data,
  setData,
  placeholder,
  fieldKey,
  errorMessage,
  hasError,
  header,
}: Props<T>) => {
  const t = useTranslations();

  const currentValue = (data ? data[fieldKey] : undefined) as
    | FinEng
    | undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev: T) => ({
      ...prev,
      [fieldKey]: { ...((prev[fieldKey] as FinEng) ?? {}), [name]: value },
    }));
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
        value={currentValue?.fin ?? ""}
        hasError={hasError && !currentValue?.fin}
        errorMessage={errorMessage}
      />
      <label className="text-sm text-gray-600">{t("english")}</label>
      <SidebarInputComponent
        placeholder={placeholder}
        fieldKey={"eng"}
        onChange={handleChange}
        value={currentValue?.eng ?? ""}
        hasError={hasError && !currentValue?.eng}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default MultiLanguageInput;
