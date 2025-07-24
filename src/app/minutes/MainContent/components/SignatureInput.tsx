"use client";

import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { Signatures } from "@/types";
import React from "react";
import { MinutesData } from "../../page";

type SignatureInputProps = {
  minutesData: MinutesData;
  setMinutesData: React.Dispatch<React.SetStateAction<MinutesData>>;
};

const SignatureInput = ({
  minutesData,
  setMinutesData,
}: SignatureInputProps) => {
  const dict = useTranslations();

  return (
    <>
      {Object.keys(minutesData.signatures).map((signature) => (
        <div key={signature}>
          <label>{dict.minutes.labels.signatures}</label>
          <div className="input-wrapper">
            <input
              className="font-alex"
              value={minutesData.signatures[signature as keyof Signatures]}
              onChange={(e) =>
                setMinutesData({
                  ...minutesData,
                  signatures: {
                    ...minutesData.signatures,
                    [signature]: e.currentTarget.value,
                  },
                })
              }
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default SignatureInput;
