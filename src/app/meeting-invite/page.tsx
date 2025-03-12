"use client";

import { useRef, useState } from "react";
import MeetingForm from "./MeetingForm";

export interface AgendaItem {
  fin: string;
  eng: string;
}

const MeetingInvite = () => {
  const [agenda, setAgenda] = useState<AgendaItem[]>([
    { fin: "Uusi asia", eng: "New item" },
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
  };

  return (
    <main>
      <h1 className="mb-2">Kokouskutsu</h1>
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

      {/* PDF */}
      {/* <Invite
        ref={ref}
        formData={formData}
      /> */}
    </main>
  );
};
export default MeetingInvite;
