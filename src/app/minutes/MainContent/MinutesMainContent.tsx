"use client";

import { formatDate } from "@/app/utils/formatDate";
import { Signatures } from "@/types";
import { MinutesProps } from "../page";

const MinutesContent = ({ data: data }: MinutesProps) => {
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
  } = data;
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div>Helsingin seudeun opiskelija-asuntosäätiö</div>
        <div>
          Pöytäkirja {minuteNumber}/{new Date().getFullYear()}
        </div>
      </div>

      <div>
        <h1>Asukastoimikunnan kokous</h1>
      </div>

      <div>
        <h2 className="text-lg">Päivämäärä ja kellonaika</h2>
        <div>{formatDate(timeOfMeeting)}</div>
      </div>

      <div>
        <h2>Paikka</h2>
        <div>
          {location.fin} / {location.eng}
        </div>
      </div>

      <div>
        <h2>Läsnä</h2>
        <div>
          {attendants.map((att) => (
            <div key={att}>{att}</div>
          ))}
        </div>
      </div>

      <div>
        <h2>1. Kokouksen avaus, laillisuus ja päätösvaltaisuus</h2>
        <div>Puheenjohtaja avasi kokouksen kello {formatDate(startTime)}</div>
        <div>
          Todettiin kokous laillisesti koolle kutsutuksi ja päätösvaltaiseksi.
        </div>
      </div>

      <div>
        <h2>2.Kahden Pöytäkirjantarkastajan valinta</h2>
        <div>Valittiin</div>
        <div>{examiners.examiner1}</div>
        <div>{examiners.examiner2}</div>
      </div>

      <div>
        <h2>3. Esityslistan hyväksyminen</h2>
        <div>Esityslista hyväksyttiin kokouksen työjärjestykseksi.</div>
      </div>

      <div>
        <h2>4. Hankinnat/ talkoot/ muita päätettäviä asioita</h2>
        {meetingItems.map((item) => (
          <div
            className="grid grid-cols-2"
            key={item.eng}
          >
            <div>{item.fin}</div>
            <div>{item.eng}</div>
          </div>
        ))}
      </div>

      <div>
        <h2>5. Muut mahdolliset asiat</h2>
        {otherItems.map((item) => (
          <div
            className="grid grid-cols-2"
            key={item.eng}
          >
            <div>{item.fin}</div>
            <div>{item.eng}</div>
          </div>
        ))}
      </div>

      <div>
        <h2>Uudet jäsenet</h2>
        {newMembers?.map((newMember) => (
          <div key={newMember}>{newMember}</div>
        ))}
      </div>

      <div>
        <h2>6. Seuraavan kokouksen ajankohta</h2>
        <div>Seuraava kokous pidetään {formatDate(nextMeeting)}</div>
      </div>

      <div>
        <h2>7. Kokouksen päättäminen</h2>
        <div>
          Puheenjohtaja päätti kokouksen kello{" "}
          {formatDate(endTime).split(" ")[1]}
        </div>
      </div>

      <div>
        <h2>Vakuudeksi</h2>
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
    </div>
  );
};

export default MinutesContent;
