"use client";

import { formatDate } from "@/app/utils/formatDate";
import React from "react";
import { MinutesData } from "../page";

interface Props {
  minutesData: MinutesData;
  setMinutesData: React.Dispatch<React.SetStateAction<MinutesData>>;
  buttonLabel: string;
  fieldKey: "startTime" | "endTime";
  ref?: React.RefObject<HTMLDivElement>;
  className?: string;
  onClick?: (setDate: () => void) => void;
  disabled?: boolean;
}

const DateButton = ({
  minutesData,
  setMinutesData,
  buttonLabel,
  fieldKey,
  ref,
  className,
  onClick,
  disabled,
}: Props) => {
  const setDate = () => {
    setMinutesData({ ...minutesData, [fieldKey]: new Date() });
  };

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      ref={ref}
    >
      <button
        className="mt-2"
        onClick={() => {
          if (onClick) {
            onClick(setDate);
          } else {
            setDate();
          }
        }}
        // disabled={!!minutesData[fieldKey]}
        disabled={disabled}
      >
        {buttonLabel}
      </button>
      <div className="input-wrapper mt-2">
        {formatDate(minutesData[fieldKey]) || "_"}
      </div>
    </div>
  );
};

export default DateButton;
