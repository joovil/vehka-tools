"use client";

import React from "react";
import DatePicker from "react-datepicker";
import ErrorModal from "./ErrorModal";

interface Props<T extends { startTime?: Date; endTime?: Date }> {
  label?: string;
  buttonLabel?: string;
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  fieldKey: "startTime" | "endTime" | "nextMeeting" | "timeOfMeeting";
  placeholder: string;
  showButton?: boolean;
  errorMessage?: string;
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
  errorMessage,
}: Props<T>) => {
  return (
    <div className={`${!label && "first:mt-2"} flex flex-col`}>
      <label>{label}</label>
      {!data[fieldKey] && <ErrorModal message={errorMessage} />}
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
            dateFormat="dd/MM/yyyy HH:mm"
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
