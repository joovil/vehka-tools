"use client";

import { MinutesData } from "../../page";

const Preview = ({ data }: { data: MinutesData }) => {
  const date = new Date();

  const signatureStyle = (b: boolean) => {
    return {
      textDecoration: b ? "underline" : "",
      fontFamily: b ? "var(--font-alex-brush)" : "var(--font-circular)",
      fontSize: b ? "var(--text-2xl)" : "var(--text-base)",
    };
  };

  return (
    <div
      className="bg-gravel flex flex-col gap-5 rounded-md p-4 shadow-md [&_h2]:text-xl"
      // className="minute-form"
    >
      <div>
        <div>Helsingin seudun opiskelija-asuntosäätiö</div>
        <div>
          Pöytäkirja {data.minuteNumber || "_"}/{date.getFullYear()}
        </div>
      </div>

      {/* Asukastoimikunnan kokous */}
      <div>
        <h2>Asukastoimikunnan kokous</h2>
        <div>PÄIVÄMÄÄRÄ JA KELLONAIKA:</div>
        <div></div>
      </div>

      <div>
        <h2>PAIKKA (kiinteistön osoite ja kokouspaikan tarkka sijainti):</h2>
        <div>
          {/* {Object.values(location).includes("")
            ? "_______"
            : `${location.address}, ${location.precise}`} */}
        </div>
      </div>

      <div>
        <h2>LÄSNÄ (etu- ja sukunimi):</h2>
        {data.attendants.length > 0 ? (
          <ul>
            {data.attendants.map((a: string, i: number) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        ) : (
          <div>_______</div>
        )}
      </div>

      <div>
        <h2>1. KOKOUKSEN AVAUS, KOKOUKSEN LAILLISUUS JA PÄÄTÖSVALTAISUUS</h2>
        <div>Puheenjohtaja avasi kokouksen kello </div>
        <div>
          Todettiin kokous laillisesti koolle kutsutuksi ja päätösvaltaiseksi.
        </div>
      </div>

      <div>
        <h2>2. KAHDEN PÖYTÄKIRJANTARKASTAJAN VALINTA</h2>
        <div>
          Valittiin: {data.signatures.examiner1 || "_______"} ja{" "}
          {data.signatures.examiner2 || "_______"}
        </div>
      </div>

      <div>
        <h2>3. ESITYSLISTAN HYVÄKSYMINEN</h2>
        <div>Esityslista hyväksyttiin kokouksen työjärjestykseksi.</div>
      </div>

      {/* <div>
        <h2>4. HANKINNAT / TALKOOT / MUITA PÄÄTETTÄVIÄ ASIOITA</h2>
        {data.meetingItems.length > 0 ? (
          <ul>
            {data.meetingItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ) : (
          <div>_______</div>
        )}
      </div> */}

      {/* <div>
        <h2>5. MUUT MAHDOLLISET ASIAT</h2>
        {data.otherItems.length > 0 ? (
          <ul>
            {data.otherItems.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        ) : (
          <div>_______</div>
        )}
      </div> */}

      {/* <div>
        <h2>
          UUDET JÄSENET (etu- ja sukunimi sekä mahdollinen rooli toimikunnassa):
        </h2>
        {newMembers ? (
          <ul>
            {newMembers.map((mem, i) => (
              <li key={i}>
                {mem.name} {mem.role}
              </li>
            ))}
          </ul>
        ) : (
          <div>_______</div>
        )}
      </div> */}

      {/* <div>
        <h2>6. SEURAAVAN KOKOUKSEN AJANKOHTA</h2>
        <div>
          Seuraava kokous pidetään:
          <div>
            {Object.values(nextMeeting).includes("") ? (
              "_______"
            ) : (
              <>
                <div>{nextMeeting.date}</div>
                <div>kello: {nextMeeting.time}</div>
              </>
            )}
          </div>
        </div>
      </div> */}

      {/* <div>
        <h2>7. KOKOUKSEN PÄÄTTÄMINEN</h2>
        <>
          <div>Puheenjohtaja päätti kokouksen kello</div>
          <div>
            {Object.values(meetingEnd).includes("") ? (
              "_______"
            ) : (
              <>
                <div>{meetingEnd.date}</div>
                <div>kello: {meetingEnd.time}</div>
              </>
            )}
          </div>
        </>
      </div> */}

      <div>
        <h2>VAKUUDEKSI</h2>
        <div className="grid grid-cols-2 gap-y-2">
          <div>
            <div
              className="text-2xl"
              style={signatureStyle(!!data.signatures.chairman)}
            >
              {data.signatures.chairman || "________"}
            </div>
            <div>puheenjohtajan allekirjoitus</div>
          </div>

          <div>
            <div
              className="text-2xl"
              // style={data.signatureStyle(!!data.signatures.secretary)}
            >
              {data.signatures.secretary || "_______"}
            </div>
            <div>sihteerin allekirjoitus</div>
          </div>

          <div>
            <div
              className="text-2xl"
              // style={data.signatureStyle(!!data.signatures.examiner1)}
            >
              {data.signatures.examiner1 || "_______"}
            </div>
            <div>pöytäkirjantarkastajan allekirjoitus</div>
          </div>

          <div>
            <div
              className="text-2xl"
              // style={data.signatureStyle(!!data.signatures.examiner2)}
            >
              {data.signatures.examiner2 || "_______"}
            </div>
            <div>pöytäkirjantarkastajan allekirjoitus</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
