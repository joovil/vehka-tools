"use client";

import { formatDate } from "@/app/utils/formatDate";
import React from "react";
import { MinutesData } from "../page";

interface Props {
  minutesData: MinutesData;
  setMinutesData: React.Dispatch<React.SetStateAction<MinutesData>>;
  buttonLabel: string;
  fieldKey: "startTime" | "endTime";
}

const DateButton = ({
  minutesData,
  setMinutesData,
  buttonLabel,
  fieldKey,
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() =>
          setMinutesData({ ...minutesData, [fieldKey]: new Date() })
        }
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
