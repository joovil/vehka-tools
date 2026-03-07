"use client";

import { HtmlDocumentRenderer } from "@/app/components/document/HtmlRenderer";
import { useTranslations } from "next-intl";
import { buildContactFormDocument } from "../buildDocument";
import { ContactFormData, ContactFormProps } from "../page";

const ContactFormContent = ({ data, setData }: ContactFormProps) => {
  const t = useTranslations();
  const document = buildContactFormDocument(data, t);

  return (
    <HtmlDocumentRenderer<ContactFormData>
      document={document}
      data={data}
      setData={setData}
    />
  );
};

export default ContactFormContent;
