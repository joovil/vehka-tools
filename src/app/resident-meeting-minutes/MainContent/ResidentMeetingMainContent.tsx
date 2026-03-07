"use client";

import { HtmlDocumentRenderer } from "@/app/components/document/HtmlRenderer";
import { useTranslations } from "next-intl";
import { buildResidentMeetingDocument } from "../buildDocument";
import { ResidentMeetingData, ResidentMeetingProps } from "../page";

const ResidentMeetingContent = ({ data, setData }: ResidentMeetingProps) => {
  const t = useTranslations();
  const document = buildResidentMeetingDocument(data, t);

  return (
    <HtmlDocumentRenderer<ResidentMeetingData>
      document={document}
      data={data}
      setData={setData}
    />
  );
};

export default ResidentMeetingContent;
