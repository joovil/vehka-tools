"use client";

import { useRef, useState } from "react";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import Image from "next/image";
import MeetingForm from "./MeetingForm";
import PdfPreview from "./PdfPreview";

export interface AgendaItem {
  fin: string;
  eng: string;
}

export interface DateTime {
  date: string;
  time: string;
}

export interface Place {
  paikka: string;
  place: string;
}

const MeetingInvite = () => {
  const mainRef = useRef<HTMLElement | null>(null);

  const [newItem, setNewItem] = useState<AgendaItem>({ fin: "", eng: "" });
  const [dateTime, setDateTime] = useState<DateTime>({ date: "", time: "" });
  const [location, setLocation] = useState<Place>({ paikka: "", place: "" });
  const [agenda, setAgenda] = useState<AgendaItem[]>([
    {
      fin: "Kokouksen avaus, laillisuus ja päätösvaltaisuus",
      eng: "Opening the meeting and declaring the meeting quorate",
    },
    {
      fin: "Kahden pöytäkirjantarkastajan valinta",
      eng: "Electing two examiners of the minutes",
    },
    {
      fin: "Esityslistan hyväksyminen",
      eng: "Adopting the agenda",
    },
  ]);
  const endItems: AgendaItem[] = [
    { fin: "Seuraavan kokouksen ajankohta", eng: "The next meeting" },
    { fin: "Kokouksen päättäminen", eng: "Closing the meeting" },
  ];

  const handleAddItem = () => {
    setAgenda([...agenda, newItem]);
    setNewItem({ fin: "", eng: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
    setLocation({ ...location, [name]: value });
  };

  return (
    <main
      className="pb-10 flex flex-col gap-md"
      ref={mainRef}
    >
      <h1>Kokouskutsu</h1>
      <form className="flex flex-col gap-sm">
        <div className="grid grid-cols-2 gap-md">
          <div>
            <h2>Aika</h2>
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
          </div>
        </div>

        <div className="grid grid-cols-2 gap-md">
          <div>
            <h2>Paikka</h2>
            <input
              type="text"
              name="paikka"
              onChange={handleInputChange}
              className="bg-green-light w-full"
            />
          </div>

          <div>
            <h2>Place</h2>
            <input
              type="text"
              name="place"
              onChange={handleInputChange}
              className="bg-green-light w-full"
            />
          </div>
        </div>

        <h2>Käsiteltävät asiat</h2>
        <div className="grid grid-cols-2 gap-md">
          <div>
            <h3>Suomeksi</h3>
            <input
              type="text"
              name="fin"
              value={newItem.fin}
              onChange={handleInputChange}
              className="bg-green-light w-full"
            />
          </div>

          <div>
            <h3>English</h3>
            <input
              type="text"
              name="eng"
              value={newItem.eng}
              onChange={handleInputChange}
              className="bg-green-light w-full"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="btn-primary"
        >
          Lisää
        </button>

        <MeetingForm
          agenda={agenda}
          setAgenda={setAgenda}
        />
      </form>

      {/* Preview */}
      <div className="flex flex-col gap-sm">
        <h2>Esikatselu</h2>

        <div>
          <Image
            src="/banner.svg"
            width={0}
            height={0}
            className="w-full h-full"
            sizes="100vw"
            alt="Banner"
          />
          <PdfPreview
            dateTime={dateTime}
            location={location}
            agenda={agenda}
            endItems={endItems}
          />
        </div>
      </div>
    </main>
  );
};

export default MeetingInvite;
