import { decodeToken } from "@/auth/auth";

export const POST = async (req: Request) => {
  const authHeader = req.headers.get("Authentication");

  const token = authHeader?.split(" ")[1];
  console.log(token);
  const decodedToken = decodeToken(token!);
  console.log(decodedToken);

  return Response.json({ not: "implemented" });
};
