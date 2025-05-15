import { getMinutes } from "@/server/db/repos/minutesRepo";

export const GET = async () => {
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
