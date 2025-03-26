"use client";

import PdfPreview from "../components/PdfPreview";
import MinutePdf from "./MinutePdf";

const minutes = () => {
  return (
    <div className="minute-form">
      <h1>Kokouspöytäkirja</h1>
      <div>
        <label>Kokouksen kiinteistön osoite ja tarkka sijainti</label>
        <input type="text" />
      </div>

      <div>
        <label>Läsnäolijat</label>
        <input type="text" />
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

      <PdfPreview>
        <MinutePdf />
      </PdfPreview>
    </div>
  );
};

export default minutes;
