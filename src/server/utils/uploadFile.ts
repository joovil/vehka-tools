import { put } from "@vercel/blob";
import { BlobStorageError } from "../blob/store";

export const uploadFile = async (filename: string, blob: Blob) => {
  try {
    // The store is private, so blobs are only readable with the store token.
    // A random suffix means re-saving the same document never clobbers an
    // earlier version.
    return await put(filename, blob, {
      access: "private",
      addRandomSuffix: true,
    });
  } catch (error) {
    throw new BlobStorageError(
      "Error uploading file to blob storage",
      error as Error,
    );
  }
};
