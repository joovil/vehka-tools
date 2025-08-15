import { createCommittee } from "@/server/db/repos/committeesRepo";
import bcrypt from "bcryptjs";
import { DatabaseError } from "pg";

export const POST = async (req: Request) => {
  try {
    const { committeeName, password } = await req.json();

    if (!committeeName || !password) {
      return Response.json(
        { message: "Required data missing" },
        { status: 400 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await createCommittee(committeeName, passwordHash);

    return Response.json(
      { message: "New committee added succesfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    if (error instanceof DatabaseError) {
      return Response.json({ message: error.detail }, { status: 400 });
    }

    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 400 });
    }

    return Response.json(
      { message: "An unknown error occurred" },
      { status: 500 },
    );
  }
};
