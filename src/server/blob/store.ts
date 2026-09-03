import { list, type ListBlobResultBlob } from "@vercel/blob";

export class BlobStorageError extends Error {
  constructor(
    message: string,
    public readonly originalError?: Error,
  ) {
    super(message);
    this.name = "BlobStorageError";
  }
}

// Vercel Blob pages its listings, so walk the cursor to get every match.
export const listBlobs = async (
  prefix: string,
): Promise<ListBlobResultBlob[]> => {
  try {
    const blobs: ListBlobResultBlob[] = [];
    let cursor: string | undefined;

    do {
      const res = await list({ prefix, cursor });
      blobs.push(...res.blobs);
      cursor = res.hasMore ? res.cursor : undefined;
    } while (cursor);

    return blobs;
  } catch (error) {
    throw new BlobStorageError(
      `Error listing blobs with prefix "${prefix}"`,
      error as Error,
    );
  }
};

export const downloadBlob = async (url: string): Promise<Blob> => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Blob download failed with status ${res.status}`);
    }
    return await res.blob();
  } catch (error) {
    throw new BlobStorageError("Error downloading blob", error as Error);
  }
};
