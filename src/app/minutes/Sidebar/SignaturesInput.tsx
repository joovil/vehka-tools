"use client";

import ErrorModal from "@/app/components/inputs/ErrorModal";
import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { Signatures } from "@/types";
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
  const dict = useTranslations();

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
        label={dict.minutes.labels.chairman}
        placeholder={dict.minutes.placeholders.chairmanSignature}
        onChange={handleChange("chairman")}
        isStyled={!!minutesData.signatures.chairman}
        errorMessage={dict.minutes.errors.chairman}
        hasError={!minutesData.signatures.chairman && checkErrors}
      />
      <SignatureInput
        label={dict.minutes.labels.secretary}
        placeholder={dict.minutes.placeholders.secretarySignature}
        onChange={handleChange("secretary")}
        isStyled={!!minutesData.signatures.secretary}
        errorMessage={dict.minutes.errors.secretary}
        hasError={!minutesData.signatures.secretary && checkErrors}
      />
      <SignatureInput
        label={dict.minutes.labels.examiner1}
        placeholder={dict.minutes.placeholders.examinerSignature}
        onChange={handleChange("examiner1")}
        isStyled={!!minutesData.signatures.examiner1}
        errorMessage={dict.minutes.errors.examiner1}
        hasError={!minutesData.signatures.examiner1 && checkErrors}
      />
      <SignatureInput
        label={dict.minutes.labels.examiner2}
        placeholder={dict.minutes.placeholders.examinerSignature}
        onChange={handleChange("examiner2")}
        isStyled={!!minutesData.signatures.examiner2}
        errorMessage={dict.minutes.errors.examiner2}
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
