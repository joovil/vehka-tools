"use client";

import { Reorder } from "motion/react";

const MeetingForm = ({
  agenda,
  agendaItem,
  setAgenda,
  setAgendaItem,
}: {
  agenda: string[];
  agendaItem: string;
  setAgenda: React.Dispatch<React.SetStateAction<string[]>>;
  setAgendaItem: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const deleteItem = (item: string) => {
    setAgenda((agenda) => agenda.filter((i) => i !== item));
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        className="bg-green-light"
        value={agendaItem}
        onChange={(e) => setAgendaItem(e.currentTarget.value)}
      />
      <Reorder.Group
        values={agenda}
        onReorder={setAgenda}
      >
        {agenda.map((item) => (
          <Reorder.Item
            key={item}
            value={item}
          >
            <div className="flex gap-4">
              <button onClick={() => deleteItem(item)}>X</button>
              <span>{item}</span>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default MeetingForm;
