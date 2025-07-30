"use client";

import MultiLanguageInput from "@/app/components/inputs/MultiLanguageInput";
import MultiLanguageListInput from "@/app/components/inputs/MultiLanguageListInput";
import SidebarInput from "@/app/components/inputs/SidebarInput";
import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { MeetingInviteProps } from "../page";

const MeetingInviteSidebar = ({
  data: inviteData,
  setData: setInviteData,
}: MeetingInviteProps) => {
  const dict = useTranslations();

  return (
    <div>
      <SidebarInput
        header={dict.meetingInvite.headers.date}
        setData={setInviteData}
        fieldKey="date"
        placeholder={dict.meetingInvite.placeholders.date}
      />

      <SidebarInput
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
    </div>
  );
};

export default MeetingInviteSidebar;
