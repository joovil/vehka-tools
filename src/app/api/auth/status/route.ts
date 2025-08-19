import { NextRequest } from "next/server";
import { tokenValid } from "../auth";

// Return 200 if user is logged
export const GET = async (req: NextRequest) => {
  const token = req.cookies.get("token");

  if (!token || !token.value || typeof token.value !== "string")
    return Response.json({ status: "Not logged in" }, { status: 400 });

  const isValid = tokenValid(token.value);
  if (!isValid) return Response.json({ status: "logged in" }, { status: 400 });

  return Response.json({ status: "Invalid token" });
};
