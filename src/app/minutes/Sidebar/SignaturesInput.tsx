"use client";

import ErrorModal from "@/app/components/inputs/ErrorModal";
import { Signatures } from "@/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { MinutesData } from "../page";

interface Props {
  minutesData: MinutesData;
  setMinutesData: React.Dispatch<React.SetStateAction<MinutesData>>;
  checkErrors: boolean;
}

const SignaturesInput = ({
  minutesData,
  setMinutesData,
  checkErrors,
}: Props) => {
  const t = useTranslations();

  const handleChange =
    (fieldKey: keyof Signatures) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMinutesData({
        ...minutesData,
        signatures: {
          ...minutesData.signatures,
          [fieldKey]: e.currentTarget.value,
        },
      });
    };

  return (
    <div>
      <SignatureInput
        label={t("minutes.labels.chairman")}
        placeholder={t("minutes.placeholders.chairmanSignature")}
        onChange={handleChange("chairman")}
        isStyled={!!minutesData.signatures.chairman}
        errorMessage={t("minutes.errors.chairman")}
        hasError={!minutesData.signatures.chairman && checkErrors}
      />
      <SignatureInput
        label={t("minutes.labels.secretary")}
        placeholder={t("minutes.placeholders.secretarySignature")}
        onChange={handleChange("secretary")}
        isStyled={!!minutesData.signatures.secretary}
        errorMessage={t("minutes.errors.secretary")}
        hasError={!minutesData.signatures.secretary && checkErrors}
      />
      <SignatureInput
        label={t("minutes.labels.examiner1")}
        placeholder={t("minutes.placeholders.examinerSignature")}
        onChange={handleChange("examiner1")}
        isStyled={!!minutesData.signatures.examiner1}
        errorMessage={t("minutes.errors.examiner1")}
        hasError={!minutesData.signatures.examiner1 && checkErrors}
      />
      <SignatureInput
        label={t("minutes.labels.examiner2")}
        placeholder={t("minutes.placeholders.examinerSignature")}
        onChange={handleChange("examiner2")}
        isStyled={!!minutesData.signatures.examiner2}
        errorMessage={t("minutes.errors.examiner2")}
        hasError={!minutesData.signatures.examiner2 && checkErrors}
      />
    </div>
  );
};

const SignatureInput = ({
  label,
  placeholder,
  isStyled,
  onChange,
  errorMessage,
  hasError,
}: {
  label: string;
  placeholder: string;
  isStyled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  hasError: boolean;
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div>
      <label>{label}</label>
      <ErrorModal message={isHovered && hasError ? errorMessage : ""} />
      <div className={`input-wrapper ${hasError ? "has-error" : ""}`}>
        <input
          style={
            isStyled
              ? {
                  fontFamily: "Alex Brush",
                  fontWeight: "bold",
                }
              : { fontFamily: "circular" }
          }
          placeholder={placeholder}
          onChange={onChange}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>
    </div>
  );
};

export default SignaturesInput;
