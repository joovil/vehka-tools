import { put } from "@vercel/blob";
import { BlobStorageError } from "../blob/store";

export const uploadFile = async (filename: string, blob: Blob) => {
  try {
    // A random suffix keeps the public blob URL unguessable and means
    // re-saving the same document never clobbers an earlier version.
    return await put(filename, blob, {
      access: "public",
      addRandomSuffix: true,
    });
  } catch (error) {
    throw new BlobStorageError(
      "Error uploading file to blob storage",
      error as Error,
    );
  }
};
