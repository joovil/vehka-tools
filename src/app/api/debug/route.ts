import { getMinutes } from "@/server/db/repos/minutesRepo";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const token = req.cookies.get("token");
  console.log(token);
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
