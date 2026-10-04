"use server";

import { getSession } from "@/app/api/auth/auth";
import { downloadBlob, listBlobs } from "@/server/blob/store";
import { DOCUMENT_TYPES, DocumentType, isDocumentType } from "@/types";

// These actions are callable by anyone who can reach the app, with any
// arguments, so every one of them requires a logged-in committee and scopes
// storage access to that committee's own folder. The committee always comes
// from the session, never from the caller.
const requireSession = async () => {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
};

const ownFolder = (session: { committeeName: string }) =>
  `${session.committeeName}/`;

export const getFileNames = async (folder: string) => {
  const session = await requireSession();
  // Trailing slash so "minutes" can't also match e.g. "minutes-old"
  const blobs = await listBlobs(`${ownFolder(session)}${folder}/`);
  return blobs.map((blob) => blob.pathname);
};

// All of the committee's files, grouped by document type (the folder under
// the committee's own folder). Files in unknown folders are left out.
export const getFileNamesByType = async (): Promise<
  Record<DocumentType, string[]>
> => {
  const session = await requireSession();
  const blobs = await listBlobs(ownFolder(session));

  const grouped = Object.fromEntries(
    DOCUMENT_TYPES.map((d) => [d.type, [] as string[]]),
  ) as Record<DocumentType, string[]>;

  for (const blob of blobs) {
    const folder = blob.pathname.split("/")[1];
    if (isDocumentType(folder)) grouped[folder].push(blob.pathname);
  }

  return grouped;
};

export const getDocument = async (
  folder: string,
  filename: string,
): Promise<Blob | null> => {
  const session = await requireSession();
  return await getDocumentByPath(`${ownFolder(session)}${folder}/${filename}`);
};

export const getDocumentByPath = async (
  filePath: string,
): Promise<Blob | null> => {
  const session = await requireSession();

  if (
    !filePath.startsWith(ownFolder(session)) ||
    filePath.split("/").includes("..")
  ) {
    throw new Error("Forbidden");
  }

  const blobs = await listBlobs(filePath);
  const match = blobs.find((blob) => blob.pathname === filePath);
  if (!match) return null;

  return await downloadBlob(match.url);
};

export const getAllDocuments = async (folder: string): Promise<Blob[]> => {
  const session = await requireSession();

  const blobs = await listBlobs(`${ownFolder(session)}${folder}/`);
  return await Promise.all(blobs.map((blob) => downloadBlob(blob.url)));
};
