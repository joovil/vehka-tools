"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import ErrorModal from "./ErrorModal";

interface Props<T> {
  label?: string;
  buttonLabel?: string;
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  fieldKey: keyof T;
  placeholder: string;
  showButton?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  header?: string;
}

const DatetimeInput = <T,>({
  label,
  buttonLabel,
  data,
  setData,
  fieldKey,
  placeholder,
  showButton,
  errorMessage,
  hasError,
  header,
}: Props<T>) => {
  const [isHovered, setIsHovered] = useState<boolean>(false); // hover state

  return (
    <div className={`${!label && "first:mt-2"} flex flex-col`}>
      {header && <div className="text-xl font-bold">{header}</div>}
      {label && <label>{label}</label>}
      <ErrorModal message={isHovered && hasError ? errorMessage : ""} />
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
          className={`datepicker-wrapper ${hasError ? "has-error" : ""} w-full [&*]:min-w-0 ${!showButton ? "datepicker-ml" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <DatePicker
            placeholderText={placeholder}
            showTimeSelect
            dateFormat="dd/MM/yyyy HH:mm"
            timeFormat="HH:mm"
            onChange={(date) => {
              if (date) setData({ ...data, [fieldKey]: date });
            }}
            selected={data[fieldKey] as Date}
          />
        </div>
      </div>
      <button
        className="mt-1 w-fit"
        onClick={() => setData({ ...data, [fieldKey]: undefined })}
      >
        Clear
      </button>
    </div>
  );
};

export default DatetimeInput;
