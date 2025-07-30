"use client";

import MultiLanguageListDisplay from "@/app/components/MultiLanguageListDisplay";
import { formatDate } from "@/app/utils/formatDate";
import { Dispatch, SetStateAction } from "react";
import { MeetingInviteData, MeetingInviteProps } from "../page";

const createListDisplay = (
  inviteData: MeetingInviteData,
  setInviteData: Dispatch<SetStateAction<MeetingInviteData>>,
) => {
  const ListDisplayComponent = <T extends keyof MeetingInviteData>(
    fieldKey: T,
  ) => (
    <MultiLanguageListDisplay
      data={inviteData}
      setData={setInviteData}
      fieldKey={fieldKey}
    />
  );
  ListDisplayComponent.displayName = "ListDisplayComponent";
  return ListDisplayComponent;
};

const MeetingInviteContent = ({
  data: inviteData,
  setData: setInviteData,
}: MeetingInviteProps) => {
  const { date, location } = inviteData;
  const ListDisplay = createListDisplay(inviteData, setInviteData);

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
        <div>{ListDisplay("agendaItems")}</div>
      </div>

      <div>
        <h2>Lisätietoa</h2>
        <div className="grid grid-cols-2">
          <div>{inviteData.moreInfo?.fin}</div>
          <div>{inviteData.moreInfo?.eng}</div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div>
          <h2>Tervetuloa</h2>
          <div>-Asukastoimikuntasi</div>
        </div>
        <div>
          <h2>Welcome</h2>
          <div>-Your tenant committee</div>
        </div>
      </div>
    </div>
  );
};

export default MeetingInviteContent;
