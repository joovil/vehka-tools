import { savePdf } from "@/app/api/services/savePdf";
import { downloadPdf } from "@/app/components/pdf/downloadPdf";
import { ConfirmModalResult } from "@/app/components/useConfirmModal";
import { checkAuthStatus } from "@/app/utils/checkAuthStatus";
import { DocumentType, SavedDocument } from "@/types";
import { ReactElement } from "react";

interface HandlePdfDownloadOptions {
  filename: string;
  pdfElement: ReactElement;
  // Folder the saved copy goes into, see DOCUMENT_TYPES
  documentType: DocumentType;
  number?: string;
  confirmModalControls: {
    showModal: (options?: {
      allowSkip?: boolean;
    }) => Promise<ConfirmModalResult>;
  };
}

/**
 * Handles PDF download with authentication check and modal confirmation
 * @param options - Configuration object containing filename, PDF element, and modal controls
 * @returns where the copy was stored, or null when it wasn't saved
 */
export const handlePdfDownload = async ({
  filename,
  pdfElement,
  documentType,
  number,
  confirmModalControls,
}: HandlePdfDownloadOptions): Promise<SavedDocument | null> => {
  const { isLoggedIn } = await checkAuthStatus();

  if (isLoggedIn) {
    return await handleLoggedInDownload(
      filename,
      pdfElement,
      documentType,
      number,
    );
  }

  const result = await confirmModalControls.showModal({ allowSkip: true });
  if (result === "cancelled") return null;

  if (result === "loggedIn") {
    return await handleLoggedInDownload(
      filename,
      pdfElement,
      documentType,
      number,
    );
  }

  await downloadPdf({
    filename,
    pdfElement,
  });
  return null;
};

/**
 * Handles PDF download for logged-in users by saving to server
 * @param filename - The filename for the PDF
 * @param pdfElement - React element to render as PDF
 * @param documentType - Folder the saved copy goes into
 * @param number - Minutes number printed in the PDF
 */
const handleLoggedInDownload = async (
  filename: string,
  pdfElement: ReactElement,
  documentType: DocumentType,
  number?: string,
): Promise<SavedDocument | null> => {
  const newPdfBlob = await downloadPdf({
    filename,
    pdfElement,
  });
  const saved = await savePdf(filename, newPdfBlob, documentType, number);
  if (!saved) return null;
  return { pathname: saved.pathname, filename, savedAt: new Date() };
};
