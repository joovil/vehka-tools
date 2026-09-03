import { NextRequest } from "next/server";
import { decodeToken } from "../auth";

// Return 200 with the committee name if the user is logged in
export const GET = async (req: NextRequest) => {
  const token = req.cookies.get("token");

  if (!token || !token.value || typeof token.value !== "string")
    return Response.json({ status: "Not logged in" }, { status: 401 });

  try {
    const session = decodeToken(token.value);
    if (!session)
      return Response.json({ status: "Invalid token" }, { status: 401 });

    return Response.json(
      { status: "logged in", committeeName: session.committeeName },
      { status: 200 },
    );
  } catch {
    return Response.json({ status: "Invalid token" }, { status: 401 });
  }
};
