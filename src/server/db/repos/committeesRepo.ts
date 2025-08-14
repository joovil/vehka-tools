import { db } from "../database";

export const getCommittee = async (id: number) => {
  return await db
    .selectFrom("committees")
    .select(["name", "password"])
    .where("id", "=", id)
    .executeTakeFirstOrThrow();
};

export const createCommittee = async (name: string, password: string) => {
  return await db
    .insertInto("committees")
    .values({ name, password })
    .returningAll()
    .executeTakeFirstOrThrow();
};
