import { db } from "../database";

export const getCommitteeById = async (id: number) => {
  return await db
    .selectFrom("committees")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirstOrThrow();
};

export const getCommitteeByName = async (name: string) => {
  return await db
    .selectFrom("committees")
    .where("name", "=", name)
    .selectAll()
    .executeTakeFirstOrThrow();
};

export const createCommittee = async (name: string, passwordHash: string) => {
  return await db
    .insertInto("committees")
    .values({ name, passwordHash })
    .returningAll()
    .executeTakeFirstOrThrow();
};
