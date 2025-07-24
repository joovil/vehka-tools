"use client";

import Dropdown from "@/app/components/Dropdown";
import MultiLanguageInput from "@/app/components/inputs/MultiLanguageInput";
import MultiLanguageListInput from "@/app/components/inputs/MultiLanguageListInput";
import SidebarListInput from "@/app/components/Sidebar/SidebarListInput";
import { useTranslations } from "@/app/i18n/TranslationsProvider";
import ExaminerInput from "../MainContent/components/ExaminerInput";
import { MinutesProps } from "../page";
import DatetimeInput from "./DatetimeInput";

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

        {/* <DatetimeInput
          label={dict.minutes.labels.startTime}
          buttonLabel={dict.minutes.buttons.startMeeting}
          placeholder={dict.minutes.placeholders.startTime}
          setData={setMinutesData}
          data={minutesData}
          fieldKey="startTime"
        /> */}
      </Dropdown>

      <Dropdown header={dict.minutes.labels.attendants}>
        <SidebarListInput
          label={dict.minutes.labels.attendants}
          placeholder={dict.minutes.labels.attendants}
          fieldKey="attendants"
          setData={setMinutesData}
        />
      </Dropdown>

      <Dropdown header={dict.minutes.labels.startTime}>
        <DatetimeInput
          label={dict.minutes.labels.startTime}
          buttonLabel={dict.minutes.buttons.startMeeting}
          placeholder={dict.minutes.placeholders.startTime}
          setData={setMinutesData}
          data={minutesData}
          fieldKey="startTime"
          showButton={true}
        />
      </Dropdown>

      <Dropdown header={dict.minutes.labels.examiners}>
        <ExaminerInput setData={setMinutesData} />
      </Dropdown>

      <Dropdown header={dict.minutes.labels.acceptAgenda}>
        <div>
          <label>Esityslistan hyväksyminen</label>
          <input type="checkbox" />
        </div>
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
          // data={minutesData}
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
          label={dict.minutes.labels.newMembers}
          placeholder={dict.minutes.placeholders.newMembers}
          setData={setMinutesData}
          fieldKey={"newMembers"}
        />
      </Dropdown>

      <Dropdown header={dict.minutes.labels.nextMeeting}>
        <DatetimeInput
          label={dict.minutes.labels.nextMeeting}
          buttonLabel={dict.minutes.buttons.nextMeeting}
          placeholder={dict.minutes.placeholders.nextMeeting}
          setData={setMinutesData}
          data={minutesData}
          fieldKey="nextMeeting"
        />
      </Dropdown>

      <Dropdown header={dict.minutes.labels.signatures}>
        {Object.keys(minutesData.signatures).map((signature) => (
          <div key={signature}>
            <label>{dict.minutes.labels.signatures}</label>
            <div className="input-wrapper">
              <input
                className="font-alex"
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
      </Dropdown>
    </div>
  );
};

export default MinutesSidebar;
