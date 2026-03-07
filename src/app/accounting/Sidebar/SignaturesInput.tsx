"use client";

import { useTranslations } from "next-intl";
import { AccountingData } from "../page";

interface Props {
  data: AccountingData;
  setData: React.Dispatch<React.SetStateAction<AccountingData>>;
}

const SignaturesInput = ({ data, setData }: Props) => {
  const t = useTranslations();

  const handleChange =
    (fieldKey: "chairman" | "treasurer") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        signatures: {
          ...data.signatures,
          [fieldKey]: e.currentTarget.value,
        },
      });
    };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <label className="text-sm text-gray-600">
          {t("accounting.labels.chairman")}
        </label>
        <input
          className={`w-full border-b p-1 ${data.signatures.chairman ? "font-alex text-xl" : ""}`}
          placeholder={t("accounting.labels.chairman")}
          onChange={handleChange("chairman")}
        />
      </div>
      <div>
        <label className="text-sm text-gray-600">
          {t("accounting.labels.treasurer")}
        </label>
        <input
          className={`w-full border-b p-1 ${data.signatures.treasurer ? "font-alex text-xl" : ""}`}
          placeholder={t("accounting.labels.treasurer")}
          onChange={handleChange("treasurer")}
        />
      </div>
    </div>
  );
};

export default SignaturesInput;
