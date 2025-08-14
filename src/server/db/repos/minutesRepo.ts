import { sql } from "kysely";
import { db } from "../database";

export const getMinutes = async () => {
  return await db.selectFrom("minutes").selectAll().execute();
};

export const addMinutes = async ({
  filename,
  blobUrl,
  committeeId,
}: {
  filename: string;
  blobUrl: string;
  committeeId: number;
}) => {
  await db.transaction().execute(async (trx) => {
    const year = new Date().getFullYear();

    const [{ count }] = await trx
      .selectFrom("minutes")
      .select((eb) => eb.fn.count("id").as("count"))
      .where("committeeId", "=", committeeId)
      .where(sql`EXTRACT(YEAR FROM "created")`, "=", year)
      .execute();

    const entryNumber = Number(count) + 1;

    const newEntry = await trx
      .insertInto("minutes")
      .values({
        committeeId,
        filename,
        blobUrl,
        number: `${entryNumber}/${year}`,
        created: new Date(),
      })
      .executeTakeFirstOrThrow();

    return newEntry;
  });
};
