"use client";

import DatetimeInput from "@/app/components/inputs/DatetimeInput";
import MultiLanguageInput from "@/app/components/inputs/MultiLanguageInput";
import MultiLanguageListInput from "@/app/components/inputs/MultiLanguageListInput";
import { downloadPdf } from "@/app/components/pdf/downloadPdf";
import ScrollAnchor from "@/app/components/ScrollAnchor";
import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { scrollToElement } from "@/app/utils/scrollToElement";
import { useState } from "react";
import MeetingInvitePdf from "../MainContent/invitePdf/MeetingInvitePdf";
import { MeetingInviteProps } from "../page";

const MeetingInviteSidebar = ({
  data: inviteData,
  setData: setInviteData,
}: MeetingInviteProps) => {
  const dict = useTranslations();

  const [checkErrors, setCheckErrors] = useState<boolean>(false);

  const handlePdfDownload = () => {
    if (!dataValid()) return;

    const date = new Date();
    const dateString =
      date.getDate() + "_" + (date.getMonth() + 1) + "_" + date.getFullYear();

    downloadPdf({
      filename: `Kokouspöytäkirja-${dateString}`,
      pdfElement: <MeetingInvitePdf data={inviteData} />,
    });
  };

  const dataValid = () => {
    setCheckErrors(true);

    if (!inviteData.date) {
      scrollToElement("page-top");
      return;
    }

    if (!inviteData.location?.eng || !inviteData.location.fin) return false;
    if (inviteData.agendaItems.length <= 0) return false;

    return true;
  };

  return (
    <div className="flex flex-col gap-2">
      <ScrollAnchor id="page-top" />
      <DatetimeInput
        header={dict.meetingInvite.headers.date}
        setData={setInviteData}
        data={inviteData}
        fieldKey="date"
        placeholder={dict.meetingInvite.placeholders.date}
        hasError={checkErrors}
        errorMessage={dict.meetingInvite.errors.date}
      />

      <MultiLanguageInput
        header={dict.meetingInvite.headers.location}
        setData={setInviteData}
        fieldKey="location"
        placeholder={dict.meetingInvite.placeholders.location}
        hasError={
          (checkErrors && !inviteData.location?.fin) ||
          !inviteData.location?.eng
        }
        errorMessage={dict.meetingInvite.errors.location}
      />

      <MultiLanguageListInput
        header={dict.meetingInvite.labels.agenda}
        placeholder={dict.meetingInvite.placeholders.agenda}
        fieldKey="agendaItems"
        setData={setInviteData}
        hasError={checkErrors}
        errorMessage={dict.meetingInvite.errors.agenda}
      />

      <MultiLanguageInput
        header={dict.meetingInvite.labels.furtherInformation}
        placeholder={dict.meetingInvite.placeholders.furtherInformation}
        fieldKey="moreInfo"
        setData={setInviteData}
      />

      <button
        className="mt-2"
        onClick={handlePdfDownload}
      >
        {dict.download}
      </button>
    </div>
  );
};

export default MeetingInviteSidebar;
