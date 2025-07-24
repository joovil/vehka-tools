"use client";

import SidebarInputComponent from "@/app/components/inputs/SidebarInputComponent";
import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { MinutesData } from "../page";

interface Props {
  setData: React.Dispatch<React.SetStateAction<MinutesData>>;
}

const ExaminerInput = ({ setData }: Props) => {
  const dict = useTranslations();

  // const [newItem, setNewItem] = useState<FinEng>({} as FinEng);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // setNewItem((prev) => ({ ...prev, [name]: value }));
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
      />
      <label>{dict.minutes.labels.examiner2}</label>
      <SidebarInputComponent
        placeholder={dict.minutes.placeholders.examiner2}
        fieldKey={"examiner2"}
        onChange={handleChange}
      />
    </div>
  );
};

export default ExaminerInput;
