import { db } from "../database";

export const getMinutes = async () => {
  return await db.selectFrom("minutes").selectAll().execute();
};
