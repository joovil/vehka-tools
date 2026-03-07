"use client";

import { HtmlDocumentRenderer } from "@/app/components/document/HtmlRenderer";
import { useTranslations } from "next-intl";
import { buildKeyFormDocument } from "../buildDocument";
import { KeyFormData, KeyFormProps } from "../page";

const KeyFormContent = ({ data, setData }: KeyFormProps) => {
  const t = useTranslations();
  const document = buildKeyFormDocument(data, t);

  return (
    <HtmlDocumentRenderer<KeyFormData>
      document={document}
      data={data}
      setData={setData}
    />
  );
};

export default KeyFormContent;
