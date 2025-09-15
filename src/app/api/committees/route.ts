import { createCommittee } from "@/server/db/repos/committeesRepo";
import bcrypt from "bcryptjs";
import { DatabaseError } from "pg";

// Allow only admins to create a new tenant committee.
// Admin status is checked with admin password sent with the post req.
export const POST = async (req: Request) => {
  try {
    const { committeeName, password, adminPassword } = await req.json();

    if (!committeeName || !password || !adminPassword) {
      return Response.json(
        { message: "Required data missing" },
        { status: 400 },
      );
    }

    if (adminPassword !== process.env.ADMIN_PASS) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
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
