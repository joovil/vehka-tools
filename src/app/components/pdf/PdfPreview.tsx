"use client";

import dynamic from "next/dynamic";
import { JSX } from "react";

const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

const PdfPreview = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="w-full">
      <PDFViewer className="w-full h-[1000px]">{children}</PDFViewer>
    </div>
  );
};

export default PdfPreview;
