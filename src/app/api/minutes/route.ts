import { getMinutes } from "@/server/db/repos/minutesRepo";
import { uploadFile } from "@/server/utils/uploadFile";
import { getSession } from "../auth/auth";

export const GET = async () => {
  try {
    const minutes = await getMinutes();
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
    const formData = await req.formData();

    const blob = formData.get("blob");
    const filename = formData.get("filename");

    const session = await getSession();

    if (!session) {
      return Response.json(
        { error: "Authentication token missing" },
        { status: 400 },
      );
    }

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

    const filenameWithPath = `${session.committeeName}/minutes/${filename}`;
    const uploadBlobResponse = await uploadFile(filenameWithPath, blob);

    return Response.json({
      message: "File stored",
      blobId: uploadBlobResponse.requestId,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error message missing" });
  }
};
