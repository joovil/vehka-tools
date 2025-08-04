"use client";

import DatetimeInput from "@/app/components/inputs/DatetimeInput";
import MultiLanguageInput from "@/app/components/inputs/MultiLanguageInput";
import MultiLanguageListInput from "@/app/components/inputs/MultiLanguageListInput";
import { downloadPdf } from "@/app/components/pdf/downloadPdf";
import { useTranslations } from "@/app/i18n/TranslationsProvider";
import MeetingInvitePdf from "../MainContent/invitePdf/MeetingInvitePdf";
import { MeetingInviteProps } from "../page";

const MeetingInviteSidebar = ({
  data: inviteData,
  setData: setInviteData,
}: MeetingInviteProps) => {
  const dict = useTranslations();

  const handlePdfDownload = () => {
    const date = new Date();
    const dateString =
      date.getDate() + "_" + (date.getMonth() + 1) + "_" + date.getFullYear();

    downloadPdf({
      filename: `Kokouspöytäkirja-${dateString}`,
      pdfElement: <MeetingInvitePdf data={inviteData} />,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <DatetimeInput
        header={dict.meetingInvite.headers.date}
        setData={setInviteData}
        data={inviteData}
        fieldKey="date"
        placeholder={dict.meetingInvite.placeholders.date}
      />

      <MultiLanguageInput
        header={dict.meetingInvite.headers.location}
        setData={setInviteData}
        fieldKey="location"
        placeholder={dict.meetingInvite.placeholders.location}
      />

      <MultiLanguageListInput
        header={dict.meetingInvite.labels.agenda}
        placeholder={dict.meetingInvite.placeholders.agenda}
        fieldKey="agendaItems"
        setData={setInviteData}
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
