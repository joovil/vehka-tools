import { pdf } from "@react-pdf/renderer";

export const downloadPdf = async ({
  filename,
  pdfElement,
}: {
  filename: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pdfElement: React.ReactElement<any>;
}) => {
  if (process.env.PDF_DEV_DOWNLOAD === "false") {
    console.log("Test blob");
    return new Blob(["Test PDF content"], { type: "application/pdf" });
  }

  const blob = await pdf(pdfElement).toBlob();

  const url = URL.createObjectURL(blob);

  // Create temporary <a/> element to download the pdf
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.pdf`;
  a.target = "_self";
  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return blob;
};
