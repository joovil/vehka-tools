"use client";

import { useAuth } from "@/app/components/AuthProvider";
import {
  getDocumentByPath,
  getFileNamesByType,
} from "@/server/blob/getCommitteeDocuments";
import { DOCUMENT_TYPES, DocumentType } from "@/types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import MenuItems from "../MenuItems";
import { createTestDocuments } from "./createTestDocuments";

// Blob storage inserts a 30-character random suffix before the extension, e.g.
// "Kokouskutsu-4.10-G9U4MhpiwqU6ZFaKREgdm5rff48I8h.2026" (the date's last dot
// is taken as the extension). For display, put the name back together and keep
// only a few characters of the suffix to tell same-named files apart.
const displayName = (path: string) => {
  const filename = path.split("/").pop() ?? path;
  const match = filename.match(/^(.*)-([A-Za-z0-9]{30})(\.[^.]*)?$/);
  if (!match) return { name: filename, suffix: null };
  const [, base, suffix, ext = ""] = match;
  return { name: `${base}${ext}`, suffix: suffix.slice(0, 4) };
};

const DocumentName = ({ path }: { path: string }) => {
  const { name, suffix } = displayName(path);
  return (
    <>
      {name}
      {suffix && <span className="ml-1.5 text-sm text-gray-400">{suffix}</span>}
    </>
  );
};

const Documents = () => {
  const t = useTranslations();
  const { committeeName } = useAuth();
  // null while loading, so the empty message doesn't flash before the list arrives
  const [docsByType, setDocsByType] = useState<Record<
    DocumentType,
    string[]
  > | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  // Only used below the md breakpoint, where list and preview are tabs
  const [mobileTab, setMobileTab] = useState<"list" | "preview">("list");
  const [creatingTestDocs, setCreatingTestDocs] = useState(false);

  // The server scopes this to the logged-in committee's own folder
  const loadDocNames = async () => setDocsByType(await getFileNamesByType());

  useEffect(() => {
    loadDocNames();
  }, []);

  const handleCreateTestDocuments = async () => {
    setCreatingTestDocs(true);
    try {
      await createTestDocuments(t);
      await loadDocNames();
    } catch (error) {
      console.error("Error creating test documents:", error);
    } finally {
      setCreatingTestDocs(false);
    }
  };

  // Cleanup PDF URL on component unmount
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const handleDocumentShow = async (filename: string) => {
    try {
      const blob = await getDocumentByPath(filename);
      if (!blob) throw new Error("Blob not found");

      const url = URL.createObjectURL(blob);

      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }

      setPdfUrl(url);
      setSelectedDocument(filename);
      setMobileTab("preview");
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const handleDocumentDownload = () => {
    if (!pdfUrl || !selectedDocument) return;

    // Temporary <a/> element so the browser saves the file instead of opening it
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = selectedDocument.split("/").pop() ?? "document.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const listItemClass = (selected: boolean) =>
    `cursor-pointer rounded-md px-3 py-1.5 text-base transition-colors ${
      selected
        ? "bg-teal-dark/10 text-teal-darker font-bold"
        : "hover:bg-teal-dark/5"
    }`;

  const tabClass = (active: boolean) =>
    `flex-1 rounded-none px-4 py-3 text-sm font-bold shadow-none transition-colors ${
      active
        ? "border-teal-dark text-teal-darker border-b-2 bg-white"
        : "text-gray-500 hover:text-gray-700"
    }`;

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden md:flex-row">
      {/* Mobile tab bar */}
      <div className="flex border-b border-gray-200 bg-gray-50 md:hidden">
        <button
          onClick={() => setMobileTab("list")}
          className={tabClass(mobileTab === "list")}
        >
          {t("documents.title")}
        </button>
        <button
          onClick={() => setMobileTab("preview")}
          className={tabClass(mobileTab === "preview")}
        >
          {t("splitView.preview")}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${mobileTab === "list" ? "block" : "hidden"} flex-1 overflow-y-auto bg-gray-50 p-4 md:block md:w-1/3 md:flex-none md:p-6`}
        style={{ scrollbarGutter: "stable" }}
      >
        <Link
          href="/"
          className="text-teal-darker mb-3 inline-block text-sm underline-offset-2 hover:underline"
        >
          ← {t("documents.backToHome")}
        </Link>
        <MenuItems />

        <div className="mt-2 flex flex-col gap-2">
          <div>
            <h1>{t("documents.title")}</h1>
            {committeeName && (
              <p className="text-sm text-gray-500">{committeeName}</p>
            )}
          </div>

          {/* Dev only: NODE_ENV is inlined at build time, so this is stripped
              from production bundles */}
          {process.env.NODE_ENV === "development" && (
            <button
              onClick={handleCreateTestDocuments}
              disabled={creatingTestDocs}
              className="self-start text-sm"
            >
              {creatingTestDocs
                ? "Creating test documents…"
                : "Create test documents (dev)"}
            </button>
          )}

          {/* One section per document type, in the order of DOCUMENT_TYPES */}
          {docsByType &&
            DOCUMENT_TYPES.map(({ type, labelKey }) => (
              <div
                key={type}
                className="rounded-lg border border-gray-200 bg-white/50 px-3 py-2"
              >
                <h2 className="text-teal-darker mb-1 text-base">
                  {t(labelKey)}
                </h2>
                <div className="flex flex-col gap-0.5">
                  {docsByType[type].length === 0 && (
                    <p className="px-3 py-1 text-sm text-gray-500">
                      {t("documents.noDocuments")}
                    </p>
                  )}
                  {docsByType[type].map((d) => (
                    <div
                      key={d}
                      onClick={() => handleDocumentShow(d)}
                      className={listItemClass(selectedDocument === d)}
                    >
                      <DocumentName path={d} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="hidden w-2 bg-gray-200 md:block" />

      {/* PDF Preview */}
      <div
        className={`${mobileTab === "preview" ? "flex" : "hidden"} min-h-0 min-w-0 flex-1 flex-col bg-gray-200/60 p-4 md:flex md:p-8`}
      >
        {pdfUrl ? (
          <>
            <div className="mb-4 flex items-center justify-between gap-2 md:gap-4">
              <h3 className="min-w-0 truncate">
                {selectedDocument && <DocumentName path={selectedDocument} />}
              </h3>
              <button
                onClick={handleDocumentDownload}
                className="shrink-0"
              >
                {t("download")}
              </button>
            </div>
            <iframe
              src={pdfUrl}
              className="min-h-0 w-full flex-1 rounded bg-white shadow-xl ring-1 ring-gray-200"
              title="PDF Preview"
            />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-500">
            <p className="text-center">{t("documents.selectDocumentPrompt")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
