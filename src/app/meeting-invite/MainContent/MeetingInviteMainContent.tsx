"use client";

import { HtmlDocumentRenderer } from "@/app/components/document/HtmlRenderer";
import { useTranslations } from "next-intl";
import { buildInviteDocument } from "../buildDocument";
import { MeetingInviteData, MeetingInviteProps } from "../page";

const MeetingInviteContent = ({
  data: inviteData,
  setData: setInviteData,
}: MeetingInviteProps) => {
  const t = useTranslations();
  const document = buildInviteDocument(inviteData, t);

  return (
    <HtmlDocumentRenderer<MeetingInviteData>
      document={document}
      data={inviteData}
      setData={setInviteData}
      className="flex flex-col"
    />
  );
};

export default MeetingInviteContent;
