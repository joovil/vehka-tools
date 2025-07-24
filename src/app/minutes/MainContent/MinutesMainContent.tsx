"use client";

import { formatDate } from "@/app/utils/formatDate";
import { Signatures } from "@/types";
import { MinutesProps } from "../page";

const MinutesContent = ({ data }: MinutesProps) => {
  const {
    location = { fin: "_", eng: "_" },
    attendants,
    meetingItems,
    otherItems,
    signatures,
    examiners,
    newMembers,
    nextMeeting,
    minuteNumber = "_",
    startTime,
    endTime,
    timeOfMeeting,
    agendaAccepted,
  } = data;
  return (
    <div>
      <div>Helsingin seudeun opiskelija-asuntosäätiö</div>
      <div>
        Pöytäkirja {minuteNumber}/{new Date().getFullYear()}
      </div>
      <br />

      <h2>Asukastoimikunnan kokous</h2>
      <br />

      <h3>Päivämäärä ja kellonaika</h3>
      <div>{formatDate(timeOfMeeting)}</div>
      <br />

      <h3>Paikka</h3>
      <div>
        {location.fin} / {location.eng}
      </div>
      <br />

      <h3>Esityslistan hyväksyminen</h3>
      <div>Esityslista hyväksyttiin kokouksen työjärjestykseksi.</div>
      <br />

      <h3>Hankinnat/ talkoot/ muita päätettäviä asioita</h3>
      {meetingItems.map((item) => (
        <div
          className="grid grid-cols-2"
          key={item.eng}
        >
          <div>{item.fin}</div>
          <div>{item.eng}</div>
        </div>
      ))}
      <br />

      <h3>Muut mahdolliset asiat</h3>
      {otherItems.map((item) => (
        <div
          className="grid grid-cols-2"
          key={item.eng}
        >
          <div>{item.fin}</div>
          <div>{item.eng}</div>
        </div>
      ))}
      <br />

      <h3>Uudet jäsenet</h3>
      {newMembers?.map((newMember) => (
        <div key={newMember}>{newMember}</div>
      ))}
      <br />

      <h3>Seuraavan kokouksen ajankohta</h3>
      <div>Seuraava kokous pidetään {formatDate(nextMeeting)}</div>
      <br />

      <h3>Kokouksen päättäminen</h3>
      <div>
        Puheenjohtaja päätti kokouksen kello {formatDate(endTime).split(" ")[1]}
      </div>
      <br />

      <h3>Vakuudeksi</h3>
      <div className="grid grid-cols-2 grid-rows-2">
        {Object.keys(signatures).map((key) => (
          <div key={key}>
            <div className="font-alex w-9/10 border-b-1 text-xl font-bold">
              {signatures[key as keyof Signatures]}
            </div>
            <div>{key} allerkirjoitus</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinutesContent;
