import { savePdf } from "@/app/api/services/savePdf";
import { downloadPdf } from "@/app/components/pdf/downloadPdf";
import { ConfirmModalResult } from "@/app/components/useConfirmModal";
import { checkAuthStatus } from "@/app/utils/checkAuthStatus";
import { DocumentType } from "@/types";
import { ReactElement } from "react";

interface HandlePdfDownloadOptions {
  filename: string;
  pdfElement: ReactElement;
  // Folder the saved copy goes into, see DOCUMENT_TYPES
  documentType: DocumentType;
  confirmModalControls: {
    showModal: (options?: {
      allowSkip?: boolean;
    }) => Promise<ConfirmModalResult>;
  };
}

/**
 * Handles PDF download with authentication check and modal confirmation
 * @param options - Configuration object containing filename, PDF element, and modal controls
 */
export const handlePdfDownload = async ({
  filename,
  pdfElement,
  documentType,
  confirmModalControls,
}: HandlePdfDownloadOptions) => {
  const { isLoggedIn } = await checkAuthStatus();

  if (isLoggedIn) {
    await handleLoggedInDownload(filename, pdfElement, documentType);
    console.log("Downloading PDF");
    return;
  }

  const result = await confirmModalControls.showModal({ allowSkip: true });
  if (result === "cancelled") return;

  if (result === "loggedIn") {
    await handleLoggedInDownload(filename, pdfElement, documentType);
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
 * @param documentType - Folder the saved copy goes into
 */
const handleLoggedInDownload = async (
  filename: string,
  pdfElement: ReactElement,
  documentType: DocumentType,
) => {
  const newPdfBlob = await downloadPdf({
    filename,
    pdfElement,
  });
  await savePdf(filename, newPdfBlob, documentType);
};
