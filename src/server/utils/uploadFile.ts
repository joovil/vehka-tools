import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";

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
  let blobServiceClient: BlobServiceClient;

  try {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName)
      throw new AzureStorageError("Azure Storage accountName not found");

    if (process.env.NODE_ENV === "development") {
      const connectionString = process.env.AZURE_BLOB_CONNECTION_STRING;
      if (!connectionString) {
        throw new AzureStorageError("Azure Storage connectionString not found");
      }
      blobServiceClient =
        BlobServiceClient.fromConnectionString(connectionString);
    } else {
      blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        new DefaultAzureCredential(),
      );
    }

    const containerClient = blobServiceClient.getContainerClient(accountName);

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
