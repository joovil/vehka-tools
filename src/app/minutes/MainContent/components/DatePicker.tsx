"use client";

import { DateTime } from "@/app/meeting-invite/MainContent/MeetingInviteContent";
import {
  DateTimePicker,
  LocalizationProvider,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fi";

const DatePicker = ({
  setNextMeeting,
}: {
  setNextMeeting: React.Dispatch<React.SetStateAction<DateTime>>;
}) => {
  return (
    <div className="w-1/2">
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="fi"
      >
        <DateTimePicker
          ampm={false}
          onChange={(val) => {
            if (!val) return;
            const vals = val.format("DD.MM.YYYY HH:mm").split(" ");
            setNextMeeting({ date: vals[0], time: vals[1] });
          }}
          className="bg-green-light w-full"
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

export default DatePicker;
