"use server";

import { getServiceClient } from "@/server/azure/getServiceClient";
import { getAllCommittees } from "@/server/db/repos/committeesRepo";
import { ContainerClient } from "@azure/storage-blob";

export const fetchAllCommittees = async () => {
  return getAllCommittees();
};

export const getFileNames = async (committee: string, folder: string) => {
  const containerClient = getServiceClient();

  const names = [];

  for await (const blobItem of containerClient.listBlobsFlat({
    prefix: `${committee}/${folder}`,
  })) {
    names.push(blobItem.name);
  }
  return names;
};

export const getDocument = async (
  committee: string,
  folder: string,
  filename: string,
): Promise<Blob | null> => {
  return await getBlobFromAzure(`${committee}/${folder}/${filename}`);
};

export const getDocumentByPath = async (
  filePath: string,
): Promise<Blob | null> => {
  return await getBlobFromAzure(filePath);
};

export const getAllDocuments = async (
  committee: string,
  folder: string,
): Promise<Blob[]> => {
  const containerClient = getServiceClient();

  const blobs = [];

  for await (const blobItem of containerClient.listBlobsFlat({
    prefix: `${committee}/${folder}`,
  })) {
    const blob = await getBlobFromAzure(blobItem.name, containerClient);

    if (!blob) continue;

    blobs.push(blob);
  }

  return blobs;
};

const getBlobFromAzure = async (
  blobName: string,
  containerClient?: ContainerClient,
): Promise<Blob | null> => {
  if (!containerClient) {
    containerClient = getServiceClient();
  }

  const blobClient = containerClient.getBlobClient(blobName);

  const exists = await blobClient.exists();
  if (!exists) {
    return null;
  }

  const bufferLike = await blobClient.downloadToBuffer();
  const buffer = new Uint8Array(bufferLike).buffer;
  return new Blob([buffer]);
};
