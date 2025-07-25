"use client";

import React from "react";
import DatePicker from "react-datepicker";

interface Props<T extends { startTime?: Date; endTime?: Date }> {
  label?: string;
  buttonLabel?: string;
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  fieldKey: "startTime" | "endTime" | "nextMeeting" | "timeOfMeeting";
  placeholder: string;
  showButton?: boolean;
}

const DatetimeInput = <
  T extends {
    startTime?: Date;
    endTime?: Date;
    nextMeeting?: Date;
    timeOfMeeting?: Date;
  },
>({
  label,
  buttonLabel,
  data,
  setData,
  fieldKey,
  placeholder,
  showButton,
}: Props<T>) => {
  return (
    <div className={`${!label && "first:mt-2"} flex flex-col`}>
      <label>{label}</label>
      <div className="flex gap-2">
        {showButton && (
          <button
            className="datetime-button h-9 w-fit"
            onClick={() => setData({ ...data, [fieldKey]: new Date() })}
          >
            {buttonLabel}
          </button>
        )}
        <div
          className={`datepicker-wrapper w-full [&*]:min-w-0 ${!showButton ? "datepicker-ml" : ""}`}
        >
          <DatePicker
            placeholderText={placeholder}
            showTimeSelect
            dateFormat="HH:mm"
            timeFormat="HH:mm"
            onChange={(date) => {
              if (date) setData({ ...data, [fieldKey]: date });
            }}
            selected={data[fieldKey]}
          />
        </div>
      </div>
    </div>
  );
};

export default DatetimeInput;
