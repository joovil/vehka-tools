import { getNextMinutesNumber } from "@/server/db/repos/minutesRepo";
import { isDocumentType } from "@/types";
import { getSessionOrNull, unauthorized } from "../../auth/auth";

export const GET = async (req: Request) => {
  try {
    const session = await getSessionOrNull();
    if (!session) return unauthorized();

    const params = new URL(req.url).searchParams;
    const documentType = params.get("documentType");
    const year = Number(params.get("year") ?? new Date().getFullYear());

    if (!isDocumentType(documentType)) {
      return Response.json({ error: "Invalid document type" }, { status: 400 });
    }
    if (!Number.isInteger(year) || year < 2000 || year > 9999) {
      return Response.json({ error: "Invalid year" }, { status: 400 });
    }

    const number = await getNextMinutesNumber(
      Number(session.id),
      documentType,
      year,
    );
    return Response.json({ number, year });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return Response.json({ message: "error" }, { status: 400 });
  }
};
