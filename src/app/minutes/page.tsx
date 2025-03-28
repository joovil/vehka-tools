"use client";

import { useState } from "react";
import { DateTime } from "../meeting-invite/page";
import DynamicInputList from "./components/DynamicInputList";
import MeetingExaminers from "./components/MeetingExaminers";
import MeetingSignatures from "./components/MeetingSignatures";
import NextMeetingDate from "./components/NextMeetingDate";

export interface Examiners {
  examiner1: string;
  examiner2: string;
}

export interface Signatures extends Examiners {
  chairman: string;
  secretary: string;
}

const Minutes = () => {
  const [attendants, setAttendants] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);
  const [other, setOther] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<DateTime>({
    date: "",
    time: "",
  });
  const [examiners, setExaminers] = useState<Examiners>({
    examiner1: "",
    examiner2: "",
  });
  const [newMembers, setNewMembers] = useState<string[]>([]);
  const [nextMeeting, setNextMeeting] = useState<DateTime>({
    date: "",
    time: "",
  });
  const [signatures, setSignatures] = useState<Signatures>({
    chairman: "",
    secretary: "",
    examiner1: "",
    examiner2: "",
  });

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
      <div className="minute-part border-2">
        <h2>Kokouksen sijainti</h2>

        <div className="flex flex-col gap-sm">
          <label>Kiinteistön osoite</label>
          <input type="text" />
        </div>

        <div className="flex flex-col gap-sm">
          <label>Tarkka sijainti</label>
          <input type="text" />
        </div>
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
          className="mt-1"
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
        <MeetingExaminers
          examiners={examiners}
          setExaminers={setExaminers}
        />
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
        <NextMeetingDate setNextMeeting={setNextMeeting} />
      </div>

      <div className="minute-part  border-2">
        <label>Kokouksen päättäminen</label>
        <button onClick={() => console.log("end meeting")}>Päätä kokous</button>
      </div>

      <div className="minute-part [&>div]:flex [&>div]:flex-col [&>div]:gap-sm border-2">
        <h2>Allekirjoitukset</h2>
        <MeetingSignatures
          signatures={signatures}
          setSignatures={setSignatures}
        />
      </div>

      {/* <PdfPreview>
        <MinutePdf />
      </PdfPreview> */}
    </section>
  );
};

export default Minutes;
