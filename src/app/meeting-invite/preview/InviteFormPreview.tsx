"use client";

import Image from "next/image";
import { AgendaItem, DateTime, MoreInfo, Place } from "../page";

const PdfPreview = ({
  dateTime,
  location,
  agenda,
  moreInfo,
  endItems,
}: {
  dateTime: DateTime;
  location: Place;
  agenda: AgendaItem[];
  moreInfo: MoreInfo;
  endItems: AgendaItem[];
}) => {
  return (
    <div className="pb-10">
      <Image
        src="/banner.svg"
        width={0}
        height={0}
        className="w-full h-full"
        sizes="100vw"
        alt="Banner"
      />

      <div className="mx-auto w-fit">
        <div className="flex flex-col w-fit">
          <div className="font-bold text-lg leading-5 mb-1">
            <div>Asukastoimikunnan kokous</div>
            <div>Tenant committee meeting</div>
          </div>

          <TimePlace
            dateTime={dateTime}
            location={location}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="grid grid-cols-2 text-sm ">
          <AgendaColumn
            header="Esityslista"
            agenda={agenda}
            endItems={endItems}
            lang="fin"
          />
          <AgendaColumn
            header="Agenda"
            agenda={agenda}
            endItems={endItems}
            lang="eng"
          />
        </div>

        <div className="grid grid-cols-2 text-sm ">
          <InfoColumn
            header="Lisätietoja"
            body={moreInfo.tietoja}
          />
          <InfoColumn
            header="Further information"
            body={moreInfo.info}
          />
        </div>

        <div className="grid grid-cols-2 text-sm">
          <WelcomeColumn
            header="Tervetuloa!"
            body="-Asukastoimikuntasi"
          />
          <WelcomeColumn
            header="Welcome!"
            body="-Your tenant committee"
          />
        </div>
      </div>
    </div>
  );
};

const TimePlace = ({
  dateTime,
  location,
}: {
  dateTime: DateTime;
  location: Place;
}) => {
  return (
    <div className="text-sm flex gap-sm">
      <div className="flex flex-col">
        <span>Aika / Time:</span>
        <span>Paikka / Place:</span>
      </div>

      <div className="flex flex-col">
        <span>
          {dateTime.date}&nbsp;&nbsp;{dateTime.time}
        </span>
        <span>
          {location.paikka} | {location.place}
        </span>
      </div>
    </div>
  );
};

const AgendaColumn = ({
  header,
  agenda,
  endItems,
  lang,
}: {
  header: string;
  agenda: AgendaItem[];
  endItems: AgendaItem[];
  lang: "fin" | "eng";
}) => {
  return (
    <div>
      <div className="font-bold text-lg">{header}</div>
      <div className="flex flex-col gap-0.5">
        {agenda.map((item, i) => (
          <div
            className="text-sm"
            key={item[lang]}
          >
            {i + 1}. {item[lang]}
          </div>
        ))}
        {endItems.map((item, i) => (
          <div
            className="text-sm"
            key={item[lang]}
          >
            {i + agenda.length + 1}. {item[lang]}
          </div>
        ))}
      </div>
    </div>
  );
};

const InfoColumn = ({ header, body }: { header: string; body: string }) => {
  return (
    <div>
      <div className="font-bold text-lg">{header}</div>
      <div>{body}</div>
    </div>
  );
};

const WelcomeColumn = ({ header, body }: { header: string; body: string }) => {
  return (
    <div>
      <div className="font-bold text-lg text-[#E83C6A]">{header}</div>
      <div>{body}</div>
    </div>
  );
};

export default PdfPreview;
