"use client";

import { useRef, useState } from "react";
import MeetingForm from "./MeetingForm";

const MeetingInvite = () => {
  const [agendaFin, setAgendaFin] = useState<string[]>([
    "Hei maailma",
    "Viu Vau",
    "Pum pam",
    "Vamos vamos",
  ]);
  const [agendaEng, setAgendaEng] = useState<string[]>([
    "Hello world",
    "Foo Bar",
    "Bada Bing",
    "Zoom zoom",
  ]);

  const [agendaItemFin, setAgendaItemFin] = useState<string>("");
  const [agendaItemEng, setAgendaItemEng] = useState<string>("");

  const ref = useRef(null);

  const handleDownloadImage = async () => {
    const elem = ref.current;
    if (!elem) return;
  };

  const addAgendaItem = () => {
    console.log(agendaItemEng, agendaItemFin);
    if (!agendaItemFin || !agendaItemEng) return;

    if (agendaFin.includes(agendaItemFin) || agendaEng.includes(agendaItemEng))
      return;

    setAgendaFin((a) => [...a, agendaItemFin]);
    setAgendaEng((a) => [...a, agendaItemEng]);

    setAgendaItemFin("");
    setAgendaItemEng("");
  };

  return (
    <main>
      <h1>Kokouskutsu</h1>
      <form>
        {/* <label className="block">Aika</label>
        <input
          name="time"
          type="datetime-local"
          className="pb-2"
        /> */}

        {/* <div className="flex flex-col">
          <label>Esityslista</label>
          <input
            onChange={(e) => setAgendaItem(e.currentTarget.value)}
            value={agendaItem}
            type="text"
            className="bg-amber-200"
          />
          <button onClick={addAgendaItem}>Lisää</button>
        </div> */}

        <button
          onClick={addAgendaItem}
          type="button"
        >
          Add item
        </button>
        <div
          ref={ref}
          className="grid grid-cols-2 gap-md"
        >
          {/* Fin */}
          <MeetingForm
            agenda={agendaFin}
            setAgenda={setAgendaFin}
            agendaItem={agendaItemFin}
            setAgendaItem={setAgendaItemFin}
          />

          {/* Eng */}
          <MeetingForm
            agenda={agendaEng}
            setAgenda={setAgendaEng}
            agendaItem={agendaItemEng}
            setAgendaItem={setAgendaItemEng}
          />
        </div>
        <button className="btn-primary mt-2">Finish</button>
      </form>

      {/* Previev */}
      <h2>Esikatselu</h2>
      <button onClick={handleDownloadImage}>Test pdf</button>

      {/* PDF */}
      {/* <Invite
        ref={ref}
        formData={formData}
      /> */}
    </main>
  );
};
export default MeetingInvite;
