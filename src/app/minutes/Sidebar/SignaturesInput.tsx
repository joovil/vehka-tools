"use client";

import ErrorModal from "@/app/components/inputs/ErrorModal";
import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { Signatures } from "@/types";
import { MinutesData } from "../page";

interface Props {
  minutesData: MinutesData;
  setMinutesData: React.Dispatch<React.SetStateAction<MinutesData>>;
  errorMessage?: string;
}

const SignaturesInput = ({
  minutesData,
  setMinutesData,
  errorMessage,
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
        errorMessage={
          !minutesData.signatures.chairman ? errorMessage : undefined
        }
      />
      <SignatureInput
        label={dict.minutes.labels.secretary}
        placeholder={dict.minutes.placeholders.secretarySignature}
        onChange={handleChange("secretary")}
        isStyled={!!minutesData.signatures.secretary}
        errorMessage={
          !minutesData.signatures.secretary ? errorMessage : undefined
        }
      />
      <SignatureInput
        label={dict.minutes.labels.examiner1}
        placeholder={dict.minutes.placeholders.examinerSignature}
        onChange={handleChange("examiner1")}
        isStyled={!!minutesData.signatures.examiner1}
        errorMessage={
          !minutesData.signatures.examiner1 ? errorMessage : undefined
        }
      />
      <SignatureInput
        label={dict.minutes.labels.examiner2}
        placeholder={dict.minutes.placeholders.examinerSignature}
        onChange={handleChange("examiner2")}
        isStyled={!!minutesData.signatures.examiner2}
        errorMessage={
          !minutesData.signatures.examiner2 ? errorMessage : undefined
        }
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
}: {
  label: string;
  placeholder: string;
  isStyled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}) => {
  return (
    <div>
      <label>{label}</label>
      <ErrorModal message={errorMessage} />
      <div className="input-wrapper">
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
        />
      </div>
    </div>
  );
};

export default SignaturesInput;
