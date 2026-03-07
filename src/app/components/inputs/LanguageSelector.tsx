"use client";

import { DocumentLanguage } from "@/app/components/document/types";
import { useTranslations } from "next-intl";

interface LanguageSelectorProps {
  value: DocumentLanguage;
  onChange: (language: DocumentLanguage) => void;
}

const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  const t = useTranslations();

  return (
    <div>
      <div className="text-teal-darker text-base font-bold">
        {t("language.label")}
      </div>
      <select
        className="w-full rounded border p-2"
        value={value}
        onChange={(e) => onChange(e.target.value as DocumentLanguage)}
      >
        <option value="bilingual">{t("language.bilingual")}</option>
        <option value="fin">{t("language.finnishOnly")}</option>
        <option value="eng">{t("language.englishOnly")}</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
