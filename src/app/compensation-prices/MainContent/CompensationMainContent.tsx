"use client";

import { HtmlDocumentRenderer } from "@/app/components/document/HtmlRenderer";
import { useTranslations } from "next-intl";
import { buildCompensationDocument } from "../buildDocument";
import { CompensationData, CompensationProps } from "../page";

const CompensationContent = ({ data, setData }: CompensationProps) => {
  const t = useTranslations();
  const document = buildCompensationDocument(data, t);

  return (
    <HtmlDocumentRenderer<CompensationData>
      document={document}
      data={data}
      setData={setData}
    />
  );
};

export default CompensationContent;
