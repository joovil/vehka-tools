"use client";

import { useState } from "react";
import PdfPreview from "../components/PdfPreview";
import { DateTime } from "../meeting-invite/page";
import AddNewMember from "./components/AddNewMember";
import DynamicInputList from "./components/DynamicInputList";
import MeetingExaminers from "./components/MeetingExaminers";
import MeetingSignatures from "./components/MeetingSignatures";
import NextMeetingDate from "./components/NextMeetingDate";
import MinutePdf from "./MinutePdf";
import Preview from "./Preview";

export interface Examiners {
  examiner1: string;
  examiner2: string;
}

export interface Signatures extends Examiners {
  chairman: string;
  secretary: string;
}

export interface Location {
  address: string;
  precise: string;
}

export interface NewMember {
  name: string;
  role: string;
}

const Minutes = () => {
  const [minuteNumber, setMinuteNumber] = useState<number>(0);
  const [attendants, setAttendants] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);
  const [other, setOther] = useState<string[]>([]);
  const [location, setLocation] = useState<Location>({
    address: "",
    precise: "",
  });
  const [startTime, setStartTime] = useState<DateTime>({
    date: "",
    time: "",
  });
  const [examiners, setExaminers] = useState<Examiners>({
    examiner1: "",
    examiner2: "",
  });
  const [newMembers, setNewMembers] = useState<NewMember[]>([
    { name: "", role: "" },
  ]);
  const [nextMeeting, setNextMeeting] = useState<DateTime>({
    date: "",
    time: "",
  });
  const [meetingEnd, setMeetingEnd] = useState<string>("");
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

  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.memberName;
    const role = e.currentTarget.role;

    if (name && role) {
      const newMember: NewMember = {
        name,
        role,
      };

      setNewMembers((prevMembers) => [...prevMembers, newMember]);
    }
  };

  return (
    <section className="minute-form">
      <h1>Kokouspöytäkirja</h1>
      <div className="minute-part border-2">
        <h2>Kokouksen sijainti</h2>

        <div className="flex flex-col gap-sm">
          <label>Kiinteistön osoite</label>
          <input
            type="text"
            onChange={(e) =>
              setLocation({ ...location, address: e.currentTarget.value })
            }
            value={location.address}
          />
        </div>

        <div className="flex flex-col gap-sm">
          <label>Tarkka sijainti</label>
          <input
            type="text"
            onChange={(e) =>
              setLocation({ ...location, precise: e.currentTarget.value })
            }
            value={location.precise}
          />
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
        <label>Pöytäkirjan numero</label>
        <input
          type="number"
          min="0"
          step="1"
          onChange={(e) => setMinuteNumber(parseInt(e.currentTarget.value, 10))}
        />
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
        <AddNewMember
          label="Uusi jäsen"
          buttonLabel="Lisää uusi jäsen"
          setNewMembers={setNewMembers}
          newMembers={newMembers}
        />
      </div>

      <div className="minute-part  border-2">
        <label>Seuraavan kokouksen ajankohta</label>
        <NextMeetingDate setNextMeeting={setNextMeeting} />
      </div>

      <div className="minute-part [&>div]:flex [&>div]:flex-col [&>div]:gap-sm border-2">
        <h2>Allekirjoitukset</h2>
        <MeetingSignatures
          signatures={signatures}
          setSignatures={setSignatures}
        />
      </div>

      <div className="minute-part  border-2">
        <label>Kokouksen päättäminen</label>
        <button onClick={() => console.log("end meeting")}>Päätä kokous</button>
      </div>
      <Preview
        minuteNumber={minuteNumber}
        location={location}
        attendants={attendants}
        items={items}
        other={other}
        startTime={startTime}
        examiners={examiners}
        newMembers={newMembers}
        meetingEnd={meetingEnd}
        nextMeeting={nextMeeting}
        signatures={signatures}
      />

      <PdfPreview>
        <MinutePdf />
      </PdfPreview>
    </section>
  );
};

export default Minutes;
