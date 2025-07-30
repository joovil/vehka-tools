"use client";

import { MultiLanguageListDisplayBuilder } from "@/app/components/MultiLanguageListDisplay";
import { formatDate } from "@/app/utils/formatDate";
import Image from "next/image";
import { MeetingInviteProps } from "../page";

const MeetingInviteContent = ({
  data: inviteData,
  setData: setInviteData,
}: MeetingInviteProps) => {
  const { date, location } = inviteData;

  const ListDisplay = MultiLanguageListDisplayBuilder(
    inviteData,
    setInviteData,
  );

  return (
    <div>
      <div className="flex justify-center">
        <Image
          src="/banner.svg"
          alt="Meeting invite banner"
          width={595}
          height={281}
          priority
          className="m-[-1px] p-0"
        />
      </div>

      <div className="px-10">
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
    </div>
  );
};

export default MeetingInviteContent;
