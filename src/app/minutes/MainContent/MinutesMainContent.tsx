"use client";

import { MultiLanguageListDisplayBuilder } from "@/app/components/MultiLanguageListDisplay";
import PdfPreview from "@/app/components/pdf/PdfPreview";
import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { formatDate } from "@/app/utils/formatDate";
import { removeItem } from "@/app/utils/removeItem";
import { FinEng, Signatures } from "@/types";
import MinutesPdf from "../MinutesPdf";
import { MinutesData, MinutesProps } from "../page";

const MinutesContent = ({
  data: minutesData,
  setData: setMinutesData,
}: MinutesProps) => {
  const dict = useTranslations();

  const {
    location = { fin: "_", eng: "_" },
    attendants,
    // meetingItems,
    // otherItems,
    signatures,
    examiners,
    newMembers,
    nextMeeting,
    minutesNumber,
    startTime,
    endTime,
    timeOfMeeting,
  } = minutesData;

  const handleRemoveItem = (
    item: string | FinEng,
    fieldKey: keyof MinutesData,
  ) => {
    removeItem(item, fieldKey, minutesData, setMinutesData);
  };

  const ListDisplay = MultiLanguageListDisplayBuilder({
    data: minutesData,
    setData: setMinutesData,
  });

  return (
    <div className="flex flex-col gap-4 p-10">
      <div>
        <div>Helsingin seudeun opiskelija-asuntosäätiö</div>
        <div>
          Pöytäkirja {minutesNumber}/{new Date().getFullYear()}
        </div>
      </div>

      <div>
        <h1>Asukastoimikunnan kokous</h1>
      </div>

      <div>
        <h2 className="text-lg">Päivämäärä ja kellonaika</h2>
        <div>{formatDate(timeOfMeeting)}</div>
        {location.fin} / {location.eng}
      </div>

      <div>
        <h2>Läsnä</h2>
        <div>
          {attendants.map((att) => (
            <div
              className="flex"
              key={att}
            >
              <button
                className="mr-2 flex h-6 w-6 items-center justify-center p-0"
                onClick={() => handleRemoveItem(att, "attendants")}
              >
                X
              </button>
              <div>{att}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>1. Kokouksen avaus, laillisuus ja päätösvaltaisuus</h2>
        <div>Puheenjohtaja avasi kokouksen kello: {formatDate(startTime)}</div>
        <div>
          Todettiin kokous laillisesti koolle kutsutuksi ja päätösvaltaiseksi.
        </div>
      </div>

      <div>
        <h2>2.Kahden Pöytäkirjantarkastajan valinta</h2>
        <div className="flex gap-2">
          <div>Valittiin:</div>
          <div className="underline">{examiners.examiner1}</div>
          <div className="underline">{examiners.examiner2}</div>
        </div>
      </div>

      <div>
        <h2>3. Esityslistan hyväksyminen</h2>
        <div>Esityslista hyväksyttiin kokouksen työjärjestykseksi.</div>
      </div>

      <div>
        <h2>4. Hankinnat/ talkoot/ muita päätettäviä asioita</h2>
        {ListDisplay("meetingItems")}
      </div>

      <div>
        <h2>5. Muut mahdolliset asiat</h2>
        {ListDisplay("otherItems")}
      </div>

      <div>
        <h2>Uudet jäsenet</h2>
        {newMembers?.map((newMember) => (
          <div key={newMember}>
            <div className="flex">
              <button
                className="mr-2 flex h-6 w-6 items-center justify-center p-0"
                onClick={() => handleRemoveItem(newMember, "newMembers")}
              >
                X
              </button>
              <div>{newMember}</div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2>6. Seuraavan kokouksen ajankohta</h2>
        <div>Seuraava kokous pidetään: {formatDate(nextMeeting)}</div>
      </div>

      <div>
        <h2>7. Kokouksen päättäminen</h2>
        <div>
          Puheenjohtaja päätti kokouksen kello:{" "}
          {formatDate(endTime).split(" ")[1]}
        </div>
      </div>

      <div>
        <h2>Vakuudeksi</h2>
        <div className="grid grid-cols-2 grid-rows-2">
          {Object.keys(signatures).map((key) => (
            <div key={key}>
              <div className="font-alex h-6 w-9/10 border-b-1 text-xl font-bold">
                {signatures[key as keyof Signatures]}
              </div>
              <div>
                {dict.minutes.labels[key as keyof typeof dict.minutes.labels]}{" "}
                {dict.minutes.labels.signature}
              </div>
            </div>
          ))}
        </div>
      </div>
      <PdfPreview>
        <MinutesPdf data={minutesData} />
      </PdfPreview>
    </div>
  );
};

export default MinutesContent;
