"use client";

import SidebarListButton from "@/app/components/SidebarListButton";
import { useTranslations as useDictionary } from "@/app/i18n/TranslationsProvider";
import { useState } from "react";
import { MinutesData, MinutesProps } from "../page";

const MinutesSidebar = ({
  data: minutesData,
  setData: setMinutesData,
}: MinutesProps) => {
  const dict = useDictionary();

  const [newAttendant, setNewAttendant] = useState<string>("");
  const [newItem, setNewItem] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;

    setMinutesData({ ...minutesData, [key]: value });
  };

  // Adds a new item to the end of the array using the key as the field name
  const handleListChange = (key: keyof MinutesData, item: string) => {
    if (Array.isArray(minutesData[key])) {
      const update = [...minutesData[key], item];
      setMinutesData({ ...minutesData, [key]: update });
      console.log(update);
    } else {
      console.warn(`minutesData[${key}] is not an array.`);
    }
  };

  return (
    <div>
      <SidebarListButton
        label={dict.minutes.labels.attendants}
        placeholder={dict.minutes.placeholders.attendants}
        fieldKey="attendants"
        data={minutesData}
        setData={setMinutesData}
      >
        {minutesData.attendants.map((att) => (
          <div key={att}>{att}</div>
        ))}
      </SidebarListButton>

      <SidebarListButton
        label={dict.minutes.labels.items}
        placeholder={dict.minutes.placeholders.items}
        fieldKey="meetingItems"
        data={minutesData}
        setData={setMinutesData}
      >
        {minutesData.meetingItems.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </SidebarListButton>

      <SidebarListButton
        label={dict.minutes.labels.otherItems}
        placeholder={dict.minutes.placeholders.otherItems}
        fieldKey="otherItems"
        data={minutesData}
        setData={setMinutesData}
      >
        {minutesData.otherItems.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </SidebarListButton>

      <div className="flex flex-col">
        <label>{dict.minutes.labels.otherItems}</label>
        <div className="input-wrapper">
          <input
            name="otherItems"
            type="text"
            placeholder={dict.minutes.placeholders.otherItems}
          />
          <button className="bg-teal-light/50 aspect-square rounded">+</button>
        </div>
      </div>

      <div className="flex flex-col">
        <label>{dict.minutes.labels.location}</label>
        <div className="input-wrapper">
          <input
            name="location"
            type="text"
            placeholder={dict.minutes.placeholders.location}
          />
          <button className="bg-teal-light/50 aspect-square rounded">+</button>
        </div>
      </div>

      <div className="flex flex-col">
        <label>{dict.minutes.labels.startTime}</label>
        <div className="input-wrapper">
          <input
            name="startTime"
            type="text"
            placeholder={dict.minutes.placeholders.startTime}
          />
          <button className="bg-teal-light/50 aspect-square rounded">+</button>
        </div>
      </div>

      <div className="flex flex-col">
        <label>{dict.minutes.labels.endTime}</label>
        <div className="input-wrapper">
          <input
            name="endTime"
            type="text"
            placeholder={dict.minutes.placeholders.endTime}
          />
          <button className="bg-teal-light/50 aspect-square rounded">+</button>
        </div>
      </div>

      <div className="flex flex-col">
        <label>{dict.minutes.labels.signatures}</label>
        <div className="input-wrapper">
          <input
            name="signatures"
            type="text"
            placeholder={dict.minutes.placeholders.signatures}
          />
          <button className="bg-teal-light/50 aspect-square rounded">+</button>
        </div>
      </div>
    </div>
  );
};

export default MinutesSidebar;
