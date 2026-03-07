"use client";

import { HtmlDocumentRenderer } from "@/app/components/document/HtmlRenderer";
import { useTranslations } from "next-intl";
import { buildMinutesDocument } from "../buildDocument";
import { MinutesData, MinutesProps } from "../page";

const MinutesContent = ({
  data: minutesData,
  setData: setMinutesData,
}: MinutesProps) => {
  const t = useTranslations();
  const document = buildMinutesDocument(minutesData, t);

  return (
    <HtmlDocumentRenderer<MinutesData>
      document={document}
      data={minutesData}
      setData={setMinutesData}
    />
  );
};

export default MinutesContent;
