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
      const update = [...(minutesData[key] as string[]), item];
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
          <div>
            <label>{dict.minutes.labels.attendants}</label>
            <input
              name="newAttendant"
              type="text"
              placeholder={dict.minutes.placeholders.attendants}
              onChange={(e) => setNewAttendant(e.currentTarget.value)}
              value={newAttendant ?? ""}
            />
          </div>
          <button onClick={() => handleListChange("attendants", newAttendant)}>
            Add attendant
          </button>
        </div>
        {minutesData.attendants?.map((att) => (
          <div key={att}>{att}</div>
        ))}
      </div>

      <div className="flex flex-col">
        <label>{dict.minutes.labels.items}</label>
        <input
          name="meetingItems"
          type="text"
          placeholder={dict.minutes.placeholders.items}
        />
      </div>

      <div className="flex flex-col">
        <label>{dict.minutes.labels.otherItems}</label>
        <input
          name="otherItems"
          type="text"
          placeholder={dict.minutes.placeholders.otherItems}
        />
      </div>

      <div className="flex flex-col">
        <label>{dict.minutes.labels.location}</label>
        <input
          name="location"
          type="text"
          placeholder={dict.minutes.placeholders.location}
        />
      </div>

      <div className="flex flex-col">
        <label>{dict.minutes.labels.startTime}</label>
        <input
          name="startTime"
          type="text"
          placeholder={dict.minutes.placeholders.startTime}
        />
      </div>

      <div className="flex flex-col">
        <label>{dict.minutes.labels.endTime}</label>
        <input
          name="endTime"
          type="text"
          placeholder={dict.minutes.placeholders.endTime}
        />
      </div>

      <div className="flex flex-col">
        <label>{dict.minutes.labels.signatures}</label>
        <input
          name="signatures"
          type="text"
          placeholder={dict.minutes.placeholders.signatures}
        />
      </div>
    </div>
  );
};

export default MinutesSidebar;
