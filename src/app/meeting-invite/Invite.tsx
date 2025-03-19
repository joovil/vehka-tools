"use client";

import Image from "next/image";
import { RefObject } from "react";
import { AgendaItem } from "./page";

const Invite = ({
  ref,
  agenda,
}: {
  ref?: RefObject<null>;
  agenda: AgendaItem[];
}) => {
  const endItems: AgendaItem[] = [
    { fin: "Seuraavan kokouksen ajankohta", eng: "The next meeting" },
    { fin: "Kokouksen päättäminen", eng: "Closing the meeting" },
  ];

  return (
    <div
      ref={ref}
      className=" bg-white relative "
    >
      <div className="relative w-full h-[580px] bg-[red]">
        <Image
          alt="Image with the word kutsu"
          src="/kutsu.png"
          className="absolute bottom-[-90px] left-[100px]"
          width={440}
          height={182}
        />
      </div>

      <div className="bg-[lightgreen] w-full h-[150px]" />
      <div className="bg-[lightblue]  px-[20px]">
        <div className="text-center font-black">
          {/* Asukastoimikunnan kokous / Committee meeting */}
          <div className="text-4xl flex flex-col mb-10">
            <span>Asukastoimikunnan kokous</span>
            <span>Tenant committee meeting</span>
          </div>

          {/* Aika / Time | Paikka / Place */}
          <div className="flex flex-col text-3xl font-bold mb-10">
            <div>
              <span>Aika / Time: </span>
              <span>{"10:00"}</span>
            </div>
            <div>
              <span>Paikka / Place: </span>
              <span>{"Kerhohuone"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {/* Esityslista / Agenda */}
          <div>
            <div className="invite-cols text-3xl font-bold">
              <span>Esityslista</span>
              <span>Agenda</span>
            </div>
            <div>
              <ItemList items={agenda} />
              <ItemList
                items={endItems}
                indexAddition={agenda.length}
              />
            </div>
          </div>

          {/* Lisätietoja / Further information */}
          <div className="invite-info">
            <div>
              <span>Lisätietoja</span>
              <span>Kokouksen lisätiedot</span>
            </div>
            <div>
              <span>Further information</span>
              <span>More information about the meeting</span>
            </div>
          </div>

          {/* Tervetuloa / Welcome */}
          <div className="invite-greetings">
            <div>
              <span>Tervetuloa</span>
              <span>- Asukastoimikuntasi</span>
            </div>
            <div>
              <span>Welcome</span>
              <span>- Your tenant committee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemList = ({
  items,
  indexAddition,
}: {
  items: AgendaItem[];
  indexAddition?: number;
}) => {
  return (
    <>
      {items.map((item, i) => {
        return (
          <div
            key={i}
            className="flex text-2xl"
          >
            <div className="w-fit mx-2">{i + 1 + (indexAddition || 0)}.</div>
            <div className="grid grid-cols-2 w-full">
              <span>{item.fin}</span>
              <span>{item.eng}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Invite;
