"use client";

import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { MinutesData } from "../page";

interface Props {
  minutesData: MinutesData;
  setMinutesData: React.Dispatch<React.SetStateAction<MinutesData>>;
}

const SignaturesInput = ({ minutesData, setMinutesData }: Props) => {
  const dict = useTranslations();

  return (
    <>
      {Object.keys(minutesData.signatures).map((signature) => (
        <div key={signature}>
          <label>{dict.minutes.labels.signatures}</label>
          <div className="input-wrapper">
            <input
              className="font-alex font-bold"
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

export default SignaturesInput;
