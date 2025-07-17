"use client";

import { MinutesProps } from "../page";

const MinutesSidebar = ({
  data: minutesData,
  setData: setMinutesData,
}: MinutesProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;

    // if (!key || !value) return;

    setMinutesData({ ...minutesData, [key]: value });
  };

  return (
    <div>
      <div className="relative flex flex-col">
        <label>Attendants</label>
        <input
          name="attendants"
          type="text"
          placeholder="Who was present at the meeting"
          onChange={(e) => handleChange(e)}
          value={minutesData.attendants ?? ""}
        />
      </div>

      <div className="flex flex-col">
        <label>Items</label>
        <input
          name="meetingItems"
          type="text"
          placeholder="What was discussed in the meeting"
        />
      </div>

      <div className="flex flex-col">
        <label>Other items</label>
        <input
          name="otherItems"
          type="text"
          placeholder=""
        />
      </div>

      <div className="flex flex-col">
        <label>Location</label>
        <input
          name="location"
          type="text"
        />
      </div>

      <div className="flex flex-col">
        <label>Start time</label>
        <input
          name="startTime"
          type="text"
        />
      </div>

      <div className="flex flex-col">
        <label>End time</label>
        <input
          name="endTime"
          type="text"
        />
      </div>

      <div className="flex flex-col">
        <label>Signatures</label>
        <input
          name="signatures"
          type="text"
        />
      </div>
    </div>
  );
};

export default MinutesSidebar;
