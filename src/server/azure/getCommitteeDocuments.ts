import { BlobItem } from "@azure/storage-blob";
import { getServiceClient } from "./getServiceClient";

export const getCommitteeDocument = async (
  committee: string,
  folder: string,
  filename: string,
): Promise<Buffer | null> => {
  const containerClient = getServiceClient();

  const blobPath = folder.endsWith("/")
    ? `${committee}/${folder}${filename}`
    : `${committee}/${folder}/${filename}`;
  const blobClient = containerClient.getBlobClient(blobPath);

  const exists = await blobClient.exists();
  if (!exists) {
    return null;
  }

  // Download the blob content as a Buffer
  const downloadBlockBlobResponse = await blobClient.download();
  const downloaded = await streamToBuffer(
    downloadBlockBlobResponse.readableStreamBody!,
  );

  return downloaded;
};

export const getCommitteeDocumentByPath = async (
  filePath: string,
): Promise<Buffer | null> => {
  const containerClient = getServiceClient();

  const blobClient = containerClient.getBlobClient(filePath);

  const exists = await blobClient.exists();
  if (!exists) {
    return null;
  }

  const downloadBlockBlobResponse = await blobClient.download();
  const downloaded = await streamToBuffer(
    downloadBlockBlobResponse.readableStreamBody!,
  );

  return downloaded;
};

// Helper function to convert stream to buffer
async function streamToBuffer(
  readableStream: NodeJS.ReadableStream,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

export const getCommitteeDocuments = async (
  committee: string,
  folder: string,
): Promise<BlobItem[]> => {
  const containerClient = getServiceClient();

  console.log(committee, folder);

  const blobs = [];
  for await (const blob of containerClient.listBlobsByHierarchy("/", {
    prefix: folder.endsWith("/")
      ? `${committee}/${folder}`
      : `${committee}/${folder}/`,
  })) {
    if (blob.kind === "blob") {
      blobs.push(blob);
    }
  }

  return blobs;
};
