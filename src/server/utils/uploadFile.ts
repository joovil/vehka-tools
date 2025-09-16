import { getServiceClient } from "../azure/getServiceClient";

export class AzureStorageError extends Error {
  constructor(
    message: string,
    public readonly originalError?: Error,
  ) {
    super(message);
    this.name = "AzureStorageError";
  }
}

export const uploadFile = async (filename: string, blob: Blob) => {
  try {
    const containerClient = getServiceClient();

    // Ensure container exists
    await containerClient.createIfNotExists({
      access: "blob",
    });

    const blockBlobClient = containerClient.getBlockBlobClient(filename);

    // Convert File to ArrayBuffer
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadBlobResponse = await blockBlobClient.uploadData(buffer);
    return uploadBlobResponse;
  } catch (error) {
    if (error instanceof AzureStorageError) throw error;

    throw new AzureStorageError(
      "Error uploading file to Azure Storage",
      error as Error,
    );
  }
};
