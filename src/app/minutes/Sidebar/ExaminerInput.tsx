"use client";

import SidebarInputComponent from "@/app/components/inputs/SidebarInputComponent";
import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { MinutesData } from "../page";

interface Props {
  data: MinutesData;
  setData: React.Dispatch<React.SetStateAction<MinutesData>>;
  errorMessage?: string;
}

const ExaminerInput = ({ data, setData, errorMessage }: Props) => {
  const dict = useTranslations();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      examiners: {
        ...prev.examiners,
        [name]: value,
      },
    }));
  };

  return (
    <div>
      <label>{dict.minutes.labels.examiner1}</label>
      <SidebarInputComponent
        placeholder={dict.minutes.placeholders.examiner1}
        fieldKey={"examiner1"}
        onChange={handleChange}
        errorMessage={errorMessage}
        hasError={!data.examiners.examiner1 && !!errorMessage}
      />
      <label>{dict.minutes.labels.examiner2}</label>
      <SidebarInputComponent
        placeholder={dict.minutes.placeholders.examiner2}
        fieldKey={"examiner2"}
        onChange={handleChange}
        errorMessage={errorMessage}
        hasError={!data.examiners.examiner1 && !!errorMessage}
      />
    </div>
  );
};

export default ExaminerInput;
