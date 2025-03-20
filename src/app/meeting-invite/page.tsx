"use client";

import { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic"; // Import dynamic for client-side rendering
// import { PDFViewer } from "@react-pdf/renderer";
import InvitePdf from "./InvitePdf";
import MeetingForm from "./MeetingForm";

export interface AgendaItem {
  fin: string;
  eng: string;
}
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

const MeetingInvite = () => {
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

  const [newItem, setNewItem] = useState<AgendaItem>({ fin: "", eng: "" });

  const handleAddItem = () => {
    setAgenda([...agenda, newItem]);
    setNewItem({ fin: "", eng: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const mainRef = useRef<HTMLElement | null>(null);
  const [mainWidth, setMainWidth] = useState<number>(0);

  useEffect(() => {
    if (mainRef.current) {
      setMainWidth(mainRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (mainRef.current) {
        setMainWidth(mainRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main
      className="pb-10"
      ref={mainRef}
    >
      <h1>Kokouskutsu</h1>
      <form className="flex flex-col gap-sm pb-10">
        <h2>Käsiteltävät asiat</h2>
        <div className="grid grid-cols-2 gap-md">
          <input
            type="text"
            name="fin"
            value={newItem.fin}
            onChange={handleInputChange}
            className="bg-green-light"
          />

          <input
            type="text"
            name="eng"
            value={newItem.eng}
            onChange={handleInputChange}
            className="bg-green-light"
          />
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="btn-primary"
        >
          Lisää käsiteltävä asia
        </button>

        <MeetingForm
          agenda={agenda}
          setAgenda={setAgenda}
        />

        <button className="btn-primary">Luo kutsu</button>
      </form>

      {/* Preview */}
      <h2>Esikatselu</h2>

      <div>
        <div className="flex">
          <div className="flex-1">asd</div>
          <div className="flex-1">asd</div>
        </div>
      </div>

      <div className="relative pt-[160%] lg:pt-[150%] 2xl:pt-[1200px]">
        <PDFViewer
          className="absolute top-0 left-0 h-full w-full"
          style={{ width: mainWidth }}
        >
          <InvitePdf agenda={agenda} />
        </PDFViewer>
      </div>
    </main>
  );
};

export default MeetingInvite;
