import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import { AzureStorageError } from "../utils/uploadFile";

export const getServiceClient = () => {
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
    return containerClient;
  } catch (error) {
    if (error instanceof AzureStorageError) throw error;

    throw new AzureStorageError(
      "Error uploading file to Azure Storage",
      error as Error,
    );
  }
};
