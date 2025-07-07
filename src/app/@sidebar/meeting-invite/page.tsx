"use client";

import {
  DateTimePicker,
  LocalizationProvider,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

export interface DateTime {
  date: string;
  time: string;
}

const FieldInputs = () => {
  const [dateTime, setDateTime] = useState<DateTime>({ date: "", time: "" });

  return (
    <div>
      <form>
        <label>Aika</label>
        {/* <input type="datetime-local" /> */}
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="de"
        >
          <DateTimePicker
            ampm={false}
            onChange={(val) => {
              if (!val) return;
              const vals = val.format("DD.MM.YYYY HH:mm").split(" ");
              setDateTime({ date: vals[0], time: vals[1] });
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

        <div className="flex flex-col">
          <label>Paikka</label>
          <input className="rounded-md border-1 border-gray-300" />
        </div>

        <div className="flex flex-col">
          <label>Lisätietoja</label>
          <input className="rounded-md border-1 border-gray-300" />
        </div>

        <div className="flex flex-col">
          <label>Esityslista</label>
          <input className="rounded-md border-1 border-gray-300" />
        </div>
      </form>
    </div>
  );
};

export default FieldInputs;
