import { printMagenta } from "@/app/utils/loggers";
import { cookies } from "next/headers";
import { authenticate } from "../auth";

export const POST = async (req: Request) => {
  try {
    const cookieStore = await cookies();

    const { committeeName, password } = await checkIfBodyValid(req);

    const token = await authenticate(committeeName, password);

    cookieStore.set("token", token);
    printMagenta("User logged in");

    return Response.json({ token: token });
  } catch (error) {
    if (error instanceof Error)
      return Response.json({ message: error.message }, { status: 401 });
  }
};

const checkIfBodyValid = async (req: Request) => {
  let body;

  try {
    body = await req.json();
  } catch {
    throw new Error("Invalid JSON");
  }

  if (
    typeof body.committeeName !== "string" ||
    typeof body.password !== "string"
  ) {
    throw new Error("Invalid request");
  }

  const committeeName = body.committeeName.trim();
  const password = body.password;

  if (!committeeName || !password) {
    throw new Error("Invalid request");
  }

  return { committeeName, password };
};
