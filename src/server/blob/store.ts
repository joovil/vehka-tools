import { get, list, type ListBlobResultBlob } from "@vercel/blob";

export class BlobStorageError extends Error {
  constructor(
    message: string,
    public readonly originalError?: Error,
  ) {
    // Pass the cause along so the underlying SDK error (e.g. a missing token)
    // shows up in the Next.js error overlay and server logs.
    super(message, { cause: originalError });
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
    // Private blobs can't be fetched by URL alone; get() adds the store token.
    const res = await get(url, { access: "private" });
    if (!res || res.statusCode !== 200) {
      throw new Error(`Blob not found: ${url}`);
    }
    return await new Response(res.stream).blob();
  } catch (error) {
    throw new BlobStorageError("Error downloading blob", error as Error);
  }
};
