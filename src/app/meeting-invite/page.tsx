"use client";

import { useRef, useState } from "react";

import PdfPreview from "./inviteFormPreview";

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

  return (
    <main
      className="flex flex-col"
      ref={mainRef}
    >
      <div className="gap-sm flex flex-col">
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
