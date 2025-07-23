"use client";

import { useTranslations } from "@/app/i18n/TranslationsProvider";
import SidebarInput from "../Sidebar/SidebarInput";
interface Props<T> {
  fieldKey: keyof T;
  placeholder: string;
  data: T;
  setData: React.Dispatch<T>;
}

const MultiLanguageInput = <T,>({ data, setData, fieldKey }: Props<T>) => {
  const dict = useTranslations();

  return (
    <div>
      <h2>{dict.minutes.labels.attendants}</h2>

      <h3>{dict.finnish}</h3>
      <SidebarInput
        placeholder={dict.minutes.placeholders.attendants}
        fieldKey={fieldKey}
        data={data}
        setData={setData}
      />
      <h3>{dict.english}</h3>
      <SidebarInput
        placeholder={dict.minutes.placeholders.attendants}
        fieldKey={fieldKey}
        data={data}
        setData={setData}
      />

      <button>{dict.addItem}</button>
    </div>
  );
};

export default MultiLanguageInput;
function useDictionary() {
  throw new Error("Function not implemented.");
}
