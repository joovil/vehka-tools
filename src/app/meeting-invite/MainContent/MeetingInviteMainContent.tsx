"use client";

import { MultiLanguageListDisplayBuilder } from "@/app/components/MultiLanguageListDisplay";
import { formatDate } from "@/app/utils/formatDate";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { MeetingInviteProps } from "../page";

const MeetingInviteContent = ({
  data: inviteData,
  setData: setInviteData,
}: MeetingInviteProps) => {
  const { date, location } = inviteData;

  const t = useTranslations();

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
            <h2>{t("meetingInvite.labels.date")}</h2>
            <div className="ml-2">{formatDate(date)}</div>
          </div>

          <div className="flex items-baseline">
            <h2>{t("meetingInvite.labels.location")}</h2>
            <div className="ml-2">
              {location?.fin} / {location?.eng}
            </div>
          </div>
        </div>

        <div>
          <div>
            {ListDisplay("agendaItems", {
              finHeader: t("meetingInvite.agendaFin"),
              engHeader: t("meetingInvite.agendaEng"),
            })}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2">
            <div>
              <h2>{t("meetingInvite.labels.furtherInformation")}</h2>
              <div>{inviteData.moreInfo?.fin}</div>
            </div>

            <div>
              <h2>{t("meetingInvite.labels.moreInfo")}</h2>
              <div>{inviteData.moreInfo?.eng}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div>
            <h2>{t("meetingInvite.labels.welcome")}</h2>
            <div>{t("meetingInvite.labels.yourCommittee")}</div>
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
