"use client";

import { MultiLanguageListDisplayBuilder } from "@/app/components/MultiLanguageListDisplay";
import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { formatDate } from "@/app/utils/formatDate";
import Image from "next/image";
import { MeetingInviteProps } from "../page";

const MeetingInviteContent = ({
  data: inviteData,
  setData: setInviteData,
}: MeetingInviteProps) => {
  const { date, location } = inviteData;

  const dict = useTranslations();

  const ListDisplay = MultiLanguageListDisplayBuilder({
    data: inviteData,
    setData: setInviteData,
  });

  return (
    <div>
      <div>
        <Image
          src="/banner.svg"
          alt="Meeting invite banner"
          width={0}
          height={0}
          priority
          className="w-full object-cover"
        />
      </div>

      <div className="px-10">
        <div className="mx-auto w-fit">
          <div className="flex items-baseline">
            <h2>Aika:</h2>
            <div className="ml-2">{formatDate(date)}</div>
          </div>

          <div className="flex items-baseline">
            <h2>Paikka:</h2>
            <div className="ml-2">
              {location?.fin} / {location?.eng}
            </div>
          </div>
        </div>

        <div>
          <h2>Esityslista</h2>
          <div>
            {ListDisplay("agendaItems", {
              finHeader: dict.meetingInvite.agendaFin,
              engHeader: dict.meetingInvite.agendaEng,
            })}
          </div>
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
