"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { MinutesData } from "../page";

interface Props {
  label: string;
  buttonLabel: string;
  minutesData: MinutesData;
  setMinutesData: React.Dispatch<MinutesData>;
  fieldKey: "startTime" | "endTime";
}

const DatetimeInput = ({
  label,
  buttonLabel,
  minutesData,
  setMinutesData,
  fieldKey,
}: Props) => {
  const [datetime, setDatetime] = useState<Date>();

  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <div className="flex gap-2">
        <button
          className="datetime-button h-9 min-w-40"
          onClick={() =>
            setMinutesData({ ...minutesData, [fieldKey]: new Date() })
          }
        >
          {buttonLabel}
        </button>
        <div className="datepicker-wrapper w-full overflow-hidden">
          <DatePicker
            showTimeSelect
            dateFormat="HH:mm"
            timeFormat="HH:mm"
            onChange={(date) => {
              if (date) setMinutesData({ ...minutesData, startTime: date });
            }}
            selected={minutesData[fieldKey]}
          />
        </div>
      </div>
    </div>
  );
};

export default DatetimeInput;
