"use client";

import { useState } from "react";
import DynamicInputList from "./components/DynamicInputList";

const Minutes = () => {
  const [attendants, setAttendants] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);
  const [other, setOther] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<{ date: string; time: string }>({
    date: "",
    time: "",
  });
  const [examiners, setExaminers] = useState<{
    examiner1: string;
    examiner2: string;
  }>({ examiner1: "", examiner2: "" });
  const [newMembers, setNewMembers] = useState<string[]>([]);

  const handleDate = () => {
    const date = new Date();
    const startDate = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`;

    const minutes = date.getMinutes();
    const startTime = `${date.getHours()}.${
      (minutes < 10 ? "0" : "") + minutes
    }`;

    setStartTime({ date: startDate, time: startTime });
  };

  return (
    <section className="minute-form">
      <h1>Kokouspöytäkirja</h1>
      <div>
        <label>Kokouksen kiinteistön osoite ja tarkka sijainti</label>
        <input type="text" />
      </div>

      <div className="border-2">
        <h2>Läsnäolijat</h2>
        <DynamicInputList
          label="Läsnäolija"
          buttonLabel="Lisää läsnäolija"
          items={attendants}
          setItems={setAttendants}
        />
      </div>

      <div className="flex flex-col border-2">
        <h2>Kokouksen avaus</h2>
        <button
          onClick={handleDate}
          disabled={!!startTime.date}
        >
          Avaa kokous
        </button>
        {startTime.date && (
          <>
            <h3>Kokous avattu</h3>
            <div>{startTime.date}</div>
            <div>Kello: {startTime.time}</div>
          </>
        )}
      </div>

      <div className="minute-part border-2">
        <h2>Pöytäkirjan tarkastajat</h2>
        <div className="flex flex-col gap-sm">
          <div className="flex flex-col">
            <label>Tarkastaja 1</label>
            <input
              type="text"
              onChange={(e) =>
                setExaminers({ ...examiners, examiner1: e.currentTarget.value })
              }
              value={examiners.examiner1}
            />
          </div>

          <div className="flex flex-col">
            <label>Tarkastaja 2</label>
            <input
              type="text"
              onChange={(e) =>
                setExaminers({ ...examiners, examiner2: e.currentTarget.value })
              }
              value={examiners.examiner2}
            />
          </div>
        </div>
      </div>

      <div className="minute-part border-2">
        <h2>Hankinnat</h2>
        <DynamicInputList
          label="Hankinta"
          buttonLabel="Lisää hankinta"
          items={items}
          setItems={setItems}
        />
      </div>

      <div className="minute-part border-2">
        <h2>Muut asiat</h2>
        <DynamicInputList
          label="Muu päätettävä asia"
          buttonLabel="Lisää muu asia"
          items={other}
          setItems={setOther}
        />
      </div>

      <div className="minute-part  border-2">
        <h2>Uudet jäsenet</h2>
        <DynamicInputList
          label="Uusi jäsen"
          buttonLabel="Lisää jäsen"
          items={newMembers}
          setItems={setNewMembers}
        />
      </div>

      <div className="minute-part  border-2">
        <label>Seuraavan kokouksen ajankohta</label>
        <input type="datetime-local" />
      </div>

      <div className="minute-part  border-2">
        <label>Kokouksen päättäminen</label>
        <button onClick={() => console.log("end meeting")}>Päätä kokous</button>
      </div>

      <div className="minute-part  border-2">
        <label>Puheenjohtajan allekirjoitus</label>
        <input type="text" />

        <label>Sihteerin allekirjoitus</label>
        <input type="text" />

        <label>Pöytäkirjantarkastajan allerkijoitus</label>
        <input type="text" />

        <label>Pöytäkirjantarkastajan allerkijoitus</label>
        <input type="text" />
      </div>

      {/* <PdfPreview>
        <MinutePdf />
      </PdfPreview> */}
    </section>
  );
};

export default Minutes;
