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
}

const DateButton = ({
  minutesData,
  setMinutesData,
  buttonLabel,
  fieldKey,
  ref,
  className,
  onClick,
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
        onClick={() => {
          if (onClick) {
            onClick(setDate);
          } else {
            setDate();
          }
        }}
        disabled={!!minutesData[fieldKey]}
      >
        {buttonLabel}
      </button>
      <div className="input-wrapper">
        {formatDate(minutesData[fieldKey]) || "_"}
      </div>
    </div>
  );
};

export default DateButton;
