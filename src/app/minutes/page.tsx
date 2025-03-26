"use client";

import { useRef, useState } from "react";

const Minutes = () => {
  const focusRef = useRef<HTMLInputElement>(null);
  const [attendants, setAttendants] = useState<string[]>([]);
  const [newAttendant, setNewAttendant] = useState<string>("");

  const handleAttendantEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (e.key === "Enter") {
      setAttendants((prev) => [...prev, newAttendant]);
      setNewAttendant("");
    }
  };

  const updateAttendant = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const value = e.currentTarget.value;
    const updated = [...attendants];

    if (value.trim() === "") {
      updated.splice(i, 1);
    } else {
      updated[i] = value;
    }

    setAttendants(updated);
    focusRef.current?.focus();
  };

  const addAttendant = () => {
    setAttendants((prev) => [...prev, newAttendant]);
    setNewAttendant("");
    focusRef.current?.focus();
  };

  return (
    <div className="minute-form">
      <h1>Kokouspöytäkirja</h1>
      <div>
        <label>Kokouksen kiinteistön osoite ja tarkka sijainti</label>
        <input type="text" />
      </div>

      <div>
        <label>Läsnäolijat</label>
        {attendants.map((attendant, i) => (
          <input
            key={i}
            value={attendants[i]}
            onChange={(e) => updateAttendant(e, i)}
          />
        ))}
        <input
          ref={focusRef}
          value={newAttendant}
          onChange={(e) => setNewAttendant(e.currentTarget.value)}
          onKeyDown={handleAttendantEnter}
          placeholder="Lisää uusi läsnäolija"
        />
        <button onClick={addAttendant}>Lisää läsnäolija</button>
      </div>

      <div>
        <label>Kokouksen avaus</label>
        <button onClick={() => console.log("avaus")}>Avaus</button>
      </div>

      <div>
        <label>Pöytäkirjan tarkastajat</label>
        <input type="text" />
        <input type="text" />
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
