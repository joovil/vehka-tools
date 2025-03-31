"use client";

import { useRef, useState } from "react";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { DownloadPdf } from "../components/DownloadPdf";
import PdfPreview from "./inviteFormPreview";
import AgendaItemList from "./inviteFormPreview/AgendaItemList";
import InvitePdf from "./invitePdf";

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

export interface MoreInfo {
  tietoja: string;
  info: string;
}

const MeetingInvite = () => {
  const mainRef = useRef<HTMLElement | null>(null);

  const [newItem, setNewItem] = useState<AgendaItem>({ fin: "", eng: "" });
  const [dateTime, setDateTime] = useState<DateTime>({ date: "", time: "" });
  const [location, setLocation] = useState<Place>({ paikka: "", place: "" });
  const [moreInfo, setMoreInfo] = useState<MoreInfo>({ tietoja: "", info: "" });
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

  // const downloadPDF = async () => {
  //   const blob = await pdf(
  //     <InvitePdf
  //       dateTime={dateTime}
  //       location={location}
  //       agenda={agenda}
  //       moreInfo={moreInfo}
  //       endItems={endItems}
  //     />
  //   ).toBlob();

  //   const url = URL.createObjectURL(blob);

  //   // Create temporary <a/> element to download the pdf
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "MeetingInvite.pdf";
  //   document.body.appendChild(a);

  //   a.click();

  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // };

  return (
    <main
      className="flex flex-col"
      ref={mainRef}
    >
      <h1>Kokouskutsu</h1>
      <form className="flex flex-col gap-sm">
        <div className="meeting-invite-cols">
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

        <div className="meeting-invite-cols">
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

        <div className="meeting-invite-cols">
          <div>
            <h2>Lisätietoja</h2>
            <textarea
              name="tietoja"
              value={moreInfo.tietoja}
              onChange={(e) =>
                setMoreInfo({ ...moreInfo, tietoja: e.currentTarget.value })
              }
              className="bg-green-light w-full"
            />
          </div>

          <div>
            <h2>Further information</h2>
            <textarea
              name="info"
              value={moreInfo.info}
              onChange={(e) =>
                setMoreInfo({ ...moreInfo, info: e.currentTarget.value })
              }
              className="bg-green-light w-full"
            />
          </div>
        </div>

        <div className="meeting-invite-cols">
          <div>
            <h2>Esityslista</h2>
            <input
              type="text"
              name="fin"
              value={newItem.fin}
              onChange={handleInputChange}
              className="bg-green-light w-full"
            />
          </div>

          <div>
            <h2>Agenda</h2>
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
      </form>

      <div className="mt-2 mb-4">
        <AgendaItemList
          agenda={agenda}
          setAgenda={setAgenda}
        />
      </div>

      {/* Preview */}
      <div className="flex flex-col gap-sm">
        <button
          onClick={() =>
            DownloadPdf(
              "Kokouskutsu",
              <InvitePdf
                dateTime={dateTime}
                location={location}
                agenda={agenda}
                moreInfo={moreInfo}
                endItems={endItems}
              />
            )
          }
          className="btn-primary"
        >
          Lataa kokouskutsu
        </button>

        <PdfPreview
          dateTime={dateTime}
          location={location}
          agenda={agenda}
          moreInfo={moreInfo}
          endItems={endItems}
        />
      </div>
    </main>
  );
};

export default MeetingInvite;
