"use client";

import { HtmlDocumentRenderer } from "@/app/components/document/HtmlRenderer";
import { useTranslations } from "next-intl";
import { buildAccountingDocument } from "../buildDocument";
import { AccountingData, AccountingProps } from "../page";

const AccountingContent = ({ data, setData }: AccountingProps) => {
  const t = useTranslations();
  const document = buildAccountingDocument(data, t);

  return (
    <HtmlDocumentRenderer<AccountingData>
      document={document}
      data={data}
      setData={setData}
    />
  );
};

export default AccountingContent;
