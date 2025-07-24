"use client";

import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { formatDate } from "@/app/utils/formatDate";
import { MinutesProps } from "../page";

const EndMeeting = ({
  data: minutesData,
  setData: setMinutesData,
}: MinutesProps) => {
  const dict = useTranslations();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setMinutesData({ ...minutesData, endTime: new Date() })}
        disabled={!!minutesData.endTime}
      >
        {dict.minutes.buttons.endMeeting}
      </button>
      <div className="input-wrapper">{formatDate(minutesData.endTime)}</div>
    </div>
  );
};

export default EndMeeting;
