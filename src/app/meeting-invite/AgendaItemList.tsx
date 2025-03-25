"use client";

import { Reorder } from "motion/react";
import { AgendaItem } from "./page";

const AgendaItemList = ({
  agenda,
  setAgenda,
}: {
  agenda: AgendaItem[];
  setAgenda: React.Dispatch<React.SetStateAction<AgendaItem[]>>;
}) => {
  const deleteItem = (item: AgendaItem) => {
    setAgenda((agenda) => agenda.filter((i) => i !== item));
  };

  return (
    <div className="flex flex-col">
      <Reorder.Group
        values={agenda}
        onReorder={setAgenda}
      >
        {agenda.map((item) => (
          <Reorder.Item
            key={item.eng}
            value={item}
          >
            <div className="flex gap-md">
              <button onClick={() => deleteItem(item)}>X</button>
              <div className="grid grid-cols-2 w-full [&>span]:underline">
                <span>{item.fin}</span>
                <span>{item.eng}</span>
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default AgendaItemList;
