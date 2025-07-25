"use client";

import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { Signatures } from "@/types";
import { MinutesData } from "../page";

interface Props {
  minutesData: MinutesData;
  setMinutesData: React.Dispatch<React.SetStateAction<MinutesData>>;
}

const SignaturesInput = ({ minutesData, setMinutesData }: Props) => {
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
      />
      <SignatureInput
        label={dict.minutes.labels.secretary}
        placeholder={dict.minutes.placeholders.secretarySignature}
        onChange={handleChange("secretary")}
        isStyled={!!minutesData.signatures.secretary}
      />
      <SignatureInput
        label={dict.minutes.labels.examiner1}
        placeholder={dict.minutes.placeholders.examinerSignature}
        onChange={handleChange("examiner1")}
        isStyled={!!minutesData.signatures.examiner1}
      />
      <SignatureInput
        label={dict.minutes.labels.examiner2}
        placeholder={dict.minutes.placeholders.examinerSignature}
        onChange={handleChange("examiner2")}
        isStyled={!!minutesData.signatures.examiner2}
      />
    </div>
  );
};

const SignatureInput = ({
  label,
  placeholder,
  isStyled,
  onChange,
}: {
  label: string;
  placeholder: string;
  isStyled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <label>{label}</label>
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
