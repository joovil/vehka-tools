"use client";

import { Reorder } from "motion/react";
import { AgendaItem } from "../MeetingInviteContent";

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
            <div className="gap-md pb-2 md:flex">
              <button onClick={() => deleteItem(item)}>X</button>
              <div className="gap-sm flex w-full flex-col sm:grid sm:grid-cols-2 [&>span]:underline">
                <div>{item.fin}</div>
                <div>{item.eng}</div>
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default AgendaItemList;
