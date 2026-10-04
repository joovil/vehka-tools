import {
  addMinutes,
  getMinutesByCommittee,
} from "@/server/db/repos/minutesRepo";
import { uploadFile } from "@/server/utils/uploadFile";
import { isDocumentType } from "@/types";
import { getSession } from "../auth/auth";

// getSession throws when the token cookie is missing or invalid
const getSessionOrNull = async () => {
  try {
    return (await getSession()) ?? null;
  } catch {
    return null;
  }
};

const unauthorized = () =>
  Response.json({ error: "Not authenticated" }, { status: 401 });

export const GET = async () => {
  try {
    const session = await getSessionOrNull();
    if (!session) return unauthorized();

    // Only the logged-in committee's own minutes
    const minutes = await getMinutesByCommittee(Number(session.id));
    return Response.json(minutes);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return Response.json({ message: "error" }, { status: 400 });
  }
};

export const POST = async (req: Request) => {
  try {
    const session = await getSessionOrNull();
    if (!session) return unauthorized();

    const formData = await req.formData();

    const blob = formData.get("blob");
    const filename = formData.get("filename");
    const documentType = formData.get("documentType");

    if (!(blob instanceof File)) {
      return Response.json(
        { error: "File must be a File object" },
        { status: 400 },
      );
    }

    if (typeof filename !== "string") {
      return Response.json(
        { error: "Filename must be a string" },
        { status: 400 },
      );
    }

    if (!blob || !filename) {
      return Response.json(
        { error: "Missing filename or blob data" },
        { status: 400 },
      );
    }

    // The filename becomes part of the blob path, so it must not be able to
    // step out of the committee's own folder
    if (filename.includes("/") || filename.includes("..")) {
      return Response.json({ error: "Invalid filename" }, { status: 400 });
    }

    // Also part of the path, so only known types are accepted
    if (!isDocumentType(documentType)) {
      return Response.json({ error: "Invalid document type" }, { status: 400 });
    }

    const filenameWithPath = `${session.committeeName}/${documentType}/${filename}`;
    const uploaded = await uploadFile(filenameWithPath, blob);

    await addMinutes({
      filename,
      blobUrl: uploaded.url,
      committeeId: Number(session.id),
    });

    return Response.json({
      message: "File stored",
      blobUrl: uploaded.url,
      pathname: uploaded.pathname,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error message missing" });
  }
};
