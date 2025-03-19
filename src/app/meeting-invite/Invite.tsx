"use client";

import { RefObject, useRef } from "react";
import { AgendaItem } from "./page";

const Invite = ({
  ref,
  agenda,
}: {
  ref?: RefObject<null>;
  agenda: AgendaItem[];
}) => {
  const indexRef = useRef<number>(0);

  const endItems: AgendaItem[] = [
    { fin: "Seuraavan kokouksen ajankohta", eng: "The next meeting" },
    { fin: "Kokouksen päättäminen", eng: "Closing the meeting" },
  ];

  return (
    <div
      ref={ref}
      className="pb-2 text-center mx-5"
    >
      <h1> Asukastoimikunnan kokous</h1>
      <h1>Tenant committee meeting</h1>

      <div>
        <h2>Aika / Time: 10:00</h2>
        <h2>Paikka / Place: Kerhohuone</h2>
      </div>

      <div className="ml-auto text-xl">
        {agenda.map((item, index) => {
          indexRef.current = index;
          return (
            <ListItem
              key={index}
              index={index}
              fin={item.fin}
              eng={item.eng}
            />
          );
        })}
        {endItems.map((item, index) => (
          <ListItem
            key={item.eng}
            index={indexRef.current + index + 1}
            fin={item.fin}
            eng={item.eng}
          />
        ))}
      </div>

      <div className="grid grid-cols-2">
        <h2>Lisätietoja</h2>
        <h2>Further information</h2>
      </div>
    </div>
  );
};

const ListItem = ({
  index,
  fin,
  eng,
}: {
  index: number;
  fin: string;
  eng: string;
}) => {
  return (
    <div
      key={index}
      className="flex text-left"
    >
      <span className="w-fit mx-2">{index + 1}</span>
      <div className="grid grid-cols-2 w-full">
        <span>{fin}</span>
        <span>{eng}</span>
      </div>
    </div>
  );
};

export default Invite;
