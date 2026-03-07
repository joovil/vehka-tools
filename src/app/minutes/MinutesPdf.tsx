"use client";

import { renderPdfDocument } from "@/app/components/document/PdfBlockRenderer";
import { DocumentDefinition } from "@/app/components/document/types";
import { Document, Font, Page } from "@react-pdf/renderer";

Font.register({
  family: "Alex Brush",
  src: "https://fonts.gstatic.com/s/alexbrush/v22/SZc83FzrJKuqFbwMKk6EtUL57DtOmCc.ttf",
  fontWeight: 400,
});

const MinutesPdf = ({ document }: { document: DocumentDefinition }) => (
  <Document>
    <Page
      size="A4"
      style={{ padding: 40, fontSize: 12, fontFamily: "Helvetica" }}
    >
      {renderPdfDocument(document)}
    </Page>
  </Document>
);

export default MinutesPdf;
