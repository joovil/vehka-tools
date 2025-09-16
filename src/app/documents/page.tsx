"use client";

import { CommitteeWithoutPassword } from "@/types";
import { useEffect, useState } from "react";
import { fetchAllCommittees, fetchFileByPath, fetchFileNames } from "./actions";

const Documents = () => {
  const [committees, setCommittees] = useState<CommitteeWithoutPassword[]>([]);
  const [docNames, setDocNames] = useState<string[]>([]);
  const [selectedCommittee, setSelectedCommittee] =
    useState<CommitteeWithoutPassword | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  useEffect(() => {
    const f = async () => {
      setCommittees(await fetchAllCommittees());
    };
    f();
  }, []);

  // Cleanup PDF URL on component unmount
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const handleCommitteeClick = async (committee: CommitteeWithoutPassword) => {
    const files = await fetchFileNames(committee.name);
    setDocNames(files);
    setSelectedCommittee(committee);
  };

  const handleDocumentShow = async (filename: string) => {
    if (!selectedCommittee) {
      console.error("No committee selected");
      return;
    }

    try {
      console.log("filename", filename);

      const result = await fetchFileByPath(filename);

      // Check if the server action returned an error
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch document");
      }

      // Create blob from the returned data
      const blob = new Blob([result.data!], { type: result.contentType });
      const url = URL.createObjectURL(blob);

      // Clean up previous URL to prevent memory leaks
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }

      setPdfUrl(url);
      setSelectedDocument(filename);
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <div className="flex w-1/3 flex-col overflow-y-auto border-r border-gray-200 p-6">
        <h1 className="mb-4 text-2xl font-bold">Dokumentit</h1>

        <h2 className="mb-2 text-lg font-semibold">Asukastoimikunnat</h2>
        <div className="mb-6">
          {committees.map((com) => (
            <div
              key={com.id}
              onClick={() => handleCommitteeClick(com)}
              className={`cursor-pointer rounded p-2 hover:bg-gray-100 ${
                selectedCommittee?.id === com.id
                  ? "border border-blue-300 bg-blue-100"
                  : ""
              }`}
            >
              {com.name}
            </div>
          ))}
        </div>

        {selectedCommittee && (
          <>
            <h2 className="mb-2 text-lg font-semibold">
              {selectedCommittee.name} - Dokumentit
            </h2>
            <div>
              {docNames.map((d) => (
                <div
                  key={d}
                  onClick={() => handleDocumentShow(d)}
                  className={`cursor-pointer rounded p-2 text-sm hover:bg-gray-100 ${
                    selectedDocument === d
                      ? "border border-green-300 bg-green-100"
                      : ""
                  }`}
                >
                  {d.split("/").pop()} {/* Show only filename */}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* PDF Preview */}
      <div className="flex flex-1 flex-col">
        {pdfUrl ? (
          <div className="flex-1 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {selectedDocument?.split("/").pop()}
              </h3>
              <button
                onClick={() => window.open(pdfUrl, "_blank")}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Avaa uudessa välilehdessä
              </button>
            </div>
            <iframe
              src={pdfUrl}
              className="aspect-[1/1.4] h-full w-full rounded border border-gray-300"
              title="PDF Preview"
            />
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="mb-2 text-lg">
                Valitse dokumentti nähdäksesi esikatselu
              </p>
              <p className="text-sm">
                Valitse ensin toimikunta, sitten dokumentti
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
