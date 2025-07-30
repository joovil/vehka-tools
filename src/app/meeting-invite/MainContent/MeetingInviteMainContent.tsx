"use client";

import { formatDate } from "@/app/utils/formatDate";
import { removeItem } from "@/app/utils/removeItem";
import { FinEng } from "@/types";
import { MeetingInviteData, MeetingInviteProps } from "../page";

const MeetingInviteContent = ({
  data: inviteData,
  setData: setInviteData,
}: MeetingInviteProps) => {
  const { date, location, agendaItems } = inviteData;

  const handleRemoveItem = (
    item: string | FinEng,
    fieldKey: keyof MeetingInviteData,
  ) => {
    removeItem(item, fieldKey, inviteData, setInviteData);
  };

  return (
    <div>
      <div>
        <h2>Aika</h2>
        <div>{formatDate(date)}</div>
      </div>

      <div>
        <h2>Paikka</h2>
        <div>
          {location?.fin} / {location?.eng}
        </div>
      </div>

      <div>
        <h2>Esityslista</h2>
        <div>
          {agendaItems.map((item) => (
            <div
              className="grid grid-cols-2"
              key={item.eng}
            >
              <div className="flex">
                <button
                  className="mr-2 flex h-6 w-6 items-center justify-center p-0"
                  onClick={() => handleRemoveItem(item, "agendaItems")}
                >
                  X
                </button>
                <div>{item.fin}</div>
              </div>
              <div>{item.eng}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingInviteContent;
