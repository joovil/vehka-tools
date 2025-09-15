import { savePdf } from "@/app/api/services/savePdf";
import { downloadPdf } from "@/app/components/pdf/downloadPdf";
import { checkAuthStatus } from "@/app/utils/checkAuthStatus";
import { ReactElement } from "react";

interface HandlePdfDownloadOptions {
  filename: string;
  pdfElement: ReactElement;
  confirmModalControls: {
    showModal: () => Promise<boolean>;
  };
}

/**
 * Handles PDF download with authentication check and modal confirmation
 * @param options - Configuration object containing filename, PDF element, and modal controls
 */
export const handlePdfDownload = async ({
  filename,
  pdfElement,
  confirmModalControls,
}: HandlePdfDownloadOptions) => {
  const isLoggedIn = await checkAuthStatus();

  if (isLoggedIn) {
    await handleLoggedInDownload(filename, pdfElement);
    console.log("Downloading PDF");
    return;
  }

  const loginSuccessful = await confirmModalControls.showModal();
  if (loginSuccessful) {
    await handleLoggedInDownload(filename, pdfElement);
    console.log("Downloading PDF");
    return;
  }

  await downloadPdf({
    filename,
    pdfElement,
  });
};

/**
 * Handles PDF download for logged-in users by saving to server
 * @param filename - The filename for the PDF
 * @param pdfElement - React element to render as PDF
 */
const handleLoggedInDownload = async (
  filename: string,
  pdfElement: ReactElement,
) => {
  const newPdfBlob = await downloadPdf({
    filename,
    pdfElement,
  });
  await savePdf(filename, newPdfBlob);
};
