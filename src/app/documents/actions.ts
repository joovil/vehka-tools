"use server";

import {
  getCommitteeDocument,
  getCommitteeDocumentByPath,
  getCommitteeDocuments,
} from "@/server/azure/getCommitteeDocuments";
import { getAllCommittees } from "@/server/db/repos/committeesRepo";
import { BlobItem } from "@azure/storage-blob";

export const fetchAllCommittees = async () => {
  return getAllCommittees();
};

export const fetchFileNames = async (committee: string) => {
  const docs: BlobItem[] = await getCommitteeDocuments(committee, "minutes");
  return docs.map((d) => d.name);
};

export const fetchFileByPath = async (filePath: string) => {
  try {
    const doc = await getCommitteeDocumentByPath(filePath);
    if (!doc) {
      return { success: false, error: "Document not found" };
    }

    return {
      success: true,
      data: new Uint8Array(doc),
      contentType: "application/pdf",
      contentLength: doc.length,
    };
  } catch (err) {
    console.error("Error fetching document:", err);
    return { success: false, error: "Failed to fetch document" };
  }
};

export const fetchDocument = async (
  committee: string,
  folder: string,
  filename: string,
): Promise<{
  success: boolean;
  data?: Uint8Array;
  error?: string;
  contentType?: string;
  contentLength?: number;
}> => {
  try {
    const doc = await getCommitteeDocument(committee, folder, filename);
    if (!doc) {
      return { success: false, error: "Document not found" };
    }

    return {
      success: true,
      data: new Uint8Array(doc),
      contentType: "application/pdf",
      contentLength: doc.length,
    };
  } catch (err) {
    console.error("Error fetching document:", err);
    return { success: false, error: "Failed to fetch document" };
  }
};
