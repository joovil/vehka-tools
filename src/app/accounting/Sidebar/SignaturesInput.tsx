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
    (fieldKey: "recipient" | "committeeMember") =>
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
          {t("accounting.labels.recipient")}
        </label>
        <input
          className={`w-full border-b p-1 ${data.signatures.recipient ? "font-alex text-xl" : ""}`}
          placeholder={t("accounting.labels.recipient")}
          onChange={handleChange("recipient")}
        />
      </div>
      <div>
        <label className="text-sm text-gray-600">
          {t("accounting.labels.committeeMember")}
        </label>
        <input
          className={`w-full border-b p-1 ${data.signatures.committeeMember ? "font-alex text-xl" : ""}`}
          placeholder={t("accounting.labels.committeeMember")}
          onChange={handleChange("committeeMember")}
        />
      </div>
    </div>
  );
};

export default SignaturesInput;
