"use client";

import SidebarInput from "@/app/components/Sidebar/SidebarInput";
import SidebarListInput from "@/app/components/Sidebar/SidebarListButton";
import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { Signatures } from "@/types";
import { MinutesProps } from "../page";
import DatetimeInput from "./DatetimeInput";
import MultiLanguageInput from "@/app/components/inputs/MultiLanguageInput";

const MinutesSidebar = ({
  data: minutesData,
  setData: setMinutesData,
}: MinutesProps) => {
  const dict = useTranslations();

  return (
    <div>
      <MultiLanguageInput
        placeholder={dict.minutes.placeholders.attendants}
        fieldKey="attendants"
        data={minutesData}
        setData={setMinutesData}
      />
      {/* 
      <div>
        <h2>{dict.minutes.labels.attendants}</h2>

        <h3>{dict.finnish}</h3>
        <SidebarInput
          placeholder={dict.minutes.placeholders.attendants}
          fieldKey="attendants"
          data={minutesData}
          setData={setMinutesData}
        />
        <h3>{dict.english}</h3>
        <SidebarInput
          placeholder={dict.minutes.placeholders.attendants}
          fieldKey="attendants"
          data={minutesData}
          setData={setMinutesData}
        />

        <button>{dict.addItem}</button>
      </div> */}
      {/* 
      <SidebarListInput
        label={dict.minutes.labels.items}
        placeholder={dict.minutes.placeholders.items}
        fieldKey="meetingItems"
        data={minutesData}
        setData={setMinutesData}
      >
        {minutesData.meetingItems.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </SidebarListInput>

      <SidebarListInput
        label={dict.minutes.labels.otherItems}
        placeholder={dict.minutes.placeholders.otherItems}
        fieldKey="otherItems"
        data={minutesData}
        setData={setMinutesData}
      >
        {minutesData.otherItems.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </SidebarListInput>

      <SidebarInput
        label={dict.minutes.labels.location}
        placeholder={dict.minutes.placeholders.location}
        fieldKey="location"
        data={minutesData}
        setData={setMinutesData}
      />

      <DatetimeInput
        label={dict.minutes.labels.startTime}
        buttonLabel={dict.minutes.buttons.startMeeting}
        minutesData={minutesData}
        setMinutesData={setMinutesData}
        fieldKey="startTime"
      />

      <DatetimeInput
        label={dict.minutes.labels.endTime}
        buttonLabel={dict.minutes.buttons.endMeeting}
        minutesData={minutesData}
        setMinutesData={setMinutesData}
        fieldKey="endTime"
      /> */}

      {Object.keys(minutesData.signatures).map((signature) => (
        <div key={signature}>
          <label>
            {dict.minutes.labels.signatures[signature as keyof Signatures]}
          </label>
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
    </div>
  );
};

export default MinutesSidebar;
