"use client";

import { HtmlDocumentRenderer } from "@/app/components/document/HtmlRenderer";
import { resolveMinutesNumber } from "@/app/components/useSuggestedMinutesNumber";
import { useTranslations } from "next-intl";
import { buildResidentMeetingDocument } from "../buildDocument";
import { ResidentMeetingData, ResidentMeetingProps } from "../page";

const ResidentMeetingContent = ({ data, setData }: ResidentMeetingProps) => {
  const t = useTranslations();
  const number = resolveMinutesNumber(data.minutesNumber, data.suggestedNumber);
  const document = buildResidentMeetingDocument(
    { ...data, minutesNumber: number },
    t,
  );

  return (
    <HtmlDocumentRenderer<ResidentMeetingData>
      document={document}
      data={data}
      setData={setData}
    />
  );
};

export default ResidentMeetingContent;
