"use client";

import { useState } from "react";
import Attendants from "./components/Attendants";

const Minutes = () => {
  const [attendants, setAttendants] = useState<string[]>([]);
  const [newAttendant, setNewAttendant] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [examiners, setExaminers] = useState<{
    examiner1: string;
    examiner2: string;
  }>({ examiner1: "", examiner2: "" });

  const handleDate = () => {
    const date = new Date();
    const today = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`;
    setStartTime(today);
  };

  return (
    <div className="minute-form">
      <h1>Kokouspöytäkirja</h1>
      <div>
        <label>Kokouksen kiinteistön osoite ja tarkka sijainti</label>
        <input type="text" />
      </div>

      <Attendants
        attendants={attendants}
        setAttendants={setAttendants}
        newAttendant={newAttendant}
        setNewAttendant={setNewAttendant}
      />

      <div>
        <label>Kokouksen avaus</label>
        <button
          onClick={handleDate}
          disabled={!!startTime}
        >
          Avaus
        </button>
      </div>

      <div>
        <label>Pöytäkirjan tarkastajat</label>
        <input
          type="text"
          onChange={(e) =>
            setExaminers({ ...examiners, examiner1: e.currentTarget.value })
          }
          value={examiners.examiner1}
        />
        <input
          type="text"
          onChange={(e) =>
            setExaminers({ ...examiners, examiner2: e.currentTarget.value })
          }
          value={examiners.examiner2}
        />
      </div>

      <div>
        <label>hankinnat / talkoot / muita päätettäviä asioita</label>
        <ul>
          <li>hankinta 1</li>
        </ul>
      </div>

      <div>
        <label>Muut mahdolliset asiat</label>
        <textarea />
      </div>

      <div>
        <label>Uudet jäsenet</label>
        <ul>
          <li>Uusi jäsen</li>
        </ul>
      </div>

      <div>
        <label>Seuraavan kokouksen ajankohta</label>
        <input type="datetime-local" />
      </div>

      <div>
        <label>Kokouksen päättäminen</label>
        <button onClick={() => console.log("end meeting")}>Päätä kokous</button>
      </div>

      <div>
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
    </div>
  );
};

export default Minutes;
