"use client";

import { useTranslations as useDictionary } from "@/app/i18n/TranslationsProvider";
import { useState } from "react";
import { MinutesData, MinutesProps } from "../page";

const MinutesSidebar = ({
  data: minutesData,
  setData: setMinutesData,
}: MinutesProps) => {
  const dict = useDictionary();

  const [newAttendant, setNewAttendant] = useState<string>("");

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
      <div>
        <div className="flex flex-col">
          <label>{dict.minutes.labels.attendants}</label>
          <div className="input-wrapper">
            <input
              name="newAttendant"
              type="text"
              placeholder={dict.minutes.placeholders.attendants}
              onChange={(e) => setNewAttendant(e.currentTarget.value)}
              value={newAttendant ?? ""}
            />
            <button
              className="aspect-square rounded bg-[#9fd3c7]/50"
              onClick={() => handleListChange("attendants", newAttendant)}
            >
              +
            </button>
          </div>
        </div>
        {minutesData.attendants?.map((att) => (
          <div key={att}>{att}</div>
        ))}
      </div>

      <div className="flex flex-col">
        <label>{dict.minutes.labels.items}</label>
        <div className="input-wrapper">
          <input
            name="meetingItems"
            type="text"
            placeholder={dict.minutes.placeholders.items}
          />
          <button className="aspect-square rounded bg-[#9fd3c7]/50">+</button>
        </div>
      </div>

      <div className="flex flex-col">
        <label>{dict.minutes.labels.otherItems}</label>
        <div className="input-wrapper">
          <input
            name="otherItems"
            type="text"
            placeholder={dict.minutes.placeholders.otherItems}
          />
          <button className="aspect-square rounded bg-[#9fd3c7]/50">+</button>
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
          <button className="aspect-square rounded bg-[#9fd3c7]/50">+</button>
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
          <button className="aspect-square rounded bg-[#9fd3c7]/50">+</button>
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
          <button className="aspect-square rounded bg-[#9fd3c7]/50">+</button>
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
          <button className="aspect-square rounded bg-[#9fd3c7]/50">+</button>
        </div>
      </div>
    </div>
  );
};

export default MinutesSidebar;
