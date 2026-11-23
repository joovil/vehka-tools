"use client";

import { downloadFile } from "@/app/components/pdf/downloadPdf";
import { formatDate } from "@/app/utils/formatDate";
import { getDocumentByPath } from "@/server/blob/getCommitteeDocuments";
import { SavedDocument } from "@/types";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface Props {
  saved: SavedDocument;
  onNewDocument: () => void;
}

const SavedDocumentBanner = ({ saved, onNewDocument }: Props) => {
  const t = useTranslations();
  const [error, setError] = useState(false);

  const handleDownload = async () => {
    setError(false);
    try {
      const blob = await getDocumentByPath(saved.pathname);
      if (!blob) throw new Error("Saved document not found");

      downloadFile(blob, `${saved.filename}.pdf`);
    } catch (e) {
      console.error("Error downloading saved document", e);
      setError(true);
    }
  };

  return (
    <div className="border-teal-dark/30 bg-teal-dark/5 mb-2 flex flex-col gap-2 rounded-lg border p-3">
      <p className="text-sm">
        {t("savedDocument.info", { date: formatDate(saved.savedAt) })}
      </p>
      <div className="flex flex-wrap gap-2">
        <button onClick={handleDownload}>{t("savedDocument.download")}</button>
        <button onClick={onNewDocument}>{t("savedDocument.new")}</button>
      </div>
      {error && (
        <p className="text-sm text-red-800">{t("savedDocument.error")}</p>
      )}
    </div>
  );
};

export default SavedDocumentBanner;
