"use server";

import { getSession } from "@/app/api/auth/auth";
import { downloadBlob, listBlobs } from "@/server/blob/store";
import { getAllCommittees } from "@/server/db/repos/committeesRepo";

// These actions are callable by anyone who can reach the app, so every one of
// them requires a logged-in committee before touching storage.
const requireSession = async () => {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
};

export const fetchAllCommittees = async () => {
  await requireSession();
  return getAllCommittees();
};

export const getFileNames = async (committee: string, folder: string) => {
  await requireSession();
  const blobs = await listBlobs(`${committee}/${folder}`);
  return blobs.map((blob) => blob.pathname);
};

export const getDocument = async (
  committee: string,
  folder: string,
  filename: string,
): Promise<Blob | null> => {
  return await getDocumentByPath(`${committee}/${folder}/${filename}`);
};

export const getDocumentByPath = async (
  filePath: string,
): Promise<Blob | null> => {
  await requireSession();

  const blobs = await listBlobs(filePath);
  const match = blobs.find((blob) => blob.pathname === filePath);
  if (!match) return null;

  return await downloadBlob(match.url);
};

export const getAllDocuments = async (
  committee: string,
  folder: string,
): Promise<Blob[]> => {
  await requireSession();

  const blobs = await listBlobs(`${committee}/${folder}`);
  return await Promise.all(blobs.map((blob) => downloadBlob(blob.url)));
};
