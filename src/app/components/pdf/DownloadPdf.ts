import { pdf } from "@react-pdf/renderer";

export const DownloadPdf = async (
  filename: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pdfElement: React.ReactElement<any>,
) => {
  const blob = await pdf(pdfElement).toBlob();

  const url = URL.createObjectURL(blob);

  // Create temporary <a/> element to download the pdf
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.pdf`;
  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
