import { authenticate } from "@/server/auth/auth";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  try {
    const cookieStore = await cookies();

    const { committeeName, password } = await req.json();
    const token = await authenticate(committeeName, password);
    cookieStore.set("token", token);

    return Response.json(token);
  } catch (error) {
    if (error instanceof Error)
      return Response.json({ message: error.message }, { status: 401 });
  }
};
