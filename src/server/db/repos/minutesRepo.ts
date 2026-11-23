import { DocumentType } from "@/types";
import { sql } from "kysely";
import { db } from "../database";

export const getMinutes = async () => {
  return await db.selectFrom("minutes").selectAll().execute();
};

export const getMinutesByCommittee = async (committeeId: number) => {
  return await db
    .selectFrom("minutes")
    .selectAll()
    .where("committeeId", "=", committeeId)
    .execute();
};

// Highest stored number + 1 rather than a count, so the sequence continues
// from a number typed by hand
export const getNextMinutesNumber = async (
  committeeId: number,
  documentType: DocumentType,
  year: number,
) => {
  const { highest } = await db
    .selectFrom("minutes")
    .select(
      sql<number | null>`max(split_part("number", '/', 1)::int)`.as("highest"),
    )
    .where("committeeId", "=", committeeId)
    .where("documentType", "=", documentType)
    .where("number", "like", `%/${year}`)
    .executeTakeFirstOrThrow();

  return (highest ?? 0) + 1;
};

export const addMinutes = async ({
  filename,
  blobUrl,
  committeeId,
  documentType,
  number,
}: {
  filename: string;
  blobUrl: string;
  committeeId: number;
  documentType?: DocumentType;
  number?: string;
}) => {
  await db
    .insertInto("minutes")
    .values({
      committeeId,
      filename,
      blobUrl,
      documentType: documentType ?? null,
      number: number ?? null,
      created: new Date(),
    })
    .executeTakeFirstOrThrow();
};
