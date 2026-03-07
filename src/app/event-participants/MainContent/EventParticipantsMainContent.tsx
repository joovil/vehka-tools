"use client";

import { HtmlDocumentRenderer } from "@/app/components/document/HtmlRenderer";
import { useTranslations } from "next-intl";
import { buildEventParticipantsDocument } from "../buildDocument";
import { EventParticipantsData, EventParticipantsProps } from "../page";

const EventParticipantsContent = ({
  data,
  setData,
}: EventParticipantsProps) => {
  const t = useTranslations();
  const document = buildEventParticipantsDocument(data, t);

  return (
    <HtmlDocumentRenderer<EventParticipantsData>
      document={document}
      data={data}
      setData={setData}
    />
  );
};

export default EventParticipantsContent;
