"use client";

import { useRef, useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Invite from "./Invite";
import MeetingForm from "./MeetingForm";

export interface AgendaItem {
  fin: string;
  eng: string;
}

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
    console.log(e.target.name);
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const ref = useRef(null);

  const handleDownloadImage = async () => {
    const elem = ref.current;
    if (!elem) return;

    const canvas = await html2canvas(elem);
    const data = canvas.toDataURL();

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "png", 0, 0, pdfWidth, pdfHeight);
    pdf.save();
  };

  return (
    <main className="overflow-x-hidden">
      <h1>Kokouskutsu</h1>
      <form className="flex flex-col gap-sm">
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

      {/* Previev */}
      <h2>Esikatselu</h2>
      <button onClick={handleDownloadImage}>Test pdf</button>

      {/* Preview */}
      <Invite agenda={agenda} />
      {/* PDF */}
      <div
        ref={ref}
        className="w-[1240px] h-[1754px] relative transform translate-x-[100vw] "
      >
        <Invite agenda={agenda} />
      </div>

      {/* <Document file={doc} /> */}
    </main>
  );
};
export default MeetingInvite;
