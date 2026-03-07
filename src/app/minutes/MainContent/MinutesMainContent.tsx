"use client";

import { MultiLanguageListDisplayBuilder } from "@/app/components/MultiLanguageListDisplay";
import { formatDate } from "@/app/utils/formatDate";
import { removeItem } from "@/app/utils/removeItem";
import { FinEng, Signatures } from "@/types";
import { useTranslations } from "next-intl";
import { MinutesData, MinutesProps } from "../page";

const MinutesContent = ({
  data: minutesData,
  setData: setMinutesData,
}: MinutesProps) => {
  const t = useTranslations();

  const {
    location = { fin: "_", eng: "_" },
    attendants,
    // meetingItems,
    // otherItems,
    signatures,
    examiners,
    newMembers,
    nextMeeting,
    minutesNumber,
    startTime,
    endTime,
    timeOfMeeting,
  } = minutesData;

  const handleRemoveItem = (
    item: string | FinEng,
    fieldKey: keyof MinutesData,
  ) => {
    removeItem(item, fieldKey, minutesData, setMinutesData);
  };

  const ListDisplay = MultiLanguageListDisplayBuilder({
    data: minutesData,
    setData: setMinutesData,
  });

  return (
    <div className="flex flex-col gap-4 p-10">
      <div>
        <div>{t("minutes.pdf.organization")}</div>
        <div>
          {t("minutes.pdf.minutesLabel")} {minutesNumber}/
          {new Date().getFullYear()}
        </div>
      </div>

      <div>
        <h1>{t("minutes.pdf.meetingTitle")}</h1>
      </div>

      <div>
        <h2 className="text-lg">{t("minutes.pdf.dateAndTime")}</h2>
        <div>{formatDate(timeOfMeeting)}</div>
        {location.fin} / {location.eng}
      </div>

      <div>
        <h2>{t("minutes.pdf.present")}</h2>
        <div>
          {attendants.map((att, index) => (
            <div
              className="flex"
              key={index}
            >
              <button
                className="mr-2 flex h-6 w-6 items-center justify-center p-0"
                onClick={() => handleRemoveItem(att, "attendants")}
              >
                X
              </button>
              <div>{att}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>{t("minutes.pdf.section1")}</h2>
        <div>
          {t("minutes.pdf.chairmanOpenedAt")} {formatDate(startTime)}
        </div>
        <div>{t("minutes.pdf.meetingDeclaredLegal")}</div>
      </div>

      <div>
        <h2>{t("minutes.pdf.section2")}</h2>
        <div className="flex gap-2">
          <div>{t("minutes.pdf.elected")}</div>
          <div className="underline">{examiners.examiner1}</div>
          <div className="underline">{examiners.examiner2}</div>
        </div>
      </div>

      <div>
        <h2>{t("minutes.pdf.section3")}</h2>
        <div>{t("minutes.pdf.agendaApproved")}</div>
      </div>

      <div>
        <h2>{t("minutes.pdf.section4")}</h2>
        {ListDisplay("meetingItems")}
      </div>

      <div>
        <h2>{t("minutes.pdf.section5")}</h2>
        {ListDisplay("otherItems")}
      </div>

      <div>
        <h2>{t("minutes.pdf.newMembers")}</h2>
        {newMembers?.map((newMember, index) => (
          <div key={index}>
            <div className="flex">
              <button
                className="mr-2 flex h-6 w-6 items-center justify-center p-0"
                onClick={() => handleRemoveItem(newMember, "newMembers")}
              >
                X
              </button>
              <div>{newMember}</div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2>{t("minutes.pdf.section6")}</h2>
        <div>
          {t("minutes.pdf.nextMeetingHeldAt")} {formatDate(nextMeeting)}
        </div>
      </div>

      <div>
        <h2>{t("minutes.pdf.section7")}</h2>
        <div>
          {t("minutes.pdf.chairmanClosedAt")}{" "}
          {formatDate(endTime).split(" ")[1]}
        </div>
      </div>

      <div>
        <h2>{t("minutes.pdf.certification")}</h2>
        <div className="grid grid-cols-2 grid-rows-2">
          {Object.keys(signatures).map((key) => (
            <div key={key}>
              <div className="font-alex h-6 w-9/10 border-b-1 text-xl font-bold">
                {signatures[key as keyof Signatures]}
              </div>
              <div>
                {t(`minutes.labels.${key}`)} {t("minutes.labels.signature")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MinutesContent;
