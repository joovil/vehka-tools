"use client";

import {
  DateTimePicker,
  LocalizationProvider,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const NextMeetingDate = ({
  setNextMeeting,
}: {
  setNextMeeting: React.Dispatch<
    React.SetStateAction<{
      date: string;
      time: string;
    }>
  >;
}) => {
  return (
    <div className="w-1/2">
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="de"
      >
        <DateTimePicker
          ampm={false}
          onChange={(val) => {
            if (!val) return;
            const vals = val.format("DD.MM.YYYY HH:mm").split(" ");
            setNextMeeting({ date: vals[0], time: vals[1] });
          }}
          className="w-full"
          slotProps={{ textField: { size: "small" } }}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          format="DD.MM.YYYY HH:mm"
        />
      </LocalizationProvider>
    </div>
  );
};

export default NextMeetingDate;
