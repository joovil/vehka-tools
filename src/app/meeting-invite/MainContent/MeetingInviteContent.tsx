"use client";

import { Document, Page, PDFViewer } from "@react-pdf/renderer";

const MeetingInviteContent = () => {
  return (
    <div>
      <PDFViewer>
        <Document>
          <Page></Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default MeetingInviteContent;
