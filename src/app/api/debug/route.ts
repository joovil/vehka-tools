import { NextRequest } from "next/server";
import { savePdf } from "../services/savePdf";

export const GET = async (req: NextRequest) => {
  try {
    const testBlob = new Blob(["This is a test PDF content"], {
      type: "application/pdf",
    });
    await savePdf("test", testBlob);
    return Response.json({ test: "debug" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return Response.json({ message: "error" }, { status: 400 });
  }
};
