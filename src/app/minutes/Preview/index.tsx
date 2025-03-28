"use client";

import { DateTime } from "@/app/meeting-invite/page";
import { Examiners, Location, Signatures } from "../page";

interface PreviewProps {
  location: Location;
  attendants: string[];
  items: string[];
  other: string[];
  startTime: DateTime;
  examiners: Examiners;
  newMembers: string[];
  nextMeeting: DateTime;
  signatures: Signatures;
}

const Preview: React.FC<PreviewProps> = ({
  attendants,
  items,
  other,
  startTime,
  examiners,
  newMembers,
  nextMeeting,
  signatures,
}) => {
  const date = new Date();

  return (
    <div className="flex flex-col gap-5 border-2">
      <div>
        <div>Helsingin seudun opiskelija-asuntosäätiö</div>
        <div>Pöytäkirja _/{date.getFullYear()}</div>
      </div>

      {/* Asukastoimikunnan kokous */}
      <div>
        <div>Asukastoimikunnan kokous</div>
        <div>PÄIVÄMÄÄRÄ JA KELLONAIKA:</div>
        <div>
          {startTime.date} Kello: {startTime.time}
        </div>
      </div>

      <div>
        <div>PAIKKA (kiinteistön osoite ja kokouspaikan tarkka sijainti):</div>
        <div>_____________</div>
      </div>

      <div>
        <div>LÄSNÄ (etu- ja sukunimi):</div>
        <div>{attendants.join(", ") || "______________"}</div>
      </div>

      <div>
        <div>1. KOKOUKSEN AVAUS, KOKOUKSEN LAILLISUUS JA PÄÄTÖSVALTAISUUS</div>
        <div>
          Puheenjohtaja avasi kokouksen kello{" "}
          {startTime.time || "_________________________"}
        </div>
        <div>
          Todettiin kokous laillisesti koolle kutsutuksi ja päätösvaltaiseksi.
        </div>
      </div>

      <div>
        <div>2. KAHDEN PÖYTÄKIRJANTARKASTAJAN VALINTA</div>
        <div>
          Valittiin {examiners.examiner1} ja {examiners.examiner2}
        </div>
      </div>

      <div>
        <div>3. ESITYSLISTAN HYVÄKSYMINEN</div>
        <div>Esityslista hyväksyttiin kokouksen työjärjestykseksi.</div>
      </div>

      <div>
        <div>4. HANKINNAT / TALKOOT / MUITA PÄÄTETTÄVIÄ ASIOITA</div>
        <div>{items.join(", ") || "_______________"}</div>
      </div>

      <div>
        <div>5. MUUT MAHDOLLISET ASIAT</div>
        <div>{other.join(", ") || "_________"}</div>
      </div>

      <div>
        <div>
          UUDET JÄSENET (etu- ja sukunimi sekä mahdollinen rooli toimikunnassa):
        </div>
        <div>{newMembers.join(", ") || "_______________"}</div>
      </div>

      <div>
        <div>6. SEURAAVAN KOKOUKSEN AJANKOHTA</div>
        <div>
          Seuraava kokous pidetään {nextMeeting.date} kello{" "}
          {nextMeeting.time || "______________________________________"}
        </div>
      </div>

      <div>
        <div>7. KOKOUKSEN PÄÄTTÄMINEN</div>
        <div>
          Puheenjohtaja päätti kokouksen kello ______________________________
        </div>
      </div>

      <div>
        <div>VAKUUDEKSI</div>
        <div>
          <div>
            <div>{signatures.chairman || "________"}</div>
            <div>puheenjohtajan allekirjoitus</div>
          </div>

          <div>
            <div>{signatures.secretary || "_______"}</div>
            <div>sihteerin allekirjoitus</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
