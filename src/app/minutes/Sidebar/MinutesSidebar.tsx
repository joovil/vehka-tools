"use client";

import Dropdown from "@/app/components/Dropdown";
import MultiLanguageInput from "@/app/components/inputs/MultiLanguageInput";
import MultiLanguageListInput from "@/app/components/inputs/MultiLanguageListInput";
import SidebarListInput from "@/app/components/inputs/SidebarListInput";
import { useTranslations } from "@/app/i18n/TranslationsProvider";
import DatetimeInput from "../../components/inputs/DatetimeInput";
import { MinutesProps } from "../page";
import DateButton from "./DateButton";
import ExaminerInput from "./ExaminerInput";
import SignaturesInput from "./SignaturesInput";

const MinutesSidebar = ({
  data: minutesData,
  setData: setMinutesData,
}: MinutesProps) => {
  const dict = useTranslations();

  return (
    <div className="flex flex-col gap-2">
      <Dropdown header={dict.minutes.labels.location}>
        <MultiLanguageInput
          placeholder={dict.minutes.placeholders.location}
          fieldKey="location"
          setData={setMinutesData}
        />

        <DatetimeInput
          label={dict.minutes.labels.timeOfMeeting}
          placeholder={dict.minutes.placeholders.timeOfMeeting}
          data={minutesData}
          setData={setMinutesData}
          fieldKey="timeOfMeeting"
          showButton={false}
        />
      </Dropdown>

      <Dropdown header={dict.minutes.labels.attendants}>
        <SidebarListInput
          placeholder={dict.minutes.labels.attendants}
          fieldKey="attendants"
          setData={setMinutesData}
        />
      </Dropdown>

      <Dropdown header={dict.minutes.labels.startTime}>
        <DateButton
          buttonLabel={dict.minutes.buttons.startTime}
          minutesData={minutesData}
          setMinutesData={setMinutesData}
          fieldKey="startTime"
        />
      </Dropdown>

      <Dropdown header={dict.minutes.labels.examiners}>
        <ExaminerInput setData={setMinutesData} />
      </Dropdown>

      <Dropdown header={dict.minutes.labels.items}>
        <MultiLanguageListInput
          placeholder={dict.minutes.placeholders.attendants}
          fieldKey="meetingItems"
          setData={setMinutesData}
        />
      </Dropdown>

      <Dropdown header={dict.minutes.labels.otherItems}>
        <MultiLanguageListInput
          placeholder={dict.minutes.placeholders.attendants}
          fieldKey="otherItems"
          setData={setMinutesData}
        />
        {minutesData.otherItems.map((item) => (
          <div key={item.fin}>
            {item.fin}, {item.eng}
          </div>
        ))}
      </Dropdown>

      <Dropdown header={dict.minutes.labels.newMembers}>
        <SidebarListInput
          placeholder={dict.minutes.placeholders.newMembers}
          setData={setMinutesData}
          fieldKey={"newMembers"}
        />
      </Dropdown>

      <Dropdown header={dict.minutes.labels.nextMeeting}>
        <DatetimeInput
          buttonLabel={dict.minutes.buttons.nextMeeting}
          placeholder={dict.minutes.placeholders.nextMeeting}
          setData={setMinutesData}
          data={minutesData}
          fieldKey="nextMeeting"
        />
      </Dropdown>

      <Dropdown header={dict.minutes.labels.endTime}>
        <DateButton
          buttonLabel={dict.minutes.buttons.endTime}
          minutesData={minutesData}
          setMinutesData={setMinutesData}
          fieldKey="endTime"
        />
      </Dropdown>

      <Dropdown header={dict.minutes.labels.signatures}>
        <SignaturesInput
          minutesData={minutesData}
          setMinutesData={setMinutesData}
        />
      </Dropdown>
    </div>
  );
};

export default MinutesSidebar;
