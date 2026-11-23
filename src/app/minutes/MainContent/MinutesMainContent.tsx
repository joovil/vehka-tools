"use client";

import { HtmlDocumentRenderer } from "@/app/components/document/HtmlRenderer";
import { resolveMinutesNumber } from "@/app/components/useSuggestedMinutesNumber";
import { useTranslations } from "next-intl";
import { buildMinutesDocument } from "../buildDocument";
import { MinutesData, MinutesProps } from "../page";

const MinutesContent = ({
  data: minutesData,
  setData: setMinutesData,
}: MinutesProps) => {
  const t = useTranslations();
  const number = resolveMinutesNumber(
    minutesData.minutesNumber,
    minutesData.suggestedNumber,
  );
  const document = buildMinutesDocument(
    { ...minutesData, minutesNumber: number },
    t,
  );

  return (
    <HtmlDocumentRenderer<MinutesData>
      document={document}
      data={minutesData}
      setData={setMinutesData}
    />
  );
};

export default MinutesContent;
