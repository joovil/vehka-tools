import { getCommitteeDocuments } from "@/server/azure/getCommitteeDocuments";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const docs = await getCommitteeDocuments("test", "minutes");
    console.log(docs);
    return Response.json({ test: "debug" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return Response.json({ message: "error" }, { status: 400 });
  }
};
