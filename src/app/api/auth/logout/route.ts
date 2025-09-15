import { printMagenta } from "@/app/utils/loggers";
import { cookies } from "next/headers";

export const POST = async () => {
  try {
    const cookieStore = await cookies();

    // Clear the authentication token cookie
    cookieStore.delete("token");

    printMagenta("User logged out");

    return Response.json({ message: "Logged out successfully" });
  } catch (error) {
    if (error instanceof Error)
      return Response.json({ message: error.message }, { status: 500 });
  }
};
